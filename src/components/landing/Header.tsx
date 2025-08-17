"use client";

import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesMenuOpen, setCoursesMenuOpen] = useState(false);
  const { onOpen } = useEnrollmentDialog();

  const handleEnrollClick = () => {
    onOpen();
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full py-3 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200 fixed top-0 z-50 transition-colors duration-500 text-gray-900 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Placibo Logo" className="h-8 md:h-10" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 font-medium tracking-wide text-sm sm:text-base">
          <a href="/#about" className="hover:text-blue-600 transition-colors text-gray-900">About</a>
          <a href="/#why" className="hover:text-blue-600 transition-colors text-gray-900">Why Us</a>
          <Link to="/student-work" className="hover:text-blue-600 transition-colors text-gray-900">Student Work</Link>
          <Link to="/blog" className="hover:text-blue-600 transition-colors text-gray-900">Blog</Link>
          <Link to="/faq" className="hover:text-blue-600 transition-colors text-gray-900">FAQ</Link>
          <a href="/#contact" className="hover:text-blue-600 transition-colors text-gray-900">Contact</a>

          <div 
            className="relative group"
            onMouseEnter={() => setCoursesMenuOpen(true)}
            onMouseLeave={() => setCoursesMenuOpen(false)}
          >
            <button 
              type="button"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors text-gray-900 font-medium"
              aria-haspopup="true"
              aria-expanded={coursesMenuOpen}
            >
              Courses <ChevronDown size={16} />
            </button>
            {coursesMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <Link 
                  to="/courses" 
                  className="block px-4 py-2 text-gray-900 hover:bg-blue-50"
                  onClick={() => setCoursesMenuOpen(false)}
                >
                  All Courses
                </Link>
                <Link 
                  to="/courses/ui-ux-design" 
                  className="block px-4 py-2 text-gray-900 hover:bg-blue-50"
                  onClick={() => setCoursesMenuOpen(false)}
                >
                  UI/UX Design
                </Link>
                <Link 
                  to="/courses/frontend-development" 
                  className="block px-4 py-2 text-gray-900 hover:bg-blue-50"
                  onClick={() => setCoursesMenuOpen(false)}
                >
                  Frontend Development
                </Link>
                <Link 
                  to="/courses/backend-nodejs" 
                  className="block px-4 py-2 text-gray-900 hover:bg-blue-50"
                  onClick={() => setCoursesMenuOpen(false)}
                >
                  Backend Node.js
                </Link>
                <Link 
                  to="/courses/backend-django" 
                  className="block px-4 py-2 text-gray-900 hover:bg-blue-50"
                  onClick={() => setCoursesMenuOpen(false)}
                >
                  Backend Django
                </Link>
                <Link 
                  to="/courses/generative-ai" 
                  className="block px-4 py-2 text-gray-900 hover:bg-blue-50"
                  onClick={() => setCoursesMenuOpen(false)}
                >
                  Generative AI
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <Button onClick={onOpen} className="btn-glow hidden md:inline-flex px-5 py-2 text-sm sm:text-base">
            Enroll Now
          </Button>
          <button 
            className="md:hidden text-gray-900 hover:text-blue-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute top-full left-0 right-0 shadow-lg py-5 px-6 animate-fade-in">
          <div className="flex flex-col gap-5 font-semibold tracking-wide text-base text-gray-900">
            <a 
              href="/#about" 
              className="hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="/#why" 
              className="hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why Us
            </a>
            <Link 
              to="/student-work" 
              className="hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Student Work
            </Link>
            <Link 
              to="/blog" 
              className="hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/faq" 
              className="hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <a 
              href="/#contact" 
              className="hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Link 
              to="/courses" 
              className="hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
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