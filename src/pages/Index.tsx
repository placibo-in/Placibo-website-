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
  const title = "Placibo Technologies – EduTech company In Chennai";
  const description = "Placibo An EduTech company empowering students with IT courses in Full Stack, UI/UX & Data Science. Build confidence, skills & career success with Placibo.in.";
  const url = "https://www.placibo.in";
  const imageUrl = `${url}/logo.png`; // Using logo as a placeholder for the banner

  const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.placibo.in/",
      "url": "https://www.placibo.in/",
      "name": "Edutech Company in Chennai",
      "isPartOf": {
        "@id": "https://www.placibo.in/#website"
      },
      "about": {
        "@id": "https://www.placibo.in/#organization"
      },
      "primaryImageOfPage": {
        "@id": "https://www.placibo.in/#primaryimage"
      },
      "image": {
        "@id": "https://www.placibo.in/#primaryimage"
      },
      "description": "Placibo An EduTech Company Empowering students with IT courses in Full Stack, UI/UX & Data Science. Build confidence, skills & career success with Placibo.in.",
      "breadcrumb": {
        "@id": "https://www.placibo.in/#breadcrumb"
      },
      "inLanguage": "en-US",
      "potentialAction": [
        {
          "@type": "ReadAction",
          "target": ["https://www.placibo.in/"]
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.placibo.in/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.placibo.in/"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.placibo.in/#website",
      "url": "https://www.placibo.in/",
      "name": "Placibo – EduTech Company In Chennai",
      "description": "Placibo An EduTech Company Empowering students with IT courses in Full Stack, UI/UX & Data Science. Build confidence, skills & career success with Placibo.in",
      "publisher": {
        "@id": "https://www.placibo.in/#organization"
      },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.placibo.in/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": "https://www.placibo.in/#organization",
      "name": "Placibo",
      "url": "https://www.placibo.in",
      "logo": "https://www.placibo.in/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "9566627297",
        "contactType": "customer service"
      },
      "image": {
        "@id": "https://www.placibo.in/#/schema/logo/image/"
      },
      "sameAs": [
        "https://www.facebook.com/placibo.in/",
        "https://www.instagram.com/placibo_official/",
        "https://www.youtube.com/@placiboeducationalplatform7119",
        "https://in.linkedin.com/company/placibo-technologies-private-limited"
      ]
    },
    {
      "@type": "LocalBusiness",
      "name": "Placibo",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1/40-M, PCM Colony, Viralur, Parangi Malai, Chennai, St.Thomas Mount",
        "addressLocality": "Chennai",
        "addressRegion": "Tamilnadu",
        "postalCode": "600016"
      },
      "image": "https://www.placibo.in/logo.png",
      "email": "info@placibo.in",
      "telephone": "095666 27297",
      "url": "https://www.placibo.in/",
      "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-18:00",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "13.0070137",
        "longitude": "80.2017889"
      },
      "priceRange": "₹"
    }
  ]
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
    <main className="pt-20 md:pt-16 relative z-20">
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