import LinkedInLogo from "./ui/LinkedInLogo";
import GlassCard from "./ui/GlassCard";

interface LinkedInEmbedProps {
  postUrl: string;
  text?: string | null;
  imageUrl?: string | null;
  authorName?: string | null;
  likesCount?: number | null;
  caption?: string | null;
  createdAt?: string;
  embedHtml?: string | null;
}

// Safely extract a LinkedIn embed src from a stored iframe snippet
const extractLinkedInEmbedSrc = (html?: string | null): string | null => {
  if (!html) return null;
  const match = html.match(/src=["']([^"']+)["']/i);
  if (!match) return null;
  const src = match[1];
  if (!/^https:\/\/www\.linkedin\.com\/embed\//i.test(src)) return null;
  return src;
};

const LinkedInEmbed = ({
  postUrl,
  text,
  imageUrl,
  authorName,
  likesCount,
  createdAt,
  embedHtml,
}: LinkedInEmbedProps) => {
  // Build the LinkedIn post link from URN or URL
  const getPostLink = (url: string) => {
    if (url.startsWith("urn:li:")) {
      return `https://www.linkedin.com/feed/update/${url}`;
    }
    return url;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const embedSrc = extractLinkedInEmbedSrc(embedHtml);

  // If an official LinkedIn embed is provided, render only the iframe inside the GlassCard
  if (embedSrc) {
    return (
      <GlassCard className="overflow-hidden hover:border-primary/30 transition-colors p-0" tilt={false}>
        <iframe
          src={embedSrc}
          title="LinkedIn embedded post"
          className="w-full block bg-background"
          style={{ height: 668, border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </GlassCard>
    );
  }

  return (
    <a
      href={getPostLink(postUrl)}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <GlassCard className="overflow-hidden hover:border-primary/30 transition-colors" tilt={false}>
        {imageUrl && (
          <div className="relative aspect-video overflow-hidden">
            <img src={imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <LinkedInLogo className="w-4 h-4 text-primary/60" />
            {authorName && (
              <span className="text-xs text-muted-foreground/80 font-body font-medium">
                {authorName}
              </span>
            )}
            {createdAt && (
              <span className="text-xs text-muted-foreground/60 font-body">
                · {formatDate(createdAt)}
              </span>
            )}
          </div>
          {text && (
            <p className="text-sm text-foreground/90 font-body leading-relaxed whitespace-pre-line" dir="auto">
              {text}
            </p>
          )}
          {(likesCount != null && likesCount > 0) && (
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground/50 font-body">
              <span>👍 {likesCount}</span>
            </div>
          )}
        </div>
      </GlassCard>
    </a>
  );
};

export default LinkedInEmbed;
