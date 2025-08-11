import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { HeroSlidesManager } from "@/components/admin/HeroSlidesManager";
import { InstagramReelsManager } from "@/components/admin/InstagramReelsManager";
import { BatchDateManager } from "@/components/admin/BatchDateManager";

const Admin = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setIsLoaded(true);
      }
    };
    checkUser();
  }, [navigate]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 md:pt-32">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid gap-8">
          <BatchDateManager />
          <HeroSlidesManager />
          <InstagramReelsManager />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;