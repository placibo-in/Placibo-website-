"use client";

import React from "react";

const stats = [
  "📊 Our Impact",
  "👨‍🎓 300+ Students Trained",
  "👩‍🏫 7 Experienced Educators",
  "🧑‍💼 30+ Industry Mentors",
  "🏫 Collaborations with 10+ Colleges",
];

export const ImpactMarquee = () => {
  return (
    <div className="overflow-hidden bg-blue-600 rounded-md mx-auto max-w-5xl mt-20 mb-8">
      <div className="whitespace-nowrap animate-marquee text-white font-semibold text-sm md:text-base py-2 px-4 flex gap-12">
        {stats.map((stat, index) => (
          <span key={index} className="inline-block">
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
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};