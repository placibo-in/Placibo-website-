"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, CheckCircle2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";

type Review = {
  id: string;
  name: string;
  review_date: string;
  rating: number;
  review_text: string;
  avatar_url: string | null;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))}
  </div>
);

export const GoogleReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data } = await supabase.from("google_reviews").select("*").order("review_date", { ascending: false });
      setReviews(data || []);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Our Students Say</h2>
          <p className="mt-2 max-w-xl mx-auto text-base md:text-lg text-gray-600">
            Real reviews from students who have transformed their careers with us.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center gap-4">
            <Skeleton className="h-56 w-80" />
            <Skeleton className="h-56 w-80 hidden md:block" />
          </div>
        ) : (
          <Carousel
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full p-1">
                    <div className="flex flex-col h-full">
                      <Card className="relative bg-gray-50 p-6 rounded-xl shadow-sm flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <StarRating rating={review.rating} />
                            <CheckCircle2 className="h-5 w-5 text-blue-500 fill-white" />
                          </div>
                          <img src="/icons/google-logo.svg" alt="Google" className="h-6 w-6" />
                        </div>
                        <p className="text-gray-700 text-sm">{review.review_text}</p>
                        <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-gray-50" />
                      </Card>
                      <div className="flex items-center gap-3 mt-4 pl-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={review.avatar_url || undefined} />
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{review.name}</p>
                          <p className="text-sm text-gray-500">{new Date(review.review_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
};