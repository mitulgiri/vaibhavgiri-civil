import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { CompanyInfo } from '../types';

interface QuickFloatActionsProps {
  company: CompanyInfo | null;
}

export const QuickFloatActions: React.FC<QuickFloatActionsProps> = ({ company }) => {
  const phone = company?.phone || '+91 9427409949';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello Vaibhavgiri Goswami & Associates, I would like to consult with your civil engineering team regarding my project.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 lg:hidden">
      {/* WhatsApp Quick Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl active:scale-95 transition-all border border-white/20"
        aria-label="Direct WhatsApp Chat"
      >
        <MessageSquare className="w-5 h-5" />
      </a>

      {/* Phone Call Floating Button */}
      <a
        href={`tel:${cleanPhone}`}
        className="w-12 h-12 rounded-full bg-[#172544] hover:bg-[#203460] text-white flex items-center justify-center shadow-xl active:scale-95 transition-all border border-white/20"
        aria-label="Call Direct Mobile"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
};
