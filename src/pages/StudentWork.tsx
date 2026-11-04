"use client";

import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { EnrollmentDialog } from "@/components/landing/EnrollmentDialog";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";
import { Button } from "@/components/ui/button";

type Video = { title: string; embedUrl: string };
type Category = { title: string; videos: Video[] };

// Add cybersecurity student work here. Example:
// {
//   title: "SOC / Blue Team Projects",
//   videos: [{ title: "Log analysis walkthrough", embedUrl: "https://www.youtube.com/embed/VIDEO_ID" }],
// },
const videoCategories: Category[] = [];

const StudentWorkPage = () => {
  const { onOpen } = useEnrollmentDialog();

  return (
    <>
      <Helmet>
        <title>Student Work | Placibo CyberSecurity</title>
        <meta
          name="description"
          content="Projects and portfolio work from students of the Placibo Cybersecurity Endurance Program."
        />
      </Helmet>
      <EnrollmentDialog />
      <Header />
      <main className="bg-gray-50 text-gray-900 py-16 sm:py-24 pt-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Student Showcase</h1>
            <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg text-gray-600">
              Practical tasks, guided projects and portfolio work built by students in the CyberSecurity Endurance
              Program.
            </p>
          </div>

          {videoCategories.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-lg bg-white p-8 text-center shadow">
              <h2 className="text-xl font-semibold">CyberSecurity projects are coming soon</h2>
              <p className="mt-2 text-gray-600">
                We are adding student work from the program. Join to start building yours.
              </p>
              <Button onClick={onOpen} className="mt-5 bg-blue-600 hover:bg-blue-700 text-white">
                Enroll Now
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {videoCategories.map((category) => (
                <section key={category.title}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                    {category.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.videos.map((video) => (
                      <div
                        key={video.embedUrl}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                      >
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
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default StudentWorkPage;