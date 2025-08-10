"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Sarah L.",
    role: "UX Designer at TechCorp",
    image: "https://i.pravatar.cc/150?img=1",
    review: "Placibo's course was a game-changer. The hands-on projects helped me build a portfolio that got me hired before I even graduated.",
  },
  {
    name: "Mike R.",
    role: "Front-End Developer at Innovate Co.",
    image: "https://i.pravatar.cc/150?img=2",
    review: "I went from knowing zero code to building my own websites. The mentors are incredibly supportive and knowledgeable.",
  },
  {
    name: "Jessica P.",
    role: "Student",
    image: "https://i.pravatar.cc/150?img=3",
    review: "The best investment I've made in my career. The curriculum is up-to-date and focuses on skills that employers are actually looking for.",
  },
  {
    name: "David C.",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?img=4",
    review: "The community is amazing. I connected with so many talented people and even found a co-founder for my startup idea.",
  },
  {
    name: "Emily S.",
    role: "Full-Stack Developer",
    image: "https://i.pravatar.cc/150?img=5",
    review: "I was skeptical about online courses, but Placibo exceeded all my expectations. The content is top-notch and very practical.",
  },
];

export const TestimonialsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="testimonials"
      ref={ref}
      className={cn(
        "py-10 md:py-16 bg-white transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Loved by Students Worldwide</h2>
          <p className="mt-2 max-w-xl mx-auto text-base md:text-lg text-gray-600">
            Don't just take our word for it. Here's what our students have to say.
          </p>
        </div>
        
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                    <CardContent className="pt-4 flex-grow flex flex-col">
                      <p className="text-gray-600 italic mb-3 text-sm md:text-base">"{testimonial.review}"</p>
                      <div className="mt-auto flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</p>
                          <p className="text-xs md:text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};