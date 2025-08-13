"use client";

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const logos = [
  { src: '/logos/colleges/peri-institute-of-technology.jpg', alt: 'PERI Institute of Technology' },
  { src: '/logos/colleges/vit-chennai.jpg', alt: 'VIT Chennai' },
  { src: '/logos/colleges/srm-institute-of-science-and-technology.jpg', alt: 'SRM Institute of Science and Technology' },
  { src: '/logos/colleges/svct-vadakal-campus.jpg', alt: 'SVCT Vadakal Campus' },
  { src: '/logos/colleges/jerusalem-college-of-engineering.jpg', alt: 'Jerusalem College of Engineering' },
  { src: '/logos/colleges/jeppiaar-university.jpg', alt: 'Jeppiaar University' },
  { src: '/logos/colleges/smk-fomra-institute-of-technology.jpg', alt: 'SMK Fomra Institute of Technology' },
  { src: '/logos/colleges/measi-academy-of-architecture.jpg', alt: 'MEASI Academy of Architecture' },
  { src: '/logos/colleges/prince-shri-venkateshwara-padmavathy-engineering-college.jpg', alt: 'Prince Shri Venkateshwara Padmavathy Engineering College' },
  { src: '/logos/colleges/panimalar-engineering-college.jpg', alt: 'Panimalar Engineering College' },
  { src: '/logos/colleges/sastra-university.jpg', alt: 'Sastra University' },
  { src: '/logos/colleges/dhanalakshmi-srinivasan-engineering-college.jpg', alt: 'Dhanalakshmi Srinivasan Engineering College' },
  { src: '/logos/colleges/excel-engineering-college.jpg', alt: 'Excel Engineering College' },
];

export const CollaborationsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Track which images failed to load
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

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
                {!failedImages.has(index) ? (
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    width={160} 
                    height={96} 
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
                    loading="lazy"
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="w-[160px] h-[96px] bg-gray-200 flex items-center justify-center text-gray-500 text-xs select-none">
                    Image not found
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};