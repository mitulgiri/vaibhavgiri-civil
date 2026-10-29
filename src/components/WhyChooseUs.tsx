import React from 'react';
import { 
  Compass, 
  Wrench, 
  Eye, 
  ShieldCheck, 
  Activity, 
  Coins, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

const SERVICE_PRINCIPLES = [
  {
    title: 'Professional Engineering Consultation',
    icon: Compass,
    commitment: 'Every recommendation is grounded in structural logic, building bylaws, and civil engineering norms—not guesswork or arbitrary contractor habits.',
  },
  {
    title: 'Practical Construction Solutions',
    icon: Wrench,
    commitment: 'We reconcile architectural elegance with constructability, ensuring structural details can be reliably executed on-site by skilled tradesmen.',
  },
  {
    title: 'Transparent Communication',
    icon: Eye,
    commitment: 'No hidden variations or concealed defects. Clients receive unembellished site progress updates, material test findings, and measurement data.',
  },
  {
    title: 'Quality-Focused Execution',
    icon: ShieldCheck,
    commitment: 'Active monitoring of cement grades, steel bar binding tolerances, concrete cover blocks, water-cement ratios, and requisite curing durations.',
  },
  {
    title: 'Systematic Project Monitoring',
    icon: Activity,
    commitment: 'Milestone tracking with scheduled inspections, ensuring bottlenecks are identified before they impact upper-level structural slabs.',
  },
  {
    title: 'Cost-Conscious Planning',
    icon: Coins,
    commitment: 'Detailed Bill of Quantities (BOQ) with realistic rate breakdowns to mitigate unexpected budget escalation and excessive wastage.',
  },
  {
    title: 'Commitment to Agreed Timelines',
    icon: Clock,
    commitment: 'Proactive scheduling of shuttering materials, concrete batching, and labor crews to safeguard agreed project completion targets.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-slate-50 border-t border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#77797C] mb-2">
            <span className="w-6 h-[2px] bg-[#172544] inline-block"></span>
            <span>Integrity & Standards</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#172544] tracking-tight font-sans">
            Why Choose Vaibhavgiri Goswami & Associates
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            Our reputation is built upon clear engineering commitments, open communication, and diligent on-site verification. Here is what you can rely on when partnering with us:
          </p>
        </div>

        {/* 7 Core Service Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_PRINCIPLES.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className={`bg-white p-6 rounded border border-slate-200 shadow-xs hover:border-[#172544] transition-all flex flex-col justify-between ${
                  index === 6 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded bg-slate-100 text-[#172544] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#172544] leading-snug">
                      {principle.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {principle.commitment}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Company Engineering Commitment</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Professional Summary Footnote */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          <em>* Note: All principles are maintained as proactive operational commitments under engineering best practices, verified drawings, and mutually approved contracts.</em>
        </div>

      </div>
    </section>
  );
};
