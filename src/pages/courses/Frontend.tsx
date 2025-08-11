"use client";

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Frontend = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = {
    name: "Frontend Development Course in Chennai",
    description:
      "Master HTML, CSS, JavaScript, and frameworks like React to build engaging and responsive user interfaces.",
    duration: "4 Months",
    benefits: [
      "Learn HTML, CSS, and JavaScript fundamentals",
      "Build responsive web applications",
      "Master React and modern frontend tools",
      "Get personalized mentorship",
    ],
    syllabus: [
      "HTML & CSS Basics",
      "JavaScript Fundamentals",
      "React Basics and Hooks",
      "State Management",
      "Routing and APIs",
      "Project Development",
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
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "name": course.name,
              "description": course.description,
              "courseMode": "Online",
              "instructor": {
                "@type": "Person",
                "name": "Expert Instructor",
              },
              "duration": "P4M",
              "startDate": "2025-08-05",
              "endDate": "2025-12-05",
              "url": "https://yourdomain.com/courses/frontend-development",
            },
          })}
        </script>
      </Helmet>

      <main className="bg-white text-gray-900 min-h-screen py-8 px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto space-y-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold">{course.name}</h1>
          <p className="text-lg sm:text-xl text-gray-700">{course.description}</p>

          <section className="bg-gray-50 rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Course Duration</h2>
            <p className="text-base">{course.duration}</p>
          </section>

          <section className="bg-gray-50 rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-base">
              {course.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-50 rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
            <ul className="list-decimal list-inside space-y-2 text-gray-700 text-base">
              {course.syllabus.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default Frontend;