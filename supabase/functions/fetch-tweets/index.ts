const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
import { createHmac } from "node:crypto";

const TWITTER_API_URL = "https://api.x.com/2";

function percentEncode(str: string): string {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string
): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((k) => `${percentEncode(k)}=${percentEncode(params[k])}`)
    .join("&");

  const baseString = `${method.toUpperCase()}&${percentEncode(url)}&${percentEncode(sortedParams)}`;
  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`;

  const hmac = createHmac("sha1", signingKey);
  hmac.update(baseString);
  return hmac.digest("base64");
}

function buildOAuthHeader(
  method: string,
  url: string,
  queryParams: Record<string, string>,
  consumerKey: string,
  consumerSecret: string,
  accessToken: string,
  accessTokenSecret: string
): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: crypto.randomUUID().replace(/-/g, ""),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: accessToken,
    oauth_version: "1.0",
  };

  const allParams = { ...oauthParams, ...queryParams };
  const signature = generateOAuthSignature(method, url, allParams, consumerSecret, accessTokenSecret);
  oauthParams["oauth_signature"] = signature;

  const header = Object.keys(oauthParams)
    .sort()
    .map((k) => `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`)
    .join(", ");

  return `OAuth ${header}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const consumerKey = Deno.env.get("TWITTER_CONSUMER_KEY");
  const consumerSecret = Deno.env.get("TWITTER_CONSUMER_SECRET");
  const accessToken = Deno.env.get("TWITTER_ACCESS_TOKEN");
  const accessTokenSecret = Deno.env.get("TWITTER_ACCESS_TOKEN_SECRET");

  if (!consumerKey || !consumerSecret || !accessToken || !accessTokenSecret) {
    return new Response(JSON.stringify({ error: "Twitter API credentials not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // First get user ID for @AbjadGames
    const usernameUrl = `${TWITTER_API_URL}/users/by/username/AbjadGames`;
    const usernameAuth = buildOAuthHeader("GET", usernameUrl, {}, consumerKey, consumerSecret, accessToken, accessTokenSecret);

    const userRes = await fetch(usernameUrl, {
      headers: { Authorization: usernameAuth },
    });

    if (!userRes.ok) {
      const errorBody = await userRes.text();
      throw new Error(`Failed to fetch user [${userRes.status}]: ${errorBody}`);
    }

    const userData = await userRes.json();
    const userId = userData.data?.id;

    if (!userId) {
      throw new Error("User @AbjadGames not found");
    }

    // Fetch recent tweets
    const tweetsUrl = `${TWITTER_API_URL}/users/${userId}/tweets`;
    const queryParams: Record<string, string> = {
      max_results: "10",
      "tweet.fields": "created_at,text,public_metrics,entities",
      expansions: "attachments.media_keys",
      "media.fields": "url,preview_image_url,type",
      exclude: "replies,retweets",
    };

    const queryString = Object.entries(queryParams)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");

    const fullUrl = `${tweetsUrl}?${queryString}`;
    const tweetsAuth = buildOAuthHeader("GET", tweetsUrl, queryParams, consumerKey, consumerSecret, accessToken, accessTokenSecret);

    const tweetsRes = await fetch(fullUrl, {
      headers: { Authorization: tweetsAuth },
    });

    if (!tweetsRes.ok) {
      const errorBody = await tweetsRes.text();
      throw new Error(`Failed to fetch tweets [${tweetsRes.status}]: ${errorBody}`);
    }

    const tweetsData = await tweetsRes.json();

    return new Response(JSON.stringify(tweetsData), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error fetching tweets:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
