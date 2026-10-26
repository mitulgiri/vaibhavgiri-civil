import React, { useState } from 'react';
import { ProjectItem, ProjectCategory } from '../types';
import { Eye, Info, Layers, CheckCircle2, X } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectServiceForInquiry: (serviceId: string, serviceTitle: string) => void;
}

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Sectors' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'educational', label: 'Educational' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'bungalows', label: 'Bungalows & Villas' },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectServiceForInquiry,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-slate-50 border-t border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#77797C] mb-2">
            <span className="w-6 h-[2px] bg-[#172544] inline-block"></span>
            <span>Project Typologies & Sector Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172544] tracking-tight font-sans">
            Project Sectors We Serve
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From precision residential structures and sprawling commercial complexes to heavy industrial facilities, our civil engineering consultations adapt to structural loads, municipal guidelines, and execution scale.
          </p>
        </div>

        {/* Ethical Sample Imagery Transparency Notice */}
        <div className="mb-8 p-3.5 bg-white border border-slate-200 rounded flex items-center gap-3 text-xs text-slate-600 shadow-2xs">
          <Info className="w-4 h-4 text-slate-500 shrink-0" />
          <span>
            <strong>Authenticity Commitment:</strong> To adhere strictly to truthful business disclosures, the photography below represents architectural typologies and engineering sectors served. Client-specific completed project photographs are released only with owner permission via our admin records.
          </span>
        </div>

        {/* Category Filter Bar (Functional segmented buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded mb-10 w-fit">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#172544] text-white shadow-xs font-semibold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
            >
              {/* Image Container with Sector Badge and Hover Action */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Sector text label */}
                <div className="absolute top-3 left-3 bg-[#172544]/90 text-white text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-xs backdrop-blur-xs">
                  {project.sectorName}
                </div>

                {project.isSample && (
                  <div className="absolute top-3 right-3 bg-white/90 text-slate-600 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs">
                    Sample Typology
                  </div>
                )}

                {/* Hover overlay with button */}
                <div className="absolute inset-0 bg-[#172544]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 bg-white text-[#172544] text-xs font-bold rounded shadow flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Technical Scope</span>
                  </button>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#172544] mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Sector Key Technical Highlights */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-1.5 border-t border-slate-100 pt-3">
                      {project.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-slate-600 hover:text-[#172544] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                  </button>
                  <button
                    onClick={() => onSelectServiceForInquiry('project-sector', `Project Consultation: ${project.sectorName}`)}
                    className="text-xs font-bold text-[#172544] hover:underline cursor-pointer"
                  >
                    Consult on this Sector &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Technical Scope Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#77797C]">
                {selectedProject.sectorName}
              </span>
              <h3 className="text-xl font-bold text-[#172544] mt-1">
                {selectedProject.title}
              </h3>
            </div>

            <div className="aspect-16/9 rounded overflow-hidden mb-5 bg-slate-100">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded border border-slate-200">
              <h4 className="text-xs font-bold text-[#172544] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-600" />
                <span>Civil Engineering Deliverables & Scope</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedProject.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#172544] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  const p = selectedProject;
                  setSelectedProject(null);
                  onSelectServiceForInquiry('sector-modal', `Engineering Consultation for ${p.sectorName}`);
                }}
                className="w-full sm:w-auto flex-1 py-2.5 px-4 bg-[#172544] text-white text-xs font-bold rounded hover:bg-[#203460] text-center"
              >
                Inquire For Your {selectedProject.sectorName}
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto py-2.5 px-4 bg-slate-100 text-slate-700 text-xs font-semibold rounded hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
