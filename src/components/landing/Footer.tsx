"use client";

import { Code, Instagram, MessageCircle } from "lucide-react";

export const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9566627297', '_blank');
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Code className="h-6 w-6 text-blue-500" />
          <p className="font-bold text-white">Placibo</p>
        </div>
        <p className="text-center md:text-left mb-4 md:mb-0">Placibo – Design your future with us.</p>
        <div className="flex items-center gap-6">
          <a href="#" aria-label="Instagram" className="hover:text-white transition-colors"><Instagram className="h-6 w-6" /></a>
          <button 
            aria-label="WhatsApp" 
            className="hover:text-white transition-colors"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="text-center mt-6 pt-6 border-t border-gray-700 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Placibo. All rights reserved.
      </div>
    </footer>
  );
};