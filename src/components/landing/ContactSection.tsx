"use client";

import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Start Your Journey Today</h2>
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-lg">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            <span>Next batch starts: <strong>August 5, 2025</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            <span>WhatsApp: <strong>95666 27297</strong></span>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" variant="secondary">Join on WhatsApp</Button>
          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">Apply Now</Button>
        </div>
      </div>
    </section>
  );
};