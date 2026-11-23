"use client";

import { Button } from "@/components/ui/button";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";

const scrollToRoadmap = () =>
  document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });

/**
 * Cybersecurity background drawn with inline SVG (grid, circuit lines, shield
 * and padlock), so no image file is needed and nothing extra is downloaded.
 *
 * To use a photo instead, put it in /public (for example /public/cyber-bg.jpg),
 * then replace <CyberBackground /> below with:
 *   <img src="/cyber-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
 *   <div className="absolute inset-0 bg-blue-950/80" />
 */
const CyberBackground = () => (
  <div className="absolute inset-0" aria-hidden="true">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900" />
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 600">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#60a5fa" strokeOpacity="0.12" strokeWidth="1" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#grid)" />

      {/* Circuit lines */}
      <g fill="none" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1.5">
        <path d="M0 120H180L230 170H420" />
        <path d="M0 470H140L190 420H360" />
        <path d="M1200 140H1010L960 190H800" />
        <path d="M1200 460H1040L990 410H830" />
      </g>
      <g fill="#38bdf8" fillOpacity="0.7">
        <circle cx="420" cy="170" r="4" />
        <circle cx="360" cy="420" r="4" />
        <circle cx="800" cy="190" r="4" />
        <circle cx="830" cy="410" r="4" />
      </g>

      {/* Shield with padlock */}
      <circle cx="600" cy="300" r="260" fill="url(#glow)" />
      <g transform="translate(600 300)" opacity="0.28">
        <path
          d="M0 -170 L130 -120 V10 C130 90 70 150 0 180 C-70 150 -130 90 -130 10 V-120 Z"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="4"
        />
        <rect x="-38" y="-10" width="76" height="62" rx="8" fill="none" stroke="#7dd3fc" strokeWidth="4" />
        <path d="M-24 -10V-34a24 24 0 0 1 48 0V-10" fill="none" stroke="#7dd3fc" strokeWidth="4" />
        <circle cx="0" cy="22" r="6" fill="#7dd3fc" />
      </g>
    </svg>
    {/* Keeps the text readable */}
    <div className="absolute inset-0 bg-slate-950/30" />
  </div>
);

export const HeroSection = () => {
  const { onOpen } = useEnrollmentDialog();

  return (
    <section className="relative isolate w-full overflow-hidden rounded-xl text-white text-center px-4 py-20 md:py-28">
      <CyberBackground />
      <div className="relative z-10">
        <h1 className="mx-auto max-w-3xl text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Build skills in cybersecurity and data analytics
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-blue-100">
          Structured, practical learning paths with portfolio work. Start with the Cybersecurity Endurance Program or
          the Power BI learning plan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={onOpen} className="bg-white text-blue-900 hover:bg-blue-50 px-6">
            Enroll Now
          </Button>
          <Button
            onClick={scrollToRoadmap}
            className="bg-transparent border border-white/60 text-white hover:bg-white/10 px-6"
          >
            View Courses
          </Button>
        </div>
      </div>
    </section>
  );
};
