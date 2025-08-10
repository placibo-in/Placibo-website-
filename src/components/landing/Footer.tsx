"use client";

import { Instagram, MessageCircle } from "lucide-react";

export const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9566627297', '_blank');
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="md:col-span-1">
            <a href="/" className="inline-block mb-3">
              <img src="/logo.png" alt="Placibo Logo" className="h-6 mx-auto md:mx-0" />
            </a>
            <p className="text-sm">Placibo – Design your future with us.</p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold text-white mb-3">Navigate</h3>
            <ul className="space-y-1">
              <li><a href="/#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/#why" className="hover:text-white transition-colors">Why Us</a></li>
              <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-semibold text-white mb-3">Connect</h3>
            <div className="flex items-center justify-center md:justify-start gap-5">
              <a 
                href="https://www.instagram.com/placibo_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <button 
                aria-label="WhatsApp" 
                className="hover:text-white transition-colors"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 pt-6 border-t border-gray-700 text-xs md:text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Placibo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};