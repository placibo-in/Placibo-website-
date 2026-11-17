"use client";

import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-white text-gray-700 py-6 border-t border-gray-200">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: logo and copyright */}
        <div className="text-center md:text-left">
          <a href="/" className="inline-block mb-2">
            <img src="/logo.png" alt="Placibo Logo" className="h-8 mx-auto md:mx-0" />
          </a>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Placibo. All rights reserved.
          </p>
        </div>

        {/* Right: navigation, course and WhatsApp */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <nav aria-label="Footer">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-medium">
              <a href="/#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="/#why" className="hover:text-blue-600 transition-colors">Why Us</a>
              <a href="/#roadmap" className="hover:text-blue-600 transition-colors">Roadmap</a>
              <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              <Link to="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link>
              <a href="/#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </nav>
          <div className="text-center md:text-left">
            <div className="font-bold">Our Course:</div>
            <Link
              to="/courses/cybersecurity"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              CyberSecurity
            </Link>
          </div>
          <a
            href="https://wa.me/919566627297"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);