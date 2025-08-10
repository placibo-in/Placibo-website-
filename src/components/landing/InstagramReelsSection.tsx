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
        "py-16 md:py-24 bg-gray-50 transition-all duration-700 ease-in-out"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">From Our Instagram</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            See what our students and community are up to.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {reels.map((url, index) => (
            <iframe
              key={index}
              src={url}
              className="w-full max-w-sm aspect-[9/16] rounded-md border border-gray-300"
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