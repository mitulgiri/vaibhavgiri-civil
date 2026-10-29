import React from 'react';
import { 
  PhoneCall, 
  FileText, 
  MapPin, 
  Calculator, 
  Wrench, 
  ShieldCheck, 
  KeyRound,
  ArrowRight
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Initial Consultation',
    icon: PhoneCall,
    description: 'Direct technical discussion to understand your project vision, plot dimensions, architectural preferences, and timeline expectations.',
    deliverable: 'Consultation Brief & Scope Definition'
  },
  {
    step: 2,
    title: 'Requirement Assessment',
    icon: FileText,
    description: 'Detailed review of architectural plans, soil data (if available), structural load requirements, and local municipal bylaws.',
    deliverable: 'Technical Requirements Matrix'
  },
  {
    step: 3,
    title: 'Site Visit & Feasibility',
    icon: MapPin,
    description: 'Physical inspection of the plot, access roads, surrounding water table levels, adjoining foundations, and survey points.',
    deliverable: 'Site Feasibility & Elevation Assessment'
  },
  {
    step: 4,
    title: 'Planning, Estimation & Scope',
    icon: Calculator,
    description: 'Accurate Bill of Quantities (BOQ), material specifications, labor rates, and finalized milestone schedule.',
    deliverable: 'Itemized BOQ & Project Agreement'
  },
  {
    step: 5,
    title: 'Project Coordination & Execution',
    icon: Wrench,
    description: 'Mobilization of skilled masons, steel bar-benders, RCC shuttering crews, and verified raw materials.',
    deliverable: 'Synchronized Construction Workflow'
  },
  {
    step: 6,
    title: 'Supervision & Quality Monitoring',
    icon: ShieldCheck,
    description: 'Continuous on-site inspection during reinforcement tying, concrete casting, cube sampling, and waterproof testing.',
    deliverable: 'Milestone Quality Audit Reports'
  },
  {
    step: 7,
    title: 'Final Inspection & Handover',
    icon: KeyRound,
    description: 'Comprehensive snag-list audit, finishing verification, structural check-off, and formal key handover to the client.',
    deliverable: 'Zero-Defect Completion Handover'
  }
];

interface WorkProcessProps {
  onRequestConsultation: () => void;
}

export const WorkProcess: React.FC<WorkProcessProps> = ({ onRequestConsultation }) => {
  return (
    <section id="process" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#77797C] mb-2">
            <span className="w-6 h-[2px] bg-[#172544] inline-block"></span>
            <span>Methodical Execution Discipline</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#172544] tracking-tight font-sans">
            Our 7-Step Engineering Work Process
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            Successful construction is not left to chance. Every project managed by Vaibhavgiri Goswami & Associates moves through an exact sequence from conceptual briefing to key handover.
          </p>
        </div>

        {/* Desktop View: Interactive Horizontal Timeline with Architectural Stepper */}
        <div className="hidden lg:block relative mb-12">
          {/* Connecting Track Line */}
          <div className="absolute top-10 left-6 right-6 h-[3px] bg-slate-200 z-0" />
          
          <div className="grid grid-cols-7 gap-3 relative z-10">
            {PROCESS_STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="flex flex-col group">
                  {/* Step Bubble */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-300 group-hover:border-[#172544] group-hover:bg-[#172544] text-[#172544] group-hover:text-white flex items-center justify-center shadow-xs transition-all duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="bg-slate-50 border border-slate-200 group-hover:border-[#172544] p-3.5 rounded flex-1 flex flex-col justify-between transition-colors">
                    <div>
                      <div className="text-[11px] font-mono font-bold text-[#77797C] mb-1">
                        PHASE 0{s.step}
                      </div>
                      <h3 className="text-xs font-bold text-[#172544] leading-snug mb-2">
                        {s.title}
                      </h3>
                      <p className="text-[11px] text-slate-600 leading-normal mb-3">
                        {s.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-medium leading-tight">
                      <span className="font-semibold text-slate-700 block">Deliverable:</span>
                      {s.deliverable}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet View: Vertical Timeline with Connecting Line */}
        <div className="lg:hidden relative pl-6 border-l-2 border-[#172544] space-y-8 ml-3">
          {PROCESS_STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="relative">
                {/* Node on Vertical Line */}
                <div className="absolute -left-[35px] top-1.5 w-8 h-8 rounded-full bg-[#172544] text-white flex items-center justify-center shadow-xs text-xs font-bold">
                  {s.step}
                </div>

                <div className="bg-slate-50 border border-slate-200 p-5 rounded">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-4 h-4 text-[#172544]" />
                    <h3 className="text-sm font-bold text-[#172544]">
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {s.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Deliverable: </span>
                    <span>{s.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button at End of Process */}
        <div className="mt-12 text-center">
          <button
            onClick={onRequestConsultation}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#172544] hover:bg-[#203460] text-white text-xs sm:text-sm font-bold rounded shadow transition-all cursor-pointer"
          >
            <span>Start with Phase 01: Initial Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
