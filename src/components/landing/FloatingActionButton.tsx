"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowUpRight } from "lucide-react";

export const FloatingActionButton = () => {
  const isMobile = useIsMobile();

  const handleClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button 
        size="lg" 
        className="rounded-full h-14 w-14 shadow-lg bg-blue-600 hover:bg-blue-700"
        onClick={handleClick}
      >
        <ArrowUpRight className="h-6 w-6" />
      </Button>
    </div>
  );
};