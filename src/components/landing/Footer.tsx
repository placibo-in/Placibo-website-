"use client";

import { Instagram, MessageCircle } from "lucide-react";

export const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9566627297', '_blank');
  };

  return (
    <footer className="bg-white text-gray-700 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left Side: Logo and Copyright */}
          <div className="text-center md:text-left">
            <a href="/" className="inline-block mb-2">
              <img src="/logo.png" alt="Placibo Logo" className="h-9 mx-auto md:mx-0" />
            </a>
            <p className="text-sm text-gray-500 mt-2">
              &copy; {new Date().getFullYear()} Placibo. All rights reserved.
            </p>
          </div>

          {/* Right Side: Navigation and Socials */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <a href="/#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="/#why" className="hover:text-blue-600 transition-colors">Why Us</a>
              <a href="/faq" className="hover:text-blue-600 transition-colors">FAQ</a>
              <a href="/#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <a 
                href="https://www.instagram.com/placibo_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="text-gray-500 hover:text-blue-600 transition-colors p-2"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <button 
                aria-label="WhatsApp" 
                className="text-gray-500 hover:text-blue-600 transition-colors p-2"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};