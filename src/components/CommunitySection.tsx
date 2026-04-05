import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GlassCard from "./ui/GlassCard";
import ScrollReveal from "./ui/ScrollReveal";
import XLogo from "./ui/XLogo";
import { Play } from "lucide-react";
import { Tweet, TweetsResponse, buildMediaMap, getTweetMedia, cleanTweetText } from "@/lib/tweets";
import LinkedInEmbed from "./LinkedInEmbed";

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  cover_image_url: string | null;
  created_at: string;
}

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
        .limit(3);
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
        ) : !news || news.length === 0 ? (
          tweets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tweets.slice(0, 3).map((tweet, i) => {
                const media = getTweetMedia(tweet, mediaMap);
                const mediaUrl = media?.url || media?.preview_image_url;
                return (
                  <motion.a
                    key={tweet.id}
                    href={`https://x.com/AbjadGames/status/${tweet.id}`}
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
                          <img
                            src={mediaUrl}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
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
                            {formatDate(tweet.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/90 font-body leading-relaxed whitespace-pre-line" dir="auto">
                          {cleanTweetText(tweet.text)}
                        </p>
                        {tweet.public_metrics && (
                          <div className="flex gap-4 mt-3 text-xs text-muted-foreground/50 font-body">
                            <span>❤️ {tweet.public_metrics.like_count}</span>
                            <span>🔁 {tweet.public_metrics.retweet_count}</span>
                          </div>
                        )}
                      </div>
                    </GlassCard>
                  </motion.a>
                );
              })}
            </div>
          ) : (
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
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <Link to={`/news/${item.id}`} key={item.id}>
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <GlassCard className="overflow-hidden h-full flex flex-col hover:border-primary/30 transition-colors" tilt={false}>
                    {item.cover_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={item.cover_image_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <time className="text-xs tracking-[0.15em] uppercase text-muted-foreground/60 font-body mb-3">
                        {formatDate(item.created_at)}
                      </time>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      {item.summary && (
                        <p className="text-sm text-muted-foreground font-body line-clamp-3 flex-1">
                          {item.summary}
                        </p>
                      )}
                    </div>
                  </GlassCard>
                </motion.article>
              </Link>
            ))}
          </div>
        )}

        {/* LinkedIn Posts */}
        {linkedinPosts && linkedinPosts.length > 0 && (
          <div className="mt-16">
            <ScrollReveal>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wide text-center mb-8">
                LinkedIn
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {linkedinPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <LinkedInEmbed postUrl={post.post_url} caption={post.caption} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunitySection;
