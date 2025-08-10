"use client";

import React from "react";
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

const slides = [
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    title: "Learn UX/UI & Front-End Online",
    subtitle: "Placibo offers hands-on online courses to help you build real skills and land real jobs.",
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    title: "Build a Job-Ready Portfolio",
    subtitle: "Create impressive projects from scratch and graduate with a portfolio that stands out.",
  },
  {
    image: "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit=crop",
    title: "Get Mentored by Industry Experts",
    subtitle: "Receive personalized guidance and feedback from professionals working at top companies.",
  },
];

export const HeroSection = () => {
  const { onOpen } = useEnrollmentDialog();

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
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[75vh] md:h-[90vh] max-h-[700px] text-white">
                {/* Background Image, Blur, and Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1} background`}
                    className="w-full h-full object-cover filter blur-sm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-blue-800/80 to-indigo-900/90"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg animate-fade-in-down">
                    {slide.title}
                  </h1>
                  <p className="mt-4 text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up">
                    {slide.subtitle}
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button 
                      className="h-10 px-6 text-base md:h-11 md:px-8 bg-white text-blue-600 hover:bg-gray-200 shadow-xl transition-all transform hover:scale-105"
                      onClick={onOpen}
                    >
                      Enroll Now
                    </Button>
                    <Button 
                      className="h-10 px-6 text-base md:h-11 md:px-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 shadow-lg transition-all"
                    >
                      Get Syllabus
                    </Button>
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