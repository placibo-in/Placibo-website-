import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { WhatYoullLearnSection } from "@/components/landing/WhatYoullLearnSection";
import { WhyPlaciboSection } from "@/components/landing/WhyPlaciboSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { FloatingActionButton } from "@/components/landing/FloatingActionButton";
import { LoadingScreen } from "@/components/landing/LoadingScreen";

const Index = () => {
  return (
    <div className="bg-white text-gray-800 antialiased">
      <LoadingScreen />
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
      <FloatingActionButton />
    </div>
  );
};

export default Index;