"use client";

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const logos = [
  { src: '/logos/colleges/Peri.png', alt: 'PERI Institute of Technology' },
  { src: '/logos/colleges/DHANALAKSHMI.png', alt: 'Dhanalakshmi College of Engineering' },
  { src: '/logos/colleges/COIMBATORE.png', alt: 'Coimbatore Institute of Technology' },
  { src: '/logos/colleges/EXCEL.png', alt: 'Excel Engineering College' },
  { src: '/logos/colleges/REC.png', alt: 'Rajalakshmi Engineering College' },
];

export const CollaborationsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Campus Pro College Collaborations</h2>
          <p className="mt-2 max-w-xl mx-auto text-base md:text-lg text-gray-600">
            Our Students from
          </p>
        </div>
        <div className="flex justify-center gap-16 flex-wrap">
          {logos.map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <img
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={96}
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};