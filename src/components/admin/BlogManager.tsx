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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { toast } from "sonner";
import { Trash2, Edit } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  excerpt: string;
  published_at: string;
  featured_image_url: string | null;
};

const postSchema = z.object({
  title: z.string().min(3, "Title is required."),
  slug: z.string().min(3, "Slug is required.").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  author: z.string().min(2, "Author is required."),
  excerpt: z.string().min(10, "Excerpt is required."),
  content: z.string().min(20, "Content is required."),
  image: z.any().optional(),
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
    let featuredImageUrl = editingPost?.featured_image_url || null;

    if (values.image && values.image.length > 0) {
      const file = values.image[0] as File;
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("hero_images")
        .upload(`blog_images/${fileName}`, file);

      if (uploadError) {
        toast.error(`Image upload failed: ${uploadError.message}`);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("hero_images")
        .getPublicUrl(`blog_images/${fileName}`);
      featuredImageUrl = urlData.publicUrl;
    }

    const payload = {
      title: values.title,
      slug: values.slug,
      author: values.author,
      excerpt: values.excerpt,
      content: values.content,
      published_at: new Date().toISOString(),
      featured_image_url: featuredImageUrl,
    };
    
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
              <FormField control={form.control} name="image" render={({ field: { onChange, ...props } }) => (<FormItem><FormLabel>Featured Image</FormLabel><FormControl><Input type="file" accept="image/*" onChange={e => onChange(e.target.files)} {...props} /></FormControl><FormDescription>Optional. Recommended size: 1200x630 pixels.</FormDescription><FormMessage /></FormItem>)} />
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
                <div className="flex items-center gap-4">
                  {post.featured_image_url && <img src={post.featured_image_url} alt={post.title} className="h-12 w-20 object-cover rounded-md" />}
                  <p className="font-semibold">{post.title}</p>
                </div>
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