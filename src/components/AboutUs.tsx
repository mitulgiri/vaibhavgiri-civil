import React from 'react';
import { Target, Compass, HardHat, FileCheck, CheckCircle2, Building, ShieldAlert } from 'lucide-react';
import { CompanyInfo } from '../types';

interface AboutUsProps {
  company: CompanyInfo | null;
  onOpenAdmin: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ company, onOpenAdmin }) => {
  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#77797C] mb-2">
            <span className="w-6 h-[2px] bg-[#172544] inline-block"></span>
            <span>Corporate Identity & Engineering Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172544] tracking-tight font-sans">
            About Vaibhavgiri Goswami & Associates
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            A civil engineering consultancy and construction services practice dedicated to bridging architectural designs with structural integrity, site discipline, and transparent project delivery.
          </p>
        </div>

        {/* 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Company Introduction & Verified Foundation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded border border-slate-200 shadow-xs">
              <h3 className="text-xl font-bold text-[#172544] mb-3">
                Company Introduction
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                <strong>Vaibhavgiri Goswami & Associates</strong> operates as a specialized civil engineering consultancy and project management entity. Founded under the technical leadership of <strong>{company?.founder || 'Vaibhavgiri Goswami'}</strong>, the firm provides end-to-end technical advisory, site supervision, structural design coordination, and quality-controlled construction services.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                Whether overseeing single-family residential bungalows, multi-story developments, industrial buildings, or commercial spaces, our practice prioritizes sound civil engineering principles, verified material testing, and proactive on-site supervision.
              </p>

              {/* Verified Information & Verification Notice */}
              <div className="mt-6 p-4 bg-slate-50 border-l-4 border-[#172544] rounded-r text-xs text-slate-600 space-y-1.5">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#172544]" />
                  <span>Verified Corporate Details</span>
                </div>
                <div>Principal: {company?.founder || 'Vaibhavgiri Goswami'}</div>
                <div>Domain: Civil Engineering Consultancy, Supervision & Contracting</div>
                <div>Direct Consultation Helpline: {company?.phone || '+91 9427409949'}</div>
              </div>
            </div>

            {/* Engineering Approach */}
            <div className="bg-white p-8 rounded border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <Compass className="w-5 h-5 text-[#172544]" />
                <h3 className="text-xl font-bold text-[#172544]">
                  Our Engineering Approach
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                We believe that robust civil engineering is built on four non-negotiable foundations:
              </p>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <strong className="block text-[#172544] text-sm mb-1">1. Pre-Execution Analysis</strong>
                  Soil assessment, layout optimization, load calculation reviews, and constructability audits.
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <strong className="block text-[#172544] text-sm mb-1">2. On-Site Enforcement</strong>
                  Uncompromising verification of reinforcement placement, concrete slump, shuttering stability, and curing cycles.
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <strong className="block text-[#172544] text-sm mb-1">3. Transparent Quantity Surveying</strong>
                  Detailed Bill of Quantities (BOQ) with realistic rate analyses to prevent sudden budgetary shocks.
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <strong className="block text-[#172544] text-sm mb-1">4. Synchronized Labor Coordination</strong>
                  Clear technical instructions to masons, bar-benders, and finishing crews under experienced site engineers.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Vision, Mission & Client Commitments */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Vision Card */}
            <div className="bg-white p-7 rounded border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5 mb-2">
                <Target className="w-5 h-5 text-[#172544]" />
                <h4 className="text-lg font-bold text-[#172544]">Our Vision</h4>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                To be recognized as a premier civil engineering consultancy and construction partner known for structural integrity, technical precision, and absolute transparency in every square meter built.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white p-7 rounded border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5 mb-2">
                <HardHat className="w-5 h-5 text-[#172544]" />
                <h4 className="text-lg font-bold text-[#172544]">Our Mission</h4>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                To safeguard our clients&apos; investments through rigorous engineering oversight, pragmatic technical solutions, honest billing verification, and systematic project management delivered on schedule.
              </p>
            </div>

            {/* Commitment to Clients */}
            <div className="bg-white p-7 rounded border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5 mb-2">
                <FileCheck className="w-5 h-5 text-[#172544]" />
                <h4 className="text-lg font-bold text-[#172544]">Our Commitment to Clients</h4>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 mt-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Zero Technical Compromise:</strong> Adhering strictly to Indian Standard (IS) codes and architectural specifications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Transparent Communication:</strong> Regular milestone updates and unvarnished site progress reports.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>Cost Accountability:</strong> Independent verification of contractor billing measurements.</span>
                </li>
              </ul>
            </div>

            {/* Editable Placeholder Notice (In strict accordance with prompt rules) */}
            <div className="p-4 bg-slate-100 rounded border border-slate-200 text-xs text-slate-500 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-slate-700 block">Registration & Certification Notice:</span>
                Statutory council registration numbers, municipal empanelments, and formal association affiliations will be populated in this section once verified documents are submitted via the administrative portal.
                <button
                  onClick={onOpenAdmin}
                  className="mt-1 block text-xs text-[#172544] font-semibold underline hover:text-[#28427b]"
                >
                  Manage verified details in Admin Portal &rarr;
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
