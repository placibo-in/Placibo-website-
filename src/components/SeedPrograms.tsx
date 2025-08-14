"use client";

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const samplePrograms = [
  {
    title: "UI/UX Design Course",
    duration: "4 Months",
    description: "Learn design thinking, wireframing, prototyping, and user research.",
    link: "/courses/ui-ux-design",
    icon: "PenTool",
  },
  {
    title: "Frontend Development Course",
    duration: "4 Months",
    description: "Master HTML, CSS, JavaScript, and React for responsive UIs.",
    link: "/courses/frontend-development",
    icon: "Code",
  },
  {
    title: "Backend with Node.js Course",
    duration: "4 Months",
    description: "Learn scalable backend development with Node.js and Express.",
    link: "/courses/backend-nodejs",
    icon: "Server",
  },
  {
    title: "Backend with Django Course",
    duration: "4 Months",
    description: "Build robust backend systems using Python and Django.",
    link: "/courses/backend-django",
    icon: "Database",
  },
  {
    title: "Generative AI (GenAI) Course",
    duration: "5 Months",
    description: "Hands-on experience with LLMs, Python, LangChain, and prompt engineering.",
    link: "/courses/generative-ai",
    icon: "BrainCircuit",
  },
];

export const SeedPrograms = () => {
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("programs").insert(samplePrograms);
      if (error) {
        toast.error(`Failed to seed programs: ${error.message}`);
      } else {
        toast.success("Sample programs seeded successfully!");
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Button onClick={handleSeed} disabled={loading} className="w-full">
        {loading ? "Seeding..." : "Seed Sample Programs"}
      </Button>
    </div>
  );
};