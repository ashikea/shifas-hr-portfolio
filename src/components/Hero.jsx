import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Building2,
  Calendar,
  Award
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ProfilePhoto from './ProfilePhoto';

export default function Hero({ openResumeModal }) {
  const [copiedType, setCopiedType] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2200);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-24 sm:pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Column (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1">
            
            {/* Mobile-only Top Profile Photo for instant visual recognition */}
            <div className="flex lg:hidden items-center space-x-4 pb-2">
              <ProfilePhoto size="card" showStatusBadge={false} />
              <div>
                <span className="font-display font-bold text-xl text-stone-900 dark:text-white block">
                  {portfolioData.personal.name}
                </span>
                <span className="text-xs font-semibold text-sage-700 dark:text-sage-300">
                  HR Management • Thrissur, Kerala
                </span>
              </div>
            </div>

            {/* Location & Availability Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-xs font-medium text-stone-700 dark:text-stone-300 border border-sage-300/40 dark:border-forest-700/60">
              <span className="flex items-center gap-1.5 text-sage-700 dark:text-sage-300">
                <MapPin className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
                <span>{portfolioData.personal.location}</span>
              </span>
              <span className="text-stone-300 dark:text-forest-700">•</span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Available for Immediate Joining</span>
              </span>
            </div>

            {/* Headline with Amelia / Font Display */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-[1.12]">
                Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-600 via-sage-500 to-emerald-600 dark:from-sage-300 dark:via-sage-400 dark:to-emerald-400">{portfolioData.personal.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-stone-700 dark:text-stone-200">
                {portfolioData.personal.title}
              </p>
            </div>

            {/* Value Proposition Subtitle */}
            <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Specialized in <strong className="text-stone-900 dark:text-white font-semibold">Talent Acquisition, Employee Lifecycle Operations, Compliance & Digital HRMS (GreytHR)</strong>. 
              Pairing people-process excellence with a quantitative <strong className="text-stone-900 dark:text-white font-semibold">BCA Computer Application background</strong> for high-accuracy payroll, attendance reconciliation, and actionable HR analytics.
            </p>

            {/* One-Click Contact Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              
              {/* Phone Copy Card */}
              <div className="group relative flex items-center glass-panel rounded-xl px-3.5 py-2 border border-sage-200 dark:border-forest-700 hover:border-sage-400 transition-all">
                <a 
                  href={`tel:${portfolioData.personal.phone}`} 
                  className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-sage-700 dark:hover:text-sage-300"
                >
                  <Phone className="w-4 h-4 text-sage-600 dark:text-sage-400" />
                  <span>{portfolioData.personal.phone}</span>
                </a>
                <button
                  onClick={() => copyToClipboard(portfolioData.personal.phone, 'phone')}
                  className="ml-2.5 p-1 rounded hover:bg-sage-100 dark:hover:bg-forest-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                  title="Copy Phone Number"
                  aria-label="Copy Phone Number"
                >
                  {copiedType === 'phone' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                {copiedType === 'phone' && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded shadow">
                    Copied!
                  </span>
                )}
              </div>

              {/* Email Copy Card */}
              <div className="group relative flex items-center glass-panel rounded-xl px-3.5 py-2 border border-sage-200 dark:border-forest-700 hover:border-sage-400 transition-all">
                <a 
                  href={`mailto:${portfolioData.personal.email}`} 
                  className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-sage-700 dark:hover:text-sage-300"
                >
                  <Mail className="w-4 h-4 text-sage-600 dark:text-sage-400" />
                  <span>{portfolioData.personal.email}</span>
                </a>
                <button
                  onClick={() => copyToClipboard(portfolioData.personal.email, 'email')}
                  className="ml-2.5 p-1 rounded hover:bg-sage-100 dark:hover:bg-forest-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                  title="Copy Email Address"
                  aria-label="Copy Email Address"
                >
                  {copiedType === 'email' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                {copiedType === 'email' && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded shadow">
                    Copied!
                  </span>
                )}
              </div>

              {/* LinkedIn Direct Link */}
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 glass-panel rounded-xl px-3.5 py-2 border border-sage-200 dark:border-forest-700 hover:border-sage-400 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-sage-700 dark:hover:text-sage-300 transition-all"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-stone-400" />
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white shadow-sage-md hover:shadow-sage-lg transition-all active:scale-95 flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Schedule Interview / Connect</span>
              </a>

              <button
                onClick={openResumeModal}
                className="px-5 py-3.5 rounded-xl font-bold text-sm glass-panel text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-forest-800 border border-sage-300/50 dark:border-forest-700/60 transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4 text-sage-600 dark:text-sage-400" />
                <span>View Full Resume (PDF)</span>
              </button>

              <a
                href="#certifications"
                className="px-4 py-3 text-xs sm:text-sm font-semibold text-sage-700 dark:text-sage-300 hover:text-sage-800 dark:hover:text-sage-100 transition-colors flex items-center space-x-1"
              >
                <span>2026 Certifications</span>
                <span className="text-base">→</span>
              </a>
            </div>

          </div>

          {/* Right Column: Prominent Profile Photo Card + Verified Badges (5 cols) */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 flex flex-col items-center">
            
            {/* Background glowing halo */}
            <div className="absolute -inset-2 bg-gradient-to-br from-sage-400/20 via-sage-500/15 to-emerald-500/15 rounded-3xl blur-2xl" />

            <div className="relative glass-panel rounded-3xl p-6 sm:p-7 border border-sage-200/90 dark:border-forest-700/70 shadow-xl space-y-6 w-full max-w-md mx-auto text-center">
              
              {/* Framed Profile Photo Showcase */}
              <div className="flex justify-center pt-2">
                <ProfilePhoto 
                  size="hero" 
                  showStatusBadge={true} 
                  className="mx-auto"
                />
              </div>

              {/* Identity & Status */}
              <div className="pt-2">
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-stone-900 dark:text-white">
                  {portfolioData.personal.name}
                </h3>
                <p className="text-xs sm:text-sm text-sage-700 dark:text-sage-300 font-semibold mt-0.5">
                  BCA Graduate • Certified HR Specialist
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Thrissur, Kerala • Immediate Joiner
                </p>
              </div>

              {/* Core Feature Badges in 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-stone-200/80 dark:border-forest-800/80 text-left">
                
                {/* 1. NSDC HR */}
                <div className="p-2.5 rounded-xl bg-white/60 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-700/40 flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 block truncate">NSDC HR Cert.</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate">Entri (2026)</span>
                  </div>
                </div>

                {/* 2. GreytHR */}
                <div className="p-2.5 rounded-xl bg-white/60 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-700/40 flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 block truncate">GreytHR Academy</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate">Digital HRMS (2026)</span>
                  </div>
                </div>

                {/* 3. Advance Excel */}
                <div className="p-2.5 rounded-xl bg-white/60 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-700/40 flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-sage-100 dark:bg-forest-800 text-sage-800 dark:text-sage-300 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 block truncate">Advance Excel</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate">Pivot & Analytics</span>
                  </div>
                </div>

                {/* 4. Calicut BCA */}
                <div className="p-2.5 rounded-xl bg-white/60 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-700/40 flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 block truncate">BCA Degree</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate">Calicut University</span>
                  </div>
                </div>

              </div>

              {/* Quick Status Bar */}
              <div className="pt-2 border-t border-stone-200/80 dark:border-forest-800/80 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-sage-600" />
                  <span>Immediate Joining</span>
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Thrissur / Pan-Kerala / Remote
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
