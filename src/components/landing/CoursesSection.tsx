"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { CourseCards } from "@/components/courses/CourseCards";

export const CoursesSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section
      id="courses"
      ref={ref}
      className={cn(
        "py-10 md:py-16 bg-white transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">Our Courses</h2>
          <p className="mt-4 text-lg text-gray-600">
            Structured, practical learning paths. Pick a course and build skills and a portfolio step by step.
          </p>
        </div>
        <CourseCards />
      </div>
    </section>
  );
};
