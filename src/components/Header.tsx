import React from 'react';
import { FlaskConical, Sparkles, Zap, Atom, Globe, Volume2, VolumeX, BookOpen, Trophy, LayoutDashboard } from 'lucide-react';
import { UnitId, AppMode } from '../types';
import { unitsList } from '../data/curriculumUnits';

interface HeaderProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  score: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  score,
  soundEnabled,
  onToggleSound,
}) => {
  // Arabic numeral formatter (e.g. ١،٤٥٥)
  const formattedScore = score.toLocaleString('ar-SA');

  const getUnitIcon = (iconName: string, active: boolean) => {
    const className = `w-4 h-4 ${active ? 'text-cyan-300' : 'text-slate-400'}`;
    switch (iconName) {
      case 'cell':
        return <Sparkles className={className} />;
      case 'zap':
        return <Zap className={className} />;
      case 'atom':
        return <Atom className={className} />;
      case 'globe':
        return <Globe className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070d1e]/95 backdrop-blur-md border-b border-[#152347]">
      {/* Top Bar matching screenshot EXACTLY */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Right side in RTL: App Icon + Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/40">
            <FlaskConical className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="font-black text-white text-base sm:text-lg leading-tight tracking-tight">
              تجارب علوم
            </h1>
            <p className="font-extrabold text-white text-base sm:text-lg leading-tight tracking-tight">
              الصف السادس
            </p>
          </div>
        </div>

        {/* Center / Fast Navigation for larger screens */}
        <div className="hidden lg:flex items-center gap-1.5 bg-[#091126] p-1 rounded-2xl border border-cyan-500/20 text-xs font-bold">
          <button
            onClick={() => onSelectMode('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              currentMode === 'home'
                ? 'bg-[#0f4859] text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>الرئيسية والمشاهدات</span>
          </button>
          <button
            onClick={() => onSelectMode('textbook')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              currentMode === 'textbook'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>صفحات الكتاب</span>
          </button>
          <button
            onClick={() => onSelectMode('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              currentMode === 'quiz'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>اختبار المنهج</span>
          </button>
        </div>

        {/* Left side in RTL: Curriculum badge, Score pill, Sound button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* منهج السادس Badge (matching screenshot) */}
          <div className="bg-[#0b2742] border border-cyan-500/30 text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-full select-none shadow-sm">
            منهج السادس
          </div>

          {/* Points / Score Badge (١،٤٥٥ 🌟) */}
          <div className="bg-[#111e3f] border border-blue-500/30 text-amber-300 font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 select-none shadow-sm shadow-blue-900/40 font-mono">
            <span className="font-semibold text-amber-300">{formattedScore}</span>
            <span className="text-amber-400 text-xs">🌟</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={onToggleSound}
            aria-label="تبديل الصوت"
            className="w-9 h-9 rounded-xl bg-[#111e3f] hover:bg-[#182852] border border-cyan-500/30 text-cyan-400 flex items-center justify-center transition active:scale-95 shadow-sm"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Subnav Navigation Bar matching Screenshot 4 & 1 & 2 */}
      <div className="border-t border-[#121f3f] bg-[#070e22]">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none justify-start sm:justify-center">
          {/* Main Home / Overview Tab */}
          <button
            onClick={() => onSelectMode('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 border ${
              currentMode === 'home'
                ? 'bg-[#0f4a56] border-cyan-400 text-white shadow-md shadow-cyan-900/30 ring-1 ring-cyan-400/30'
                : 'bg-[#0d162f] hover:bg-[#121f42] border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-cyan-300" />
            <span>الرئيسية والمشاهدات</span>
          </button>

          {/* Microscope Simulator Tab matching Screenshot 15 */}
          <button
            onClick={() => onSelectMode('microscope')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 border ${
              currentMode === 'microscope'
                ? 'bg-[#0f4a56] border-cyan-400 text-white shadow-md shadow-cyan-900/30 ring-1 ring-cyan-400/30'
                : 'bg-[#0d162f] hover:bg-[#121f42] border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5 text-cyan-300" />
            <span>المجهر المركب</span>
          </button>

          {/* 4 Curriculum Units Tabs */}
          {unitsList.map((unit) => {
            const active = currentMode === unit.id;
            return (
              <button
                key={unit.id}
                onClick={() => onSelectMode(unit.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 border ${
                  active
                    ? 'bg-[#0f2d47] border-cyan-400 text-cyan-300 shadow-md ring-1 ring-cyan-400/30'
                    : 'bg-[#0d162f] hover:bg-[#121f42] border-transparent text-slate-300 hover:text-white'
                }`}
              >
                <span>{unit.title}</span>
                {getUnitIcon(unit.iconName, active)}
              </button>
            );
          })}

          {/* Textbook Pages Tab */}
          <button
            onClick={() => onSelectMode('textbook')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 border ${
              currentMode === 'textbook'
                ? 'bg-cyan-600 border-cyan-300 text-white shadow-md'
                : 'bg-[#0d162f] hover:bg-[#121f42] border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>صفحات الكتاب</span>
          </button>

          {/* Quiz Tab */}
          <button
            onClick={() => onSelectMode('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 border ${
              currentMode === 'quiz'
                ? 'bg-purple-600 border-purple-300 text-white shadow-md'
                : 'bg-[#0d162f] hover:bg-[#121f42] border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>اختبار المنهج</span>
          </button>
        </div>
      </div>
    </header>
  );
};
