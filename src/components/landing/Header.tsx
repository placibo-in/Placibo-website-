"use client";

import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Code className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Placibo</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">About</a>
          <a href="#learn" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Curriculum</a>
          <a href="#why" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Why Us</a>
          <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
        </nav>
        <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
      </div>
    </header>
  );
};