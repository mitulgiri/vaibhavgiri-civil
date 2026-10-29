import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Ruler, 
  Eye, 
  Flame, 
  MessageSquare,
  Maximize2
} from 'lucide-react';
import { CompanyInfo } from '../types';

interface InteriorDesignShowcaseProps {
  company: CompanyInfo | null;
  onSelectServiceForInquiry: (serviceId: string, serviceTitle: string) => void;
}

interface InteriorSpace {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  highlights: string[];
  specs: { label: string; value: string }[];
}

const INTERIOR_SPACES: InteriorSpace[] = [
  {
    id: 'living',
    title: 'Luxury Living & Lounge Spaces',
    subtitle: 'Modern Minimalist Elegance & Ambient Warmth',
    description: 'Expansive open-plan living environments designed with acoustic fluted wooden paneling, concealed architectural cove lighting, seamless Italian marble flooring, and bespoke TV entertainment walls.',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Multi-tiered architectural false ceilings with concealed 3000K warm LED coves',
      'Full-height acoustic wooden fluted wall paneling with brushed brass inserts',
      'High-gloss Italian bookmatched marble installation with zero-lip grinding',
      'Concealed ducted AC vents and automated motorized blind pelmets'
    ],
    specs: [
      { label: 'Ceiling Finish', value: 'Saint-Gobain Gyproc with Shadow Line Details' },
      { label: 'Lighting Concept', value: 'Anti-Glare Magnetic Track & Trimless Spotlights' },
      { label: 'Wall Paneling', value: 'Marine-grade Calibrated Plywood with Natural Veneer' }
    ]
  },
  {
    id: 'kitchen',
    title: 'High-Performance Modular Kitchens',
    subtitle: 'Ergonomic Culinary Architecture & Zero-Maintenance Finishes',
    description: 'Precision modular kitchens designed around the golden work triangle. Featuring anti-scratch acrylic shutters, German soft-close tandem boxes, seamless quartz countertops, and dedicated dry-pantry and utility zoning.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Heavy-duty tandem drawer systems rated for 50,000+ opening cycles',
      'Stain-resistant, food-grade seamless engineered quartz surfaces',
      'Concealed under-cabinet task illumination with hands-free motion sensor',
      'Dedicated civil plumbing integration with grease-trap and anti-backflow valves'
    ],
    specs: [
      { label: 'Hardware System', value: 'Blum / Hafele Soft-Close Blumotion & Aventos' },
      { label: 'Carcass Body', value: '100% Boiling Water Proof (BWP 710) Marine Ply' },
      { label: 'Countertop', value: '18mm Antimicrobial Quartz with Mitered Edge' }
    ]
  },
  {
    id: 'bedroom',
    title: 'Master Bedroom & Walk-In Wardrobes',
    subtitle: 'Private Sanctuary with Boutique Wardrobe Systems',
    description: 'Tranquil master suites engineered for peaceful acoustic isolation and tactile luxury. Features floor-to-ceiling walk-in wardrobes with tinted lacquered fluted glass, custom vanity units, and integrated headboard wall treatments.',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Floor-to-ceiling tinted profile glass wardrobes with automatic door sensor lighting',
      'Custom upholstered acoustic headboard with integrated bedside charging docks',
      'Engineered wooden or high-density vitrified bedroom flooring',
      'Hidden luggage lofts and velvet-lined jewelry and accessory pull-out trays'
    ],
    specs: [
      { label: 'Wardrobe Frame', value: 'Anodized Black Aluminum Profile with 8mm Toughened Glass' },
      { label: 'Storage Customization', value: 'Modular Soft-Closing Organizers with Velvet Lining' },
      { label: 'Acoustics', value: 'High-Density Foam & Fabric Soundproofing Treatments' }
    ]
  },
  {
    id: 'commercial',
    title: 'Executive Corporate & Commercial Offices',
    subtitle: 'High-Productivity Workspaces & Impressive Client Lounges',
    description: 'Sophisticated commercial interiors that elevate brand stature and team productivity. From sound-isolated conference suites and sleek executive cabins to vibrant collaborative breakout areas and reception lobbies.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Acoustic double-glazed glass partition walls for superior speech privacy',
      'Custom executive conference tables with motorized concealed pop-up power modules',
      'Biophilic indoor planter troughs integrated into workstation partitions',
      'HVAC airflow balancing and multi-zone commercial energy-efficient lighting'
    ],
    specs: [
      { label: 'Partitions', value: 'Slim-line Demountable Glass Partitions (STC 42dB)' },
      { label: 'Flooring', value: 'Commercial Heavy-Traffic Nylon Carpet Tiles & Vitrified Slab' },
      { label: 'MEP Integration', value: 'Structured Cat-6 Networking, Fire Sprinklers & Access Control' }
    ]
  }
];

