"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Skeleton } from "@/components/ui/skeleton";

type PostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  author: string | null;
  published_at: string;
  featured_image_url: string | null;
};

const BlogIndexPage = () => {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, slug, title, excerpt, author, published_at, featured_image_url")
        .order("published_at", { ascending: false });

      if (error) console.error("Error fetching posts:", error.message);
      setPosts((data as PostSummary[]) ?? []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>CyberSecurity Blog | Placibo</title>
        <meta
          name="description"
          content="Guides, certification advice and career tips for anyone starting or growing in cybersecurity."
        />
        <link rel="canonical" href="https://www.placibo.in/blog" />
      </Helmet>
      <Header />
      <main className="bg-white text-gray-900 py-16 sm:py-24 pt-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold">Placibo CyberSecurity Blog</h1>
            <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg text-gray-600">
              Guides, certification advice and career tips for anyone starting or growing in CyberSecurity.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-72 w-full rounded-lg" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {post.featured_image_url && (
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      loading="lazy"
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-semibold group-hover:text-blue-600">{post.title}</h2>
                    {post.excerpt && <p className="mt-2 flex-1 text-sm text-gray-600">{post.excerpt}</p>}
                    <p className="mt-4 text-xs text-gray-500">
                      {post.author ? `By ${post.author} on ` : ""}
                      {new Date(post.published_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogIndexPage;