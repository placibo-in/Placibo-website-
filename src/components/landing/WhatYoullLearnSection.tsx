"use client";

import { PenTool, LayoutGrid, Smartphone, GitBranch, Code } from "lucide-react";

const topics = [
  { icon: <PenTool className="h-6 w-6 text-blue-600" />, name: "UX Basics" },
  { icon: <LayoutGrid className="h-6 w-6 text-blue-600" />, name: "UI Design" },
  { icon: <Smartphone className="h-6 w-6 text-blue-600" />, name: "Responsive Layouts" },
  { icon: <GitBranch className="h-6 w-6 text-blue-600" />, name: "Prototyping" },
  { icon: <Code className="h-6 w-6 text-blue-600" />, name: "Front-End Code" },
];

export const WhatYoullLearnSection = () => {
  return (
    <section id="learn" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What You'll Learn</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            A curriculum designed to take you from beginner to proficient.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {topics.map((topic) => (
            <div key={topic.name} className="flex flex-col items-center gap-3">
              <div className="bg-gray-100 rounded-full p-4">
                {topic.icon}
              </div>
              <p className="font-semibold text-gray-800">{topic.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};