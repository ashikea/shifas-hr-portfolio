import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Database, 
  Binary, 
  Cpu, 
  Layers, 
  CheckCircle2,
  FileCode2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function EducationSection() {
  const edu = portfolioData.education[0];

  return (
    <section id="education" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 dark:bg-forest-800 text-sage-800 dark:text-sage-200 border border-sage-300/40">
            <GraduationCap className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
            <span>Academic Background</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Education & Computational Foundation
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base">
            How a Bachelor's in Computer Application elevates HR analytics, HRMS architectures, and operational accuracy.
          </p>
        </div>

        {/* Education Hero Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-sage-300/70 dark:border-sage-700/60 shadow-lg relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Degree & Institution Details (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sage-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 mb-3">
                  Undergraduate Degree (3 Years)
                </span>
                
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900 dark:text-white leading-tight">
                  {edu.degree}
                </h3>

                <p className="text-lg font-bold text-sage-700 dark:text-sage-300 mt-1">
                  {edu.institution}
                </p>
              </div>

              <div className="space-y-2 text-sm text-stone-600 dark:text-stone-300 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sage-600" />
                  <span>Duration: <strong>{edu.duration}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sage-600" />
                  <span>Location: <strong>{edu.location}</strong></span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed pt-2 border-t border-stone-200/80 dark:border-forest-800">
                {edu.summary}
              </p>

            </div>

            {/* How BCA Empowers HR Excellence (7 cols) */}
            <div className="lg:col-span-7 bg-white/40 dark:bg-forest-900/40 p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-forest-700/60 space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-forest-800">
                <div className="flex items-center space-x-2">
                  <Binary className="w-5 h-5 text-sage-600" />
                  <h4 className="font-display font-bold text-base sm:text-lg text-stone-900 dark:text-white">
                    Practical Advantage in HR Operations
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-sage-700 dark:text-sage-300">
                  Data & Systems Synergy
                </span>
              </div>

              <div className="space-y-4">
                {edu.relevanceToHR.map((point, idx) => {
                  const [heading, ...descParts] = point.split(': ');
                  const desc = descParts.join(': ');

                  return (
                    <div key={idx} className="flex items-start space-x-3.5">
                      <div className="w-6 h-6 rounded-lg bg-sage-100 dark:bg-forest-800 text-sage-700 dark:text-sage-300 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white block">
                          {heading}
                        </strong>
                        <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-stone-200/80 dark:border-forest-800 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
                <span>Computer Science Logic • Database Normalization • Spreadsheet Automation</span>
                <span className="font-bold text-sage-700 dark:text-sage-300">Calicut University Alum</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
