import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Sheet, 
  BarChart, 
  Database, 
  UserPlus, 
  Clock, 
  Coins, 
  FileText, 
  MessageSquare, 
  Ear, 
  Tv, 
  Users, 
  TrendingUp, 
  Check, 
  Calculator,
  Sliders
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive HR KPI Calculator state for live demo
  const [headcountStart, setHeadcountStart] = useState(120);
  const [hires, setHires] = useState(15);
  const [exits, setExits] = useState(4);
  const [workingDays, setWorkingDays] = useState(22);
  const [leavesTaken, setLeavesTaken] = useState(12);

  const categories = ['All', 'Technical Skills', 'Core HR Operations', 'Soft Skills'];

  const iconMap = {
    Sheet: Sheet,
    BarChart: BarChart,
    Database: Database,
    UserPlus: UserPlus,
    Clock: Clock,
    Coins: Coins,
    FileText: FileText,
    MessageSquare: MessageSquare,
    Sparkles: Sparkles,
    Ear: Ear,
    Tv: Tv,
    Users: Users,
    TrendingUp: TrendingUp
  };

  const filteredSkills = useMemo(() => {
    return portfolioData.skills.filter((skill) => {
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch = 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Derived HR metrics for live preview
  const headcountEnd = headcountStart + hires - exits;
  const avgHeadcount = (headcountStart + headcountEnd) / 2;
  const attritionRate = avgHeadcount > 0 ? ((exits / avgHeadcount) * 100).toFixed(1) : 0;
  const retentionRate = (100 - attritionRate).toFixed(1);
  const totalPossibleDays = (headcountEnd * workingDays);
  const attendanceRate = totalPossibleDays > 0 ? (((totalPossibleDays - leavesTaken) / totalPossibleDays) * 100).toFixed(1) : 100;

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-sage-100 dark:bg-forest-800 text-sage-800 dark:text-sage-200 border border-sage-300/40">
            <Sparkles className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
            <span>Interactive Competency Matrix</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Skills & Operational Proficiencies
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base">
            Organized across Technical Systems, Core People Operations, and Interpersonal Leadership.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass-panel-subtle border border-stone-200/80 dark:border-forest-700/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-sage-600 text-white shadow-sm'
                    : 'text-stone-700 dark:text-stone-300 hover:text-sage-700 dark:hover:text-sage-200 hover:bg-white/40 dark:hover:bg-forest-800/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search skills (e.g. Excel, Payroll)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-panel text-xs sm:text-sm text-stone-800 dark:text-stone-200 placeholder-stone-400 border border-stone-200/80 dark:border-forest-700/80 focus:outline-none focus:ring-2 focus:ring-sage-500"
            />
          </div>

        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.icon] || Sparkles;

            return (
              <div
                key={skill.id}
                className="glass-panel rounded-3xl p-6 border border-stone-200/80 dark:border-forest-700/60 hover:border-sage-400/80 dark:hover:border-sage-500/80 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-sage-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-sage-100 dark:bg-forest-800 text-sage-700 dark:text-sage-300 flex items-center justify-center shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-forest-900 text-sage-800 dark:text-sage-300 border border-stone-200 dark:border-forest-800">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-stone-900 dark:text-white mb-1.5">
                    {skill.name}
                  </h3>

                  <span className="inline-block text-[11px] font-semibold text-sage-600 dark:text-sage-400 mb-3">
                    {skill.category}
                  </span>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-stone-200/60 dark:border-forest-800">
                  {/* Proficiency Meter */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                      <span>Proficiency</span>
                      <span>{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-forest-800 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-sage-500 to-emerald-500 transition-all duration-700"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>

                  {/* Skill Competency Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skill.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 dark:bg-forest-800/80 text-stone-700 dark:text-stone-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Live Interactive HR Analytics / Excel Logic Simulator */}
        <div className="glass-panel rounded-3xl p-7 sm:p-9 border border-sage-300/60 dark:border-sage-700/50 shadow-lg relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-200/80 dark:border-forest-800/80">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-sage-700 dark:text-sage-300 mb-1">
                <Calculator className="w-4 h-4 text-sage-600" />
                <span>Applied MS Excel & Power BI Logic in Action</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                Live HR Operations & Workforce KPI Simulator
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                Adjust headcount and attendance parameters below to observe real-time HR formula calculations.
              </p>
            </div>

            <span className="self-start md:self-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 shrink-0">
              Formula Model: ISO/HR-Standard
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5 bg-white/40 dark:bg-forest-900/40 p-3.5 rounded-2xl border border-stone-200/60 dark:border-forest-800/60">
                <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                  <span>Starting Headcount</span>
                  <span className="text-sage-700 dark:text-sage-300 font-bold">{headcountStart}</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="500" 
                  value={headcountStart} 
                  onChange={(e) => setHeadcountStart(Number(e.target.value))}
                  className="w-full accent-sage-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5 bg-white/40 dark:bg-forest-900/40 p-3.5 rounded-2xl border border-stone-200/60 dark:border-forest-800/60">
                <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                  <span>New Hires (Onboarded)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{hires}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={hires} 
                  onChange={(e) => setHires(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5 bg-white/40 dark:bg-forest-900/40 p-3.5 rounded-2xl border border-stone-200/60 dark:border-forest-800/60">
                <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                  <span>Exits / Separations</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">-{exits}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="25" 
                  value={exits} 
                  onChange={(e) => setExits(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5 bg-white/40 dark:bg-forest-900/40 p-3.5 rounded-2xl border border-stone-200/60 dark:border-forest-800/60">
                <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                  <span>Leaves Taken</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{leavesTaken} days</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={leavesTaken} 
                  onChange={(e) => setLeavesTaken(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

            </div>

            {/* Calculated Output Dashboard Tiles */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              
              <div className="p-4 rounded-2xl bg-gradient-to-br from-sage-50 to-sage-100/60 dark:from-forest-800/60 dark:to-forest-900/60 border border-sage-200 dark:border-forest-700 text-center">
                <span className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                  Ending Headcount
                </span>
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900 dark:text-white">
                  {headcountEnd}
                </span>
                <span className="text-[10px] text-sage-700 dark:text-sage-300 block mt-1 font-medium">
                  Net: {hires - exits >= 0 ? `+${hires - exits}` : hires - exits}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 dark:from-forest-800/60 dark:to-forest-900/60 border border-emerald-200 dark:border-forest-700 text-center">
                <span className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                  Retention Rate
                </span>
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
                  {retentionRate}%
                </span>
                <span className="text-[10px] text-stone-500 block mt-1">
                  Attrition: {attritionRate}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/60 dark:from-forest-800/60 dark:to-forest-900/60 border border-blue-200 dark:border-forest-700 text-center">
                <span className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-1">
                  Attendance Ratio
                </span>
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-blue-600 dark:text-blue-400">
                  {attendanceRate}%
                </span>
                <span className="text-[10px] text-stone-500 block mt-1">
                  22 Working Days Base
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100/60 dark:from-forest-800/60 dark:to-forest-900/60 border border-stone-200 dark:border-forest-700 text-center flex flex-col justify-center">
                <span className="text-[11px] font-bold text-stone-600 dark:text-stone-400 block mb-0.5">
                  Excel Model
                </span>
                <span className="font-mono text-xs text-sage-800 dark:text-sage-300 font-bold">
                  =SUM(Hires-Exits)
                </span>
                <span className="text-[10px] text-stone-500 mt-1">
                  PivotTable / Power BI Ready
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
