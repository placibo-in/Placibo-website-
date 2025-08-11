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

const BackendDjango = () => {
  const { onOpen } = useEnrollmentDialog();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = {
    name: "Backend Development with Django Course in Chennai",
    description:
      "Build robust, secure, and maintainable backend systems using the powerful combination of Python and the Django framework.",
    duration: "4 Months",
    highlights: [
      "Leverage the power of Python to build complex web applications quickly.",
      "Master the Django framework and its 'batteries-included' philosophy.",
      "Design and manage databases with Django's powerful ORM and PostgreSQL.",
      "Build and secure REST APIs with the Django REST Framework.",
    ],
    syllabus: [
      {
        title: "Module 1: Python Fundamentals for Web Development",
        content: "Strengthen your Python skills with a focus on concepts essential for backend development, including data structures, OOP, and virtual environments.",
      },
      {
        title: "Module 2: Introduction to Django & MVT Architecture",
        content: "Get started with Django by understanding its project structure, settings, and the Model-View-Template (MVT) pattern. Build your first Django application.",
      },
      {
        title: "Module 3: Advanced Django Models & ORM",
        content: "Dive deep into Django's Object-Relational Mapper (ORM) to design complex database schemas, perform queries, and manage data efficiently with PostgreSQL.",
      },
      {
        title: "Module 4: Building REST APIs with DRF",
        content: "Learn to build powerful and secure REST APIs using the Django REST Framework (DRF). Cover serializers, viewsets, authentication, and permissions.",
      },
      {
        title: "Module 5: Testing, Deployment & Final Project",
        content: "Learn to write unit and integration tests for your Django application. Prepare your project for production and deploy it to a cloud server.",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{course.name} | Placibo</title>
        <meta name="description" content={course.description} />
        <link rel="canonical" href="https://yourdomain.com/courses/backend-django" />
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
          <h2 className="text-2xl font-bold mb-4">Ready to Build with Python and Django?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">Join our next batch to master one of the most powerful backend frameworks.</p>
          <Button onClick={onOpen} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Apply Now & Get Syllabus
          </Button>
        </div>
      </CourseLayout>
      <Footer />
    </>
  );
};

export default BackendDjango;