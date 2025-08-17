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
};

const BlogIndexPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, author, published_at")
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
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="block group">
                  <Card className="h-full flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                      <CardDescription>
                        By {post.author} on {new Date(post.published_at).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-600">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardFooter>
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