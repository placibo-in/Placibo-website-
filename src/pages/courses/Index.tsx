"use client";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PenTool, Code, Server, Database, BrainCircuit, ArrowRight } from "lucide-react";
import { EnrollmentDialog } from "@/components/landing/EnrollmentDialog";

const courses = [
  {
    title: "UI/UX Design Course",
    description: "Learn design thinking, wireframing, prototyping, and user research.",
    path: "/courses/ui-ux-design",
    icon: <PenTool className="h-8 w-8 text-blue-600" />,
  },
  {
    title: "Frontend Development Course",
    description: "Master HTML, CSS, JavaScript, and React for responsive UIs.",
    path: "/courses/frontend-development",
    icon: <Code className="h-8 w-8 text-blue-600" />,
  },
  {
    title: "Backend with Node.js Course",
    description: "Learn scalable backend development with Node.js and Express.",
    path: "/courses/backend-nodejs",
    icon: <Server className="h-8 w-8 text-blue-600" />,
  },
  {
    title: "Backend with Django Course",
    description: "Build robust backend systems using Python and Django.",
    path: "/courses/backend-django",
    icon: <Database className="h-8 w-8 text-blue-600" />,
  },
  {
    title: "Generative AI (GenAI) Course",
    description: "Hands-on experience with LLMs, Python, LangChain, and prompt engineering.",
    path: "/courses/generative-ai",
    icon: <BrainCircuit className="h-8 w-8 text-blue-600" />,
  },
];

const CoursesPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Courses | Placibo</title>
        <meta name="description" content="Explore our range of courses in UI/UX, Frontend, Backend, and AI." />
      </Helmet>
      <EnrollmentDialog />
      <Header />
      <main className="bg-gray-50 text-gray-900 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Explore Our Programs</h1>
            <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg text-gray-600">
              Choose from a variety of courses designed to launch your career in tech. Each program is crafted by industry experts to provide you with job-ready skills.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link to={course.path} key={course.path} className="block group">
                <Card className="h-full flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out border border-gray-200">
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      {course.icon}
                    </div>
                    <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600">{course.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CoursesPage;