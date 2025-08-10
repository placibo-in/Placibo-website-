"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenTool, Code, Server, Database, BrainCircuit } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const programs = [
  {
    icon: <PenTool className="h-8 w-8 text-blue-600" />,
    title: "UI/UX Design",
    duration: "4 Months",
    description: "Dive into the world of design thinking, wireframing, prototyping, and user research to craft seamless digital experiences.",
  },
  {
    icon: <Code className="h-8 w-8 text-blue-600" />,
    title: "Frontend Development",
    duration: "4 Months",
    description: "Master HTML, CSS, JavaScript, and frameworks like React to build engaging and responsive user interfaces.",
  },
  {
    icon: <Server className="h-8 w-8 text-blue-600" />,
    title: "Backend Development with Node.js",
    duration: "4 Months",
    description: "Learn scalable backend development using Node.js, Express, RESTful APIs, and databases like MongoDB.",
  },
  {
    icon: <Database className="h-8 w-8 text-blue-600" />,
    title: "Backend Development with Django",
    duration: "4 Months",
    description: "Build robust backend systems using Python, Django, REST Framework, and PostgreSQL.",
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-blue-600" />,
    title: "Generative AI (GenAI)",
    duration: "5 Months",
    description: "Step into the AI revolution with hands-on experience in building applications using Large Language Models (LLMs), Python, LangChain, and prompt engineering.",
  },
];

export const AboutSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      ref={ref}
      className={cn(
        "py-12 md:py-20 bg-gray-50 transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">About the Course</h2>
          <p className="mt-3 max-w-xl mx-auto text-base md:text-lg text-gray-600">
            We offer a range of programs designed to help you achieve your career goals.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program) => (
            <Card key={program.title} className="flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex-row items-start gap-4">
                <div className="bg-blue-100 rounded-full p-3 w-fit">
                  {program.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg md:text-xl">{program.title}</CardTitle>
                  <Badge variant="secondary" className="mt-2 text-xs md:text-sm">{program.duration}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 text-sm md:text-base">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};