"use client";

import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { EnrollmentDialog } from "@/components/landing/EnrollmentDialog";

const videoCategories = [
  {
    title: "UI/UX Design Projects",
    videos: [
      {
        title: "UIUX - SERIES 1",
        embedUrl: "https://www.youtube.com/embed/Cucsd_xUyEI",
      },
    ],
  },
  {
    title: "Node.js Projects",
    videos: [
      {
        title: "Nodejs series - 1",
        embedUrl: "https://www.youtube.com/embed/2PfMwzP4vUM",
      },
      {
        title: "Nodejs series - 2",
        embedUrl: "https://www.youtube.com/embed/tyM3ZQqaw9Y",
      },
    ],
  },
];

const StudentWorkPage = () => {
  return (
    <>
      <Helmet>
        <title>Student Work | Placibo</title>
        <meta
          name="description"
          content="See the amazing projects our students have built. Explore portfolios from our UI/UX, Development, and AI courses."
        />
      </Helmet>
      <EnrollmentDialog />
      <Header />
      <main className="bg-gray-50 text-gray-900 py-16 sm:py-24 pt-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Student Showcase</h1>
            <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg text-gray-600">
              We're proud of what our students create. Here's a glimpse into the real-world projects they've built during our courses.
            </p>
          </div>

          <div className="space-y-12">
            {videoCategories.map((category) => (
              <section key={category.title}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.videos.map((video) => (
                    <div key={video.embedUrl} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                      <div className="aspect-video">
                        <iframe
                          src={video.embedUrl}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-800">{video.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default StudentWorkPage;