import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Send, 
  Copy, 
  Check, 
  Clock, 
  ArrowUpRight,
  Loader2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

/**
 * WEB3FORMS API CONFIGURATION:
 * Real-time direct inbox delivery to Shifas CS (shifascs2003@gmail.com).
 * Key provided by Shifas CS to receive inquiries directly without third-party redirect barriers.
 */
export const WEB3FORMS_ACCESS_KEY = "72a33187-c9f7-40b5-b18c-64896d628c05";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryFocus: 'Full-time HR Executive',
    message: ''
  });

  const [copiedField, setCopiedField] = useState(null);
  const [copiedInquiry, setCopiedInquiry] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const inquiryOptions = [
    'Full-time HR Executive',
    'HR Operations / Coordinator',
    'Talent Acquisition / Recruitment',
    'Interview Scheduling',
    'HR Consulting / General Inquiry'
  ];

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyInquiryText = () => {
    const inquiryText = 
      `Inquiry for Shifas CS (shifascs2003@gmail.com)\n` +
      `-----------------------------------------\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Organization: ${formData.organization || 'Not Specified'}\n` +
      `Inquiry Focus: ${formData.inquiryFocus}\n\n` +
      `Message / Role Details:\n${formData.message}\n` +
      `-----------------------------------------`;
    navigator.clipboard.writeText(inquiryText);
    setCopiedInquiry(true);
    setTimeout(() => setCopiedInquiry(false), 2500);
  };

  // Generate pre-filled mailto URL for direct email client draft
  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[HR Portfolio Inquiry] ${formData.inquiryFocus} — from ${formData.name || 'Website Visitor'}`);
    const body = encodeURIComponent(
      `Hello Shifas,\n\n` +
      `I am reaching out regarding a career / consulting opportunity.\n\n` +
      `• Candidate / Inquirer: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• Organization: ${formData.organization || 'Not specified'}\n` +
      `• Inquiry Focus: ${formData.inquiryFocus}\n\n` +
      `Message / Role Details:\n${formData.message}\n\n` +
      `Looking forward to connecting!\n` +
      `Best regards,\n${formData.name}`
    );
    return `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (*).');
      return;
    }

    // Check if key is configured
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
      setStatus('error');
      setErrorMessage('Direct inbox submission is unavailable right now. You can send your inquiry using the 1-click email button or copy the formatted details below.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Portfolio Inquiry from ${formData.name} — ${formData.inquiryFocus}`,
          from_name: "Shifas CS HR Portfolio",
          name: formData.name,
          email: formData.email,
          company: formData.organization || "Not specified",
          inquiry_focus: formData.inquiryFocus,
          message: formData.message
        })
      });

      const data = await response.json();

      if (response.ok && data.success === true) {
        setStatus('success');
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (err) {}

        // Reset form fields upon success
        setFormData({
          name: '',
          email: '',
          organization: '',
          inquiryFocus: 'Full-time HR Executive',
          message: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(data?.message || 'Direct inbox submission is unavailable right now. You can send your inquiry using the 1-click email button or copy the formatted details below.');
      }
    } catch (err) {
      // In case of network barrier or offline condition, provide calm friendly fallback
      setStatus('error');
      setErrorMessage('Direct inbox submission is unavailable right now. You can send your inquiry using the 1-click email button or copy the formatted details below.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setFormData({
      name: '',
      email: '',
      organization: '',
      inquiryFocus: 'Full-time HR Executive',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 dark:bg-forest-800 text-sage-800 dark:text-sage-200 border border-sage-300/40">
            <Mail className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
            <span>Connect & Inquiry</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Get in Touch with Shifas CS
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base">
            Open to full-time HR Executive, Recruitment Coordinator, and People Operations roles in Thrissur, across Kerala, and Pan-India / Remote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="glass-panel rounded-3xl p-7 border border-stone-200/80 dark:border-forest-700/60 shadow-md space-y-6">
              <h3 className="font-display font-bold text-xl text-stone-900 dark:text-white pb-3 border-b border-stone-200/80 dark:border-forest-800">
                Contact Details
              </h3>

              <div className="space-y-4">
                
                {/* Phone */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/50 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-sage-100 dark:bg-forest-800 text-sage-700 dark:text-sage-300 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Phone</span>
                      <a 
                        href={`tel:${portfolioData.personal.phone}`} 
                        className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white hover:text-sage-600"
                      >
                        {portfolioData.personal.phoneFormatted}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(portfolioData.personal.phone, 'phone')}
                    className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-forest-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                    title="Copy phone number"
                    aria-label="Copy phone number"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/50 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-800">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-sage-100 dark:bg-forest-800 text-sage-700 dark:text-sage-300 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Email</span>
                      <a 
                        href={`mailto:${portfolioData.personal.email}`} 
                        className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white hover:text-sage-600 truncate block"
                      >
                        {portfolioData.personal.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(portfolioData.personal.email, 'email')}
                    className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-forest-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors shrink-0"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white/50 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-800">
                  <div className="w-10 h-10 rounded-xl bg-sage-100 dark:bg-forest-800 text-sage-700 dark:text-sage-300 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Location</span>
                    <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                      {portfolioData.personal.location}
                    </span>
                    <span className="text-[11px] text-sage-700 dark:text-sage-400 block font-medium">
                      Cultural Capital of Kerala • Open for relocation / hybrid
                    </span>
                  </div>
                </div>

                {/* LinkedIn Direct */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/50 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-[#0A66C2] flex items-center justify-center shrink-0">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">LinkedIn Profile</span>
                      <a 
                        href={portfolioData.personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white hover:text-[#0A66C2] flex items-center gap-1"
                      >
                        <span>{portfolioData.personal.linkedinUsername}</span>
                        <ArrowUpRight className="w-3 h-3 text-stone-400" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Availability & Timezone Note */}
              <div className="pt-3 border-t border-stone-200/80 dark:border-forest-800 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sage-600" />
                  <span>Timezone: {portfolioData.personal.timezone}</span>
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Immediate Joiner
                </span>
              </div>
            </div>

            {/* WhatsApp Quick Reachout Card */}
            <div className="glass-panel-subtle rounded-3xl p-5 border border-emerald-300/40 dark:border-forest-700 flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-sm text-stone-900 dark:text-white">
                  Fast WhatsApp Reachout
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Send a direct WhatsApp text for immediate response.
                </p>
              </div>

              <a
                href={portfolioData.personal.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all shadow-sm flex items-center gap-1.5 shrink-0"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Web3Forms Integrated Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-7 sm:p-9 border border-stone-200/80 dark:border-forest-700/60 shadow-lg space-y-6">
              
              {/* Header Copy */}
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-stone-900 dark:text-white">
                  Send an Inquiry or Schedule an Interview
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  Fill in the details below to initiate a discussion regarding career opportunities or consulting.
                </p>
              </div>

              {/* SUCCESS BANNER */}
              {status === 'success' && (
                <div className="p-7 sm:p-8 rounded-2xl bg-emerald-50 dark:bg-forest-900/70 border border-emerald-300 dark:border-emerald-600/40 text-center space-y-4 animate-in fade-in duration-300 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-xl text-stone-900 dark:text-white">
                      Inquiry Successfully Dispatched!
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 max-w-md mx-auto leading-relaxed">
                      Your inquiry has been delivered directly to Shifas CS's inbox (<strong className="text-emerald-700 dark:text-emerald-300 font-semibold">{portfolioData.personal.email}</strong>). You will receive a direct reply within 24 business hours.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sage-600 hover:bg-sage-700 text-white transition-colors flex items-center space-x-1.5 shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Send Another Inquiry</span>
                    </button>
                    <a
                      href={portfolioData.personal.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-forest-800 text-stone-800 dark:text-stone-100 hover:bg-stone-100 border border-stone-200 dark:border-forest-700 transition-colors"
                    >
                      Follow Up on WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* FORM & ERROR / FALLBACK STATE */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* CLEAN FALLBACK BANNER (ONLY SHOWN IF WEB3FORMS CALL ENCOUNTERS FAILURE) */}
                  {status === 'error' && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-700/60 space-y-3 animate-in fade-in">
                      <div className="flex items-start space-x-2.5 text-xs text-amber-900 dark:text-amber-200">
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <strong className="block font-bold mb-0.5">Direct Email Fallback Ready:</strong>
                          <span>{errorMessage || 'Direct inbox submission is unavailable right now. You can send your inquiry using the 1-click email button or copy the formatted details below.'}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href={getMailtoUrl()}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>1-Click Open in Email App ({portfolioData.personal.email})</span>
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>

                        <button
                          type="button"
                          onClick={handleCopyInquiryText}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-forest-900 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 hover:bg-amber-100/50 dark:hover:bg-forest-800 transition-colors"
                        >
                          {copiedInquiry ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedInquiry ? 'Copied Formatted Details!' : 'Copy Formatted Message'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Row 1: Your Full Name * & Email Address * (2 columns on desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Your Full Name * */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between">
                        <span>Your Full Name *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Anjali Menon"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={status === 'submitting'}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-forest-900/60 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-200/90 dark:border-forest-700/80 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all shadow-sm"
                      />
                    </div>

                    {/* Email Address * */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between">
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. hr@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={status === 'submitting'}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-forest-900/60 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-200/90 dark:border-forest-700/80 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all shadow-sm"
                      />
                    </div>

                  </div>

                  {/* Row 2: Organization / Company & Inquiry Focus (2 columns on desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Organization / Company */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between">
                        <span>Organization / Company</span>
                        <span className="text-[10px] text-stone-400 font-normal">Optional</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. TechCorp Kerala"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        disabled={status === 'submitting'}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-forest-900/60 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-200/90 dark:border-forest-700/80 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all shadow-sm"
                      />
                    </div>

                    {/* Inquiry Focus */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        Inquiry Focus
                      </label>
                      <div className="relative">
                        <select
                          name="inquiry_focus"
                          value={formData.inquiryFocus}
                          onChange={(e) => setFormData({ ...formData, inquiryFocus: e.target.value })}
                          disabled={status === 'submitting'}
                          className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl bg-white/80 dark:bg-forest-900/60 text-xs sm:text-sm text-stone-900 dark:text-stone-100 border border-stone-200/90 dark:border-forest-700/80 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all shadow-sm cursor-pointer"
                        >
                          {inquiryOptions.map((opt) => (
                            <option 
                              key={opt} 
                              value={opt}
                              className="bg-white text-stone-900 dark:bg-[#141E18] dark:text-stone-100 py-1.5 font-medium"
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-stone-500 dark:text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                  </div>

                  {/* Row 3: Message / Role Details * (Full width) */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between">
                      <span>Message / Role Details *</span>
                      <span className="text-[10px] text-stone-400 font-normal">Min. 10 chars</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Share brief details about the role, location, team, or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-forest-900/60 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 border border-stone-200/90 dark:border-forest-700/80 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all shadow-sm resize-y min-h-[100px]"
                    />
                  </div>

                  {/* Submit Button with Loading State */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white shadow-sage-md hover:shadow-sage-lg transition-all active:scale-98 flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-wait"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending Inquiry to Shifas CS...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry to Shifas CS</span>
                      </>
                    )}
                  </button>

                  {/* Trust & Direct Email Notice */}
                  <div className="pt-1 text-center space-y-1">
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Powered by Web3Forms direct inbox delivery to Shifas CS (<a href={`mailto:${portfolioData.personal.email}`} className="text-sage-700 dark:text-sage-300 font-medium hover:underline">{portfolioData.personal.email}</a>).
                    </p>
                    <p className="text-[10px] text-stone-400 dark:text-stone-500">
                      Strict professional confidentiality maintained.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
