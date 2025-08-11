"use client";

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CourseLayout from "@/components/courses/CourseLayout";

const GenerativeAI = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = {
    name: "Generative AI (GenAI) Course in Chennai",
    description:
      "Step into the AI revolution with hands-on experience in building applications using Large Language Models (LLMs), Python, LangChain, and prompt engineering.",
    duration: "5 Months",
    benefits: [
      "Learn Large Language Models and prompt engineering",
      "Build AI-powered applications",
      "Understand Python and LangChain",
      "Get personalized mentorship",
    ],
    syllabus: [
      "Introduction to Generative AI",
      "Large Language Models (LLMs)",
      "Python for AI",
      "LangChain Framework",
      "Prompt Engineering",
      "Project Development",
    ],
  };

  return (
    <>
      <Helmet>
        <title>{course.name} | Placibo</title>
        <meta name="description" content={course.description} />
        <link rel="canonical" href="https://yourdomain.com/courses/generative-ai" />
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
              "duration": "P5M",
              "startDate": "2025-08-05",
              "endDate": "2026-01-05",
              "url": "https://yourdomain.com/courses/generative-ai",
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

export default GenerativeAI;