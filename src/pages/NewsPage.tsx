import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import XLogo from "@/components/ui/XLogo";
import { Play } from "lucide-react";
import { Tweet, TweetsResponse, buildMediaMap, getTweetMedia, cleanTweetText } from "@/lib/tweets";
import LinkedInEmbed from "@/components/LinkedInEmbed";

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  cover_image_url: string | null;
  author_name: string | null;
  created_at: string;
}

type FeedItem =
  | { type: "news"; data: NewsItem; date: Date }
  | { type: "tweet"; data: Tweet; date: Date }
  | { type: "linkedin"; data: { id: string; post_url: string; text: string | null; image_url: string | null; author_name: string | null; likes_count: number | null; caption: string | null; created_at: string }; date: Date };

const NewsPage = () => {
  const { data: news, isLoading } = useQuery({
    queryKey: ["all-published-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, summary, cover_image_url, author_name, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as NewsItem[];
    },
  });

  const { data: tweetsData } = useQuery({
    queryKey: ["tweets"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("fetch-tweets");
      if (error) throw error;
      return data as TweetsResponse;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const { data: linkedinPosts } = useQuery({
    queryKey: ["all-linkedin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("linkedin_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const tweets: Tweet[] = tweetsData?.data || [];
  const mediaMap = buildMediaMap(tweetsData || {});

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Merge all into unified feed
  const feedItems: FeedItem[] = [];

  if (news) {
    news.forEach((item) => {
      feedItems.push({ type: "news", data: item, date: new Date(item.created_at) });
    });
  }

  tweets.forEach((tweet) => {
    feedItems.push({ type: "tweet", data: tweet, date: new Date(tweet.created_at) });
  });

  if (linkedinPosts) {
    linkedinPosts.forEach((post) => {
      feedItems.push({ type: "linkedin", data: post, date: new Date(post.created_at) });
    });
  }

  feedItems.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
            News & Updates
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-wide">
            All News
          </h1>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted/20 animate-pulse" />
            ))}
          </div>
        ) : feedItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-body">No news yet. Stay tuned!</p>
            <Link to="/" className="text-primary text-sm font-body hover:underline mt-4 inline-block">
              ← Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {feedItems.map((item, i) => {
              if (item.type === "news") {
                return (
                  <motion.div
                    key={`news-${item.data.id}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <Link to={`/news/${item.data.id}`}>
                      <GlassCard className="overflow-hidden h-full flex flex-col hover:border-primary/30 transition-colors" tilt={false}>
                        {item.data.cover_image_url && (
                          <div className="aspect-video overflow-hidden">
                            <img src={item.data.cover_image_url} alt={item.data.title} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        )}
                        <div className="p-6 flex flex-col flex-1">
                          <time className="text-xs tracking-[0.15em] uppercase text-muted-foreground/60 font-body mb-3">
                            {formatDate(item.data.created_at)}
                            {item.data.author_name && ` · ${item.data.author_name}`}
                          </time>
                          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                            {item.data.title}
                          </h3>
                          {item.data.summary && (
                            <p className="text-sm text-muted-foreground font-body line-clamp-3 flex-1">
                              {item.data.summary}
                            </p>
                          )}
                        </div>
                      </GlassCard>
                    </Link>
                  </motion.div>
                );
              }

              if (item.type === "tweet") {
                const media = getTweetMedia(item.data, mediaMap);
                const mediaUrl = media?.url || media?.preview_image_url;
                return (
                  <motion.a
                    key={`tweet-${item.data.id}`}
                    href={`https://x.com/AbjadGames/status/${item.data.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <GlassCard className="overflow-hidden h-full hover:border-primary/30 transition-colors" tilt={false}>
                      {mediaUrl && (
                        <div className="relative aspect-video overflow-hidden">
                          <img src={mediaUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                          {(media?.type === "video" || media?.type === "animated_gif") && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                              <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                                <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <XLogo className="w-4 h-4 text-primary/60" />
                          <span className="text-xs text-muted-foreground/60 font-body">
                            {formatDate(item.data.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/90 font-body leading-relaxed whitespace-pre-line" dir="auto">
                          {cleanTweetText(item.data.text)}
                        </p>
                        {item.data.public_metrics && (
                          <div className="flex gap-4 mt-3 text-xs text-muted-foreground/50 font-body">
                            <span>❤️ {item.data.public_metrics.like_count}</span>
                            <span>🔁 {item.data.public_metrics.retweet_count}</span>
                          </div>
                        )}
                      </div>
                    </GlassCard>
                  </motion.a>
                );
              }

              if (item.type === "linkedin") {
                return (
                  <motion.div
                    key={`linkedin-${item.data.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <LinkedInEmbed
                      postUrl={item.data.post_url}
                      text={item.data.text}
                      imageUrl={item.data.image_url}
                      authorName={item.data.author_name}
                      likesCount={item.data.likes_count}
                      createdAt={item.data.created_at}
                    />
                  </motion.div>
                );
              }

              return null;
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
