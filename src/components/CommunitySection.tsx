import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GlassCard from "./ui/GlassCard";
import ScrollReveal from "./ui/ScrollReveal";

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
      </div>
    </section>
  );
};

export default CommunitySection;
