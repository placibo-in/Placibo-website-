import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { CybersecurityRoadmapSection } from "@/components/landing/CybersecurityRoadmapSection";
import { WhyPlaciboSection } from "@/components/landing/WhyPlaciboSection";
import { GoogleReviewsSection } from "@/components/landing/GoogleReviewsSection";
import { CollaborationsSection } from "@/components/landing/CollaborationsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { FloatingActionButton } from "@/components/landing/FloatingActionButton";
import { LoadingScreen } from "@/components/landing/LoadingScreen";
import { EnrollmentDialog } from "@/components/landing/EnrollmentDialog";

const url = "https://www.placibo.in";
const title = "Placibo – Cybersecurity Training & Career Roadmap in Chennai";
const description =
  "Placibo helps students and freshers build a cybersecurity career: a beginner-to-expert roadmap, industry-recognised certifications, guided tasks, expert feedback and portfolio work.";
const imageUrl = `${url}/logo.png`;

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${url}/`,
      url: `${url}/`,
      name: "Cybersecurity Training in Chennai",
      isPartOf: { "@id": `${url}/#website` },
      about: { "@id": `${url}/#organization` },
      description,
      breadcrumb: { "@id": `${url}/#breadcrumb` },
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}/#breadcrumb`,
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${url}/` }],
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url: `${url}/`,
      name: "Placibo – Cybersecurity Training",
      description,
      publisher: { "@id": `${url}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "Organization",
      "@id": `${url}/#organization`,
      name: "Placibo",
      url,
      logo: `${url}/logo.png`,
      contactPoint: { "@type": "ContactPoint", telephone: "+91-9566627297", contactType: "customer service" },
      sameAs: [
        "https://www.facebook.com/placibo.in/",
        "https://www.youtube.com/@placiboeducationalplatform7119",
        "https://in.linkedin.com/company/placibo-technologies-private-limited",
      ],
    },
    {
      "@type": "LocalBusiness",
      name: "Placibo",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1/40-M, PCM Colony, Viralur, Parangi Malai, Chennai, St.Thomas Mount",
        addressLocality: "Chennai",
        addressRegion: "Tamilnadu",
        postalCode: "600016",
      },
      image: imageUrl,
      email: "info@placibo.in",
      telephone: "+91-9566627297",
      url: `${url}/`,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      geo: { "@type": "GeoCoordinates", latitude: "13.0070137", longitude: "80.2017889" },
      priceRange: "₹",
    },
  ],
};

const Index = () => (
  <div className="bg-white text-gray-800 antialiased">
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="cybersecurity course Chennai, cybersecurity training, cybersecurity career roadmap, SOC analyst training, Placibo Cybersecurity Endurance Program"
      />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content="Placibo – Cybersecurity Career Roadmap" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Cybersecurity Training in Chennai | Placibo" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
    </Helmet>
    <LoadingScreen />
    <EnrollmentDialog />
    <Header />
    <main className="pt-20 md:pt-16 relative z-20">
      <HeroSection />
      <AboutSection />
      <CybersecurityRoadmapSection />
      <WhyPlaciboSection />
      <GoogleReviewsSection />
      <CollaborationsSection />
      <ContactSection />
    </main>
    <Footer />
    <FloatingActionButton />
  </div>
);

export default Index;