import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { CybersecurityRoadmapSection } from "@/components/landing/CybersecurityRoadmapSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { FloatingActionButton } from "@/components/landing/FloatingActionButton";

const perks = [
  ["Structured practical tasks", "Hands-on work matched to your chosen track."],
  ["Guided project work", "Projects you can explain in an interview."],
  ["Expert feedback", "Industry practitioners review your work."],
  ["Portfolio assignments", "Assignments that strengthen your portfolio."],
];

const Cybersecurity = () => (
  <div className="bg-white text-gray-800 antialiased">
    <Helmet>
      <title>CyberSecurity Endurance Program | Placibo</title>
      <meta
        name="description"
        content="Placibo Cybersecurity Endurance Program: guided tasks, expert feedback and portfolio assignments, with a beginner-to-expert certification roadmap."
      />
      <link rel="canonical" href="https://www.placibo.in/courses/cybersecurity" />
    </Helmet>
    <Header />
    <main className="pt-20 md:pt-16">
      <section className="bg-blue-900 py-16 text-white">
        <div className="container mx-auto max-w-5xl px-4">
          <h1 className="text-4xl font-bold md:text-5xl">Placibo CyberSecurity Endurance Program</h1>
          <p className="mt-4 max-w-2xl text-blue-100">
            The roadmap shows you the direction. The program is where you practise it. When you contact us, tell us
            your current level, preferred career track and any certifications you have completed.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(([t, d]) => (
              <div key={t} className="rounded-lg bg-white/10 p-4">
                <h2 className="font-semibold">{t}</h2>
                <p className="mt-1 text-sm text-blue-100">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CybersecurityRoadmapSection />
      <ContactSection />
    </main>
    <Footer />
    <FloatingActionButton />
  </div>
);

export default Cybersecurity;