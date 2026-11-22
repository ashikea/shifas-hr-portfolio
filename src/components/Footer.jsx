import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  ArrowUp, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Heart,
  Clock,
  Briefcase
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const [keralaTime, setKeralaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Indian Standard Time (Asia/Kolkata)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setKeralaTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-stone-200/80 dark:border-forest-800 bg-stone-50/70 dark:bg-forest-950/80 backdrop-blur-md pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-stone-200/80 dark:border-forest-800">
          
          {/* Brand & Location Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sage-500 to-sage-600 flex items-center justify-center text-white shadow-sm">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-stone-900 dark:text-white">
                  {portfolioData.personal.name}
                </span>
                <p className="text-xs text-sage-700 dark:text-sage-300 font-medium">
                  HR Management & Operations Professional
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-sm leading-relaxed">
              Based in Thrissur, Kerala. Certified in HR Management (NSDC) and Digital HR Applications (GreytHR), bringing computer application precision to people operations.
            </p>

            {/* Live Kerala Time */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/60 dark:bg-forest-900/60 border border-stone-200/60 dark:border-forest-800 text-xs text-stone-700 dark:text-stone-300">
              <Clock className="w-3.5 h-3.5 text-sage-600" />
              <span>Kerala Local Time (IST): <strong>{keralaTime || 'Loading...'}</strong></span>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-stone-900 dark:text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium">
              <li>
                <a href="#hero" className="hover:text-sage-700 dark:hover:text-sage-300 transition-colors">Hero Overview</a>
              </li>
              <li>
                <a href="#summary" className="hover:text-sage-700 dark:hover:text-sage-300 transition-colors">Executive Summary</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-sage-700 dark:hover:text-sage-300 transition-colors">Skills & Excel Tools</a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-sage-700 dark:hover:text-sage-300 transition-colors">2026 Certifications</a>
              </li>
              <li>
                <a href="#education" className="hover:text-sage-700 dark:hover:text-sage-300 transition-colors">BCA Education</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-sage-700 dark:hover:text-sage-300 transition-colors">Contact Shifas</a>
              </li>
            </ul>
          </div>

          {/* Direct Communication & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-sm text-stone-900 dark:text-white uppercase tracking-wider">
              Quick Connect
            </h4>
            
            <div className="space-y-2 text-xs sm:text-sm">
              <a 
                href={`tel:${portfolioData.personal.phone}`}
                className="flex items-center space-x-2 text-stone-700 dark:text-stone-300 hover:text-sage-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-sage-600" />
                <span>{portfolioData.personal.phoneFormatted}</span>
              </a>

              <a 
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center space-x-2 text-stone-700 dark:text-stone-300 hover:text-sage-600 transition-colors"
              >
                <Mail className="w-4 h-4 text-sage-600" />
                <span>{portfolioData.personal.email}</span>
              </a>

              <a 
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-stone-700 dark:text-stone-300 hover:text-[#0A66C2] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span>{portfolioData.personal.linkedinUsername}</span>
              </a>

              <div className="flex items-center space-x-2 text-stone-700 dark:text-stone-300 pt-1">
                <MapPin className="w-4 h-4 text-sage-600" />
                <span>Thrissur, Kerala, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Developer Credit & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Shifas CS. All rights reserved.</span>
            <span className="hidden sm:inline text-stone-400 dark:text-forest-700">•</span>
            <span className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
              <span>Developed by</span>
              <a 
                href="https://ashikea.github.io/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-semibold text-sage-700 dark:text-sage-300 hover:text-sage-900 dark:hover:text-white underline underline-offset-2 decoration-sage-400/60 transition-colors"
              >
                Ashik E A
              </a>
              <a 
                href="https://ashikea.github.io/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1 rounded-md hover:bg-sage-100 dark:hover:bg-forest-800 text-sage-600 dark:text-sage-400 hover:text-sage-800 dark:hover:text-sage-200 transition-colors inline-flex items-center"
                title="View Ashik E A Portfolio"
                aria-label="View Ashik E A Portfolio"
              >
                <Briefcase className="w-3.5 h-3.5" />
              </a>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl glass-panel text-stone-700 dark:text-stone-300 hover:text-sage-700 dark:hover:text-sage-200 hover:border-sage-400 transition-all text-xs font-semibold shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
