import React from 'react';
import { ActiveTab } from '../types';
import { 
  FlaskConical, 
  Microscope, 
  Dna, 
  Zap, 
  Atom, 
  Globe2, 
  BookOpenCheck, 
  Bot, 
  Volume2, 
  VolumeX,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  totalViews: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  totalViews
}) => {
  const handleTabClick = (tab: ActiveTab) => {
    if (soundEnabled) soundEngine.playClick();
    setActiveTab(tab);
  };

  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'الرئيسية والمشاهدات', icon: BarChart3 },
    { id: 'cell_organelles' as ActiveTab, label: 'الوحدة 1: من الخلية إلى الجسم', icon: Dna },
    { id: 'physics_energy' as ActiveTab, label: 'الوحدة 2: الطاقة والآلات', icon: Zap },
    { id: 'chemistry_matter' as ActiveTab, label: 'الوحدة 3: المادة والتفاعلات', icon: Atom },
    { id: 'earth_experiments' as ActiveTab, label: 'الوحدة 4: الإنسان والأرض', icon: Globe2 },
    { id: 'microscope' as ActiveTab, label: 'محاكي المجهر المركب', icon: Microscope },
    { id: 'quiz_notebook' as ActiveTab, label: 'الاختبارات والتقرير', icon: BookOpenCheck },
    { id: 'ai_advisor' as ActiveTab, label: 'المستشار العلمي', icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-cyan-900/40 shadow-lg shadow-cyan-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Logo & Title */}
          <div 
            onClick={() => handleTabClick('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <FlaskConical className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-slate-100 tracking-tight group-hover:text-cyan-400 transition-colors">
                  تجارب علوم الصف السادس
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                  منهج السادس
                </span>
              </div>
              <p className="text-xs text-cyan-400/80 hidden sm:block">
                المختبر التفاعلي الشامل لمادة العلوم للصف السادس الابتدائي
              </p>
            </div>
          </div>

          {/* Quick Stats & Audio Control */}
          <div className="flex items-center gap-3">
            
            {/* Live Views Badge */}
            <div 
              onClick={() => handleTabClick('dashboard')}
              title="إجمالي مشاهدات وزيارات المختبر"
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-cyan-300 font-mono cursor-pointer transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xs:inline text-slate-400">المشاهدات:</span>
              <span className="font-bold text-cyan-400">{totalViews.toLocaleString('ar-EG')}</span>
            </div>

            {/* Sound Mute Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) soundEngine.playBeep();
              }}
              title={soundEnabled ? 'إيقاف الصوتي' : 'تفعيل المؤثرات الصوتية'}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-all border border-slate-700"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>

        </div>

        {/* Navigation Tabs Horizontal Scroll */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/60 text-xs sm:text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all select-none ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};
