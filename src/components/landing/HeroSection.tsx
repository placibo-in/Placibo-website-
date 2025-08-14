"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
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
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] max-h-[600px]">
        <Skeleton className="w-full h-full" />
      </section>
    );
  }

  if (!slides.length) {
    return (
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] max-h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">Hero Section</h1>
        <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-md mx-auto">No slides have been configured yet. Please add slides in the admin dashboard.</p>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden shadow-lg">
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
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => {
            const hasText = slide.title || slide.subtitle;
            const hasButtons = slide.enroll_button_visible || slide.syllabus_button_visible;

            return (
              <CarouselItem key={slide.id}>
                <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] max-h-[600px] text-white overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img
                      src={slide.image_url}
                      alt={slide.title || "Hero slide"}
                      className="w-full h-full object-cover"
                    />
                    <div className={cn(
                      "absolute inset-0 transition-colors duration-700",
                      hasText ? "bg-gradient-to-b from-black/60 via-black/40 to-black/60" : hasButtons ? "bg-black/20" : "bg-transparent"
                    )}></div>
                  </div>

                  <div className={cn(
                    "relative z-10 container mx-auto px-4 h-full flex flex-col items-center text-center transition-opacity duration-700",
                    hasText ? "justify-center" : "justify-end pb-8 sm:pb-12"
                  )}>
                    {hasText && (
                      <>
                        {slide.title && (
                          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg animate-fade-in">
                            {slide.title}
                          </h1>
                        )}
                        {slide.subtitle && (
                          <p className="mt-2 text-sm sm:text-base md:text-lg text-blue-200 max-w-2xl mx-auto drop-shadow-md animate-fade-in delay-200">
                            {slide.subtitle}
                          </p>
                        )}
                      </>
                    )}
                    
                    <div className={cn("flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 sm:mt-8", !hasText && "mt-0")}>
                      {slide.enroll_button_visible && (
                        <Button 
                          className="h-10 px-5 text-sm sm:text-base md:h-11 md:px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50 transition-all transform hover:scale-105 w-full sm:w-auto"
                          onClick={onOpen}
                        >
                          Enroll Now
                        </Button>
                      )}
                      {slide.syllabus_button_visible && (
                        <Button 
                          className="h-10 px-5 text-sm sm:text-base md:h-11 md:px-6 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 shadow-lg transition-all w-full sm:w-auto"
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
      </Carousel>
    </section>
  );
};