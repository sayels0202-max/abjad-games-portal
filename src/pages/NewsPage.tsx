import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  cover_image_url: string | null;
  author_name: string | null;
  created_at: string;
}

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

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

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
        ) : !news || news.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-body">No news yet. Stay tuned!</p>
            <Link to="/" className="text-primary text-sm font-body hover:underline mt-4 inline-block">
              ← Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link to={`/news/${item.id}`}>
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
                        {item.author_name && ` · ${item.author_name}`}
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
                </Link>
              </motion.div>
            ))}
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
