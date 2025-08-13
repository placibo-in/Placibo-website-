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
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">From Our Instagram</h2>
          <p className="mt-1 max-w-lg mx-auto text-sm sm:text-base md:text-lg text-gray-600">
            See what our students and community are up to.
          </p>
        </div>
        
        <div className="flex justify-center">
          {loading ? (
            <div className="flex justify-center gap-4">
              <Skeleton className="w-40 h-72 rounded-xl" />
              <Skeleton className="w-40 h-72 rounded-xl hidden sm:block" />
              <Skeleton className="w-40 h-72 rounded-xl hidden md:block" />
            </div>
          ) : reels.length > 0 ? (
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl"
            >
              <CarouselContent className="-ml-4">
                {reels.map((reel) => (
                  <CarouselItem key={reel.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4">
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
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
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