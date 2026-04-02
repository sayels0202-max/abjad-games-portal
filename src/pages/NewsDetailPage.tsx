import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ["news-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!article || error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="font-display text-2xl text-foreground">Article Not Found</h1>
        <Link to="/news" className="text-primary text-sm font-body hover:underline">
          ← Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-body mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>

          {article.cover_image_url && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <time className="text-xs tracking-[0.15em] uppercase text-muted-foreground/60 font-body">
            {formatDate(article.created_at)}
            {article.author_name && ` · ${article.author_name}`}
          </time>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
            {article.title}
          </h1>

          {article.summary && (
            <p className="text-lg text-muted-foreground font-body mb-8 leading-relaxed">
              {article.summary}
            </p>
          )}

          {article.content && (
            <div className="prose prose-invert max-w-none font-body text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
