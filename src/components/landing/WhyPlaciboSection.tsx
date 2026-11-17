"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";

const PHONE_NUMBER = "+919176244120";

export const WhyPlaciboSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="why"
      ref={ref}
      className={cn(
        "py-12 md:py-16 bg-gray-50 transition-all duration-700 ease-in-out",
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Why Placibo?
        </h2>

        <p className="mt-3 mx-auto max-w-2xl text-base md:text-lg text-gray-600">
          Want to know how Placibo can support your cybersecurity career
          goals? Call us to discuss your interests, explore your learning
          options, and find the right path for you.
        </p>

        <div className="mt-6 flex justify-center">
          <Button
            asChild
            className="bg-blue-600 text-white hover:bg-blue-700 font-semibold text-base md:text-lg px-7 py-3"
          >
            <a href={`tel:${PHONE_NUMBER}`}>
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};