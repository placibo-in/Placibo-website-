"use client";

import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { EnrollmentDialog } from "@/components/landing/EnrollmentDialog";
import { CourseCards } from "@/components/courses/CourseCards";

const CoursesPage = () => (
  <>
    <Helmet>
      <title>Courses | Placibo</title>
      <meta name="description" content="Placibo courses: Cybersecurity, Power BI and, soon, Data Science." />
      <link rel="canonical" href="https://www.placibo.in/courses" />
    </Helmet>
    <EnrollmentDialog />
    <Header />
    <main className="bg-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">Courses</h1>
          <p className="mt-3 text-lg text-gray-600">Choose a path and start building real skills.</p>
        </div>
        <CourseCards />
      </div>
    </main>
    <Footer />
  </>
);

export default CoursesPage;
