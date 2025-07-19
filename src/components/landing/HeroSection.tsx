"use client";

import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Learn UX/UI & Front-End Online
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Placibo offers hands-on online courses to help you build real skills and land real jobs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
            <Button size="lg" variant="outline">Get Syllabus</Button>
          </div>
        </div>
      </div>
    </section>
  );
};