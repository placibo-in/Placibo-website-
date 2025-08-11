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

const GenerativeAI = () => {
  const { onOpen } = useEnrollmentDialog();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = {
    name: "Generative AI (GenAI) Course in Chennai",
    description:
      "Step into the AI revolution with hands-on experience in building applications using Large Language Models (LLMs), Python, LangChain, and prompt engineering.",
    duration: "5 Months",
    highlights: [
      "Build real-world applications powered by Large Language Models (LLMs).",
      "Master prompt engineering to get the best results from AI models.",
      "Use Python and LangChain to create complex AI workflows and chains.",
      "Understand the architecture of modern AI systems and vector databases.",
    ],
    syllabus: [
      {
        title: "Module 1: Introduction to AI & Large Language Models",
        content: "Explore the history and fundamentals of AI. Understand what LLMs are, how they work, and their potential applications across industries.",
      },
      {
        title: "Module 2: Python for AI & Data Handling",
        content: "Get proficient in Python libraries essential for AI, such as NumPy and Pandas. Learn to process and prepare data for AI models.",
      },
      {
        title: "Module 3: Prompt Engineering & Model Interaction",
        content: "Learn the art and science of crafting effective prompts to control LLM behavior. Explore techniques like zero-shot, few-shot, and chain-of-thought prompting.",
      },
      {
        title: "Module 4: Building with LangChain & Vector Databases",
        content: "Use the LangChain framework to build complex applications that chain together LLMs with other tools and data sources. Learn to use vector databases for long-term memory.",
      },
      {
        title: "Module 5: Advanced Topics & Final Project",
        content: "Dive into advanced topics like fine-tuning, agents, and evaluating LLM outputs. Build a comprehensive, portfolio-ready GenAI application from scratch.",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{course.name} | Placibo</title>
        <meta name="description" content={course.description} />
        <link rel="canonical" href="https://yourdomain.com/courses/generative-ai" />
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Build the Future with AI?</h2>
          <p className="text-blue-200 mb-6 max-w-xl mx-auto">Join our next batch and get hands-on experience with the most exciting technology today.</p>
          <Button onClick={onOpen} size="lg" className="bg-white text-blue-700 hover:bg-gray-100 font-bold">
            Apply Now & Get Syllabus
          </Button>
        </div>
      </CourseLayout>
      <Footer />
    </>
  );
};

export default GenerativeAI;