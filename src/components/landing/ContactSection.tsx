"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Loader2 } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";

export const ContactSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { onOpen } = useEnrollmentDialog();
  const [batchDate, setBatchDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBatchDate = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'next_batch_start_date')
        .single();
      
      if (data?.value) {
        setBatchDate(data.value);
      } else {
        // Fallback to a default date if there's an error or no date is set
        setBatchDate("the next available date");
        console.error("Error fetching batch date:", error?.message);
      }
      setIsLoading(false);
    };

    fetchBatchDate();
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9566627297', '_blank');
  };

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
        <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 md:h-5 md:w-5" />
            <span>
              Next batch starts:{" "}
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin inline-block" />
              ) : (
                <strong>{batchDate}</strong>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
            <span>WhatsApp: <strong>95666 27297</strong></span>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-6 flex-wrap">
          <Button 
            className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 justify-center px-4 py-2 min-w-[160px]"
            onClick={handleWhatsAppClick}
          >
            <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-4 h-4" />
            <span className="text-sm md:text-base">Join on WhatsApp</span>
          </Button>
          <Button 
            variant="outline" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 px-4 py-2 min-w-[160px]"
            onClick={onOpen}
          >
            <span className="text-sm md:text-base">Apply Now</span>
          </Button>
        </div>
      </div>
    </section>
  );
};