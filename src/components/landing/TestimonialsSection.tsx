"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

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
        "py-16 md:py-24 bg-white transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Loved by Students Worldwide</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            Don't just take our word for it. Here's what our students have to say.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <p className="text-gray-600 italic">"{testimonial.review}"</p>
                <div className="mt-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};