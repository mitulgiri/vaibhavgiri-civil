import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Calendar,
  Building,
  ShieldCheck
} from 'lucide-react';
import { CompanyInfo, ServiceItem } from '../types';
import { submitInquiry } from '../api';

interface ContactSectionProps {
  company: CompanyInfo | null;
  services: ServiceItem[];
  prefilledServiceId?: string;
  prefilledServiceName?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  company,
  services,
  prefilledServiceId,
  prefilledServiceName,
}) => {
  const phone = company?.phone || '+91 9427409949';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    serviceId: prefilledServiceId || '',
    serviceName: prefilledServiceName || '',
    projectType: 'Residential',
    location: '',
    estimatedBudget: '',
    description: '',
    honeypot: '', // Spam filter honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<{
    inquiryId: string;
    message: string;
  } | null>(null);

  // Sync prefilled service when triggered from service card click
  useEffect(() => {
    if (prefilledServiceId) {
      setFormData((prev) => ({
        ...prev,
        serviceId: prefilledServiceId,
        serviceName: prefilledServiceName || prev.serviceName,
      }));
    }
  }, [prefilledServiceId, prefilledServiceName]);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sId = e.target.value;
    const found = services.find((s) => s.id === sId);
    setFormData((prev) => ({
      ...prev,
      serviceId: sId,
      serviceName: found ? found.title : 'General Consultation',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Frontend validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }

    const digits = formData.mobile.replace(/[^0-9]/g, '');
    if (digits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number so our engineers can contact you.');
      return;
    }

    if (!formData.location.trim()) {
      setErrorMessage('Please specify the project location / city.');
      return;
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      setErrorMessage('Please write a brief summary of your project or consultation requirement (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitInquiry({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        serviceId: formData.serviceId || 'civil-engineering-consultancy',
        serviceName: formData.serviceName || 'Civil Engineering Consultancy',
        projectType: formData.projectType,
        location: formData.location,
        estimatedBudget: formData.estimatedBudget,
        description: formData.description,
        honeypot: formData.honeypot,
      });

      setSuccessResponse({
        inquiryId: response.inquiryId,
        message: response.message,
      });

      // Reset form fields
      setFormData({
        name: '',
        mobile: '',
        email: '',
        serviceId: '',
        serviceName: '',
        projectType: 'Residential',
        location: '',
        estimatedBudget: '',
        description: '',
        honeypot: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to submit inquiry at this moment. Please call directly at +91 9427409949.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate dynamic WhatsApp link including current selected service or customized inquiry
  const selectedServiceText = formData.serviceName || 'civil engineering consultancy';
  const dynamicWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello Vaibhavgiri Goswami & Associates, I am interested in inquiring about ${selectedServiceText}. My name is ${
      formData.name ? formData.name : 'a prospective client'
    } (Location: ${formData.location || 'Gujarat/India'}).`
  )}`;

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#77797C] mb-2">
            <span className="w-6 h-[2px] bg-[#172544] inline-block"></span>
            <span>Connect with Engineering Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172544] tracking-tight font-sans">
            Request a Consultation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Discuss your upcoming project, structural advisory needs, BOQ verification, or turnkey contracting. Connect directly by phone, WhatsApp, or submit your specifications below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Verified Contact Information & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Identity Card */}
            <div className="bg-[#172544] text-white p-8 rounded shadow-lg relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold block mb-1">
                    Civil Engineering Consultants
                  </span>
                  <h3 className="text-2xl font-bold text-white uppercase font-sans">
                    {company?.businessName || 'Vaibhavgiri Goswami & Associates'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Technical Leadership: {company?.founder || 'Vaibhavgiri Goswami'}
                  </p>
                </div>

                {/* Direct Call Button (Click to Call) */}
                <div className="pt-2">
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-white text-[#172544] flex items-center justify-center font-bold">
                        <Phone className="w-5 h-5 text-[#172544]" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-300 uppercase tracking-wider block">
                          Direct Mobile (Click to Call)
                        </span>
                        <span className="text-base sm:text-lg font-bold text-white group-hover:underline">
                          {phone}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>

                {/* WhatsApp Inquiry Button with dynamic service prefill */}
                <div>
                  <a
                    href={dynamicWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-emerald-700/80 hover:bg-emerald-700 border border-emerald-500/50 rounded transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-white text-emerald-700 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-100 uppercase tracking-wider block">
                          Instant WhatsApp Chat
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white">
                          Chat on +91 9427409949
                        </span>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Working Hours */}
                <div className="pt-4 border-t border-white/15 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{company?.workingHours || 'Mon – Sat: 9:30 AM to 7:00 PM (IST)'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{company?.email || 'contact@vaibhavgirigoswami.com'}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Address & Google Maps Integration Disclosure */}
            <div className="bg-slate-50 p-6 rounded border border-slate-200 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#172544] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-[#172544]">Office & Regional Coverage</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {company?.address || 'Physical office address to be confirmed. Operating across regional and municipal civil project locations.'}
                  </p>
                </div>
              </div>

              {/* Note on Google Maps as requested by prompt */}
              <div className="p-3 bg-white rounded border border-slate-200 text-xs text-slate-500 leading-normal">
                <strong>Google Maps Note:</strong> In accordance with verified business compliance, interactive Google Maps pin embedding will be activated as soon as the registered commercial office premise coordinates are finalized.
              </div>
            </div>

          </div>

          {/* Right Column: Functional Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded border border-slate-200 shadow-sm relative">
              <h3 className="text-xl font-bold text-[#172544] mb-2">
                Project Consultation Request Form
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Fill in your project requirements below. All submissions are processed and saved directly to our civil engineering management records.
              </p>

              {/* Success Notification Box */}
              {successResponse && (
                <div className="mb-6 p-5 bg-emerald-50 border border-emerald-300 rounded text-emerald-900 animate-in fade-in duration-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold">Inquiry Successfully Registered!</h4>
                      <p className="text-xs leading-relaxed text-emerald-800">
                        {successResponse.message}
                      </p>
                      <div className="text-[11px] font-mono text-emerald-700 bg-emerald-100/70 p-2 rounded">
                        Reference Tracking ID: <strong>{successResponse.inquiryId}</strong>
                      </div>
                      <div className="pt-2">
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                            `Hello, I have submitted an inquiry on your website with Reference ID: ${successResponse.inquiryId}. Please review my project.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Follow up directly on WhatsApp with this Reference ID &rarr;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Notification Box */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded text-red-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Anti-spam honeypot (hidden from real users) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border border-slate-300 focus:outline-hidden focus:border-[#172544] focus:ring-1 focus:ring-[#172544] transition-colors"
                    />
                  </div>

                  {/* Mobile Number Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9427409949"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border border-slate-300 focus:outline-hidden focus:border-[#172544] focus:ring-1 focus:ring-[#172544] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. client@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border border-slate-300 focus:outline-hidden focus:border-[#172544] focus:ring-1 focus:ring-[#172544] transition-colors"
                    />
                  </div>

                  {/* Project Location */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Location / City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gandhinagar / Ahmedabad"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border border-slate-300 focus:outline-hidden focus:border-[#172544] focus:ring-1 focus:ring-[#172544] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Selection Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={handleServiceChange}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border border-slate-300 bg-white focus:outline-hidden focus:border-[#172544] focus:ring-1 focus:ring-[#172544] transition-colors"
                    >
                      <option value="">Select a Service...</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                      <option value="custom">Other / Customized Civil Advisory</option>
                    </select>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Typology
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border border-slate-300 bg-white focus:outline-hidden focus:border-[#172544] focus:ring-1 focus:ring-[#172544] transition-colors"
                    >
                      <option value="Residential">Residential Building</option>
                      <option value="Bungalow">Bungalow / Independent Villa</option>
                      <option value="Commercial">Commercial Complex</option>
                      <option value="Industrial">Industrial Shed / Warehouse</option>
                      <option value="Institutional">Educational Institution</option>
                      <option value="Healthcare">Hospital / Healthcare</option>
                      <option value="Renovation">Renovation & Structural Repair</option>
                      <option value="Other">Other Typology</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Budget (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Construction Budget <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <select
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border border-slate-300 bg-white focus:outline-hidden focus:border-[#172544] focus:ring-1 focus:ring-[#172544] transition-colors"
                  >
                    <option value="">Select an estimated range (optional)...</option>
                    <option value="Under ₹25 Lakhs">Under ₹25 Lakhs</option>
                    <option value="₹25 Lakhs - ₹50 Lakhs">₹25 Lakhs - ₹50 Lakhs</option>
                    <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                    <option value="₹1 Crore - ₹3 Crores">₹1 Crore - ₹3 Crores</option>
                    <option value="Above ₹3 Crores">Above ₹3 Crores</option>
                    <option value="Planning / Not Finalized">To be calculated through BOQ</option>
                  </select>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Description & Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe plot size, number of floors (e.g. G+2), required services (e.g. RCC supervision, BOQ estimation, turnkey contractor), and current planning status..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border border-slate-300 focus:outline-hidden focus:border-[#172544] focus:ring-1 focus:ring-[#172544] transition-colors"
                  />
                </div>

                {/* Privacy & Engineering Verification Note */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Inquiries are treated with strict confidentiality. Direct response within 24 business hours.</span>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-[#172544] hover:bg-[#203460] text-white text-xs sm:text-sm font-bold rounded shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting to Engineering Records...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Consultation Request</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