export const InteriorDesignShowcase: React.FC<InteriorDesignShowcaseProps> = ({
  company,
  onSelectServiceForInquiry,
}) => {
  const [activeSpaceId, setActiveSpaceId] = useState<string>('living');
  const activeSpace = INTERIOR_SPACES.find((s) => s.id === activeSpaceId) || INTERIOR_SPACES[0];

  const phone = company?.phone || '+91 9427409949';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const interiorWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello Vaibhavgiri Goswami & Associates, I am interested in consulting about an Interior Design & Turnkey Fit-Out project for my space.'
  )}`;

  const handleConsultClick = () => {
    onSelectServiceForInquiry('interior-design-turnkey', 'Interior Design & Turnkey Fit-Outs');
  };

  return (
    <section id="interior-design" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Architectural Grid Overlay */}
      <div className="absolute inset-0 architectural-dark-grid opacity-60 pointer-events-none" />

      {/* Decorative Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Trending Specialty · Architectural Interiors</span>
            </div>
            
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Architectural Interior Design & Turnkey Fit-Outs
            </h2>
            
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              Where high-end contemporary aesthetics meet civil engineering precision. Experience 3D photorealistic visualization, seamless spatial ergonomics, and single-point turnkey execution with zero contractor coordination hassle.
            </p>
          </div>

          <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleConsultClick}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 bg-white text-[#172544] hover:bg-slate-100 font-bold text-sm rounded transition-all shadow-lg hover:shadow-xl cursor-pointer w-full xs:w-auto"
            >
              <span>Book Interior Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#172544]" />
            </button>
            <a
              href={interiorWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded transition-colors shadow-md w-full xs:w-auto"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Space Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800 scrollbar-none">
          {INTERIOR_SPACES.map((space) => {
            const isActive = space.id === activeSpaceId;
            return (
              <button
                key={space.id}
                onClick={() => setActiveSpaceId(space.id)}
                className={`px-5 py-3 text-xs sm:text-sm font-semibold rounded transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#203460] text-white shadow-md border-b-2 border-amber-400'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{space.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Space Spotlight Feature Display */}
        <div className="bg-slate-800/90 rounded-xl border border-slate-700 overflow-hidden shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Preview (7 Cols) */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[380px] overflow-hidden group">
              <img
                src={activeSpace.imageUrl}
                alt={activeSpace.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent lg:hidden" />
              
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded text-xs font-semibold text-white border border-slate-700 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>3D Photorealistic Concept & Turnkey Execution</span>
              </div>
            </div>

            {/* Content & Specifications (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block mb-1">
                  {activeSpace.subtitle}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {activeSpace.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {activeSpace.description}
                </p>

                {/* Key Architectural Highlights */}
                <div className="space-y-2.5 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Execution Highlights
                  </h4>
                  {activeSpace.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Specifications */}
                <div className="pt-4 border-t border-slate-700/80 space-y-2 text-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Material & Engineering Standards
                  </h4>
                  {activeSpace.specs.map((spec, idx) => (
                    <div key={idx} className="flex flex-col xs:flex-row xs:justify-between xs:items-center py-1.5 border-b border-slate-700/40 text-[11px] gap-0.5">
                      <span className="text-slate-400">{spec.label}</span>
                      <span className="font-semibold text-slate-200 text-left xs:text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4">
                <button
                  onClick={handleConsultClick}
                  className="w-full py-3 px-4 bg-[#172544] hover:bg-[#233866] border border-slate-600 text-white font-semibold text-xs rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Inquire for {activeSpace.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* The Engineering Advantage: Why VGA for Interior Design */}
        <div className="border-t border-slate-800 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block mb-1">
              The Engineering Difference
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Choose an Engineering-Led Interior Firm?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Most interior decorators focus only on paint and veneer. We ensure structural soundness, anti-dampness protection, and flawless utility planning for spaces that last decades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-lg bg-slate-800/60 border border-slate-700/70 hover:border-slate-500 transition-colors">
              <div className="w-10 h-10 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                <Ruler className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">
                Structural Wall Alterations
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Safely dismantle partition walls to create open layouts, grand archways, or expanded rooms backed by licensed structural safety calculations.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-slate-800/60 border border-slate-700/70 hover:border-slate-500 transition-colors">
              <div className="w-10 h-10 rounded bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">
                Damp & Moisture Proofing
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Chemical waterproofing treatment of wet areas, external facade walls, and bathroom joints to permanently safeguard expensive woodwork against moisture.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-slate-800/60 border border-slate-700/70 hover:border-slate-500 transition-colors">
              <div className="w-10 h-10 rounded bg-amber-600/20 text-amber-400 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">
                Integrated MEP & Lighting
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Architectural concealed electrical ducting, phase load balancing for heavy appliances, and multi-scene lighting before civil ceiling closure.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-slate-800/60 border border-slate-700/70 hover:border-slate-500 transition-colors">
              <div className="w-10 h-10 rounded bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
                <Maximize2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">
                100% Turnkey Accountability
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A single contract covers civil, carpentry, electrical, plumbing, painting, and deep cleaning. Transparent BOQ rates with zero surprise charges.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
