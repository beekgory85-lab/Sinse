import React from 'react';
import { FlaskConical, Microscope, Sparkles, Zap, Atom, Globe, Play, Settings } from 'lucide-react';
import { AppMode, UnitId, Unit2SubView } from '../types';

interface HomeOverviewProps {
  onSelectMode: (mode: AppMode) => void;
  onSelectUnit2SubView?: (view: Unit2SubView) => void;
  playSound: () => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onSelectMode,
  onSelectUnit2SubView,
  playSound,
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Section matching Screenshot 4 EXACTLY */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Official Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#0e2744] border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-5 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>منهج العلوم الرسمي — الصف السادس الابتدائي</span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-1">
          تجارب العلوم التفاعلية
        </h1>
        <h2 className="text-2xl sm:text-4xl font-black text-cyan-400 tracking-tight leading-tight mb-4">
          الصف السادس الابتدائي
        </h2>

        {/* Curriculum Description */}
        <p className="max-w-2xl mx-auto text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
          محاكاة تفاعلية شاملة لجميع تجارب الوحدات المقررة في كتاب العلوم للصف السادس: فحص خلايا البصل بالمجهر، التناضح، الدارات الكهربائية، تحولات الطاقة، التفاعلات الكيميائية، وتضاريس الأرض والتجوية.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <button
            onClick={() => {
              onSelectMode('microscope');
              playSound();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm px-6 py-3 rounded-2xl shadow-lg shadow-cyan-500/30 transition transform hover:scale-105 active:scale-95"
          >
            <Microscope className="w-5 h-5" />
            <span>ابدأ تجربة المجهر</span>
          </button>

          <button
            onClick={() => {
              onSelectMode('unit3');
              playSound();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#121f3f] hover:bg-[#182a55] border border-slate-700 text-white font-bold text-sm px-6 py-3 rounded-2xl transition transform hover:scale-105 active:scale-95"
          >
            <Atom className="w-5 h-5 text-cyan-300" />
            <span>تفاعلات الكيمياء</span>
          </button>
        </div>

        {/* Concentric Circles & Lab Emblem Graphic */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
          {/* Outer dashed circle */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 animate-[spin_40s_linear_infinite]" />
          {/* Middle circle */}
          <div className="absolute inset-3 rounded-full border border-cyan-500/20" />
          {/* Inner dashed circle */}
          <div className="absolute inset-6 rounded-full border border-dashed border-blue-500/40" />

          {/* Central Lab Card */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#0a1226] border-2 border-cyan-500/50 flex flex-col items-center justify-center shadow-xl shadow-cyan-950/60 z-10">
            <FlaskConical className="w-10 h-10 text-cyan-400 stroke-[2] mb-1.5" />
            <span className="font-mono text-[11px] font-bold text-slate-300 tracking-wider">
              Interactive Lab
            </span>
          </div>
        </div>
      </div>

      {/* Unit Cards List matching Screenshots 3 and 1 EXACTLY */}
      <div className="space-y-4">
        {/* CARD 1: الخلايا والمجهر الضوئي */}
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl relative">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="bg-[#0b2b3a] text-cyan-300 border border-cyan-500/30 text-xs font-bold px-3 py-1 rounded-full">
              الوحدة الأولى
            </span>

            <div className="w-12 h-12 rounded-2xl bg-[#0b283d] border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-md">
              <Microscope className="w-6 h-6 stroke-[2]" />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white mb-2">
            1. الخلايا والمجهر الضوئي
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            فحص عينات خلوية حقيقية (بشرة البصل، خلايا الدم، البكتيريا، والأميبا)، التحكم بدقة التكبير (100x)، الإضاءة، والتركيز الدقيق.
          </p>

          <button
            onClick={() => {
              onSelectMode('microscope');
              playSound();
            }}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm py-3 rounded-2xl shadow-md transition active:scale-98"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>دخول تجارب المجهر (الوحدة 1)</span>
          </button>
        </div>

        {/* CARD 2: العضيات الخلوية والتناضح */}
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl relative">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="bg-[#0c2e26] text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              تابع الوحدة الأولى
            </span>

            <div className="w-12 h-12 rounded-2xl bg-[#0c2a23] border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-md">
              <Sparkles className="w-6 h-6 stroke-[2]" />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white mb-2">
            2. العضيات الخلوية والتناضح
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            استكشاف العضيات (النواة، الميتوكندريا، البلاستيدات الخضراء)، وتجربة التناضح مع غشاء الخلية النباتية والحيوانية.
          </p>

          <button
            onClick={() => {
              onSelectMode('unit1');
              playSound();
            }}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#12243d] hover:bg-[#183152] border border-emerald-500/30 text-emerald-300 font-bold text-xs sm:text-sm py-3 rounded-2xl transition active:scale-98"
          >
            <Play className="w-4 h-4 fill-emerald-300" />
            <span>دخول أجزاء الخلية والتناضح</span>
          </button>
        </div>

        {/* CARD 3: الطاقة الميكانيكية والآلات البسيطة */}
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl relative">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="bg-[#301f0b] text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1 rounded-full">
              الوحدة الثانية
            </span>

            <div className="w-12 h-12 rounded-2xl bg-[#2e1d08] border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
              <Zap className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white mb-2">
            3. الطاقة الميكانيكية والآلات البسيطة
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            قاذف الكرات ص 57 (طاقة الوضع المرونية)، تجربة دحرجة الكرات واصطدامها بالكأس ص 63 (أثر الكتلة والارتفاع)، ونشاط حركة التروس ص 71.
          </p>

          <div className="space-y-2">
            {/* Action 1: Gears Activity (matching Screenshot 1) */}
            <button
              onClick={() => {
                onSelectUnit2SubView?.('gears');
                onSelectMode('unit2');
                playSound();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm py-3 rounded-2xl shadow-lg shadow-amber-500/20 transition active:scale-98"
            >
              <span>⚙️ تفعيل نشاط حركة التروس (ص 71)</span>
              <Play className="w-4 h-4 fill-slate-950" />
            </button>

            {/* Action 2: Ball Launcher Activity */}
            <button
              onClick={() => {
                onSelectUnit2SubView?.('catapult');
                onSelectMode('unit2');
                playSound();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#142142] hover:bg-[#1b2b54] border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm py-3 rounded-2xl transition active:scale-98"
            >
              <span>🎯 قاذف الكرات ودحرجة الكرات (ص 57 - 63)</span>
            </button>
          </div>
        </div>

        {/* CARD 4: المادة والتفاعلات الكيميائية */}
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl relative">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="bg-[#121f42] text-blue-300 border border-blue-500/40 text-xs font-bold px-3 py-1 rounded-full">
              الوحدة الثالثة
            </span>

            <div className="w-12 h-12 rounded-2xl bg-[#0f1b3b] border border-blue-500/40 flex items-center justify-center text-blue-300 shadow-md">
              <Atom className="w-6 h-6 stroke-[2]" />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white mb-2">
            4. المادة والتفاعلات الكيميائية
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            ترتيب جسيمات المواد الصلبة والسائلة والغازية، وتفاعل المعادن مع حمض الهيدروكلوريك HCl وتصاعد غاز الهيدروجين.
          </p>

          <button
            onClick={() => {
              onSelectMode('unit3');
              playSound();
            }}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#102245] hover:bg-[#162e5c] border border-blue-500/40 text-blue-300 font-bold text-xs sm:text-sm py-3 rounded-2xl transition active:scale-98"
          >
            <Play className="w-4 h-4 fill-blue-300" />
            <span>دخول تجارب المادة (الوحدة 3)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
