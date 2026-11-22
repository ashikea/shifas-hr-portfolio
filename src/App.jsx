import React, { useState, useEffect } from 'react';
import ThreeBotanicalScene from './components/ThreeBotanicalScene';
import Header from './components/Header';
import Hero from './components/Hero';
import SummarySection from './components/SummarySection';
import SkillsSection from './components/SkillsSection';
import CertificationsSection from './components/CertificationsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    // Check saved theme or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shifas_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [performanceMode, setPerformanceMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shifas_perf_mode');
      if (saved) return saved;
      // Auto low-power on smaller screens or low hardware concurrency
      if (window.navigator?.hardwareConcurrency && window.navigator.hardwareConcurrency < 4) {
        return 'low';
      }
    }
    return 'high';
  });

  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    // Synchronize HTML element class
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('shifas_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('shifas_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('shifas_perf_mode', performanceMode);
  }, [performanceMode]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const togglePerformanceMode = () => {
    setPerformanceMode((prev) => (prev === 'high' ? 'low' : 'high'));
  };

  return (
    <div className="relative min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-sage-400/40 selection:text-sage-900 dark:selection:text-sage-100">
      
      {/* 3D Botanical Scene (Three.js Organic Tree & Swaying Sage Leaves) */}
      <ThreeBotanicalScene 
        isDark={isDark} 
        performanceMode={performanceMode} 
      />

      {/* Foreground Content Stack */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Header */}
        <Header 
          isDark={isDark} 
          toggleTheme={toggleTheme}
          performanceMode={performanceMode}
          togglePerformanceMode={togglePerformanceMode}
          openResumeModal={() => setResumeModalOpen(true)}
        />

        {/* Hero Section */}
        <main className="flex-grow">
          <Hero 
            openResumeModal={() => setResumeModalOpen(true)} 
          />

          {/* About / Summary Section */}
          <SummarySection />

          {/* Interactive Skills Matrix & Excel KPI Simulator */}
          <SkillsSection />

          {/* 2026 Certifications Section */}
          <CertificationsSection />

          {/* BCA Education Section */}
          <EducationSection />

          {/* Contact & Inquiry Section */}
          <ContactSection />
        </main>

        {/* Botanical Footer */}
        <Footer />

      </div>

      {/* Full Resume View & Printable Document Modal */}
      <ResumeModal 
        isOpen={resumeModalOpen} 
        onClose={() => setResumeModalOpen(false)} 
      />

    </div>
  );
}
