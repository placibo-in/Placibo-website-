"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Trash2, Edit, PlusCircle } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  excerpt: string;
  published_at: string;
};

const postSchema = z.object({
  title: z.string().min(3, "Title is required."),
  slug: z.string().min(3, "Slug is required.").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  author: z.string().min(2, "Author is required."),
  excerpt: z.string().min(10, "Excerpt is required."),
  content: z.string().min(20, "Content is required."),
});

type PostFormValues = z.infer<typeof postSchema>;

export const BlogManager = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: "", slug: "", author: "Placibo Team", excerpt: "", content: "" },
  });

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from("posts").select("*").order("published_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onSubmit = async (values: PostFormValues) => {
    const payload = { ...values, published_at: new Date().toISOString() };
    
    const promise = editingPost
      ? supabase.from("posts").update(payload).eq("id", editingPost.id)
      : supabase.from("posts").insert([payload]);

    const { error } = await promise;

    if (error) {
      toast.error(`Failed to save post: ${error.message}`);
    } else {
      toast.success(`Post ${editingPost ? 'updated' : 'created'} successfully!`);
      form.reset();
      setEditingPost(null);
      fetchPosts();
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    form.reset(post);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) toast.error("Failed to delete post.");
    else {
      toast.success("Post deleted.");
      if (editingPost?.id === id) {
        setEditingPost(null);
        form.reset();
      }
      fetchPosts();
    }
  };

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{editingPost ? "Edit Post" : "Create New Post"}</CardTitle>
          <CardDescription>Manage your blog articles here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="slug" render={({ field }) => (<FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="author" render={({ field }) => (<FormItem><FormLabel>Author</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="excerpt" render={({ field }) => (<FormItem><FormLabel>Excerpt</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="content" render={({ field }) => (<FormItem><FormLabel>Content (Markdown)</FormLabel><FormControl><Textarea {...field} rows={10} /></FormControl><FormMessage /></FormItem>)} />
              <div className="flex gap-4">
                <Button type="submit">{editingPost ? "Update Post" : "Create Post"}</Button>
                {editingPost && <Button variant="outline" type="button" onClick={() => { setEditingPost(null); form.reset(); }}>Cancel</Button>}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Existing Posts</h3>
        {loading ? <p>Loading posts...</p> : (
          <div className="space-y-4">
            {posts.map(post => (
              <Card key={post.id} className="flex justify-between items-center p-4">
                <p className="font-semibold">{post.title}</p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};