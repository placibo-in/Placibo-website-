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
  const title = "Placibo: Job-Ready Tech Courses in Chennai";
  const description = "Placibo offers top-rated courses in UI/UX, Full-Stack Development, and AI in Chennai, Tamil Nadu. Start your tech career with our hands-on, project-based training.";
  const url = "https://placibo.in";
  const imageUrl = `${url}/logo.png`;

  return (
    <div className="bg-white text-gray-800 antialiased">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={imageUrl} />
      </Helmet>
      <LoadingScreen />
      <EnrollmentDialog />
      <Header />
      <main className="pt-20 md:pt-24 relative z-20">
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