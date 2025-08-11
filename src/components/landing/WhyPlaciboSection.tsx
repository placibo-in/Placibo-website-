"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, FolderKanban, MessageSquare, Briefcase } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const benefits = [
  {
    icon: <Award className="h-6 w-6 text-blue-600" />,
    title: "Learn from Experts",
    description: "Our instructors are seasoned professionals with years of industry experience.",
  },
  {
    icon: <FolderKanban className="h-6 w-6 text-blue-600" />,
    title: "Project-Based Learning",
    description: "Build a portfolio of real-world projects that showcase your skills.",
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
    title: "Personalized Mentorship",
    description: "Get 1-on-1 guidance and feedback to accelerate your growth.",
  },
  {
    icon: <Briefcase className="h-6 w-6 text-blue-600" />,
    title: "Job-Ready Portfolio",
    description: "Graduate with a polished portfolio to impress potential employers.",
  },
];

export const WhyPlaciboSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="why"
      ref={ref}
      className={cn(
        "py-10 md:py-16 bg-gray-50 transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Placibo?</h2>
          <p className="mt-2 max-w-xl mx-auto text-base md:text-lg text-gray-600">
            We're invested in your success. Here's how we help you achieve your goals.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col sm:flex-row items-center p-4 sm:p-5">
              <div className="bg-blue-100 rounded-full p-2.5 mb-3 sm:mb-0 sm:mr-4">
                {benefit.icon}
              </div>
              <div className="text-center sm:text-left">
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
                <CardContent className="p-0 mt-1">
                  <p className="text-gray-600 text-sm md:text-base">{benefit.description}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};