"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Video, Users } from "lucide-react";

const features = [
  {
    icon: <Clock className="h-8 w-8 text-blue-600" />,
    title: "1-Month Course",
    description: "Intensive online live and recorded sessions to fit your schedule.",
  },
  {
    icon: <Video className="h-8 w-8 text-blue-600" />,
    title: "Comprehensive Curriculum",
    description: "Covers Figma, UX process, UI design, HTML, CSS, and JavaScript basics.",
  },
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Taught by Professionals",
    description: "Learn directly from experts who are active in the design industry.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About the Course</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            Everything you need to become a job-ready designer and developer.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};