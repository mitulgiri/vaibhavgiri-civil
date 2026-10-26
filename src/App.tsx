import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WorkProcess } from './components/WorkProcess';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { QuickFloatActions } from './components/QuickFloatActions';
import { CompanyInfo, ProjectItem, ServiceItem } from './types';
import { fetchCompanyInfo, fetchProjects, fetchServices } from './api';

export default function App() {
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Administrative portal modal state
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Prefill state for the contact inquiry form
  const [prefilledServiceId, setPrefilledServiceId] = useState<string>('');
  const [prefilledServiceName, setPrefilledServiceName] = useState<string>('');

  const loadData = async () => {
    try {
      const [compData, srvData, projData] = await Promise.all([
        fetchCompanyInfo(),
        fetchServices(),
        fetchProjects(),
      ]);
      setCompany(compData);
      setServices(srvData);
      setProjects(projData);
    } catch (err) {
      console.error('Error fetching website data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle service enquiry button click
  const handleSelectServiceForInquiry = (serviceId: string, serviceTitle: string) => {
    setPrefilledServiceId(serviceId);
    setPrefilledServiceName(serviceTitle);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestConsultation = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreServices = () => {
    const servicesElem = document.getElementById('services');
    if (servicesElem) {
      servicesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      {/* Top Header & Navigation */}
      <Header
        company={company}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminOpen={isAdminOpen}
        onSelectServiceForInquiry={handleSelectServiceForInquiry}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* A. Hero Section */}
        <Hero
          company={company}
          onRequestConsultation={handleRequestConsultation}
          onExploreServices={handleExploreServices}
        />

        {/* B. About Us */}
        <AboutUs
          company={company}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* C. Our Services (8 Core Civil Engineering Services) */}
        <ServicesSection
          services={services}
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* D. Projects We Serve (Project Sectors & Gallery) */}
        <ProjectsSection
          projects={projects}
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* E. Our Work Process (7-Step Timeline) */}
        <WorkProcess
          onRequestConsultation={handleRequestConsultation}
        />

        {/* F. Why Choose Us (7 Service Principles) */}
        <WhyChooseUs />

        {/* G. Contact Us & Consultation Request */}
        <ContactSection
          company={company}
          services={services}
          prefilledServiceId={prefilledServiceId}
          prefilledServiceName={prefilledServiceName}
        />
      </main>

      {/* Footer */}
      <Footer
        company={company}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Action Buttons for Mobile */}
      <QuickFloatActions company={company} />

      {/* Administrative Portal Modal */}
      {isAdminOpen && (
        <AdminPortal
          onClose={() => setIsAdminOpen(false)}
          onDataChanged={loadData}
          initialCompany={company}
        />
      )}
    </div>
  );
}
