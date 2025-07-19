"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, FolderKanban, MessageSquare, Briefcase } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const benefits = [
  {
    icon: <Award className="h-8 w-8 text-blue-600" />,
    title: "Learn from Experts",
    description: "Our instructors are seasoned professionals with years of industry experience.",
  },
  {
    icon: <FolderKanban className="h-8 w-8 text-blue-600" />,
    title: "Project-Based Learning",
    description: "Build a portfolio of real-world projects that showcase your skills.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
    title: "Personalized Mentorship",
    description: "Get 1-on-1 guidance and feedback to accelerate your growth.",
  },
  {
    icon: <Briefcase className="h-8 w-8 text-blue-600" />,
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
        "py-16 md:py-24 bg-gray-50 transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Placibo?</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            We're invested in your success. Here's how we help you achieve your goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center p-6">
              <div className="bg-blue-100 rounded-full p-4 mb-4 sm:mb-0 sm:mr-6">
                {benefit.icon}
              </div>
              <div className="text-center sm:text-left">
                <CardTitle>{benefit.title}</CardTitle>
                <CardContent className="p-0 mt-2">
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};