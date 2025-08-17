"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronLeft } from "lucide-react";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  published_at: string;
  excerpt: string;
  featured_image_url: string | null;
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      const { data } = await supabase
        .from("posts")
        .select("*, excerpt, featured_image_url")
        .eq("slug", slug)
        .single();
      
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  return (
    <>
      {post && (
        <Helmet>
          <title>{post.title} | Placibo Blog</title>
          <meta name="description" content={post.excerpt} />
          <link rel="canonical" href={`https://placibo.in/blog/${slug}`} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.excerpt} />
          <meta property="og:url" content={`https://placibo.in/blog/${slug}`} />
          <meta property="og:type" content="article" />
          {post.featured_image_url && <meta property="og:image" content={post.featured_image_url} />}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.excerpt} />
          {post.featured_image_url && <meta name="twitter:image" content={post.featured_image_url} />}
        </Helmet>
      )}
      <Header />
      <main className="bg-white text-gray-900 py-16 sm:py-24 pt-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to Blog
          </Link>
          {loading ? (
            <div>
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-8" />
              <Skeleton className="h-48 w-full" />
            </div>
          ) : post ? (
            <article>
              {post.featured_image_url && (
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-auto max-h-96 object-cover rounded-lg mb-8"
                />
              )}
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{post.title}</h1>
              <p className="text-gray-600 mb-8">
                By {post.author} on {new Date(post.published_at).toLocaleDateString()}
              </p>
              <div className="prose sm:prose-lg max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
              </div>
            </article>
          ) : (
            <p>Post not found.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPostPage;