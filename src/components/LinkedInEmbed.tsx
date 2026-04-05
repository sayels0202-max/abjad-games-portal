import { useEffect, useRef } from "react";

interface LinkedInEmbedProps {
  postUrl: string;
  caption?: string | null;
}

const LinkedInEmbed = ({ postUrl, caption }: LinkedInEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load LinkedIn embed script if not already loaded
    const existingScript = document.querySelector('script[src="https://platform.linkedin.com/badges/js/profile.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://platform.linkedin.com/in.js";
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);
    }

    // Re-process embeds when component mounts
    if ((window as any).IN?.parse) {
      (window as any).IN.parse(containerRef.current);
    }
  }, [postUrl]);

  // Extract post embed URL for iframe approach (more reliable)
  const getEmbedUrl = (url: string) => {
    // LinkedIn embed URL format
    return `https://www.linkedin.com/embed/feed/update/${extractUrn(url)}`;
  };

  const extractUrn = (url: string) => {
    // Try to extract activity ID from URL like:
    // https://www.linkedin.com/posts/company_activity-1234567890-xxxx
    // https://www.linkedin.com/feed/update/urn:li:activity:1234567890
    const activityMatch = url.match(/activity[:-](\d+)/);
    if (activityMatch) {
      return `urn:li:activity:${activityMatch[1]}`;
    }
    // Try share format
    const shareMatch = url.match(/urn:li:share:(\d+)/);
    if (shareMatch) {
      return `urn:li:share:${shareMatch[1]}`;
    }
    // Try ugcPost format
    const ugcMatch = url.match(/urn:li:ugcPost:(\d+)/);
    if (ugcMatch) {
      return `urn:li:ugcPost:${ugcMatch[1]}`;
    }
    // Fallback: return URL as-is and let LinkedIn handle it
    return url;
  };

  return (
    <div ref={containerRef} className="w-full">
      <iframe
        src={getEmbedUrl(postUrl)}
        width="100%"
        height="400"
        frameBorder="0"
        allowFullScreen
        title={caption || "LinkedIn Post"}
        className="rounded-xl border border-border bg-card"
        style={{ minHeight: "300px", maxHeight: "500px" }}
      />
      {caption && (
        <p className="text-xs text-muted-foreground font-body mt-2 text-center">{caption}</p>
      )}
    </div>
  );
};

export default LinkedInEmbed;
