"use client";

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CourseLayout from "@/components/courses/CourseLayout";

const BackendNode = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = {
    name: "Backend Development with Node.js Course in Chennai",
    description:
      "Learn scalable backend development using Node.js, Express, RESTful APIs, and databases like MongoDB.",
    duration: "4 Months",
    benefits: [
      "Master Node.js and Express",
      "Build RESTful APIs",
      "Work with MongoDB and databases",
      "Get personalized mentorship",
    ],
    syllabus: [
      "Node.js Basics",
      "Express Framework",
      "API Development",
      "Database Integration",
      "Authentication & Security",
      "Project Development",
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
              "url": "https://yourdomain.com/courses/backend-nodejs",
            },
          })}
        </script>
      </Helmet>

      <CourseLayout title={course.name}>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">{course.description}</p>

        <section className="bg-gray-50 rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Course Duration</h2>
          <p className="text-base">{course.duration}</p>
        </section>

        <section className="bg-gray-50 rounded-lg shadow p-6 mb-8">
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
      </CourseLayout>
    </>
  );
};

export default BackendNode;