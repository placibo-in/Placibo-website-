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

const BackendNode = () => {
  const { onOpen } = useEnrollmentDialog();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = {
    name: "Backend Development with Node.js Course in Chennai",
    description:
      "Learn to build scalable, high-performance backend services and APIs using Node.js, Express, and modern database technologies.",
    duration: "4 Months",
    highlights: [
      "Build scalable, high-performance APIs with Node.js and Express.",
      "Master database design and integration with MongoDB and Mongoose.",
      "Implement secure authentication and authorization using JWT.",
      "Deploy your backend services to the cloud for production.",
    ],
    syllabus: [
      {
        title: "Module 1: Node.js & JavaScript Fundamentals",
        content: "Master the asynchronous nature of JavaScript and Node.js. Understand the event loop, modules, and NPM to manage your projects effectively.",
      },
      {
        title: "Module 2: Express.js & RESTful APIs",
        content: "Create robust and scalable RESTful APIs from scratch using the Express.js framework. Learn about routing, middleware, and error handling.",
      },
      {
        title: "Module 3: Database Integration with MongoDB",
        content: "Learn to connect your application to a NoSQL database. Master CRUD operations, data modeling, and schema design with MongoDB and Mongoose.",
      },
      {
        title: "Module 4: Authentication, Security & Best Practices",
        content: "Implement secure user authentication and authorization using JSON Web Tokens (JWT). Learn to protect your APIs from common vulnerabilities.",
      },
      {
        title: "Module 5: Deployment & Advanced Topics",
        content: "Prepare your application for production. Learn to deploy your Node.js backend to cloud platforms and explore advanced topics like WebSocket and microservices.",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{course.name} | Placibo</title>
        <meta name="description" content={course.description} />
        <link rel="canonical" href="https://yourdomain.com/courses/backend-nodejs" />
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Build Powerful Backends?</h2>
          <p className="text-blue-200 mb-6 max-w-xl mx-auto">Join our next batch and master the technology that powers modern web applications.</p>
          <Button onClick={onOpen} size="lg" className="bg-white text-blue-700 hover:bg-gray-100 font-bold">
            Apply Now & Get Syllabus
          </Button>
        </div>
      </CourseLayout>
      <Footer />
    </>
  );
};

export default BackendNode;