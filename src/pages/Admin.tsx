import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { HeroSlideManager } from "@/components/admin/HeroSlideManager";
import { InstagramReelManager } from "@/components/admin/InstagramReelManager";
import { Separator } from "@/components/ui/separator";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-700">Welcome, {user.email}</p>
          </div>
          <Button onClick={handleLogout} variant="destructive">Logout</Button>
        </div>
        <HeroSlideManager />
        <Separator className="my-8" />
        <InstagramReelManager />
      </div>
    </div>
  );
};

export default Admin;