import React, { useEffect } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Building2, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ProfilePhoto from './ProfilePhoto';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container */}
      <div className="bg-white text-stone-900 w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stone-200">
        
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="no-print bg-stone-100 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <h3 className="font-display font-bold text-sm sm:text-base text-stone-800">
              Resume Preview — Shifas CS (HR Professional)
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sage-600 hover:bg-sage-700 text-white shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-7 text-left font-sans text-stone-800 bg-white">
          
          {/* Resume Header with Framed Profile Photo */}
          <div className="border-b-2 border-stone-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                  {portfolioData.personal.name}
                </h1>
                <span className="text-sm font-bold text-stone-600">
                  HR Management & People Operations
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs sm:text-sm font-medium text-stone-700">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>{portfolioData.personal.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <span>{portfolioData.personal.phone}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-stone-500" />
                  <span>{portfolioData.personal.email}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>{portfolioData.personal.linkedinUsername}</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 self-start sm:self-center">
              <ProfilePhoto size="modal" showStatusBadge={false} />
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify">
              {portfolioData.summary.fullText}
            </p>
          </div>

          {/* Core Competencies & Skills */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1">
              Skills & Core Competencies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <strong className="block text-stone-900 font-bold mb-1">Technical Skills</strong>
                <p className="text-stone-700">Advanced Microsoft Excel (PivotTables, Data Validation, Charts), Power BI, HRMS / GreytHR</p>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <strong className="block text-stone-900 font-bold mb-1">Core HR Operations</strong>
                <p className="text-stone-700">Employee Onboarding & Offboarding, Attendance Tracking, Payroll Support, HR Documentation, POSH Awareness</p>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <strong className="block text-stone-900 font-bold mb-1">Soft Skills & Leadership</strong>
                <p className="text-stone-700">Effective Communication, Analytical Ability, Active Listening, Presentation Skills, Team Leadership, Succession Planning</p>
              </div>
            </div>
          </div>

          {/* Certifications (2026) */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1">
              Professional Certifications & Training (2026)
            </h2>

            <div className="space-y-3.5">
              {portfolioData.certifications.map((cert) => (
                <div key={cert.id} className="text-xs space-y-1">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-sm font-bold text-stone-950">
                      {cert.title}
                    </strong>
                    <span className="font-bold text-stone-600">{cert.year}</span>
                  </div>
                  <div className="text-stone-600 font-semibold">
                    {cert.issuer} ({cert.organization})
                  </div>
                  <p className="text-stone-700 leading-relaxed text-justify">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1">
              Education
            </h2>

            <div className="text-xs space-y-1">
              <div className="flex justify-between items-baseline">
                <strong className="text-sm font-bold text-stone-950">
                  {portfolioData.education[0].degree}
                </strong>
                <span className="font-bold text-stone-600">{portfolioData.education[0].duration}</span>
              </div>
              <div className="text-stone-700 font-semibold">
                {portfolioData.education[0].institution} • {portfolioData.education[0].location}
              </div>
              <p className="text-stone-600 leading-relaxed">
                Applied computational thinking, database management logic, and spreadsheet modeling to streamline enterprise HR workflows.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer (Hidden in Print) */}
        <div className="no-print bg-stone-100 px-6 py-3.5 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Ready for Immediate Joining • Thrissur, Kerala</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
}
