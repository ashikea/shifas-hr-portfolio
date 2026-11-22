# Shifas CS — 3D HR Portfolio Web Application
**Location:** Thrissur, Kerala, India  
**Specialization:** HR Management, People Operations, Talent Acquisition, GreytHR & HR Analytics  
**Academic Background:** Bachelor of Computer Application (BCA), Calicut University  

---

## 🌿 1. Overview & Architectural Highlights
This application is a lag-free, mobile-responsive 3D HR portfolio built specifically for **Shifas CS**. It features a modern botanical theme rooted in sage leaf palettes, crisp white morning dew gradients, and deep forest charcoal surfaces.

### Key Capabilities:
- **Prominent Framed Profile Photo Component**:
  - Embedded high-resolution professional portrait of Shifas CS.
  - Styled with subtle botanical sage framing, `object-cover object-top`, `alt="Shifas CS - HR Professional"`, live availability status pill, and responsive scaling across mobile, tablet, and desktop.
  - Includes a `DEFAULT_PROFILE_PHOTO_URL` / upload-ready slot in `portfolioData.js` and defensive SVG avatar fallback if the image fails to load.
  - Featured in the Hero section, Header avatar thumbnail, and printable Resume document.
- **Subtle 3D Botanical Scene (Purely Ambient, No Scroll Response)**:
  - Procedural organic branching tree with branching stems and bark materials.
  - Custom 3D curved sage leaf geometries (with central vein depth) with gentle ambient harmonic wind sway.
  - Floating and gently drifting ambient sage leaves in 3D space.
  - **Strictly decoupled from window scroll events**: Background animation, camera vantage, leaf drift, and transforms are purely ambient and gentle (static when `prefers-reduced-motion` is active).
  - 60 FPS performance optimizations: pixel ratio capped at `Math.min(window.devicePixelRatio, 2)`, zero per-frame object allocations, low polygon budget, and automatic render pause on tab backgrounding via Page Visibility API.
- **Synchronized Light / Dark Mode System**:
  - Accessible header toggle updating a single shared theme state.
  - Instantly and smoothly synchronizes UI surfaces, text contrast, leaf/branch materials, fog/gradient backdrop, and 3D scene lighting at the exact same time without flicker or desync.
- **Color Palette**:
  - Primary Sage: `#8FA893`
  - Deep Herb Sage: `#6B8E73`
  - Pale Leaf Sage: `#A3B899`
  - Crisp Light Gradients: `#FFFFFF` to `#F4F7F5` with `#E8ECE9` stone accents
  - Dark Mode: Deep Forest Charcoal (`#101713` to `#0B110E`) and Muted Sage (`#7D9B82`)
- **Typography & Amelia Integration**:
  - Configured for the **Amelia** font aesthetic, with a geometric organic sans-serif fallback cascade (`Plus Jakarta Sans`, `Outfit`, `Inter`).
  - Clear `@font-face` declaration provided in `index.html` with instructions for drop-in `.woff2` font files.
- **Accurate Resume Content (Verbatim)**:
  - **Summary**: Full statement covering Talent Acquisition, Resume Screening, Interview Scheduling, Onboarding/Offboarding, POSH, Labour Compliance, Employee Engagement, Training Coordination, Payroll Basics, HR Documentation, HR Analytics, and HRIS.
  - **BCA + HR Advantage**: Highlighting how Shifas's Computer Application education supercharges relational database logic, spreadsheet formulas, and HRMS adoption.
  - **Categorized Skills**:
    - *Technical Skills*: Advanced Microsoft Excel, Power BI, HRMS (GreytHR)
    - *Core HR Operations*: Employee Onboarding, Attendance Tracking, Payroll Support, Documentation
    - *Soft Skills*: Effective Communication, Analytical Ability, Active Listening, Presentation Skills, Team Leadership, Succession Planning
  - **2026 Certifications**:
    - *Certification in HR Management | NSDC* — Entri Software PVT LTD (2026)
    - *Digital HR Application Training* — GreytHR Academy (2026)
    - *Advance MS Excel* — Entri Software PVT LTD (2026)
    - *Office Operations and Management* — Entri Software PVT LTD (2026)
  - **Education**:
    - *Bachelor of Computer Application (BCA)* (2021–2024) — Calicut University
- **Interactive Features**:
  - One-click copy for Phone (`6282887370`) and Email (`shifascs2003@gmail.com`) with instant feedback.
  - Live interactive **HR Workforce KPI & Excel Simulator** (real-time retention rate, attrition, and attendance calculator).
  - Certification syllabus modal with celebratory botanical confetti.
  - Complete printable / exportable Resume Modal (`window.print()`) formatted for A4.
  - Live Kerala local time indicator (IST UTC+5:30).
  - Upgraded **"Send an Inquiry or Schedule an Interview"** form with Web3Forms direct inbox delivery to `shifascs2003@gmail.com` (`WEB3FORMS_ACCESS_KEY`), live transmission spinner, success banner with confetti, and calm 1-click `mailto` / clipboard fallback.
  - Subtle developer credit in footer: `Developed by Ashik E A` with linked portfolio briefcase icon (pointing to `https://ashikea.github.io/`).

---

## 📁 2. Project Directory Structure
```
shifas-hr-portfolio/
├── dist/                          # Production-ready static build
│   ├── index.html
│   └── assets/                    # Optimized chunked JS & CSS
├── src/
│   ├── components/
│   │   ├── ProfilePhoto.jsx        # Framed botanical portrait component
│   │   ├── ThreeBotanicalScene.jsx # 3D Three.js tree, leaves & lighting
│   │   ├── Header.jsx              # Navbar, theme switch & mobile drawer
│   │   ├── Hero.jsx                # Profile, location, quick copy cards
│   │   ├── SummarySection.jsx      # Resume statement & 4 pillars
│   │   ├── SkillsSection.jsx       # Skills matrix & live HR KPI simulator
│   │   ├── CertificationsSection.jsx # 4 accredited 2026 credentials
│   │   ├── EducationSection.jsx    # BCA Calicut University & HR synergy
│   │   ├── ContactSection.jsx      # Inquiry form, phone, email & WhatsApp
│   │   ├── Footer.jsx              # Kerala local time, links & back-to-top
│   │   └── ResumeModal.jsx         # Clean printable resume document
│   ├── data/
│   │   └── portfolioData.js        # Single source of truth for resume data
│   ├── App.jsx                     # Root component with state management
│   ├── main.jsx                    # Vite entry point
│   └── index.css                   # Tailwind CSS & glassmorphic styling
├── index.html                      # HTML with Amelia font-face declaration
├── vite.config.js                  # Vite configuration with chunk splitting
├── tailwind.config.js              # Botanical sage and forest color palette
└── package.json                    # Dependencies and scripts
```

---

## 🚀 3. How to Run Locally

### Start Development Server:
```bash
cd "C:\Users\aea66\.gemini\antigravity\scratch\shifas-hr-portfolio"
npm run dev
```

### Build for Production:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```
Alternatively, open `dist/index.html` directly in any modern web browser.
