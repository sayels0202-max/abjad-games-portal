import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  cover_image_url: string | null;
  published: boolean;
  author_name: string | null;
  created_at: string;
}

const AdminNewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auth guard
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
      fetchNews();
    };
    check();
  }, [navigate]);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setNews(data || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    const { id, created_at, ...rest } = editing;

    if (isNew) {
      const { error } = await supabase.from("news").insert(rest);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Created", description: "News article created." });
    } else {
      const { error } = await supabase.from("news").update(rest).eq("id", id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Updated", description: "News article updated." });
    }
    setEditing(null);
    setIsNew(false);
    fetchNews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted", description: "Article deleted." });
    fetchNews();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const startNew = () => {
    setEditing({
      id: "",
      title: "",
      summary: "",
      content: "",
      cover_image_url: "",
      published: false,
      author_name: "",
      created_at: "",
    });
    setIsNew(true);
  };

  if (editing) {
    return (
      <div className="min-h-screen bg-background px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-2xl font-bold text-foreground mb-8">
            {isNew ? "New Article" : "Edit Article"}
          </h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1 block">Title</label>
              <Input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
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
              <label className="text-sm text-muted-foreground font-body mb-1 block">Summary</label>
              <Textarea
                value={editing.summary || ""}
                onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1 block">Content</label>
              <Textarea
                value={editing.content || ""}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                rows={8}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1 block">Cover Image URL</label>
              <Input
                value={editing.cover_image_url || ""}
                onChange={(e) => setEditing({ ...editing, cover_image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={editing.published}
                onCheckedChange={(v) => setEditing({ ...editing, published: v })}
              />
              <label className="text-sm text-foreground font-body">Published</label>
            </div>
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
          <h1 className="font-display text-2xl font-bold text-foreground">
            News Management
          </h1>
          <div className="flex gap-3">
            <Button onClick={startNew} size="sm">
              <Plus className="w-4 h-4 mr-1" /> New Article
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/admin/linkedin")}>
              LinkedIn Posts
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground font-body">Loading...</p>
        ) : news.length === 0 ? (
          <p className="text-muted-foreground font-body">No articles yet. Create your first one!</p>
        ) : (
          <div className="space-y-3">
            {news.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-semibold text-foreground truncate">
                      {item.title}
                    </h3>
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
                  <p className="text-xs text-muted-foreground font-body mt-1">
                    {new Date(item.created_at).toLocaleDateString("en-US")}
                    {item.author_name && ` · ${item.author_name}`}
                  </p>
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

export default AdminNewsPage;
