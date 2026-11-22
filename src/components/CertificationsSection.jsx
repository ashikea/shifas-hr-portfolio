import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle, 
  ExternalLink, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  X, 
  Check, 
  FileCheck2,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState(null);

  const handleOpenDetail = (cert) => {
    setSelectedCert(cert);
    // Trigger festive botanical celebratory confetti
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#8FA893', '#6B8E73', '#A3B899', '#527259', '#D4E0D5']
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <section id="certifications" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 dark:bg-forest-800 text-sage-800 dark:text-sage-200 border border-sage-300/40">
            <Award className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
            <span>2026 Accredited Credentials</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Industry Certifications & Professional Training
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base">
            Verified programs through Entri Software PVT LTD (NSDC partner) and GreytHR Academy.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {portfolioData.certifications.map((cert) => {
            return (
              <div
                key={cert.id}
                className="glass-panel rounded-3xl p-7 border border-stone-200/80 dark:border-forest-700/60 hover:border-sage-400 dark:hover:border-sage-500 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-sage-md flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Subtle top accent gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cert.color || 'from-sage-400 to-sage-600'}`} />

                <div>
                  {/* Top Metadata Bar */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sage-100 dark:bg-forest-800 text-sage-800 dark:text-sage-200 border border-sage-300/40">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{cert.badge}</span>
                    </span>

                    <span className="flex items-center gap-1 text-xs font-bold text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-forest-900 px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-sage-600" />
                      <span>{cert.year}</span>
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-stone-900 dark:text-white mb-2 leading-snug group-hover:text-sage-700 dark:group-hover:text-sage-300 transition-colors">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-sage-700 dark:text-sage-300 mb-4">
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span>{cert.issuer}</span>
                    <span className="text-stone-400">•</span>
                    <span className="text-stone-500 dark:text-stone-400 font-normal">{cert.organization}</span>
                  </div>

                  {/* Verbatim Description from Resume */}
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                    {cert.description}
                  </p>
                </div>

                {/* Card Footer: Competencies Pill Previews & Detail Modal Trigger */}
                <div className="pt-4 border-t border-stone-200/60 dark:border-forest-800/80 flex items-center justify-between">
                  <div className="flex items-center text-xs text-stone-500 dark:text-stone-400 font-medium">
                    <BookOpen className="w-3.5 h-3.5 mr-1.5 text-sage-600" />
                    <span>{cert.competencies.length} Key Competencies</span>
                  </div>

                  <button
                    onClick={() => handleOpenDetail(cert)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-sage-700 dark:text-sage-300 hover:text-sage-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-sage-100/70 dark:hover:bg-forest-800/70 transition-colors"
                  >
                    <span>View Syllabus & Competencies</span>
                    <span>→</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal: Full Syllabus & Competencies Drilldown */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="glass-panel max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-sage-300/80 dark:border-sage-700/80 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-forest-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sage-100 dark:bg-forest-800 text-sage-800 dark:text-sage-200">
                  <Award className="w-3.5 h-3.5 text-sage-600" />
                  <span>{selectedCert.badge} • {selectedCert.year}</span>
                </span>
                
                <h3 className="font-display font-bold text-2xl text-stone-900 dark:text-white">
                  {selectedCert.title}
                </h3>
                
                <p className="text-sm font-semibold text-sage-700 dark:text-sage-300">
                  Issued by {selectedCert.issuer} ({selectedCert.organization})
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Program Overview
                </h4>
                <p className="text-sm text-stone-700 dark:text-stone-200 leading-relaxed bg-white/50 dark:bg-forest-900/50 p-4 rounded-2xl border border-stone-200/60 dark:border-forest-800">
                  {selectedCert.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Curriculum Competencies & Practical Applied Skills
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCert.competencies.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start space-x-2.5 text-xs text-stone-800 dark:text-stone-200 p-2.5 rounded-xl bg-stone-50 dark:bg-forest-800/50 border border-stone-200/50 dark:border-forest-700/50"
                    >
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-forest-800 flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  Verified Candidate: <strong className="text-stone-900 dark:text-white">Shifas CS</strong>
                </span>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-sage-600 hover:bg-sage-700 text-white"
                >
                  Close View
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
