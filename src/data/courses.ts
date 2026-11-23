export type Course = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  status: "live" | "soon";
  icon: "shield" | "chart" | "database";
  meta: string;
};

// Add or edit courses here. Set status to "live" when the course page is ready.
export const courses: Course[] = [
  {
    slug: "cybersecurity",
    title: "Cybersecurity Endurance Program",
    tagline: "Beginner to specialist",
    description:
      "A clear roadmap with certifications and career tracks, plus guided tasks, expert feedback and portfolio assignments.",
    href: "/courses/cybersecurity",
    status: "live",
    icon: "shield",
    meta: "5-stage roadmap",
  },
  {
    slug: "power-bi",
    title: "Power BI",
    tagline: "Data analytics and dashboards",
    description:
      "Learn Power Query, data modelling, DAX and dashboards, then publish with Power BI Service and finish with a portfolio project.",
    href: "/courses/power-bi",
    status: "live",
    icon: "chart",
    meta: "6-week learning plan",
  },
  {
    slug: "data-science",
    title: "Data Science",
    tagline: "Python, statistics and machine learning",
    description: "Our Data Science program is being prepared. Contact us to be notified when it opens.",
    href: "/courses/data-science",
    status: "soon",
    icon: "database",
    meta: "Coming soon",
  },
];
