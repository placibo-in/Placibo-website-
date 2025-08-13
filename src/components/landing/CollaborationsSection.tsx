"use client";

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const logos = [
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-40-pm.jpeg', alt: 'Velammal Engineering College' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-40-pm-1.jpeg', alt: 'SRM Valliammai Engineering College' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-41-pm.jpeg', alt: 'SRM Institute of Science and Technology' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-41-pm-1.jpeg', alt: 'SMK Fomra Institute of Technology' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-42-pm.jpeg', alt: 'SKR Engineering College' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-42-pm-1.jpeg', alt: 'Sastra University' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-42-pm-2.jpeg', alt: 'Panimalar Engineering College' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-43-pm.jpeg', alt: 'MEASI Academy of Architecture' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-43-pm-1.jpeg', alt: 'Prince Shri Venkateshwara Padmavathy Engineering College' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-43-pm-2.jpeg', alt: 'Jerusalem College of Engineering' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-44-pm.jpeg', alt: 'Jeppiaar SRR Engineering College' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-44-pm-1.jpeg', alt: 'VIT Chennai' },
  { src: '/logos/colleges/whatsapp-image-2025-08-13-at-5-51-45-pm.jpeg', alt: 'Dhanalakshmi Srinivasan Engineering College' },
];

export const CollaborationsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
                  <img
                    src="/logos/colleges/peri.png"
                    alt="PERI Institute of Technology (Fallback Logo)"
                    width={160}
                    height={96}
                    className="object-contain grayscale opacity-50 select-none"
                    draggable={false}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};