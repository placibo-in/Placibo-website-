"use client";

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const logos = [
  { src: '/logos/colleges/peri_institute_of_technology.jpeg', alt: 'PERI Institute of Technology' },
  { src: '/logos/colleges/vit_chennai.jpeg', alt: 'VIT Chennai' },
  { src: '/logos/colleges/srm_institute_of_science_and_technology.jpeg', alt: 'SRM Institute of Science and Technology' },
  { src: '/logos/colleges/svct_vadakal_campus.jpeg', alt: 'SVCT Vadakal Campus' },
  { src: '/logos/colleges/jerusalem_college_of_engineering.jpeg', alt: 'Jerusalem College of Engineering' },
  { src: '/logos/colleges/jeppiaar_university.jpeg', alt: 'Jeppiaar University' },
  { src: '/logos/colleges/smk_fomra_institute_of_technology.jpeg', alt: 'SMK Fomra Institute of Technology' },
  { src: '/logos/colleges/measi_academy_of_architecture.jpeg', alt: 'MEASI Academy of Architecture' },
  { src: '/logos/colleges/prince_shri_venkateshwara_padmavathy_engineering_college.jpeg', alt: 'Prince Shri Venkateshwara Padmavathy Engineering College' },
  { src: '/logos/colleges/panimalar_engineering_college.jpeg', alt: 'Panimalar Engineering College' },
  { src: '/logos/colleges/sastra_university.jpeg', alt: 'Sastra University' },
  { src: '/logos/colleges/dhanalakshmi_srinivasan_engineering_college.jpeg', alt: 'Dhanalakshmi Srinivasan Engineering College' },
  { src: '/logos/colleges/excel_engineering_college.jpeg', alt: 'Excel Engineering College' },
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