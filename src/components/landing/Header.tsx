"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useEnrollmentDialog } from "@/hooks/use-enrollment-dialog";
import { Link } from "react-router-dom";

// "anchor" items scroll to a section on the home page; "route" items open a page.
const navItems = [
  { label: "About", href: "/#about", type: "anchor" },
  { label: "Why Us", href: "/#why", type: "anchor" },
  { label: "Roadmap", href: "/#roadmap", type: "anchor" },
  { label: "Student Work", href: "/student-work", type: "route" },
  { label: "Blog", href: "/blog", type: "route" },
  { label: "FAQ", href: "/faq", type: "route" },
  { label: "Contact", href: "/#contact", type: "anchor" },
] as const;

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { onOpen } = useEnrollmentDialog();

  const closeMenu = () => setMobileMenuOpen(false);

  const handleEnrollClick = () => {
    onOpen();
    closeMenu();
  };

  const renderItem = (item: (typeof navItems)[number], className: string, onClick?: () => void) =>
    item.type === "anchor" ? (
      <a key={item.label} href={item.href} className={className} onClick={onClick}>
        {item.label}
      </a>
    ) : (
      <Link key={item.label} to={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );

  return (
    <header className="w-full py-3 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200 fixed top-0 z-50 transition-colors duration-500 text-gray-900 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Placibo Logo" className="h-8 md:h-10" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-medium tracking-wide text-sm sm:text-base">
          {navItems.map((item) =>
            renderItem(item, "hover:text-blue-600 transition-colors text-gray-900")
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Button onClick={onOpen} className="btn-glow hidden md:inline-flex px-5 py-2 text-sm sm:text-base">
            Enroll Now
          </Button>
          <button
            className="md:hidden text-gray-900 hover:text-blue-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
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
            {navItems.map((item) =>
              renderItem(item, "hover:text-blue-600 transition-colors", closeMenu)
            )}
            <Button onClick={handleEnrollClick} className="btn-glow w-full mt-4 py-3 text-base">
              Enroll Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};