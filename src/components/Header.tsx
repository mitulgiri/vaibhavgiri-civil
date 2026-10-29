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
    { label: 'Interior Design', href: '#interior-design' },
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
      <div className="bg-[#172544] text-slate-200 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#24355c]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="font-semibold text-white tracking-wide uppercase text-[10px] sm:text-[11px] truncate">
              Civil Engineering Consultants
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden md:inline text-[11px] truncate">
              Planning · Structural Design · Site Supervision · Interior Design · Turnkey Execution
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs shrink-0">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-white hover:text-slate-200 font-medium transition-colors text-[11px] sm:text-xs min-h-[32px] items-center"
            >
              <Phone className="w-3.5 h-3.5 text-slate-300" />
              <span>{phone}</span>
            </a>
            <span className="text-slate-400">|</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer text-[10px] sm:text-[11px] py-1"
              title="VGA Administrative Portal"
            >
              <Shield className="w-3 h-3 text-slate-400" />
              <span>{isAdminOpen ? 'Close' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`bg-white transition-shadow duration-200 ${
          isScrolled ? 'shadow-md border-b border-slate-200 py-2.5 sm:py-3' : 'border-b border-slate-100 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 sm:gap-3.5 group cursor-pointer min-w-0"
          >
            <div className="w-9 h-9 xs:w-11 xs:h-11 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
              <img
                src="/assets/aistudio/output-onlinepngtools_5df256ce.png"
                alt="Vaibhavgiri Goswami & Associates Logo"
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-[12px] min-[360px]:text-[13px] min-[400px]:text-sm sm:text-base lg:text-lg tracking-normal min-[380px]:tracking-wider text-[#172544] uppercase leading-tight font-bank-gothic-lt whitespace-nowrap">
                Vaibhavgiri Goswami
              </span>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-xs font-semibold text-[#77797C] tracking-widest uppercase mt-0.5 font-bank-gothic-lt whitespace-nowrap">
                & Associates
              </span>
              <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-slate-500 uppercase font-medium tracking-wider mt-0.5 hidden sm:block whitespace-nowrap">
                Civil Engineering Consultants
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Clean straight horizontal line, no word-wrapping) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 flex-nowrap shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs xl:text-sm font-medium text-slate-700 hover:text-[#172544] relative py-1 transition-colors hover:border-b-2 hover:border-[#172544] whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle Button (Clean single button on right, preventing overlap on brand name) */}
          <div className="flex items-center lg:hidden shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-slate-700 hover:text-[#172544] rounded hover:bg-slate-100 transition-colors focus:outline-hidden cursor-pointer"
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
