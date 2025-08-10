"use client";

import React from "react";

const stats = [
  "Our Impact",
  "300+ Students Trained",
  "7 Experienced Educators",
  "30+ Industry Mentors",
  "Collaborations with 10+ Colleges",
];

export const ImpactMarquee = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 rounded-md mx-auto max-w-5xl mt-20 mb-8 shadow-lg">
      <div className="whitespace-nowrap animate-marquee text-white font-semibold text-xs md:text-sm py-2 px-6 flex gap-16 tracking-wide uppercase">
        {stats.map((stat, index) => (
          <span key={index} className="inline-block border-r border-blue-400 last:border-none pr-6">
            {stat}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};