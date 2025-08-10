"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { onOpen } = useEnrollmentDialog();

  const handleEnrollClick = () => {
    onOpen();
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Placibo Logo" className="h-8" />
        </a>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="/#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">About</a>
          <a href="/#why" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Why Us</a>
          <a href="/faq" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">FAQ</a>
          <a href="/#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button onClick={onOpen} className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
          <button 
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg py-4 px-6">
          <div className="flex flex-col gap-4">
            <a 
              href="/#about" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="/#why" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why Us
            </a>
            <a 
              href="/faq" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a 
              href="/#contact" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Button onClick={handleEnrollClick} className="w-full bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
          </div>
        </div>
      )}
    </header>
  );
};