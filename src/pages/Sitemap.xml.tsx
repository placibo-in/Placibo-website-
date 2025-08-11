import { supabase } from "@/integrations/supabase/client";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }: { res: any }) => {
  const baseUrl = "https://placibo.in"; // Please replace with your actual domain

  // Static pages
  const staticPages = [
    "",
    "faq",
    "login",
    "admin",
    "courses",
    "courses/ui-ux-design",
    "courses/frontend-development",
    "courses/backend-nodejs",
    "courses/backend-django",
    "courses/generative-ai",
  ];

  // Fetch dynamic pages if any (e.g., hero slides or reels) - skipping for now

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `,
      )
      .join("")}
  </urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;