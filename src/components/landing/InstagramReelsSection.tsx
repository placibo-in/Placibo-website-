"use client";

import { cn } from '@/lib/utils';

const reels = [
  "https://www.instagram.com/reel/DM1tw7GMbtI/embed",
  "https://www.instagram.com/reel/DNA5JOuzyda/embed",
];

export const InstagramReelsSection = () => {
  return (
    <section
      id="reels"
      className={cn(
        "py-12 md:py-16 bg-gray-50 transition-all duration-700 ease-in-out"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">From Our Instagram</h2>
          <p className="mt-2 max-w-xl mx-auto text-base text-gray-600">
            See what our students and community are up to.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {reels.map((url, index) => (
            <iframe
              key={index}
              src={url}
              className="w-[280px] h-[500px] rounded-md border border-gray-300"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              title={`Instagram Reel ${index + 1}`}
              frameBorder="0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};