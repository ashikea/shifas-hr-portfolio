import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Leaf, 
  Menu, 
  X, 
  Sparkles, 
  Mail, 
  Phone, 
  Download,
  Gauge
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ProfilePhoto from './ProfilePhoto';

export default function Header({ 
  isDark, 
  toggleTheme, 
  performanceMode, 
  togglePerformanceMode,
  openResumeModal 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Summary', href: '#summary' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 glass-panel shadow-sage-sm dark:shadow-glow-dark border-b border-sage-300/30 dark:border-forest-800/80' 
          : 'py-4 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Personal Brand with Profile Thumbnail */}
          <a 
            href="#hero" 
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-sage-500 rounded-lg p-1"
            aria-label="Shifas CS Home"
          >
            <div className="relative">
              <ProfilePhoto size="header" showStatusBadge={false} />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-forest-900 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-bold text-base sm:text-lg tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                {portfolioData.personal.name}
              </span>
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-sage-700 dark:text-sage-300 uppercase">
                HR Management & Operations
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-stone-100/70 dark:bg-forest-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200/60 dark:border-forest-800/80">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs lg:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-sage-700 dark:hover:text-sage-200 hover:bg-white/60 dark:hover:bg-forest-800/60 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Tools & Synchronized Theme Switching */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            
            {/* 3D Performance Mode Toggle */}
            <button
              onClick={togglePerformanceMode}
              title={performanceMode === 'high' ? 'Switch to Eco Mode (Lower GPU load)' : 'Switch to High 3D Mode'}
              className="min-w-[42px] min-h-[42px] flex items-center justify-center rounded-full text-stone-600 dark:text-stone-300 hover:bg-sage-100 dark:hover:bg-forest-800 border border-stone-200/60 dark:border-forest-700/60 transition-colors"
              aria-label="Toggle 3D visual mode"
            >
              <Gauge className={`w-4 h-4 ${performanceMode === 'high' ? 'text-sage-600 dark:text-sage-400' : 'text-stone-400'}`} />
            </button>

            {/* Prominent Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="min-w-[42px] min-h-[42px] flex items-center justify-center rounded-full text-stone-700 dark:text-stone-200 hover:bg-sage-100 dark:hover:bg-forest-800 border border-stone-200/70 dark:border-forest-700/70 transition-colors relative"
              aria-label={isDark ? "Switch to Light Sage Mode" : "Switch to Deep Forest Dark Mode"}
              title={isDark ? "Switch to Light Sage Mode" : "Switch to Deep Forest Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-sage-700 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Quick Resume View CTA */}
            <button
              onClick={openResumeModal}
              className="hidden lg:flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-sage-100 dark:bg-forest-800 text-sage-800 dark:text-sage-200 hover:bg-sage-200 dark:hover:bg-forest-700 border border-sage-300/40 dark:border-sage-700/40 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Direct Contact CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white shadow-sm hover:shadow transition-all active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Connect</span>
            </a>

            {/* Mobile Menu Hamburger Button (Min 44px for touch) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-stone-700 dark:text-stone-200 hover:bg-sage-100 dark:hover:bg-forest-800 border border-stone-200/60 dark:border-forest-700/60 transition-colors"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-sage-300/40 dark:border-forest-800 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 dark:text-stone-200 hover:bg-sage-100/60 dark:hover:bg-forest-800/60"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Theme & Mode Bar in Mobile Drawer */}
          <div className="pt-3 border-t border-stone-200 dark:border-forest-800 flex items-center justify-between px-2">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
              Theme: {isDark ? 'Dark Forest' : 'Light Sage'}
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-sage-100 dark:bg-forest-800 text-stone-800 dark:text-stone-200"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-sage-700" />}
              <span>Toggle Mode</span>
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openResumeModal();
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold bg-sage-100 dark:bg-forest-800 text-sage-800 dark:text-sage-200 min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              <span>View & Download Resume</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold bg-sage-600 text-white min-h-[44px]"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Shifas CS</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
