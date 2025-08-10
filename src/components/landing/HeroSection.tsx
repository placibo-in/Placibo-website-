"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const backgroundImages = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit=crop",
];

export const HeroSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { onOpen } = useEnrollmentDialog();

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden py-20 md:py-32 bg-gray-900 text-white transition-opacity duration-700 ease-in-out",
        inView ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Background Carousel, Blur, and Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
          opts={{
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="-ml-0">
            {backgroundImages.map((src, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="w-full h-full">
                  <img
                    src={src}
                    alt={`Background slide ${index + 1}`}
                    className="w-full h-full object-cover filter blur-sm"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-blue-800/80 to-indigo-900/90"></div>
      </div>

      {/* Content */}
      <div className={cn(
        "relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ease-out",
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
          Learn UX/UI & Front-End Online
        </h1>
        <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto drop-shadow-md">
          Placibo offers hands-on online courses to help you build real skills and land real jobs.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-200 shadow-xl transition-all transform hover:scale-105"
            onClick={onOpen}
          >
            Enroll Now
          </Button>
          <Button 
            size="lg" 
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 shadow-lg transition-all"
          >
            Get Syllabus
          </Button>
        </div>
      </div>
    </section>
  );
};