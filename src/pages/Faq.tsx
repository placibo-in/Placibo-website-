import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { EnrollmentDialog } from "@/components/landing/EnrollmentDialog";

const faqData = [
  {
    question: "What is the duration of the courses?",
    answer: "Most of our core programs, like UI/UX Design and Frontend/Backend Development, are 4 months long. The Generative AI program is slightly longer at 5 months. This duration is designed to take you from beginner to job-ready.",
  },
  {
    question: "Are these courses suitable for complete beginners?",
    answer: "Absolutely! Our courses are designed to cater to everyone, from complete beginners with no prior experience to those with some foundational knowledge. We start with the basics and build up to advanced concepts.",
  },
  {
    question: "Will I get a certificate upon completion?",
    answer: "Yes, upon successful completion of any course, you will receive a certificate from Placibo that you can share on your LinkedIn profile and add to your resume.",
  },
  {
    question: "Do you provide job assistance?",
    answer: "We are deeply invested in your career success. While we don't guarantee job placement, we provide comprehensive job assistance, including portfolio reviews, resume building workshops, mock interviews, and access to our network of hiring partners.",
  },
  {
    question: "What kind of support can I expect during the course?",
    answer: "You'll have multiple layers of support. This includes 1-on-1 mentorship sessions with industry experts, live Q&A sessions with instructors, and access to a vibrant community of fellow learners and alumni for peer support.",
  },
  {
    question: "Can I pay the course fee in installments?",
    answer: "Yes, we offer flexible payment options, including EMI plans, to make our courses more accessible. Please get in touch with our admissions team through the contact section to learn more about the payment plans.",
  },
];

const FaqPage = () => {
  return (
    <>
      <EnrollmentDialog />
      <Header />
      <main className="bg-white">
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
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-base md:text-lg text-left">{faq.question}</AccordionTrigger>
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