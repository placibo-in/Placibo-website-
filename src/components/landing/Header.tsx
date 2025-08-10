"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { onOpen } = useEnrollmentDialog();

  const handleEnrollClick = () => {
    onOpen();
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white/10 backdrop-blur-md border-b border-white/20 fixed top-0 z-50 transition-colors duration-500">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Placibo Logo" className="h-10" />
        </a>
        
        <nav className="hidden md:flex items-center gap-8 text-white font-medium tracking-wide">
          <a href="/#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="/#why" className="hover:text-blue-400 transition-colors">Why Us</a>
          <a href="/faq" className="hover:text-blue-400 transition-colors">FAQ</a>
          <a href="/#contact" className="hover:text-blue-400 transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-6">
          <Button onClick={onOpen} className="btn-glow hidden md:inline-flex px-6 py-2">
            Enroll Now
          </Button>
          <button 
            className="md:hidden text-white hover:text-blue-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 absolute top-full left-0 right-0 shadow-lg py-6 px-6 glass-card animate-fade-in">
          <div className="flex flex-col gap-6 text-white font-semibold tracking-wide">
            <a 
              href="/#about" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="/#why" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why Us
            </a>
            <a 
              href="/faq" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a 
              href="/#contact" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Button onClick={handleEnrollClick} className="btn-glow w-full mt-4 py-3">
              Enroll Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};