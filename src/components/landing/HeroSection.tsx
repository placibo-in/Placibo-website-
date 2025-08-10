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
        setSlides(data);
      }
      setLoading(false);
    };

    fetchSlides();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full h-[75vh] md:h-[90vh] max-h-[700px]">
        <Skeleton className="w-full h-full" />
      </section>
    );
  }

  if (!slides.length) {
    return (
      <section className="relative w-full h-[75vh] md:h-[90vh] max-h-[700px] bg-gray-900 flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-4xl font-bold">Hero Section</h1>
        <p className="mt-4 text-lg text-gray-300">No slides have been configured yet. Please add slides in the admin dashboard.</p>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-gray-900">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-[75vh] md:h-[90vh] max-h-[700px] text-white">
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.image_url}
                    alt={slide.title}
                    className="w-full h-full object-cover filter blur-sm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-blue-800/80 to-indigo-900/90"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg animate-fade-in-down">
                    {slide.title}
                  </h1>
                  <p className="mt-4 text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up">
                    {slide.subtitle}
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {slide.enroll_button_visible && (
                      <Button 
                        className="h-10 px-6 text-base md:h-11 md:px-8 bg-white text-blue-600 hover:bg-gray-200 shadow-xl transition-all transform hover:scale-105"
                        onClick={onOpen}
                      >
                        Enroll Now
                      </Button>
                    )}
                    {slide.syllabus_button_visible && (
                      <Button 
                        className="h-10 px-6 text-base md:h-11 md:px-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 shadow-lg transition-all"
                      >
                        Get Syllabus
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
      </Carousel>
    </section>
  );
};