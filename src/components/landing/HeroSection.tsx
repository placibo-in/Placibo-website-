
"use client";

import { Button } from "@/components/ui/button";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";

const scrollToRoadmap = () =>
  document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" });

// Static cybersecurity hero. No slides or images are loaded from Supabase.
export const HeroSection = () => {
  const { onOpen } = useEnrollmentDialog();

  return (
    <section className="relative w-full bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white rounded-xl px-4 py-16 md:py-24 text-center">
      <h1 className="mx-auto max-w-3xl text-xl sm:text-2xl md:text-5xl font-bold tracking-tight">
        Build a Career in CyberSecurity
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-blue-100">
        A clear path from beginner to specialist, backed by guided tasks, expert feedback and portfolio work in the
        Placibo CyberSecurity Endurance Program.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
  onClick={scrollToRoadmap}
  className="bg-white text-blue-900 font-semibold text-lg border border-white hover:bg-blue-50 hover:text-blue-800 px-8 py-3"
>
  View Roadmap
</Button>
      </div>
    </section>
  );
};
