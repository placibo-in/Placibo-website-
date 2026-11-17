"use client";

import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";

// Change this text to update the batch date shown on the site.
const BATCH_START_DATE = "November 5th, 2026";

// wa.me needs the country code, otherwise the link may not open the chat
const WHATSAPP_URL = "https://wa.me/919566627297";

export const ContactSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { onOpen } = useEnrollmentDialog();
  return (
    <section
      id="contact"
      ref={ref}
      className={cn(
        "py-10 md:py-16 bg-blue-600 text-white transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Start Your Journey Today</h2>
        <p className="mt-2 text-sm md:text-base text-blue-100">
          Tell us your current level, preferred career track and any certifications you have completed.
        </p>
        <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 md:h-5 md:w-5" />
            <span>
              Next batch starts:{" "}
              <strong>{BATCH_START_DATE}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
            <span>
              WhatsApp: <strong>91762 44120</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 md:h-5 md:w-5" />
            <a href="tel:+919176244120" className="text-white hover:underline">
              Phone: <strong>91762 44120</strong>
            </a>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-6 flex-wrap">
          <Button
            className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 justify-center px-4 py-2 min-w-[160px]"
            onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
          >
            <img src="/icons/whatsapp.png" alt="" className="w-4 h-4" />
            <span className="text-sm md:text-base">Join on WhatsApp</span>
          </Button>
          <Button
  variant="outline"
  className="bg-white text-blue-600 text-lg font-semibold border-white hover:bg-blue-50 hover:text-blue-700 px-4 py-2 min-w-[160px]"
  onClick={onOpen}
>
  Apply Now
</Button>
        </div>
      </div>
    </section>
  );
};