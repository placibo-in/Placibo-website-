"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { HeroSlideManager } from "@/components/admin/HeroSlideManager";
import { InstagramReelManager } from "@/components/admin/InstagramReelManager";
import { BatchDateManager } from "@/components/admin/BatchDateManager";
import { BlogManager } from "@/components/admin/BlogManager"; // Import the new component

// ... (rest of the imports)

const Admin = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/login');
      else setIsLoaded(true);
    };
    checkUser();
  }, [navigate]);

  if (!isLoaded) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 md:pt-32 space-y-12">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid gap-8">
          <BatchDateManager />
          <HeroSlideManager />
          <InstagramReelManager />
          <BlogManager />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;