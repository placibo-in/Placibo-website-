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

const Frontend = () => {
  const { onOpen } = useEnrollmentDialog();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = {
    name: "Frontend Development Course in Chennai",
    description:
      "Master HTML, CSS, JavaScript, and frameworks like React to build engaging, responsive, and powerful user interfaces from scratch.",
    duration: "4 Months",
    highlights: [
      "Build dynamic web apps with React and modern JavaScript (ES6+).",
      "Master state management with tools like Redux or Zustand.",
      "Connect to backend APIs and handle data seamlessly.",
      "Deploy your applications to the web using platforms like Vercel or Netlify.",
    ],
    syllabus: [
      {
        title: "Module 1: HTML, CSS, & Responsive Design",
        content: "Build a strong foundation with modern HTML5 and CSS3. Learn Flexbox, Grid, and media queries to create fully responsive websites that look great on all devices.",
      },
      {
        title: "Module 2: JavaScript Fundamentals",
        content: "Dive deep into the core concepts of JavaScript, including variables, data types, functions, objects, and asynchronous programming to make your websites interactive.",
      },
      {
        title: "Module 3: React & Component-Based Architecture",
        content: "Learn the fundamentals of React, including JSX, components, props, state, and the component lifecycle. Understand how to build modular and reusable UI.",
      },
      {
        title: "Module 4: Advanced React & State Management",
        content: "Explore advanced React concepts like Hooks, Context API, and routing with React Router. Learn to manage complex application state with libraries like Redux.",
      },
      {
        title: "Module 5: APIs, Deployment & Final Project",
        content: "Integrate your frontend with backend services by making API calls. Learn the deployment process and build a full-stack MERN application for your portfolio.",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{course.name} | Placibo</title>
        <meta name="description" content={course.description} />
        <link rel="canonical" href="https://yourdomain.com/courses/frontend-development" />
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
      <Header />
      <CourseLayout title={course.name}>
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
          <Accordion type="single" collapsible className="w-full">
            {course.syllabus.map((item, i) => (
              <AccordionItem value={`item-${i}`} key={i} className="border-b">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Become a Frontend Developer?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">Join our next batch and start building the web of tomorrow. Limited seats available!</p>
          <Button onClick={onOpen} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Apply Now & Get Syllabus
          </Button>
        </div>
      </CourseLayout>
      <Footer />
    </>
  );
};

export default Frontend;