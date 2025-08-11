"use client";

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const UIUXDesign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const course = {
    name: "UI/UX Design Course in Chennai",
    description:
      "Dive into the world of design thinking, wireframing, prototyping, and user research to craft seamless digital experiences.",
    duration: "4 Months",
    benefits: [
      "Learn design thinking and user research",
      "Master wireframing and prototyping tools",
      "Build a portfolio of real-world projects",
      "Get personalized mentorship",
    ],
    syllabus: [
      "Introduction to UI/UX Design",
      "User Research and Personas",
      "Wireframing and Prototyping",
      "Visual Design Principles",
      "Usability Testing",
      "Portfolio Development",
    ],
    price: "₹50,000",
  };

  return (
    <>
      <Helmet>
        <title>{course.name} | Placibo</title>
        <meta name="description" content={course.description} />
        <link rel="canonical" href="https://yourdomain.com/courses/ui-ux-design" />
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
              "url": "https://yourdomain.com/courses/ui-ux-design",
              "offers": {
                "@type": "Offer",
                "price": "50000",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "url": "https://yourdomain.com/courses/ui-ux-design",
              },
            },
          })}
        </script>
      </Helmet>

      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
        <p className="mb-6 text-gray-700">{course.description}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Course Duration</h2>
          <p>{course.duration}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Benefits</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {course.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Syllabus</h2>
          <ul className="list-decimal list-inside space-y-1 text-gray-700">
            {course.syllabus.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Pricing</h2>
          <p className="text-lg font-semibold">{course.price}</p>
        </section>
      </main>
    </>
  );
};

export default UIUXDesign;