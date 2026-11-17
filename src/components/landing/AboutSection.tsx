"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Network, Cloud, Globe } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const tracks = [
  {
    icon: Shield,
    title: "SOC / Blue Team",
    description: "Threat investigation, incident response and detection with SIEM tools such as Microsoft Sentinel.",
  },
  {
    icon: Network,
    title: "Network Security",
    description: "Networking foundations and Cisco security pathways, from CCST to CCNA.",
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    description: "Cloud fundamentals, identity and access management, and role-aligned AWS or Microsoft credentials.",
  },
  {
    icon: Globe,
    title: "Web / Application Security",
    description: "Authorised hands-on labs with PortSwigger Web Security Academy, then advanced training.",
  },
];

export const AboutSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      className={cn(
        "py-10 md:py-16 bg-white transition-all duration-700 ease-in-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Cyber Security Roles</h2><br></br>
          <p className="text-lg md:text-xl leading-relaxed">
            Placibo teaches CyberSecurity for students, freshers and aspiring security professionals. Pick a career
            track, follow the roadmap, and build skills, a portfolio and an industry network.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map(({ icon: Icon, title, description }) => (
            <Link key={title} to="/courses/cybersecurity" className="block" aria-label={`${title}: view the program`}>
              <Card className="flex flex-col h-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex-row items-center gap-3">
                  <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-700 text-sm md:text-base">{description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};