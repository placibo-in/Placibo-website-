"use client";

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CourseLayout from "@/components/courses/CourseLayout";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";
import { EnrollmentDialog } from "@/components/landing/EnrollmentDialog";

const UIUXDesign = () => {
  const { onOpen } = useEnrollmentDialog();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = {
    name: "UI/UX Design Course in Chennai",
    description:
      "Dive into the world of design thinking, wireframing, prototyping, and user research to craft seamless digital experiences that users love.",
    duration: "4 Months",
    highlights: [
      "Build a job-ready portfolio with 3 real-world projects.",
      "1-on-1 mentorship from industry experts.",
      "Master Figma, Adobe XD, and other essential design tools.",
      "Comprehensive job assistance and interview preparation.",
    ],
    syllabus: [
      {
        title: "Module 1: Foundations of UX Design",
        content: "Understand the core principles of User Experience, design thinking methodologies, and how to conduct effective user research. Learn to create user personas and journey maps.",
      },
      {
        title: "Module 2: Wireframing and Prototyping",
        content: "From low-fidelity sketches to high-fidelity interactive prototypes. Master tools like Figma and Adobe XD to bring your ideas to life and test them with users.",
      },
      {
        title: "Module 3: Visual Design and UI Principles",
        content: "Dive into the principles of User Interface design. Learn about color theory, typography, layout, and creating a consistent design system for your projects.",
      },
      {
        title: "Module 4: Usability Testing and Feedback",
        content: "Learn how to plan and conduct usability tests, gather valuable feedback, and iterate on your designs to create user-centered products.",
      },
      {
        title: "Module 5: Portfolio and Career Prep",
        content: "Build a compelling portfolio that showcases your skills. Get ready for the job market with resume workshops, mock interviews, and networking strategies.",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{course.name} | Placibo</title>
        <meta name="description" content={course.description} />
        <link rel="canonical" href="https://yourdomain.com/courses/ui-ux-design" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": course.name,
            "description": course.description,
            "provider": {
              "@type": "Organization",
              "name": "Placibo",
              "sameAs": "https://yourdomain.com",
            },
          })}
        </script>
      </Helmet>
      <EnrollmentDialog />
      <Header />
      <CourseLayout title="">
        <p className="text-lg sm:text-xl text-gray-700 mb-8">{course.description}</p>

        <div className="mt-8 mb-12">
          <Button onClick={onOpen} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Enroll Now
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Key Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {course.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="h-5 w-5 text-blue-500" />
                <span><strong>Duration:</strong> {course.duration}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Course Syllabus</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {course.syllabus.map((item, i) => (
              <AccordionItem value={`item-${i}`} key={i} className="border-b-0 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline px-6 py-4">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base px-6 pb-4">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 md:p-12 rounded-lg shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Design Journey?</h2>
          <p className="text-blue-200 mb-6 max-w-xl mx-auto">Join our next batch and transform your career. Limited seats available!</p>
          <Button onClick={onOpen} size="lg" className="bg-white text-blue-700 hover:bg-gray-100 font-bold">
            Apply Now & Get Syllabus
          </Button>
        </div>
      </CourseLayout>
      <Footer />
    </>
  );
};

export default UIUXDesign;