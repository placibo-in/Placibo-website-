import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { WhyPlaciboSection } from "@/components/landing/WhyPlaciboSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { InstagramReelsSection } from "@/components/landing/InstagramReelsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { FloatingActionButton } from "@/components/landing/FloatingActionButton";
import { LoadingScreen } from "@/components/landing/LoadingScreen";
import { EnrollmentDialog } from "@/components/landing/EnrollmentDialog";
import { ImpactMarquee } from "@/components/landing/ImpactMarquee";

const Index = () => {
  return (
    <div className="bg-white text-gray-800 antialiased">
      <LoadingScreen />
      <EnrollmentDialog />
      <Header />
      <ImpactMarquee />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyPlaciboSection />
        <TestimonialsSection />
        <InstagramReelsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;