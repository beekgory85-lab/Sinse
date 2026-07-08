import React, { useState, useEffect } from 'react';
import { MetalOrNonMetalElement, LabNote } from '../types';
import { METALS_NONMETALS_SAMPLES, ALLOTROPES_CARBON } from '../data/labData';
import { 
  Atom, 
  Flame, 
  RotateCcw, 
  CheckCircle2, 
  BookmarkPlus, 
  Sparkles,
  Gem,
  Hammer,
  Sun,
  Info,
  ShieldAlert,
  XCircle
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface ChemistryMatterProps {
  onSaveNote: (note: Omit<LabNote, 'id' | 'date'>) => void;
  onRunExperiment: () => void;
  soundEnabled: boolean;
}

type Unit2SubTab = 'allotropes' | 'metals_properties' | 'thermal_conduction';

export const ChemistryMatter: React.FC<ChemistryMatterProps> = ({
  onSaveNote,
  onRunExperiment,
  soundEnabled
}) => {
  const [subTab, setSubTab] = useState<Unit2SubTab>('allotropes');

  // Sub-tab 1: Diamond vs Graphite Allotropes
  const [selectedAllotrope, setSelectedAllotrope] = useState<'diamond' | 'graphite'>('diamond');

  // Sub-tab 2: Metals & Non-Metals (Luster & Malleability ONLY)
  const [selectedSample, setSelectedSample] = useState<MetalOrNonMetalElement>(METALS_NONMETALS_SAMPLES[0]);
  const [lusterTested, setLusterTested] = useState<boolean>(false);
  const [hammerTested, setHammerTested] = useState<boolean>(false);
  const [isShining, setIsShining] = useState<boolean>(false);
  const [isHammerStriking, setIsHammerStriking] = useState<boolean>(false);

  // Sub-tab 3: Thermal Conductivity
  const [heatingActive, setHeatingActive] = useState<boolean>(false);
  const [metalTimes, setMetalTimes] = useState<{ [key: string]: number }>({
    copper: 0,
    aluminum: 0,
    steel: 0,
    glass: 0
  });

  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Thermal Conduction Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (heatingActive) {
      interval = setInterval(() => {
        setMetalTimes((prev) => ({
          copper: Math.min(100, prev.copper + 8),
          aluminum: Math.min(100, prev.aluminum + 5),
          steel: Math.min(100, prev.steel + 2),
          glass: Math.min(100, prev.glass + 0.5)
        }));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [heatingActive]);

  const handleRunLusterTest = () => {
    if (soundEnabled) soundEngine.playSuccess();
    setIsShining(true);
    setLusterTested(true);
    onRunExperiment();
    setTimeout(() => setIsShining(false), 1500);
  };

  const handleRunHammerTest = () => {
    if (soundEnabled) soundEngine.playClick();
    setIsHammerStriking(true);
    setHammerTested(true);
    onRunExperiment();
    setTimeout(() => setIsHammerStriking(false), 1000);
  };

  const handleResetTests = () => {
    if (soundEnabled) soundEngine.playClick();
    setLusterTested(false);
    setHammerTested(false);
    setIsShining(false);
    setIsHammerStriking(false);
  };

  const handleStartHeating = () => {
    if (soundEnabled) soundEngine.playBeep();
    setMetalTimes({ copper: 0, aluminum: 0, steel: 0, glass: 0 });
    setHeatingActive(true);
    onRunExperiment();
  };

  const handleSaveObservation = () => {
    if (soundEnabled) soundEngine.playSuccess();
    onSaveNote({
      title: subTab === 'allotropes'
        ? 'تجربة ترتيب ذرات الكربون (الماس مقابل الجرافيت)'
        : subTab === 'metals_properties'
        ? `دراسة خواص عنصر ${selectedSample.nameAr} (${selectedSample.type === 'metal' ? 'فلز' : 'لا فلز'}) - اللمعان والطرق`
        : 'تجربة التوصيل الحراري وتصنيف الفلزات واللافلزات',
      experimentName: 'الوحدة الثانية: المادة والتفاعلات الكيميائية',
      category: 'chemistry',
      hypothesis: subTab === 'allotropes'
        ? 'دراسة كيفية تأثير الشباك البلورية الذرية على الخواص الفيزيائية للمادة.'
        : subTab === 'metals_properties'
        ? 'اختبار قابلية الفلزات واللافلزات للمعان والبريق وقابليتها للطرق بالمطرقة.'
        : 'أسرع الموصلات الحرارية هو النحاس بينما الزجاج واللافلزات رديئة التوصيل.',
      content: subTab === 'allotropes'
        ? `العنصر المختار: ${selectedAllotrope === 'diamond' ? 'الماس الشبكي الصلب' : 'الجرافيت الطبقي الموصل'}.`
        : subTab === 'metals_properties'
        ? `العنصر: ${selectedSample.nameAr} (${selectedSample.type === 'metal' ? 'فلز' : 'لا فلز'}). اللمعان: ${selectedSample.hasLuster ? 'له بريق لمعان معدني' : 'معتم ليس له بريق'}. الطرق: ${selectedSample.isMalleable ? 'قابل للطرق والتشكيل' : 'هش يتفتت فور الطرق'}.`
        : 'أسرع الموصلات الحرارية هو النحاس بينما الزجاج واللافلزات رديئة التوصيل.',
      conclusion: subTab === 'metals_properties'
        ? 'تتميز الفلزات بوجود بريق ولمعان معدني وقابلية للطرق والتشكيل، بينما اللافلزات معتمة وغير قابلة للطرق وتتفتت عند الطرق.'
        : 'تحدد الرابطة الكيميائية وترتيب الذرات خواص المادة وتفاعليتها.'
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center">
            <Atom className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">الوحدة الثانية: المادة والتفاعلات الكيميائية</h2>
            <p className="text-xs text-slate-400">ترتيب الذرات، خواص الفلزات واللافلزات (اللمعان والطرق)، والتوصيل الحراري</p>
          </div>
        </div>

        <button
          onClick={handleSaveObservation}
          disabled={isSaved}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            isSaved
              ? 'bg-blue-950 text-blue-400 border border-blue-800'
              : 'bg-blue-500 hover:bg-blue-400 text-slate-950 shadow-md shadow-blue-500/20'
          }`}
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
          <span>{isSaved ? 'تم الحفظ في التقرير' : 'حفظ نتائج الكيمياء'}</span>
        </button>
      </div>

      {/* Sub-Tabs for Unit 2 */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('allotropes');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'allotropes'
              ? 'bg-blue-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          1. ترتيب الذرات (الماس والجرافيت) 💎
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('metals_properties');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'metals_properties'
              ? 'bg-blue-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          2. خواص الفلزات واللافلزات (اللمعان والطرق) ✨🔨
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('thermal_conduction');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'thermal_conduction'
              ? 'bg-blue-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          3. التوصيل الحراري وتصنيف المواد 🌡️
        </button>
      </div>

      {subTab === 'allotropes' && (
        /* DIAMOND VS GRAPHITE ALLOTROPES */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-slate-100">نموذج البلورة الذرية للكربون:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedAllotrope('diamond')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedAllotrope === 'diamond' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  الماس (Diamond)
                </button>
                <button
                  onClick={() => setSelectedAllotrope('graphite')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedAllotrope === 'graphite' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  الجرافيت (Graphite)
                </button>
              </div>
            </div>

            <div className="relative w-full h-72 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
              {selectedAllotrope === 'diamond' ? (
                /* DIAMOND TETRAHEDRAL NETWORK */
                <div className="space-y-4 text-center">
                  <div className="grid grid-cols-4 gap-4 p-4 border border-cyan-500/40 rounded-3xl bg-cyan-950/20 shadow-xl">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-cyan-300 border-2 border-white shadow-lg animate-pulse flex items-center justify-center font-bold text-[10px] text-slate-950">
                        C
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-cyan-300 font-mono">شبكة رباعية الأوجه متماسكة صلبة للغاية</p>
                </div>
              ) : (
                /* GRAPHITE SLIDING LAYERS */
                <div className="space-y-4 text-center">
                  <div className="space-y-3">
                    <div className="h-6 bg-slate-800 border-t-2 border-b-2 border-slate-500 rounded flex justify-around items-center px-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-slate-400" />
                      ))}
                    </div>
                    <div className="h-6 bg-slate-800 border-t-2 border-b-2 border-slate-500 rounded flex justify-around items-center px-4 translate-x-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-slate-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 font-mono">طبقات سداسية مستوية تنزلق بسهولة وتوصل الكهرباء</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            {(() => {
              const current = ALLOTROPES_CARBON.find(a => a.id === selectedAllotrope);
              if (!current) return null;
              return (
                <div className="space-y-3">
                  <h3 className="font-bold text-cyan-400 text-base flex items-center gap-2">
                    <Gem className="w-5 h-5" />
                    <span>{current.nameAr}</span>
                  </h3>
                  <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-200 border border-slate-800">
                    <p className="font-semibold text-blue-400 mb-1">التركيب الذري:</p>
                    {current.structureAr}
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-200 border border-slate-800">
                    <p className="font-semibold text-emerald-400 mb-1">الخصائص المميزة:</p>
                    {current.propertiesAr}
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-200 border border-slate-800 font-mono">
                    <p className="font-semibold text-amber-400 mb-1">الاستخدام العملي:</p>
                    {current.useAr}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {subTab === 'metals_properties' && (
        /* METALS VS NON-METALS: LUSTER AND MALLEABILITY SIMULATOR ONLY */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Visual Workbench (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            
            {/* Header controls for the workbench */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-100">منصة اختبار الخواص:</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  selectedSample.type === 'metal' 
                    ? 'bg-amber-950 text-amber-300 border-amber-700' 
                    : 'bg-purple-950 text-purple-300 border-purple-700'
                }`}>
                  {selectedSample.type === 'metal' ? 'فلز (Metal)' : 'لا فلز (Non-Metal)'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunLusterTest}
                  disabled={isShining || isHammerStriking}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 active:scale-95 disabled:opacity-50"
                >
                  <Sun className="w-4 h-4 fill-current" />
                  <span>اختبار اللمعان ✨</span>
                </button>

                <button
                  onClick={handleRunHammerTest}
                  disabled={isShining || isHammerStriking}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
                >
                  <Hammer className="w-4 h-4" />
                  <span>اختبار الطرق 🔨</span>
                </button>

                <button
                  onClick={handleResetTests}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  title="إعادة ضبط العينة"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Testing Anvil Stage */}
            <div className="relative w-full h-80 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col items-center justify-center overflow-hidden select-none">
              
              {/* Spotlight Rays when shining */}
              <div className={`absolute top-0 w-48 h-full bg-gradient-to-b from-amber-200/40 via-amber-400/20 to-transparent pointer-events-none transition-opacity duration-300 ${
                isShining ? 'opacity-100 scale-105' : 'opacity-0'
              }`} />

              {/* Hammer visual when striking */}
              <div className={`absolute top-6 left-1/2 -translate-x-1/2 transition-transform duration-200 pointer-events-none z-20 ${
                isHammerStriking ? 'translate-y-24 rotate-[-35deg] scale-125' : '-translate-y-20 opacity-0'
              }`}>
                <Hammer className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
              </div>

              {/* Sample Specimen on Anvil */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                
                {/* The Anvil Plate */}
                <div className="relative w-64 h-32 bg-slate-900 border-2 border-slate-700 rounded-3xl flex flex-col items-center justify-center p-4 shadow-2xl">
                  
                  {/* Specimen Piece */}
                  {!hammerTested ? (
                    /* Initial Cube Sample */
                    <div 
                      className={`w-20 h-20 rounded-2xl shadow-xl flex items-center justify-center text-slate-950 font-black text-lg border-2 border-white/40 transition-all duration-300 ${
                        isShining && selectedSample.hasLuster ? 'ring-8 ring-amber-300/60 shadow-amber-400/50 scale-110' : ''
                      }`}
                      style={{ backgroundColor: selectedSample.color }}
                    >
                      <span>{selectedSample.symbol}</span>
                      
                      {/* Sparkles effect if metal during luster test */}
                      {isShining && selectedSample.hasLuster && (
                        <div className="absolute inset-0 flex items-center justify-center animate-spin">
                          <Sparkles className="w-12 h-12 text-amber-200" />
                        </div>
                      )}
                    </div>
                  ) : selectedSample.isMalleable ? (
                    /* Flattened Sheet Sample (Metal after hammer test) */
                    <div 
                      className="w-48 h-8 rounded-full shadow-2xl border-2 border-white/60 flex items-center justify-center text-slate-950 font-bold text-xs font-mono animate-bounce"
                      style={{ backgroundColor: selectedSample.color }}
                    >
                      ✨ انَبسَطت العينة إلى صَفِيحة مُشَكَّلة ({selectedSample.symbol}) ✨
                    </div>
                  ) : (
                    /* Shattered Fragments (Non-metal after hammer test) */
                    <div className="flex items-center gap-2 animate-pulse">
                      <div className="w-5 h-5 rounded bg-slate-700 border border-slate-500 rotate-12" />
                      <div className="w-6 h-6 rounded bg-slate-800 border border-slate-600 -rotate-45" />
                      <div className="w-4 h-4 rounded bg-amber-600 border border-amber-400 rotate-45" />
                      <div className="w-5 h-5 rounded bg-slate-700 border border-slate-500 -rotate-12" />
                      <span className="text-xs text-red-400 font-bold mr-2">💥 تَفتّتت العينة إلى شَظايا هَشّة!</span>
                    </div>
                  )}

                  {/* Anvil Base line */}
                  <div className="absolute -bottom-3 w-72 h-3 bg-slate-800 rounded-full border-t border-slate-600 shadow-md" />
                </div>

                {/* Specimen Tag */}
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-200">{selectedSample.nameAr} ({selectedSample.symbol})</p>
                  <p className="text-[11px] text-slate-400">
                    {selectedSample.type === 'metal' ? 'عنصر فلزي صلب' : 'عنصر لا فلزي صلب'}
                  </p>
                </div>

              </div>

            </div>

            {/* Test Results Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Luster Result Box */}
              <div className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all ${
                !lusterTested
                  ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                  : selectedSample.hasLuster
                  ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                  : 'bg-purple-950/80 border-purple-500 text-purple-200'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>اختبار اللمعان والبريق:</span>
                  </span>
                  {lusterTested && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border font-mono">
                      {selectedSample.hasLuster ? '✨ بريق معدني' : '🌑 معتم'}
                    </span>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed">
                  {lusterTested ? selectedSample.lusterDescriptionAr : 'انقر على زر "اختبار اللمعان" لتسليط الضوء وفحص البريق.'}
                </p>
              </div>

              {/* Hammer Result Box */}
              <div className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all ${
                !hammerTested
                  ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                  : selectedSample.isMalleable
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  : 'bg-red-950/80 border-red-500 text-red-200'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <Hammer className="w-4 h-4 text-cyan-400" />
                    <span>اختبار الطرق بالمطرقة:</span>
                  </span>
                  {hammerTested && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border font-mono">
                      {selectedSample.isMalleable ? '🔨 قابل للطرق' : '💥 هش غير قابل للطرق'}
                    </span>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed">
                  {hammerTested ? selectedSample.malleabilityDescriptionAr : 'انقر على زر "اختبار الطرق" لطرق العينة وفحص التشكيل.'}
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Element Selector & Rules (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Element Selection list */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>اختر العينة لاختبار اللمعان والطرق:</span>
              </h3>

              <div className="grid grid-cols-1 gap-2">
                {METALS_NONMETALS_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setSelectedSample(sample);
                      setLusterTested(false);
                      setHammerTested(false);
                      setIsShining(false);
                      setIsHammerStriking(false);
                    }}
                    className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between text-xs ${
                      selectedSample.id === sample.id
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/40"
                        style={{ backgroundColor: sample.color }}
                      />
                      <div>
                        <p className="font-semibold">{sample.nameAr} ({sample.symbol})</p>
                        <p className="text-[10px] text-slate-400">
                          {sample.type === 'metal' ? 'عنصر فلزي' : 'عنصر لا فلزي'}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold border ${
                      sample.type === 'metal'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-purple-950 text-purple-300 border-purple-800'
                    }`}>
                      {sample.type === 'metal' ? 'فلز' : 'لا فلز'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scientific Summary Rule Card for Grade 6 Science */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>القاعدة العلمية (تصنيف الفلزات واللافلزات):</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-amber-900/40 space-y-1">
                  <p className="font-bold text-amber-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>الفلزات (Metals):</span>
                  </p>
                  <ul className="text-[11px] text-slate-300 space-y-1 pr-4 list-disc">
                    <li>تتميز بوجود **بريق ولمعان معدني** عاكس للضوء.</li>
                    <li>**قابلة للطرق والتشكيل**؛ تتمدد وتتحول إلى صفائح دون أن تتكسر.</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-purple-900/40 space-y-1">
                  <p className="font-bold text-purple-300 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-purple-400" />
                    <span>اللافلزات (Non-Metals):</span>
                  </p>
                  <ul className="text-[11px] text-slate-300 space-y-1 pr-4 list-disc">
                    <li>مواد **معتمة ليس لها بريق أو لمعان معدني**.</li>
                    <li>**غير قابلة للطرق والتشكيل**؛ مواد هشة تتفتت وتتكسر عند الطرق.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {subTab === 'thermal_conduction' && (
        /* THERMAL CONDUCTIVITY SIMULATOR */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-slate-100 text-base">محاكاة سرعة التوصيل الحراري عبر قضبان المواد</h3>
              <p className="text-xs text-slate-400">مقارنة انتقال الحرارة في النحاس، الألومنيوم، الفولاذ، والزجاج</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleStartHeating}
                className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Flame className="w-4 h-4 text-slate-950 fill-current" />
                <span>بدء التسخين</span>
              </button>

              <button
                onClick={() => {
                  setHeatingActive(false);
                  setMetalTimes({ copper: 0, aluminum: 0, steel: 0, glass: 0 });
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-amber-400">1. قضيب النحاس (Copper) - فلز ممتاز التوصيل</span>
                <span className="font-mono text-amber-300">{metalTimes.copper}% حرارة</span>
              </div>
              <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300" style={{ width: `${metalTimes.copper}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-300">2. قضيب الألومنيوم (Aluminum) - فلز جيد جداً</span>
                <span className="font-mono text-slate-300">{metalTimes.aluminum}% حرارة</span>
              </div>
              <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-slate-400 to-slate-200 transition-all duration-300" style={{ width: `${metalTimes.aluminum}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-400">3. قضيب الفولاذ (Steel) - فلز متوسط التوصيل</span>
                <span className="font-mono text-slate-400">{metalTimes.steel}% حرارة</span>
              </div>
              <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-slate-600 to-slate-400 transition-all duration-300" style={{ width: `${metalTimes.steel}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-red-400">4. ساق الزجاج (Glass) - مادة لا فلزية رديئة التوصيل (عازل)</span>
                <span className="font-mono text-red-300">{metalTimes.glass}% حرارة</span>
              </div>
              <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-800 to-red-500 transition-all duration-300" style={{ width: `${metalTimes.glass}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
