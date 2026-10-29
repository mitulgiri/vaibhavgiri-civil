import React from 'react';
import { Phone, ArrowRight, CheckCircle, ShieldCheck, Compass, Ruler, Building, Layout, Sparkles } from 'lucide-react';
import { CompanyInfo } from '../types';

interface HeroProps {
  company: CompanyInfo | null;
  onRequestConsultation: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  company,
  onRequestConsultation,
  onExploreServices,
}) => {
  const phone = company?.phone || '+91 9427409949';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  return (
    <section id="hero" className="relative bg-[#172544] text-white overflow-hidden">
      {/* Background Architectural Construction Photography with Navy Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=2000&q=85"
          alt="Civil Engineering and Modern Construction Architecture"
          className="w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#172544] via-[#172544]/95 to-[#172544]/80" />
        <div className="absolute inset-0 architectural-dark-grid opacity-30 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Engineering Sub-Header / Sector Indicator (Zero-Pill clean typography) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase text-slate-300">
              <span className="w-8 h-[2px] bg-slate-400 inline-block"></span>
              <span>Vaibhavgiri Goswami & Associates</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300 font-normal">Civil Engineering Consultants</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Building Your Vision with <br className="hidden sm:inline" />
              <span className="text-slate-200 underline decoration-slate-500 decoration-2 underline-offset-8">
                Engineering Excellence.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Reliable Civil Engineering Consultancy, Construction, and Project Management Solutions.
              Precision structural coordination, meticulous site supervision, and turnkey delivery.
            </p>

            {/* Action Buttons Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onRequestConsultation}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-[#172544] hover:bg-slate-100 font-bold text-sm rounded shadow-lg transition-all transform active:scale-98 cursor-pointer"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#172544]" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent hover:bg-white/10 text-white font-semibold text-sm rounded border border-slate-400 hover:border-white transition-all cursor-pointer"
              >
                <span>Explore Our Services</span>
              </button>

              {/* Prominent Call Now button linking directly to +91 9427409949 */}
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-800/90 hover:bg-slate-800 text-white font-semibold text-sm rounded border border-slate-600 transition-all shadow-md group"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-medium leading-none">
                    Direct Engineering Helpline
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-white mt-0.5">
                    {phone}
                  </span>
                </div>
              </a>
            </div>

            {/* Quality & Transparency Guarantees (Clean unboxed metadata) */}
            <div className="pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Strict Engineering Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Transparent BOQ & Billing</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Bespoke Interior Design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Milestone-Driven Execution</span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Schematic Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 p-6 rounded shadow-2xl relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-16 h-16 border-t-2 border-r-2 border-slate-400 opacity-60 pointer-events-none" />
              <div className="absolute bottom-0 left-0 transform -translate-x-2 translate-y-2 w-16 h-16 border-b-2 border-l-2 border-slate-400 opacity-60 pointer-events-none" />
              
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                <div className="w-9 h-9 p-0.5 bg-white/90 rounded shrink-0 flex items-center justify-center shadow-xs">
                  <img
                    src="/assets/aistudio/output-onlinepngtools_5df256ce.png"
                    alt="VGA Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    Engineering Consultation
                  </h2>
                  <p className="text-xs text-slate-400">Technical Scope & Supervision</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-200">
                <div className="flex items-start gap-2.5">
                  <Layout className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">Planning</span>
                    <span className="text-slate-300">Building layout, spatial planning & regulatory compliance</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Ruler className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">Structural Design Coordination</span>
                    <span className="text-slate-300">RCC framework, foundation depth & load optimization</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">Site Supervision Protocol</span>
                    <span className="text-slate-300">
                      RCC casting & curing, masonry & plastering, tile work, waterproofing & finishing inspection
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-white flex items-center gap-1.5">
                      <span>Interior Design & Fit-Outs</span>
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded font-bold">Trending</span>
                    </span>
                    <span className="text-slate-300">
                      3D spatial visualization, luxury modular kitchens & turnkey interior execution
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">Turnkey Accountability</span>
                    <span className="text-slate-300">Synchronized labour contracts, materials & timely handover</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Principal Consulting Engineer: {company?.founder || 'Vaibhavgiri Goswami'}</span>
                <span className="text-slate-300 font-medium">India</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
