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
        "py-20 md:py-32 bg-white transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto text-center px-4">
        <div className="max-w-3xl mx-auto relative">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 relative">
            <span className="relative z-10">Learn UX/UI & Front-End Online</span>
            <span 
              className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg -m-2"
              aria-hidden="true"
            ></span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 relative">
            <span className="relative z-10">Placibo offers hands-on online courses to help you build real skills and land real jobs.</span>
            <span 
              className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-lg -m-1"
              aria-hidden="true"
            ></span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 relative z-10">Enroll Now</Button>
            <Button size="lg" variant="outline" className="relative z-10">Get Syllabus</Button>
          </div>
        </div>
      </div>
    </section>
  );
};