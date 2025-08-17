"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  published_at: string;
  featured_image_url: string | null;
};

const BlogIndexPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, author, published_at, featured_image_url")
        .order("published_at", { ascending: false });

      if (data) {
        setPosts(data);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog | Placibo</title>
        <meta name="description" content="Read the latest articles and insights from the Placibo team on UI/UX design, development, and tech careers in Chennai." />
        <link rel="canonical" href="https://placibo.in/blog" />
        <meta property="og:title" content="Blog | Placibo" />
        <meta property="og:description" content="Read the latest articles and insights from the Placibo team on UI/UX design, development, and tech careers in Chennai." />
        <meta property="og:url" content="https://placibo.in/blog" />
        <meta property="og:image" content="https://placibo.in/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Placibo" />
        <meta name="twitter:description" content="Read the latest articles and insights from the Placibo team on UI/UX design, development, and tech careers in Chennai." />
        <meta name="twitter:image" content="https://placibo.in/logo.png" />
      </Helmet>
      <Header />
      <main className="bg-gray-50 text-gray-900 py-16 sm:py-24 pt-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Placibo Blog</h1>
            <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg text-gray-600">
              Insights, tutorials, and career advice from our team of experts.
            </p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="block group">
                  <Card className="h-full flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out border border-gray-200 overflow-hidden">
                    {post.featured_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                      <CardDescription className="mt-1">
                        By {post.author} on {new Date(post.published_at).toLocaleDateString()}
                      </CardDescription>
                      <CardContent className="p-0 mt-4 flex-grow">
                        <p className="text-gray-600">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="p-0 mt-4">
                        <div className="flex items-center font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardFooter>
                    </div>
                  </Card>
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