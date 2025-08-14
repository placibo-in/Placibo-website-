"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenTool, Code, Server, Database, BrainCircuit } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const iconMap = {
  PenTool: PenTool,
  Code: Code,
  Server: Server,
  Database: Database,
  BrainCircuit: BrainCircuit,
};

type Program = {
  id: string;
  title: string;
  duration: string;
  description: string;
  link: string;
  icon: keyof typeof iconMap;
};

export const AboutSection = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching programs:", error);
        setPrograms([]);
      } else if (data) {
        setPrograms(data);
      }
      setLoading(false);
    };

    fetchPrograms();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className={cn(
        "py-10 md:py-16 bg-white transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Our Programs in Chennai
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We offer a range of programs designed to help you achieve your career goals. Each program is crafted by industry experts to provide you with job-ready skills.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading programs...</p>
        ) : programs.length === 0 ? (
          <p className="text-center text-gray-500">No programs available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {programs.map((program) => {
              const IconComponent = iconMap[program.icon] || PenTool;
              return (
                <Link
                  to={program.link}
                  key={program.id}
                  className="block"
                  aria-label={`Go to ${program.title} course page`}
                >
                  <Card className="flex flex-col h-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardHeader className="flex-row items-start gap-3">
                      <div className="bg-blue-100 rounded-full p-3 w-fit">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg md:text-xl">{program.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1 text-xs md:text-sm">{program.duration}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-700 text-sm md:text-base">{program.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};