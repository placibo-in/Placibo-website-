"use client";

import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const CourseLayout = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <main className="bg-gray-50 text-gray-900 min-h-screen pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/courses" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
          aria-label="Back to courses"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Back to Courses
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">{title}</h1>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm">
          {children}
        </div>
      </div>
    </main>
  );
};

export default CourseLayout;