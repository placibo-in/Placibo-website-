"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { supabase } from "@/integrations/supabase/client";
import type { Slide } from "@/components/admin/HeroSlideManager";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  const { onOpen } = useEnrollmentDialog();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .order("slide_order", { ascending: true });
      
      if (data) {
        setSlides(data as Slide[]);
      }
      setLoading(false);
    };

    fetchSlides();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full h-[75vh] md:h-[90vh] max-h-[700px]">
        <Skeleton className="w-full h-full rounded-xl" />
      </section>
    );
  }

  if (!slides.length) {
    return (
      <section className="relative w-full h-[75vh] md:h-[90vh] max-h-[700px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-center text-white p-4 rounded-xl">
        <h1 className="text-4xl font-extrabold tracking-wide">Hero Section</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-lg">No slides have been configured yet. Please add slides in the admin dashboard.</p>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden rounded-xl shadow-2xl">
      <Carousel
        plugins={[
          Autoplay({
            delay: 6000,
            stopOnInteraction: true,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="w-full rounded-xl"
      >
        <CarouselContent>
          {slides.map((slide) => {
            const hasText = slide.title || slide.subtitle;
            const hasButtons = slide.enroll_button_visible || slide.syllabus_button_visible;

            return (
              <CarouselItem key={slide.id}>
                <div className="relative w-full h-[75vh] md:h-[90vh] max-h-[700px] text-white rounded-xl overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img
                      src={slide.image_url}
                      alt={slide.title || "Hero slide"}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-700 ease-in-out scale-100 hover:scale-105",
                        hasText && "blur-sm"
                      )}
                    />
                    <div className={cn(
                      "absolute inset-0 transition-colors duration-700",
                      hasText ? "bg-gradient-to-b from-black/70 via-black/50 to-black/70" : hasButtons ? "bg-black/30" : "bg-transparent"
                    )}></div>
                  </div>

                  <div className={cn(
                    "relative z-10 container mx-auto px-4 h-full flex flex-col items-center text-center transition-opacity duration-700",
                    hasText ? "justify-center opacity-100" : "justify-end pb-16 md:pb-24 opacity-90"
                  )}>
                    {hasText && (
                      <>
                        {slide.title && (
                          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg animate-fade-in">
                            {slide.title}
                          </h1>
                        )}
                        {slide.subtitle && (
                          <p className="mt-6 text-xl sm:text-2xl lg:text-3xl text-blue-300 max-w-3xl mx-auto drop-shadow-md animate-fade-in delay-200">
                            {slide.subtitle}
                          </p>
                        )}
                      </>
                    )}
                    
                    <div className={cn("flex flex-wrap justify-center gap-6 mt-10", hasText && "mt-12")}>
                      {slide.enroll_button_visible && (
                        <Button 
                          className="h-12 px-8 text-lg md:h-14 md:px-10 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50 transition-all transform hover:scale-110"
                          onClick={onOpen}
                        >
                          Enroll Now
                        </Button>
                      )}
                      {slide.syllabus_button_visible && (
                        <Button 
                          className="h-12 px-8 text-lg md:h-14 md:px-10 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 shadow-lg transition-all"
                        >
                          Get Syllabus
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex text-white hover:text-blue-400 transition-colors cursor-pointer" />
        <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex text-white hover:text-blue-400 transition-colors cursor-pointer" />
      </Carousel>
    </section>
  );
};