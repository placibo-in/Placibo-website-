"use client";

import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const CourseLayout = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <main className="bg-white text-gray-900 min-h-screen py-8 px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto">
      <Link 
        to="/courses" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        aria-label="Back to courses"
      >
        <ChevronLeft className="mr-2 h-5 w-5" />
        Back to Courses
      </Link>
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">{title}</h1>
      <div>{children}</div>
    </main>
  );
};

export default CourseLayout;