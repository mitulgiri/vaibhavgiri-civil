import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, Shield, ArrowUpRight } from 'lucide-react';
import { CompanyInfo } from '../types';

interface HeaderProps {
  company: CompanyInfo | null;
  onOpenAdmin: () => void;
  isAdminOpen: boolean;
  onSelectServiceForInquiry?: (serviceId: string, serviceTitle: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  company,
  onOpenAdmin,
  isAdminOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phone = company?.phone || '+91 9427409949';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello Vaibhavgiri Goswami & Associates, I would like to consult with your civil engineering team regarding a project.'
  )}`;

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Our Process', href: '#process' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Engineering Micro-Bar */}
      <div className="bg-[#172544] text-slate-200 text-xs py-2 px-4 border-b border-[#24355c]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white tracking-wide uppercase text-[11px]">
              Civil Engineering Consultants
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden md:inline">
              Structural Planning · Site Supervision · Turnkey Execution
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-white hover:text-slate-200 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-300" />
              <span>{phone}</span>
            </a>
            <span className="text-slate-400">|</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
              title="VGA Administrative Portal"
            >
              <Shield className="w-3 h-3 text-slate-400" />
              <span>{isAdminOpen ? 'Close Portal' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`bg-white transition-shadow duration-200 ${
          isScrolled ? 'shadow-md border-b border-slate-200 py-3' : 'border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white p-1 rounded-sm border border-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-xs">
              <img
                src="/assets/aistudio/IMG-20261024-WA0009_0616dd03.jpg"
                alt="Vaibhavgiri Goswami & Associates Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#172544] uppercase leading-none font-sans">
                Vaibhavgiri Goswami
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#77797C] tracking-widest uppercase mt-0.5">
                & Associates
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-medium tracking-wider mt-0.5 hidden xs:block">
                Civil Engineering Consultants
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-700 hover:text-[#172544] relative py-1 transition-colors hover:border-b-2 hover:border-[#172544]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#172544] bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#172544] hover:bg-[#1f325d] rounded transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="p-2 text-[#172544] bg-slate-100 rounded hover:bg-slate-200"
              aria-label="Call direct phone"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#172544] focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 rounded transition-colors"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-[#172544] rounded text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {phone}</span>
                </a>
                
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-center"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Inquire via WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-600 py-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span>Administrator Portal Access</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
