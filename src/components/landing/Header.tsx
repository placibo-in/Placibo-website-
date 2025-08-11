"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { onOpen } = useEnrollmentDialog();

  const handleEnrollClick = () => {
    onOpen();
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full py-3 px-4 sm:px-6 lg:px-8 bg-white/10 backdrop-blur-md border-b border-white/20 fixed top-0 z-50 transition-colors duration-500">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Placibo Logo" className="h-8 sm:h-10" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-white font-medium tracking-wide text-sm sm:text-base">
          <Link to="/#about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link to="/#why" className="hover:text-blue-400 transition-colors">Why Us</Link>
          <Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link>
          <Link to="/#contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          <Link to="/courses/ui-ux-design" className="hover:text-blue-400 transition-colors">UI/UX Design</Link>
          <Link to="/courses/frontend-development" className="hover:text-blue-400 transition-colors">Frontend Dev</Link>
          <Link to="/courses/backend-nodejs" className="hover:text-blue-400 transition-colors">Backend Node.js</Link>
          <Link to="/courses/backend-django" className="hover:text-blue-400 transition-colors">Backend Django</Link>
          <Link to="/courses/generative-ai" className="hover:text-blue-400 transition-colors">Generative AI</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button onClick={onOpen} className="btn-glow hidden md:inline-flex px-5 py-2 text-sm sm:text-base">
            Enroll Now
          </Button>
          <button 
            className="md:hidden text-white hover:text-blue-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-transparent border-t border-white/20 absolute top-full left-0 right-0 shadow-lg py-5 px-6 animate-fade-in">
          <div className="flex flex-col gap-5 text-white font-semibold tracking-wide text-base">
            <Link 
              to="/#about" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/#why" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why Us
            </Link>
            <Link 
              to="/faq" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              to="/#contact" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/courses/ui-ux-design" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              UI/UX Design
            </Link>
            <Link 
              to="/courses/frontend-development" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Frontend Dev
            </Link>
            <Link 
              to="/courses/backend-nodejs" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Backend Node.js
            </Link>
            <Link 
              to="/courses/backend-django" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Backend Django
            </Link>
            <Link 
              to="/courses/generative-ai" 
              className="hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Generative AI
            </Link>
            <Button onClick={handleEnrollClick} className="btn-glow w-full mt-4 py-3 text-base">
              Enroll Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};