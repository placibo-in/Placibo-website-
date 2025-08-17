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
        .select("*")
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
          <meta name="description" content={`Read the article "${post.title}" on the Placibo blog.`} />
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
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{post.title}</h1>
              <p className="text-gray-600 mb-8">
                By {post.author} on {new Date(post.published_at).toLocaleDateString()}
              </p>
              <div className="prose prose-lg max-w-none">
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