import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { WhatYoullLearnSection } from "@/components/landing/WhatYoullLearnSection";
import { WhyPlaciboSection } from "@/components/landing/WhyPlaciboSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="bg-white text-gray-800 antialiased">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WhatYoullLearnSection />
        <WhyPlaciboSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;