"use client";

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const logos = [
  { src: '/logos/colleges/Frame 398.png', alt: 'Dhanalakshmi Srinivasan Engineering College' },
  { src: '/logos/colleges/Frame 399.png', alt: 'Chennai Institute of Technology' },
  { src: '/logos/colleges/Frame 400.png', alt: 'Coimbatore Institute of Technology' },
  { src: '/logos/colleges/Frame 401.png', alt: 'Excel Engineering College' },
  { src: '/logos/colleges/Frame 402.png', alt: 'Jeppiaar University' },
  { src: '/logos/colleges/Frame 403.png', alt: 'Jerusalem College of Engineering' },
  { src: '/logos/colleges/Frame 404.png', alt: 'Madha Group of Academic Institutions' },
  { src: '/logos/colleges/Frame 405.png', alt: 'Measi Academy of Architecture' },
  { src: '/logos/colleges/Frame 406.png', alt: 'Panimalar Engineering College' },
  { src: '/logos/colleges/Frame 407.png', alt: 'PERI Institute of Technology' },
  { src: '/logos/colleges/Frame 408.png', alt: 'Prince Shri Venkateshwara Padmavathy Engineering College' },
  { src: '/logos/colleges/Frame 409.png', alt: 'Sastra University' },
  { src: '/logos/colleges/Frame 410.png', alt: 'SMK Fomra Institute of Technology' },
  { src: '/logos/colleges/Frame 411.png', alt: 'SRM Institute of Science and Technology' },
  { src: '/logos/colleges/Frame 412.png', alt: 'SVCT Vadakal Campus' },
  { src: '/logos/colleges/Frame 413.png', alt: 'Velammal Engineering College' },
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
        <div className="flex justify-center gap-12 flex-wrap">
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