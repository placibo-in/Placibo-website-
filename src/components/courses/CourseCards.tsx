"use client";

import { Link } from "react-router-dom";
import { Shield, BarChart3, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/data/courses";

const icons = { shield: Shield, chart: BarChart3, database: Database };

export const CourseCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {courses.map((c) => {
      const Icon = icons[c.icon];
      const card = (
        <Card
          className={
            c.status === "live"
              ? "flex h-full flex-col shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              : "flex h-full flex-col border-dashed bg-gray-50 opacity-90"
          }
        >
          <CardHeader className="gap-3">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <Badge variant={c.status === "live" ? "secondary" : "outline"}>{c.meta}</Badge>
            </div>
            <div>
              <CardTitle className="text-xl">{c.title}</CardTitle>
              <p className="mt-1 text-sm font-medium text-blue-700">{c.tagline}</p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between gap-4">
            <p className="text-sm text-gray-600 md:text-base">{c.description}</p>
            {c.status === "live" && <span className="text-sm font-semibold text-blue-600">View course &rarr;</span>}
          </CardContent>
        </Card>
      );
      return c.status === "live" ? (
        <Link key={c.slug} to={c.href} aria-label={`View the ${c.title} course`} className="block">
          {card}
        </Link>
      ) : (
        <div key={c.slug}>{card}</div>
      );
    })}
  </div>
);
