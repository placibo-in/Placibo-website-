"use client";

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const logos = [
  { src: '/logos/colleges/velammal.jpeg', alt: 'Velammal Engineering College' },
  { src: '/logos/colleges/srm_vdp.jpeg', alt: 'SRM Valliammai Engineering College' },
  { src: '/logos/colleges/srm_ist.jpeg', alt: 'SRM IST' },
  { src: '/logos/colleges/smk_fomra.jpeg', alt: 'SMK Fomra Institute of Technology' },
  { src: '/logos/colleges/skr_engineering.jpeg', alt: 'SKR Engineering College' },
  { src: '/logos/colleges/sastra.jpeg', alt: 'Sastra University' },
  { src: '/logos/colleges/panimalar.jpeg', alt: 'Panimalar Engineering College' },
  { src: '/logos/colleges/measi.jpeg', alt: 'MEASI Academy of Architecture' },
  { src: '/logos/colleges/prince_shri_venkateshwara.jpeg', alt: 'Prince Shri Venkateshwara Padmavathy Engineering College' },
  { src: '/logos/colleges/jerusalem_college.jpeg', alt: 'Jerusalem College of Engineering' },
  { src: '/logos/colleges/jeppiaar_srr.jpeg', alt: 'Jeppiaar SRR Engineering College' },
  { src: '/logos/colleges/vit_chennai.jpeg', alt: 'VIT Chennai' },
];

export const CollaborationsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Debug: log image URLs to verify paths
  if (typeof window !== 'undefined') {
    logos.forEach((logo) => {
      console.log('Logo image URL:', logo.src);
    });
  }

  return (
    <section
      ref={ref}
      className={cn(
        "py-10 md:py-16 bg-gray-50 transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our University & College Collaborations</h2>
          <p className="mt-2 max-w-xl mx-auto text-base md:text-lg text-gray-600">
            We are proud to partner with leading educational institutions in Tamil Nadu.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="flex w-max gap-16 animate-scroll group-hover:pause">
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  width={160} 
                  height={96} 
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    console.error('Failed to load image:', logo.src);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};