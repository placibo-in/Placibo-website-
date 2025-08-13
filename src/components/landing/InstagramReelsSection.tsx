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
        "py-8 md:py-16 bg-gray-50 transition-all duration-700 ease-in-out"
      )}
    >
      <div className="container mx-auto px-2 sm:px-4 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">From Our Instagram</h2>
            <p className="mt-1 max-w-lg mx-auto text-sm sm:text-base md:text-lg text-gray-600">
              See what our students and community are up to.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center gap-3">
              <Skeleton className="w-[140px] aspect-[9/16] rounded-xl" />
              <Skeleton className="w-[140px] aspect-[9/16] rounded-xl hidden md:block" />
              <Skeleton className="w-[140px] aspect-[9/16] rounded-xl hidden lg:block" />
            </div>
          ) : reels.length > 0 ? (
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="relative"
            >
              <CarouselContent className="flex justify-center gap-3 px-0">
                {reels.map((reel) => (
                  <CarouselItem key={reel.id} className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[220px]">
                    <div className="aspect-[9/16] rounded-xl shadow-md overflow-hidden max-w-full max-h-[320px]">
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
      </div>
    </section>
  );
};