import { Helmet } from "react-helmet-async";
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

const Index = () => {
  return (
    <div className="bg-white text-gray-800 antialiased">
      <Helmet>
        <title>Placibo - Design Your Future</title>
        <meta
          name="description"
          content="Placibo offers hands-on online courses in UI/UX, Frontend, Backend, and AI to help you build a career."
        />
      </Helmet>
      <LoadingScreen />
      <EnrollmentDialog />
      <Header />
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