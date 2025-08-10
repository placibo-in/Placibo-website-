"use client";

import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";

export const ContactSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { onOpen } = useEnrollmentDialog();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9566627297', '_blank');
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={cn(
        "py-12 md:py-20 bg-blue-600 text-white transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Start Your Journey Today</h2>
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-base md:text-lg">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Next batch starts: <strong>August 5, 2025</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>WhatsApp: <strong>95666 27297</strong></span>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 justify-center"
            onClick={handleWhatsAppClick}
          >
            <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
            <span>Join on WhatsApp</span>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            onClick={onOpen}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
};