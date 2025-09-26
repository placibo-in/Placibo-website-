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

/**
 * ============================================================================
 * Hero Section Image Upload Recommendations
 * ============================================================================
 * For the best results across all devices, please use the following specs:
 *
 * 1.  **Dimensions:** 1920x1080 pixels (a 16:9 aspect ratio). This is crucial
 *     for the component to display the image correctly without cropping.
 * 2.  **File Size:** Keep images under 500KB to ensure fast loading times.
 *     You can use online tools like TinyPNG or Squoosh to compress them.
 * 3.  **Format:** Use WebP for the best balance of quality and size, or a
 *     highly optimized JPEG.
 * ============================================================================
 */

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
      <section className="relative w-full aspect-video max-h-[600px]">
        <Skeleton className="w-full h-full rounded-xl" />
      </section>
    );
  }

  if (!slides.length) {
    return (
      <section className="relative w-full aspect-video max-h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-center text-white p-4 rounded-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">Hero Section</h1>
        <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-md mx-auto">No slides have been configured yet. Please add slides in the admin dashboard.</p>
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
                {/* This container now uses 'aspect-video' to enforce a 16:9 ratio */}
                <div className="relative w-full aspect-video max-h-[750px] text-white rounded-xl overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    {/* The 'object-cover' class ensures the image fills the space without distortion */}
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

                  {/* This div centers the text and buttons, with responsive padding */}
                  <div className={cn(
                    "relative z-10 container mx-auto px-4 h-full flex flex-col items-center text-center transition-opacity duration-700",
                    hasText ? "justify-center opacity-100" : "justify-end pb-6 sm:pb-8 md:pb-12 opacity-90"
                  )}>
                    {hasText && (
                      <>
                        {slide.title && (
                          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg animate-fade-in">
                            {slide.title}
                          </h1>
                        )}
                        {slide.subtitle && (
                          <p className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg text-blue-300 max-w-2xl mx-auto drop-shadow-md animate-fade-in delay-200">
                            {slide.subtitle}
                          </p>
                        )}
                      </>
                    )}
                    
                    <div className={cn("flex flex-wrap justify-center gap-3 mt-4 sm:mt-6", hasText && "mt-6 sm:mt-8")}>
                      {slide.enroll_button_visible && (
                        <Button 
                          className="h-9 px-5 text-xs sm:text-sm md:h-10 md:px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50 transition-all transform hover:scale-105"
                          onClick={onOpen}
                        >
                          Enroll Now
                        </Button>
                      )}
                      {slide.syllabus_button_visible && (
                        <Button 
                          className="h-9 px-5 text-xs sm:text-sm md:h-10 md:px-6 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 shadow-lg transition-all"
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