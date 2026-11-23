"use client";

import { Helmet } from "react-helmet-async";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { EnrollmentDialog } from "@/components/landing/EnrollmentDialog";
import { ContactSection } from "@/components/landing/ContactSection";
import { FloatingActionButton } from "@/components/landing/FloatingActionButton";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const weeks = [
  {
    title: "Power BI fundamentals",
    topics: [
      "What Power BI is and its role in business intelligence and analytics",
      "Power BI Desktop vs. Power BI Service: key differences and when to use each",
      "Analyse an existing report: pages, visuals, filters, tables and measures",
    ],
  },
  {
    title: "Power Query and data cleaning",
    topics: [
      "Merge vs. Append, with a simple example",
      "Five useful transformations: change data types, remove duplicates, replace values, split columns, pivot/unpivot",
      "Clean a retail dataset: raw data, transformations and final result",
    ],
  },
  {
    title: "Data modelling and DAX fundamentals",
    topics: [
      "Star schema: fact tables, dimension tables and relationships",
      "Calculated columns vs. measures, and when to use each",
      "Five essential DAX functions: CALCULATE, SUMX, COUNTROWS, DISTINCTCOUNT and DIVIDE",
    ],
  },
  {
    title: "Advanced DAX and dashboard development",
    topics: [
      "Calculate year-over-year (YoY) growth",
      "Build KPI cards: revenue, profit, margin and growth indicators",
      "Retail dashboard walkthrough: report pages, slicers, visuals and business insights",
    ],
  },
  {
    title: "Power BI Service and performance",
    topics: [
      "Publishing, workspaces, apps and semantic models",
      "How scheduled refresh works: gateways, refresh schedules and common refresh issues",
      "Optimising reports: Performance Analyzer, model design, and reducing unnecessary visuals or calculations",
    ],
  },
  {
    title: "Real-world projects and portfolio",
    topics: [
      "End-to-end project: business problem, data sources, transformations, model and dashboard",
      "Business insights from your dashboard and how they support decisions",
      "Review: key lessons, projects completed and next learning goals",
    ],
  },
];

const rhythm = [
  ["Monday", "Learn and explain one Power BI concept."],
  ["Wednesday", "Work through a practical, step-by-step example."],
  ["Friday", "Share a dashboard, project or learning experience."],
];

const PowerBIPage = () => {
  const { onOpen } = useEnrollmentDialog();

  return (
    <>
      <Helmet>
        <title>Power BI Course | Placibo</title>
        <meta
          name="description"
          content="A 6-week Power BI learning plan: Power Query, data modelling, DAX, dashboards, Power BI Service and a portfolio project."
        />
        <link rel="canonical" href="https://www.placibo.in/courses/power-bi" />
      </Helmet>
      <EnrollmentDialog />
      <Header />
      <main className="pt-20 md:pt-16">
        <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-700 px-4 py-16 text-center text-white md:py-24">
          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Learn Power BI, from data to dashboard
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-blue-100 md:text-lg">
            A 6-week plan covering Power Query, data modelling, DAX, dashboards and Power BI Service, ending with a
            portfolio project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={onOpen} className="bg-white px-6 text-blue-900 hover:bg-blue-50">
              Enroll Now
            </Button>
            <Button
              onClick={() => document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-white/60 bg-transparent px-6 text-white hover:bg-white/10"
            >
              See the 6-week plan
            </Button>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">How each week works</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {rhythm.map(([day, text]) => (
                <div key={day} className="rounded-lg border border-gray-200 p-5">
                  <h3 className="font-semibold text-blue-700">{day}</h3>
                  <p className="mt-1 text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="plan" className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">6-week learning plan</h2>
            <p className="mt-2 max-w-2xl text-gray-600">Each week builds on the one before it.</p>
            <Accordion type="single" collapsible defaultValue="week-1" className="mt-8 space-y-3">
              {weeks.map((w, i) => (
                <AccordionItem key={w.title} value={`week-${i + 1}`} className="rounded-lg border bg-white px-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    <span className="mr-3 inline-flex h-8 shrink-0 items-center justify-center rounded-full bg-blue-600 px-3 text-sm text-white">
                      Week {i + 1}
                    </span>
                    <span className="flex-1">{w.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-1 pb-3 pl-5 text-gray-700">
                      {w.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Share your work</h2>
            <p className="mt-3 max-w-3xl text-gray-600">
              Publish what you learn each week on LinkedIn: educational posts, carousels, project walkthroughs and
              lessons learned. It builds a visible portfolio while you study.
            </p>
            <h2 className="mt-10 text-2xl font-bold text-gray-900 md:text-3xl">Certification to explore</h2>
            <p className="mt-3 max-w-3xl text-gray-600">
              Microsoft Certified: Power BI Data Analyst Associate (exam PL-300) is the usual next step after this
              plan. Check the{" "}
              <a
                className="font-medium text-blue-600 underline"
                href="https://learn.microsoft.com/certifications/resources/study-guides/pl-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                official study guide
              </a>{" "}
              for the current exam skills, fees and requirements.
            </p>
            <p className="mt-6 text-sm text-gray-500">No certification or course guarantees employment.</p>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
      <FloatingActionButton />
    </>
  );
};

export default PowerBIPage;
