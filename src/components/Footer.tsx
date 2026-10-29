import React from 'react';
import { Phone, MessageSquare, Mail, MapPin, Shield, ArrowUp } from 'lucide-react';
import { CompanyInfo } from '../types';

interface FooterProps {
  company: CompanyInfo | null;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ company, onOpenAdmin }) => {
  const phone = company?.phone || '+91 9427409949';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#172544] text-white border-t border-[#23355d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Identity & Logo */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/95 p-1 rounded flex items-center justify-center shrink-0 shadow-xs">
                <img
                  src="/assets/aistudio/output-onlinepngtools_5df256ce.png"
                  alt="Vaibhavgiri Goswami & Associates Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-wider uppercase block leading-none text-white font-bank-gothic-lt">
                  Vaibhavgiri Goswami
                </span>
                <span className="text-xs font-semibold text-slate-300 tracking-widest uppercase block mt-0.5 font-bank-gothic-lt">
                  & Associates
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-0.5 font-medium">
                  Civil Engineering Consultants
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm pt-2">
              Delivering disciplined civil engineering consultancy, structural coordination, independent site supervision, and turnkey construction management solutions with absolute transparency.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{phone}</span>
              </a>

              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-700/80 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-700 pb-2">
              Website Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home & Overview</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us & Principles</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Civil Engineering Services</a>
              </li>
              <li>
                <a href="#interior-design" className="hover:text-white transition-colors text-amber-300 font-medium">Architectural Interior Design</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">Project Sectors We Serve</a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">Our 7-Step Process</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Request a Consultation</a>
              </li>
            </ul>
          </div>

          {/* Core Services Quick Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-700 pb-2">
              Key Engineering Practices
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="text-slate-400">·</span>
                <span>Structural Design Coordination</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-slate-400">·</span>
                <span>Independent Site Supervision</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-slate-400">·</span>
                <span>Residential, Commercial & Industrial Construction</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-slate-400">·</span>
                <span>RCC, Masonry & Finishing Labour Contracts</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-slate-400">·</span>
                <span>Turnkey Project Execution</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-slate-400">·</span>
                <span>BOQ Preparation & Contractor Billing Verification</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-slate-700/60 text-[11px] text-slate-400">
              <p>Email: {company?.email || 'contact@vaibhavgirigoswami.com'}</p>
              <p className="mt-1">Hours: {company?.workingHours || 'Mon – Sat: 9:30 AM to 7:00 PM'}</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Portal Access */}
        <div className="mt-12 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Vaibhavgiri Goswami & Associates. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
