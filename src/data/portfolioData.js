// Default profile photo path (can be replaced by external URL or custom upload)
export const DEFAULT_PROFILE_PHOTO_URL = `${import.meta.env.BASE_URL}images/shifas-profile.jpg`;

export const portfolioData = {
  personal: {
    name: "Shifas CS",
    title: "HR Professional & People Operations Specialist",
    tagline: "Bridging Analytical Precision (BCA) & Human-Centric HR Operations",
    location: "Thrissur, Kerala, India",
    phone: "6282887370",
    phoneFormatted: "+91 62828 87370",
    email: "shifascs2003@gmail.com",
    linkedin: "https://www.linkedin.com/in/shifas-cs",
    linkedinUsername: "linkedin.com/in/shifas-cs",
    whatsapp: "https://wa.me/916282887370",
    status: "Actively seeking HR Executive & People Operations Roles",
    timezone: "IST (UTC +5:30)",
    experienceLevel: "Certified HR Professional (NSDC & GreytHR Trained)",
    profilePhoto: DEFAULT_PROFILE_PHOTO_URL,
    profilePhotoAlt: "Shifas CS - HR Professional",
  },

  summary: {
    fullText:
      "Completed Certification in HR Management training covering Talent Acquisition, Resume Screening, Interview Scheduling, Onboarding and Offboarding, POSH Awareness, Labour Compliance Basics, Employee Engagement, Training Coordination, and Performance Management Basics. Applied HR operations, recruitment coordination, payroll basics, compliance, employee engagement, HR documentation, HR analytics, and HRIS concepts to support people-process execution.",
    
    pillars: [
      {
        id: "talent-acquisition",
        title: "Talent Acquisition & Recruitment",
        icon: "UserCheck",
        description: "End-to-end hiring coordination, active sourcing, targeted resume screening, interview scheduling, candidate communications, and pipeline tracking.",
        metrics: ["Resume Screening", "Interview Scheduling", "Candidate Engagement"]
      },
      {
        id: "hr-operations",
        title: "HR Operations & Compliance",
        icon: "ShieldCheck",
        description: "Seamless new-hire onboarding, offboarding workflows, POSH awareness, statutory labour compliance basics, record management, and personnel filing.",
        metrics: ["Employee Onboarding", "POSH Awareness", "Labour Compliance"]
      },
      {
        id: "payroll-documentation",
        title: "Payroll Support & Attendance",
        icon: "FileSpreadsheet",
        description: "Accurate shift attendance tracking, leave administration, payroll input preparation, pay-slip documentation, and administrative coordination.",
        metrics: ["Attendance Tracking", "Payroll Basics", "HR Documentation"]
      },
      {
        id: "analytics-hris",
        title: "HR Analytics & HRIS (GreytHR)",
        icon: "BarChart3",
        description: "Leveraging BCA foundation with Advanced Excel (PivotTables, formulas, validation) and Power BI to extract actionable workforce insights and streamline HRMS workflows.",
        metrics: ["Advanced MS Excel", "Power BI Dashboards", "GreytHR HRMS"]
      }
    ],

    bcaAdvantage: {
      title: "The Technical HR Edge: Computer Science (BCA) Meets People Operations",
      description: "With a Bachelor of Computer Application background from Calicut University, Shifas brings structured computational logic, relational database acumen, data validation rigor, and rapid software adaptability (HRMS/GreytHR) to modern HR departments, turning manual administrative bottlenecks into streamlined digital processes."
    }
  },

  skills: [
    // Technical Skills
    {
      id: "tech-excel",
      category: "Technical Skills",
      name: "Advanced Microsoft Excel",
      proficiency: 95,
      level: "Advanced",
      description: "Mastery over PivotTables, dynamic charts, VLOOKUP/XLOOKUP, conditional formatting, nested IF/INDEX-MATCH, and data validation for HR reporting and payroll reconciliation.",
      tags: ["PivotTables", "Data Validation", "HR Reporting", "Formulas", "Charts"],
      icon: "Sheet"
    },
    {
      id: "tech-powerbi",
      category: "Technical Skills",
      name: "Power BI",
      proficiency: 88,
      level: "Proficient",
      description: "Building intuitive visual HR dashboards, headcount growth metrics, attrition visualizations, recruitment funnel tracking, and interactive reports.",
      tags: ["Dashboards", "Data Modeling", "Attrition Metrics", "HR KPIs"],
      icon: "BarChart"
    },
    {
      id: "tech-hrms",
      category: "Technical Skills",
      name: "HRMS & Digital HR (GreytHR)",
      proficiency: 92,
      level: "Expertise",
      description: "Hands-on workflow execution in modern HRMS platforms like GreytHR for employee lifecycle management, attendance logs, leave balances, and profile maintenance.",
      tags: ["GreytHR", "Employee Lifecycle", "Leave Management", "Digital Records"],
      icon: "Database"
    },

    // Core HR Operations
    {
      id: "ops-onboarding",
      category: "Core HR Operations",
      name: "Employee Onboarding & Offboarding",
      proficiency: 94,
      level: "Advanced",
      description: "Structuring welcoming first-day experiences, document verification, asset handover checklists, induction orientation, and respectful offboarding exit workflows.",
      tags: ["Induction", "Document Verification", "Exit Formalities", "Workplace Culture"],
      icon: "UserPlus"
    },
    {
      id: "ops-attendance",
      category: "Core HR Operations",
      name: "Attendance Tracking & Leave Administration",
      proficiency: 93,
      level: "Advanced",
      description: "Monitoring biometric/digital punch records, regularizing shifts, managing leave allocations, and tracking absenteeism trends for accurate payroll inputs.",
      tags: ["Biometrics", "Shift Scheduling", "Leave Policies", "Overtime Tracking"],
      icon: "Clock"
    },
    {
      id: "ops-payroll",
      category: "Core HR Operations",
      name: "Payroll Support & Compliance",
      proficiency: 88,
      level: "Proficient",
      description: "Calculating salary days, deductions, allowances, statutory contributions (PF, ESI, TDS basics), and generating accurate monthly payroll input sheets.",
      tags: ["Salary Inputs", "Statutory Deductions", "Pay Slips", "Labour Compliance"],
      icon: "Coins"
    },
    {
      id: "ops-documentation",
      category: "Core HR Operations",
      name: "HR Documentation & Record Management",
      proficiency: 95,
      level: "Advanced",
      description: "Drafting offer letters, appointment agreements, NDA/confidentiality contracts, confirmation letters, HR policy manuals, and audit-ready personnel dossiers.",
      tags: ["Offer Letters", "NDAs", "Personnel Files", "Audit Readiness"],
      icon: "FileText"
    },

    // Soft Skills
    {
      id: "soft-communication",
      category: "Soft Skills",
      name: "Effective Communication",
      proficiency: 92,
      level: "Expertise",
      description: "Clear, empathetic verbal and written communication across cross-functional teams, candidates, and management with strict adherence to confidentiality.",
      tags: ["Active Dialogue", "Cross-functional", "Candidate Care", "Confidentiality"],
      icon: "MessageSquare"
    },
    {
      id: "soft-analytical",
      category: "Soft Skills",
      name: "Analytical Ability",
      proficiency: 94,
      level: "Advanced",
      description: "Deconstructing complex workforce data, identifying recruitment bottlenecks, uncovering turnover trends, and recommending evidence-based solutions.",
      tags: ["Data-Driven", "Problem Solving", "Metric Evaluation", "Critical Thinking"],
      icon: "Sparkles"
    },
    {
      id: "soft-listening",
      category: "Soft Skills",
      name: "Active Listening",
      proficiency: 90,
      level: "Expertise",
      description: "Understanding employee grievances, candidate expectations, and managerial objectives without bias to foster an inclusive workplace atmosphere.",
      tags: ["Empathy", "Grievance Handling", "Employee Voice", "Trust Building"],
      icon: "Ear"
    },
    {
      id: "soft-presentation",
      category: "Soft Skills",
      name: "Presentation Skills",
      proficiency: 89,
      level: "Proficient",
      description: "Delivering engaging new-hire orientation presentations, training coordination sessions, and executive summary reports with visual clarity.",
      tags: ["Orientation", "Visual Decks", "Public Speaking", "Training Delivery"],
      icon: "Tv"
    },
    {
      id: "soft-leadership",
      category: "Soft Skills",
      name: "Team Leadership",
      proficiency: 87,
      level: "Proficient",
      description: "Inspiring collaboration, coordinating group initiatives, mediating interpersonal queries, and championing employee engagement activities.",
      tags: ["Collaboration", "Employee Engagement", "Motivation", "Conflict Resolution"],
      icon: "Users"
    },
    {
      id: "soft-succession",
      category: "Soft Skills",
      name: "Succession Planning Basics",
      proficiency: 85,
      level: "Proficient",
      description: "Understanding talent pipeline continuity, identifying critical operational roles, skill gap mapping, and fostering long-term talent retention.",
      tags: ["Talent Pipeline", "Skill Mapping", "Retention Strategy", "Career Progression"],
      icon: "TrendingUp"
    }
  ],

  certifications: [
    {
      id: "nsdc-hr-management",
      title: "Certification in HR Management | NSDC",
      issuer: "Entri Software PVT LTD",
      organization: "National Skill Development Corporation (NSDC)",
      year: "2026",
      featured: true,
      badge: "NSDC Verified",
      color: "from-emerald-500/20 to-sage-600/20",
      description:
        "Comprehensive industry-aligned HR credential covering deep understanding of employee engagement and retention practices; Labour Law, developing workplace culture, critical thinking, and HR operations; workplace-ready communication, confidentiality, people management skills; industry-focused training in HR operations, talent acquisition, payroll basics, and compliance.",
      competencies: [
        "Employee Engagement & Retention Strategies",
        "Indian Labour Law & Statutory Compliance",
        "Developing Healthy Workplace Culture",
        "Confidentiality & Ethics in HR",
        "Talent Acquisition & Interview Coordination",
        "Payroll Basics & Statutory Frameworks",
        "Critical Thinking for People Operations"
      ]
    },
    {
      id: "greythr-digital-hr",
      title: "Digital HR Application Training",
      issuer: "GreytHR Academy",
      organization: "Greytip Software / GreytHR",
      year: "2026",
      featured: true,
      badge: "Industry Standard HRMS",
      color: "from-blue-500/20 to-sage-600/20",
      description:
        "Practical concepts in Digital HR Training; foundational understanding of HR operations, recruitment coordination, payroll basics, employee engagement, HR documentation, and workplace communication; applied to accurate documentation, reporting, process follow-up, and workplace readiness.",
      competencies: [
        "GreytHR Platform Navigation & Architecture",
        "Employee Information Systems (EIS)",
        "Automated Leave & Attendance Administration",
        "Payroll Input Processing & Payslips",
        "HR Document Generation & Reporting",
        "Digital Process Follow-up & Compliance Checks"
      ]
    },
    {
      id: "advance-ms-excel",
      title: "Advance MS Excel",
      issuer: "Entri Software PVT LTD",
      organization: "Entri App / Corporate Training Division",
      year: "2026",
      featured: false,
      badge: "Data Precision",
      color: "from-emerald-600/20 to-teal-600/20",
      description:
        "PivotTables and charts for data analysis and HR reporting; conditional formatting and data validation for maintaining data accuracy.",
      competencies: [
        "Interactive PivotTables & Dynamic Pivot Charts",
        "HR Data Analytics & Attrition Modelling",
        "Conditional Formatting for Attendance Outliers",
        "Strict Data Validation & Dropdown Form Controls",
        "Formula Mastery (VLOOKUP, XLOOKUP, INDEX/MATCH, SUMIFS)"
      ]
    },
    {
      id: "office-operations-management",
      title: "Office Operations and Management",
      issuer: "Entri Software PVT LTD",
      organization: "Entri Corporate Skills Wing",
      year: "2026",
      featured: false,
      badge: "Administrative Excellence",
      color: "from-sage-500/20 to-stone-600/20",
      description:
        "Certified in Office Administration with knowledge of office operations, administrative support, documentation, record management, communication, and coordination; skilled in MS Office and organizational tasks focused on efficient office workflows.",
      competencies: [
        "Office Operations & Workflow Optimization",
        "Administrative Support & Resource Scheduling",
        "Audit-Proof Record Management & Archiving",
        "Executive Correspondence & Professional Etiquette",
        "MS Office Suite Mastery for Office Productivity"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Application (BCA)",
      institution: "Calicut University",
      location: "Kerala, India",
      duration: "2021 – 2024",
      grade: "Successfully Completed",
      summary: "Three-year undergraduate program imparting rigorous training in computational logic, relational database systems, programming foundations, software lifecycle management, and quantitative problem solving.",
      relevanceToHR: [
        "Relational Database Logic: Direct asset when managing complex HRMS tables and employee schema.",
        "Algorithmic Problem Solving: Enables structured troubleshooting of payroll calculations and attendance shifts.",
        "Rapid Software Adoption: Swift mastery over digital HR platforms (GreytHR, Darwinbox, Workday, Power BI).",
        "Data Integrity: High precision in spreadsheet formula writing, conditional formatting, and audit trails."
      ]
    }
  ],

  keralaHighlights: {
    location: "Thrissur, Kerala",
    knownAs: "Cultural Capital of Kerala",
    availability: "Immediate Joining / Open to Thrissur, Kochi, Malappuram, Calicut & Remote / Hybrid roles",
    languages: ["English (Professional)", "Malayalam (Native)", "Hindi (Conversational)"]
  }
};
