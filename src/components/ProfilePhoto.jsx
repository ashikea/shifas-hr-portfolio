import React, { useState } from 'react';
import { User, Sparkles, Check, UploadCloud } from 'lucide-react';
import profileImg from '../assets/shifas-profile.jpg';
import { portfolioData } from '../data/portfolioData';

/**
 * ProfilePhoto Component
 * Framed botanical avatar for Shifas CS with responsive scaling,
 * object-cover object-top, light/dark mode synchronized borders,
 * defensive fallback placeholder, and an upload-ready custom slot.
 */
export default function ProfilePhoto({ 
  className = "", 
  size = "hero", // "hero" | "header" | "modal" | "card"
  showStatusBadge = true 
}) {
  const [imgError, setImgError] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState(profileImg || portfolioData.personal.profilePhoto);

  // Sizing variants
  const sizeClasses = {
    hero: "w-44 h-52 sm:w-56 sm:h-64 lg:w-64 lg:h-80 rounded-3xl",
    header: "w-9 h-9 rounded-full",
    modal: "w-24 h-28 sm:w-28 sm:h-32 rounded-2xl",
    card: "w-16 h-16 rounded-2xl"
  };

  return (
    <div className={`relative inline-block select-none group ${className}`}>
      
      {/* Outer botanical glow & layered gradient ring */}
      <div 
        className={`absolute -inset-1.5 rounded-[28px] bg-gradient-to-tr from-sage-500 via-sage-400 to-emerald-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none ${
          size === 'header' ? 'rounded-full -inset-0.5' : ''
        }`} 
      />

      {/* Main framed photo container */}
      <div 
        className={`relative overflow-hidden bg-stone-100 dark:bg-forest-900 border-2 border-sage-300/80 dark:border-forest-700 shadow-sage-md dark:shadow-glow-dark transition-all duration-300 ${
          sizeClasses[size] || sizeClasses.hero
        }`}
      >
        {!imgError ? (
          <img
            src={customPhotoUrl}
            alt={portfolioData.personal.profilePhotoAlt || "Shifas CS - HR Professional"}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="eager"
          />
        ) : (
          /* Elegant botanical SVG monogram fallback if image fails to load */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-sage-100 to-sage-200 dark:from-forest-900 dark:to-forest-950 text-sage-800 dark:text-sage-200">
            <User className="w-12 h-12 stroke-[1.5] text-sage-600 dark:text-sage-400 mb-1" />
            <span className="font-display font-bold text-sm tracking-wider">Shifas CS</span>
            <span className="text-[10px] text-sage-600 dark:text-sage-400">HR Professional</span>
          </div>
        )}

        {/* Subtle inner botanical vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent opacity-40 pointer-events-none" />
      </div>

      {/* Live Availability Status Indicator Badge (Only in Hero/Card mode) */}
      {showStatusBadge && size === 'hero' && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full glass-panel border border-emerald-400/50 dark:border-emerald-600/50 shadow-md flex items-center space-x-1.5 z-20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-stone-800 dark:text-stone-100">
            Available for HR Roles
          </span>
        </div>
      )}
    </div>
  );
}
