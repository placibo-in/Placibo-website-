import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { WhyPlaciboSection } from "@/components/landing/WhyPlaciboSection";
import { CollaborationsSection } from "@/components/landing/CollaborationsSection";
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
        <title>Placibo: Job-Ready Tech Courses in Chennai</title>
        <meta
          name="description"
          content="Placibo offers top-rated courses in UI/UX, Full-Stack Development, and AI in Chennai, Tamil Nadu. Start your tech career with our hands-on, project-based training."
        />
      </Helmet>
      <LoadingScreen />
      <EnrollmentDialog />
      <Header />
      <main className="pt-20 md:pt-24">
        <HeroSection />
        <AboutSection />
        <WhyPlaciboSection />
        <CollaborationsSection />
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