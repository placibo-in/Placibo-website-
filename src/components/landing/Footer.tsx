"use client";

import { Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9566627297', '_blank');
  };

  return (
    <footer className="bg-white text-gray-700 py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Side: Logo and Copyright */}
          <div className="text-center md:text-left">
            <a href="/" className="inline-block mb-2">
              <img src="/logo.png" alt="Placibo Logo" className="h-8 mx-auto md:mx-0" />
            </a>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Placibo. All rights reserved.
            </p>
          </div>

          {/* Right Side: Navigation and Socials */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-medium">
              <a href="/#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="/#why" className="hover:text-blue-600 transition-colors">Why Us</a>
              <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              <Link to="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link>
              <a href="/#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/placibo_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <button 
                aria-label="WhatsApp" 
                className="text-gray-500 hover:text-blue-600 transition-colors"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};