export interface Tweet {
  id: string;
  text: string;
  created_at: string;
  attachments?: {
    media_keys?: string[];
  };
  public_metrics?: {
    like_count: number;
    retweet_count: number;
    reply_count?: number;
  };
}

export interface TweetMedia {
  media_key: string;
  type: "photo" | "video" | "animated_gif";
  url?: string;
  preview_image_url?: string;
}

export interface TweetsResponse {
  data?: Tweet[];
  includes?: {
    media?: TweetMedia[];
  };
}

export function buildMediaMap(response: TweetsResponse): Record<string, TweetMedia> {
  const map: Record<string, TweetMedia> = {};
  if (response?.includes?.media) {
    for (const m of response.includes.media) {
      map[m.media_key] = m;
    }
  }
  return map;
}

export function getTweetMedia(tweet: Tweet, mediaMap: Record<string, TweetMedia>): TweetMedia | undefined {
  const key = tweet.attachments?.media_keys?.[0];
  return key ? mediaMap[key] : undefined;
}

export function cleanTweetText(text: string): string {
  // Remove trailing t.co URLs (media/card links Twitter appends)
  return text.replace(/\s*https:\/\/t\.co\/\S+\s*$/g, "").trim();
}
