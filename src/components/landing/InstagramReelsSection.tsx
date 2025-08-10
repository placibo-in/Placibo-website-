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
        "py-8 bg-gray-50 transition-all duration-700 ease-in-out"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">From Our Instagram</h2>
          <p className="mt-1 max-w-md mx-auto text-sm text-gray-600">
            See what our students and community are up to.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          {reels.map((url, index) => (
            <iframe
              key={index}
              src={url}
              className="w-[180px] h-[320px] rounded-md border border-gray-300"
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