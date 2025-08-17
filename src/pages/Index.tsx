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
import { GoogleReviewsSection } from "@/components/landing/GoogleReviewsSection";

const Index = () => {
  const title = "UI/UX Design Courses in Chennai | Placibo";
  const description = "Join Placibo's UI/UX design courses in Chennai. Learn from industry experts with hands-on projects, certification, and career support. Enroll now for early bird discounts!";
  const url = "https://placibo.in";
  const imageUrl = `${url}/logo.png`; // Using logo as a placeholder for the banner

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Placibo",
    "url": "https://www.placibo.in",
    "logo": "https://www.placibo.in/logo.png",
    "description": "Placibo offers UI/UX design courses in Chennai with expert mentors, real projects, and career guidance.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "course": {
      "@type": "Course",
      "name": "UI/UX Design Course in Chennai",
      "description": "Learn UI/UX design from industry professionals in Chennai. Includes hands-on projects, mentorship, and certification.",
      "provider": {
        "@type": "Organization",
        "name": "Placibo",
        "sameAs": "https://www.placibo.in"
      }
    }
  };

  return (
    <div className="bg-white text-gray-800 antialiased">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="UI UX design courses Chennai, UI UX training institute, Placibo UI/UX certification" />
        <link rel="canonical" href={url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content="Placibo - UI/UX Design Courses in Chennai" />
        <meta property="og:description" content="Become a UI/UX expert in Chennai with Placibo. Practical training, certification, and real-world projects." />
        <meta property="og:image" content={imageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UI/UX Design Courses in Chennai | Placibo" />
        <meta name="twitter:description" content="Learn UI/UX design from experts in Chennai. Hands-on training with Placibo." />
        <meta name="twitter:image" content={imageUrl} />
        
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      <LoadingScreen />
      <EnrollmentDialog />
      <Header />
      <main className="pt-20 md:pt-24 relative z-20">
        <HeroSection />
        <AboutSection />
        <WhyPlaciboSection />
        <GoogleReviewsSection />
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