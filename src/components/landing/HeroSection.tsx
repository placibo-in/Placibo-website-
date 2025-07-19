"use client";

import { Button } from "@/components/ui/button";
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

export const HeroSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden py-20 md:py-32 bg-gray-900 text-white transition-opacity duration-700 ease-in-out",
        inView ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Background Image, Blur, and Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
          alt="Background of people collaborating"
          className="w-full h-full object-cover filter blur-sm"
        />
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
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 shadow-lg transition-all"
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