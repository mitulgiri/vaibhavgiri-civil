import React from 'react';
import { 
  Building2, 
  ClipboardCheck, 
  Hammer, 
  Users, 
  CheckCircle2, 
  Wrench, 
  Calculator, 
  ShieldCheck,
  ArrowRight,
  HardHat,
  Sparkles,
  Palette,
  Sofa
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectServiceForInquiry: (serviceId: string, serviceTitle: string) => void;
}

// Map icon names to Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  ClipboardCheck,
  Hammer,
  Users,
  CheckCircle2,
  Wrench,
  Calculator,
  ShieldCheck,
  HardHat,
  Sparkles,
  Palette,
  Sofa
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectServiceForInquiry,
}) => {
  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#77797C] mb-2">
            <span className="w-6 h-[2px] bg-[#172544] inline-block"></span>
            <span>Comprehensive Engineering Portfolio</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#172544] tracking-tight font-sans">
            Our Civil Engineering & Construction Services
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            From technical structural design coordination and independent site supervision to full turnkey building execution and billing verification, we deliver disciplined engineering across every construction phase.
          </p>
        </div>

        {/* Responsive Service Cards Grid (1 col on mobile, 2 on tablet, 3 on laptop, 4 on wide PC) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {services.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Building2;
            
            return (
              <div
                key={service.id}
                className="group bg-white rounded border border-slate-200 hover:border-[#172544] p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 group-hover:bg-[#172544] transition-colors" />

                <div>
                  {/* Service Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded bg-slate-100 group-hover:bg-[#172544] text-[#172544] group-hover:text-white flex items-center justify-center transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-400 group-hover:text-slate-600">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#172544] mb-2.5 leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Bullet points */}
                  {service.points && service.points.length > 0 && (
                    <ul className="space-y-1.5 mb-6 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      {service.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-[#172544] font-bold">·</span>
                          <span className="leading-snug">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Enquire Button */}
                <div className="pt-2 border-t border-slate-100 mt-auto">
                  <button
                    onClick={() => onSelectServiceForInquiry(service.id, service.title)}
                    className="w-full inline-flex items-center justify-between py-2 text-xs font-semibold text-[#172544] group-hover:text-[#172544] hover:underline cursor-pointer"
                  >
                    <span>Enquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner for Custom Technical Requests */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-[#172544]">
              Need a Customized Scope or Specific Structural Advisory?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              We cater to unique engineering challenges, foundation dilemmas, retrofits, and customized labour-material packages.
            </p>
          </div>
          <button
            onClick={() => onSelectServiceForInquiry('custom', 'Customized Engineering Consultation')}
            className="shrink-0 px-5 py-2.5 bg-[#172544] hover:bg-[#203460] text-white text-xs font-bold rounded transition-colors"
          >
            Schedule Technical Discussion
          </button>
        </div>

      </div>
    </section>
  );
};
