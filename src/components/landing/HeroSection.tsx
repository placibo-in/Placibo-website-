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
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Learn UX/UI & Front-End Online
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Placibo offers hands-on online courses to help you build real skills and land real jobs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
            <Button size="lg" variant="outline">Get Syllabus</Button>
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
            alt="People collaborating on a project"
            className="rounded-lg shadow-xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};