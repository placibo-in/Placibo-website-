"use client";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const courses = [
  {
    title: "UI/UX Design Course in Chennai",
    description: "Learn design thinking, wireframing, prototyping, and user research.",
    path: "/courses/ui-ux-design",
  },
  {
    title: "Frontend Development Course in Chennai",
    description: "Master HTML, CSS, JavaScript, and React for responsive UIs.",
    path: "/courses/frontend-development",
  },
  {
    title: "Backend Development with Node.js Course in Chennai",
    description: "Learn scalable backend development with Node.js and Express.",
    path: "/courses/backend-nodejs",
  },
  {
    title: "Backend Development with Django Course in Chennai",
    description: "Build robust backend systems using Python and Django.",
    path: "/courses/backend-django",
  },
  {
    title: "Generative AI (GenAI) Course in Chennai",
    description: "Hands-on experience with LLMs, Python, LangChain, and prompt engineering.",
    path: "/courses/generative-ai",
  },
];

const CoursesPage = () => {
  return (
    <>
      <Helmet>
        <title>Courses | Placibo</title>
        <meta name="description" content="Explore our range of courses in UI/UX, Frontend, Backend, and AI." />
      </Helmet>
      <main className="bg-white text-gray-900 min-h-screen py-8 px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8">Our Courses</h1>
        <ul className="space-y-6">
          {courses.map((course) => (
            <li key={course.path} className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Link to={course.path} className="block">
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">{course.title}</h2>
                <p className="mt-2 text-gray-700">{course.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default CoursesPage;