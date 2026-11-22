import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  FileSpreadsheet, 
  BarChart3, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function SummarySection() {
  const [activePillar, setActivePillar] = useState(0);

  const iconMap = {
    UserCheck: UserCheck,
    ShieldCheck: ShieldCheck,
    FileSpreadsheet: FileSpreadsheet,
    BarChart3: BarChart3
  };

  return (
    <section id="summary" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 dark:bg-forest-800 text-sage-800 dark:text-sage-200 border border-sage-300/40">
            <Briefcase className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
            <span>Professional Profile & Operational Focus</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Executive Summary & People Operations Scope
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base">
            Trained and certified across the entire employee lifecycle with a distinctive blend of human empathy and data-driven process execution.
          </p>
        </div>

        {/* Verbatim Resume Summary Quote Block */}
        <div className="mb-14 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-sage-400/20 via-sage-500/20 to-emerald-400/20 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
          
          <div className="relative glass-panel rounded-3xl p-7 sm:p-9 border border-sage-200/80 dark:border-sage-700/50 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sage-500/10 dark:bg-sage-400/10 text-sage-700 dark:text-sage-300 flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-sage-700 dark:text-sage-300">
                  Professional Statement
                </span>
                <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-stone-800 dark:text-stone-100 leading-relaxed italic">
                  "{portfolioData.summary.fullText}"
                </blockquote>
                
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {['Talent Acquisition', 'Labour Compliance & POSH', 'GreytHR HRIS', 'Advanced Excel & Power BI', 'Employee Engagement'].map((tag) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-white/70 dark:bg-forest-900/60 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-forest-700/80"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400 mr-1.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Operational Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {portfolioData.summary.pillars.map((pillar, idx) => {
            const IconComponent = iconMap[pillar.icon] || Briefcase;
            const isSelected = activePillar === idx;

            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(idx)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 text-left relative overflow-hidden ${
                  isSelected
                    ? 'glass-panel shadow-sage-md border-2 border-sage-500 dark:border-sage-400 -translate-y-1'
                    : 'glass-panel-subtle hover:glass-panel border border-stone-200/70 dark:border-forest-700/60 hover:-translate-y-0.5'
                }`}
              >
                {/* Subtle top indicator bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sage-500 to-emerald-500" />
                )}

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isSelected 
                    ? 'bg-sage-600 text-white' 
                    : 'bg-sage-100 dark:bg-forest-800 text-sage-700 dark:text-sage-300'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 dark:text-white mb-2">
                  {pillar.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                  {pillar.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-stone-200/60 dark:border-forest-800">
                  {pillar.metrics.map((metric) => (
                    <div key={metric} className="flex items-center text-xs text-stone-700 dark:text-stone-300 font-medium">
                      <ChevronRight className="w-3 h-3 text-sage-600 dark:text-sage-400 mr-1 shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* The BCA + HR Advantage Spotlight Card */}
        <div className="glass-panel rounded-3xl p-7 sm:p-8 border border-sage-300/50 dark:border-sage-700/40 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-sage-700 dark:text-sage-300">
                <Code2 className="w-4 h-4 text-sage-600" />
                <span>Distinctive Technical Differentiator</span>
              </div>
              
              <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
                {portfolioData.summary.bcaAdvantage.title}
              </h3>

              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                {portfolioData.summary.bcaAdvantage.description}
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-xl bg-white/60 dark:bg-forest-900/50 border border-stone-200/60 dark:border-forest-700/60">
                <span className="block font-display font-bold text-2xl text-sage-700 dark:text-sage-300">100%</span>
                <span className="text-[11px] font-medium text-stone-600 dark:text-stone-400">Data-Driven Precision</span>
              </div>
              <div className="p-4 rounded-xl bg-white/60 dark:bg-forest-900/50 border border-stone-200/60 dark:border-forest-700/60">
                <span className="block font-display font-bold text-2xl text-emerald-600 dark:text-emerald-400">GreytHR</span>
                <span className="text-[11px] font-medium text-stone-600 dark:text-stone-400">Digital HRMS Ready</span>
              </div>
              <div className="p-4 rounded-xl bg-white/60 dark:bg-forest-900/50 border border-stone-200/60 dark:border-forest-700/60">
                <span className="block font-display font-bold text-2xl text-sage-700 dark:text-sage-300">NSDC</span>
                <span className="text-[11px] font-medium text-stone-600 dark:text-stone-400">HR Certified</span>
              </div>
              <div className="p-4 rounded-xl bg-white/60 dark:bg-forest-900/50 border border-stone-200/60 dark:border-forest-700/60">
                <span className="block font-display font-bold text-2xl text-emerald-600 dark:text-emerald-400">Power BI</span>
                <span className="text-[11px] font-medium text-stone-600 dark:text-stone-400">HR Dashboards</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
