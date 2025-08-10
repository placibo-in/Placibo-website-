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
            <Skeleton className="w-[200px] h-[320px] rounded-xl" />
            <Skeleton className="w-[200px] h-[320px] rounded-xl hidden md:block" />
            <Skeleton className="w-[200px] h-[320px] rounded-xl hidden lg:block" />
          </div>
        ) : reels.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto relative"
          >
            <CarouselContent className="-ml-4">
              {reels.map((reel) => (
                <CarouselItem key={reel.id} className="pl-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <iframe
                      src={reel.reel_url}
                      className="w-full h-[320px] rounded-xl shadow-md"
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