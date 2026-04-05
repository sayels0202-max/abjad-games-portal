import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, LogOut, ArrowLeft } from "lucide-react";
import LinkedInEmbed from "@/components/LinkedInEmbed";

interface LinkedInPost {
  id: string;
  post_url: string;
  text: string | null;
  image_url: string | null;
  author_name: string | null;
  likes_count: number | null;
  caption: string | null;
  published: boolean;
  created_at: string;
}

const AdminLinkedInPage = () => {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<LinkedInPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin"); return; }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) { navigate("/admin"); return; }
      fetchPosts();
    };
    check();
  }, [navigate]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("linkedin_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPosts((data as LinkedInPost[]) || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    const { id, created_at, ...rest } = editing as any;

    const payload = { post_url: rest.post_url, text: rest.text, image_url: rest.image_url, author_name: rest.author_name, likes_count: rest.likes_count, caption: rest.caption, published: rest.published };

    if (isNew) {
      const { error } = await supabase.from("linkedin_posts").insert(payload);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Created", description: "LinkedIn post added." });
    } else {
      const { error } = await supabase.from("linkedin_posts").update(payload).eq("id", id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Updated", description: "LinkedIn post updated." });
    }
    setEditing(null);
    setIsNew(false);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this LinkedIn post?")) return;
    const { error } = await supabase.from("linkedin_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted", description: "Post removed." });
    fetchPosts();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const startNew = () => {
    setEditing({
      id: "",
      post_url: "",
      text: "",
      image_url: "",
      author_name: "Abjad Games",
      likes_count: 0,
      caption: "",
      published: true,
      created_at: "",
    });
    setIsNew(true);
  };

  if (editing) {
    return (
      <div className="min-h-screen bg-background px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-2xl font-bold text-foreground mb-8">
            {isNew ? "Add LinkedIn Post" : "Edit LinkedIn Post"}
          </h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1 block">
                LinkedIn Post URL
              </label>
              <Input
                value={editing.post_url}
                onChange={(e) => setEditing({ ...editing, post_url: e.target.value })}
                placeholder="https://www.linkedin.com/posts/..."
                dir="ltr"
              />
              <p className="text-xs text-muted-foreground/60 font-body mt-1">
                انسخ رابط المنشور من لينكدان (مثال: https://www.linkedin.com/posts/company_activity-123...)
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1 block">Post Text</label>
              <Textarea
                value={editing.text || ""}
                onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                placeholder="نص المنشور"
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1 block">Image URL (optional)</label>
              <Input
                value={editing.image_url || ""}
                onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                placeholder="https://..."
                dir="ltr"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1 block">Author Name</label>
              <Input
                value={editing.author_name || ""}
                onChange={(e) => setEditing({ ...editing, author_name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1 block">Likes Count</label>
              <Input
                type="number"
                value={editing.likes_count || 0}
                onChange={(e) => setEditing({ ...editing, likes_count: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1 block">Caption (optional)</label>
              <Input
                value={editing.caption || ""}
                onChange={(e) => setEditing({ ...editing, caption: e.target.value })}
                placeholder="وصف اختياري"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={editing.published}
                onCheckedChange={(v) => setEditing({ ...editing, published: v })}
              />
              <label className="text-sm text-foreground font-body">Published</label>
            </div>

            {editing.text && (
              <div className="mt-4">
                <label className="text-sm text-muted-foreground font-body mb-2 block">Preview</label>
                <LinkedInEmbed
                  postUrl={editing.post_url}
                  text={editing.text}
                  imageUrl={editing.image_url}
                  authorName={editing.author_name}
                  likesCount={editing.likes_count}
                />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/news")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="font-display text-2xl font-bold text-foreground">
              LinkedIn Posts
            </h1>
          </div>
          <div className="flex gap-3">
            <Button onClick={startNew} size="sm">
              <Plus className="w-4 h-4 mr-1" /> Add Post
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground font-body">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground font-body">No LinkedIn posts yet. Add your first one!</p>
        ) : (
          <div className="space-y-3">
            {posts.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-body text-sm text-foreground truncate" dir="ltr">
                      {item.post_url}
                    </p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-body ${
                        item.published
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  {item.caption && (
                    <p className="text-xs text-muted-foreground font-body mt-1">{item.caption}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setEditing(item); setIsNew(false); }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLinkedInPage;
