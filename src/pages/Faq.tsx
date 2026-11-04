import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { EnrollmentDialog } from "@/components/landing/EnrollmentDialog";
import { Helmet } from "react-helmet-async";

// TODO: replace the "duration, fees and certificate" answer with your real details.
const faqData = [
  {
    question: "Who is the Cybersecurity Endurance Program for?",
    answer:
      "Students, freshers and aspiring cybersecurity professionals. You can start from zero and follow the roadmap from beginner to expert, choosing one career track such as SOC / Blue Team, Network Security, Cloud Security or Web / Application Security.",
  },
  {
    question: "I am a complete beginner. Where do I start?",
    answer:
      "Start with Cisco fundamentals and Microsoft SC-900 learning, then consider the Cisco CCST Cybersecurity credential. Knowledge goals at this stage include the CIA triad, the difference between threat, vulnerability, risk and incident, and basics like MFA, phishing, patching, backups and least privilege.",
  },
  {
    question: "What do I get in the program that is not in the public roadmap?",
    answer:
      "The roadmap lists learning resources and certification options. After you join the program, you also get structured practical tasks, guided project work, expert feedback and portfolio-strengthening assignments.",
  },
  {
    question: "Do certifications guarantee a job?",
    answer:
      "No. No certification or course guarantees employment. Expertise comes from sustained practice, deeper specialisation and sound security decisions, not from collecting certificates alone.",
  },
  {
    question: "Are certification exams and training included in the fee?",
    answer:
      "Certification exams, subscriptions, training and retakes are run by the issuing providers and may involve their own fees. Names, prerequisites, formats and prices can change, so check the provider's official page for current details.",
  },
  {
    question: "What are the program duration, fees and certificate details?",
    answer:
      "Please contact our team on WhatsApp at 95666 27297 or call 91762 44120. Tell us your current level, preferred career track and any courses or certifications you have completed, and we will guide you from your starting point.",
  },
];

const FaqPage = () => {
  return (
    <>
      <Helmet>
        <title>FAQ | Placibo Cybersecurity</title>
        <meta
          name="description"
          content="Answers to common questions about the Placibo Cybersecurity Endurance Program, the career roadmap and certifications."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          })}
        </script>
      </Helmet>
      <EnrollmentDialog />
      <Header />
      <main className="bg-white pt-20 md:pt-24">
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
              <p className="mt-2 max-w-xl mx-auto text-base md:text-lg text-gray-600">
                Have questions? We've got answers. If you can't find what you're looking for, feel free to reach out to us.
              </p>
            </div>
            <div className="max-w-xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={faq.question}>
                    <AccordionTrigger className="text-base md:text-lg text-left text-gray-900 font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FaqPage;