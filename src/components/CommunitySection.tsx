import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GlassCard from "./ui/GlassCard";
import ScrollReveal from "./ui/ScrollReveal";
import XLogo from "./ui/XLogo";
import { Play, Linkedin } from "lucide-react";
import { Tweet, TweetsResponse, buildMediaMap, getTweetMedia, cleanTweetText } from "@/lib/tweets";
import LinkedInEmbed from "./LinkedInEmbed";

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  cover_image_url: string | null;
  created_at: string;
}

type FeedItem =
  | { type: "news"; data: NewsItem; date: Date }
  | { type: "tweet"; data: Tweet; date: Date }
  | { type: "linkedin"; data: { id: string; post_url: string; text: string | null; image_url: string | null; author_name: string | null; likes_count: number | null; caption: string | null; created_at: string }; date: Date };

const CommunitySection = () => {
  const { data: news, isLoading } = useQuery({
    queryKey: ["published-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, summary, cover_image_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6);
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
    queryKey: ["linkedin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("linkedin_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const tweets: Tweet[] = tweetsData?.data || [];
  const mediaMap = buildMediaMap(tweetsData || {});

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Merge all content into a single feed sorted by date
  const feedItems: FeedItem[] = [];

  if (news) {
    news.forEach((item) => {
      feedItems.push({ type: "news", data: item, date: new Date(item.created_at) });
    });
  }

  tweets.slice(0, 6).forEach((tweet) => {
    feedItems.push({ type: "tweet", data: tweet, date: new Date(tweet.created_at) });
  });

  if (linkedinPosts) {
    linkedinPosts.forEach((post) => {
      feedItems.push({ type: "linkedin", data: post, date: new Date(post.created_at) });
    });
  }

  // Sort by date descending, take top 6
  feedItems.sort((a, b) => b.date.getTime() - a.date.getTime());
  const displayItems = feedItems.slice(0, 6);

  return (
    <section id="community" className="relative py-32 px-6">
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-sm tracking-[0.4em] uppercase text-primary font-body font-medium mb-4">
              News & Updates
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-wide">
              Latest News
            </h2>
          </ScrollReveal>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted/20 animate-pulse" />
            ))}
          </div>
        ) : displayItems.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-16">
              <GlassCard className="inline-block px-12 py-10" tilt={false}>
                <p className="font-display text-lg text-foreground mb-2">
                  Stay Tuned
                </p>
                <p className="text-sm text-muted-foreground font-body">
                  News and announcements coming soon.
                </p>
              </GlassCard>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item, i) => {
              if (item.type === "news") {
                return (
                  <Link to={`/news/${item.data.id}`} key={`news-${item.data.id}`}>
                    <motion.article
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <GlassCard className="overflow-hidden h-full flex flex-col hover:border-primary/30 transition-colors" tilt={false}>
                        {item.data.cover_image_url && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={item.data.cover_image_url}
                              alt={item.data.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-6 flex flex-col flex-1">
                          <time className="text-xs tracking-[0.15em] uppercase text-muted-foreground/60 font-body mb-3">
                            {formatDate(item.data.created_at)}
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
                    </motion.article>
                  </Link>
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
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
      </div>
    </section>
  );
};

export default CommunitySection;
