"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

type Reel = {
  id: string;
  reel_url: string;
};

export const InstagramReelsSection = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReels = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("instagram_reels")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) {
        setReels(data);
      }
      setLoading(false);
    };

    fetchReels();
  }, []);

  return (
    <section
      id="reels"
      className={cn(
        "py-10 md:py-16 bg-gray-50 transition-all duration-700 ease-in-out"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">From Our Instagram</h2>
          <p className="mt-2 max-w-xl mx-auto text-base md:text-lg text-gray-600">
            See what our students and community are up to.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center gap-4">
            <Skeleton className="w-[180px] aspect-[9/16] rounded-xl" />
            <Skeleton className="w-[180px] aspect-[9/16] rounded-xl hidden md:block" />
            <Skeleton className="w-[180px] aspect-[9/16] rounded-xl hidden lg:block" />
          </div>
        ) : reels.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto relative"
          >
            <CarouselContent className="flex gap-4 -ml-4">
              {reels.map((reel) => (
                <CarouselItem key={reel.id} className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[280px] lg:w-[320px]">
                  <div className="aspect-[9/16] rounded-xl shadow-md overflow-hidden">
                    <iframe
                      src={reel.reel_url}
                      className="w-full h-full"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      title={`Instagram Reel ${reel.id}`}
                      frameBorder="0"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" />
          </Carousel>
        ) : (
          <div className="text-center text-gray-500">
            <p>No Instagram reels have been added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};