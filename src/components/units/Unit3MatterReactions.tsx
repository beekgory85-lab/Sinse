import React, { useState } from 'react';
import { Atom, Flame, Sparkles, Hammer, CheckCircle2, BookmarkCheck, RotateCcw } from 'lucide-react';

interface Unit3MatterReactionsProps {
  onEarnPoints: (pts: number) => void;
  playSound: () => void;
}

export const Unit3MatterReactions: React.FC<Unit3MatterReactionsProps> = ({ onEarnPoints, playSound }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Tab 1: Diamond vs Graphite
  const [carbonForm, setCarbonForm] = useState<'diamond' | 'graphite'>('diamond');

  // Tab 2: Metals vs Non-metals (Luster & Malleability)
  const [metalTest, setMetalTest] = useState<'normal' | 'luster' | 'hammered'>('normal');

  // Tab 3: Heat Conduction Simulation
  const [isHeating, setIsHeating] = useState<boolean>(false);
  const [heatProgress, setHeatProgress] = useState<{ [key: string]: number }>({
    copper: 0,
    aluminum: 0,
    steel: 0,
    glass: 0,
  });

  const handleSaveResults = () => {
    playSound();
    setIsSaved(true);
    onEarnPoints(15);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleStartHeating = () => {
    if (isHeating) return;
    setIsHeating(true);
    playSound();
    onEarnPoints(10);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setHeatProgress({
        copper: Math.min(100, step * 10),
        aluminum: Math.min(85, step * 8.5),
        steel: Math.min(45, step * 4.5),
        glass: Math.min(8, step * 0.8),
      });

      if (step >= 10) {
        clearInterval(interval);
        setIsHeating(false);
      }
    }, 250);
  };

  const resetHeating = () => {
    playSound();
    setIsHeating(false);
    setHeatProgress({ copper: 0, aluminum: 0, steel: 0, glass: 0 });
  };

  return (
    <div className="space-y-5">
      {/* Top Banner matching Screenshot 7 */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              الوحدة الثانية: المادة والتفاعلات الكيميائية
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              ترتيب الذرات، خواص الفلزات واللافلزات (اللمعان والطرق)، والتوصيل الحراري
            </p>
          </div>

          <div className="w-13 h-13 rounded-2xl bg-[#0e1d42] border border-blue-500/40 text-blue-300 flex items-center justify-center p-3 shadow-md flex-shrink-0">
            <Atom className="w-7 h-7 stroke-[2]" />
          </div>
        </div>

        {/* Save button matching Screenshot 7 & 9 */}
        <button
          onClick={handleSaveResults}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs sm:text-sm py-3 rounded-2xl shadow-lg shadow-blue-500/25 transition active:scale-98"
        >
          <BookmarkCheck className="w-4 h-4 stroke-[2.5]" />
          <span>{isSaved ? 'تم الحفظ في التقرير ✓' : 'حفظ نتائج الكيمياء'}</span>
        </button>
      </div>

      {/* Activity Navigation Pills matching Screenshot 7, 8, 9 */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => {
            setActiveTab(1);
            playSound();
          }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
            activeTab === 1
              ? 'bg-blue-600 border-blue-300 text-white shadow-md'
              : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
          }`}
        >
          1. ترتيب الذرات (الماس والجرافيت) 💎
        </button>

        <button
          onClick={() => {
            setActiveTab(2);
            playSound();
          }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
            activeTab === 2
              ? 'bg-blue-600 border-blue-300 text-white shadow-md'
              : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
          }`}
        >
          2. خواص الفلزات واللافلزات (اللمعان والطرق) 🔨✨
        </button>

        <button
          onClick={() => {
            setActiveTab(3);
            playSound();
          }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
            activeTab === 3
              ? 'bg-blue-600 border-blue-300 text-white shadow-md'
              : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
          }`}
        >
          3. التوصيل الحراري وتصنيف المواد 🌡️
        </button>
      </div>

      {/* TAB 1: Diamond vs Graphite matching Screenshot 9 */}
      {activeTab === 1 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs sm:text-sm font-bold text-white">
              نموذج البلورة الذرية للكربون:
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCarbonForm('diamond');
                  playSound();
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                  carbonForm === 'diamond'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'bg-[#101b3b] text-slate-300'
                }`}
              >
                الماس (Diamond)
              </button>
              <button
                onClick={() => {
                  setCarbonForm('graphite');
                  playSound();
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                  carbonForm === 'graphite'
                    ? 'bg-slate-400 text-slate-950 font-black shadow-md'
                    : 'bg-[#101b3b] text-slate-300'
                }`}
              >
                الجرافيت (Graphite)
              </button>
            </div>
          </div>

          {/* Atomic Grid Canvas matching Screenshot 9 */}
          <div className="relative rounded-2xl bg-[#070e20] border-2 border-[#192a54] p-6 min-h-[260px] flex items-center justify-center">
            <div className="p-6 rounded-3xl bg-[#091530] border-2 border-cyan-500/50 shadow-xl">
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-mono font-black text-sm shadow-md transition-all ${
                      carbonForm === 'diamond'
                        ? 'bg-cyan-500 border-cyan-200 text-slate-950 ring-2 ring-cyan-400/40'
                        : 'bg-slate-600 border-slate-400 text-white'
                    }`}
                  >
                    C
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#091126] border border-[#142347] rounded-xl p-3 text-xs text-slate-300">
            <span className="font-bold text-cyan-300 block mb-1">
              {carbonForm === 'diamond' ? 'ترتيب ذرات الماس:' : 'ترتيب ذرات الجرافيت:'}
            </span>
            {carbonForm === 'diamond'
              ? 'تترابط كل ذرة كربون مع 4 ذرات أخرى بروابط تساهمية قوية في شبكة بلورية ثلاثية الأبعاد صلبة جداً، مما يجعله أصلب مادة طبيعية.'
              : 'تترتب ذرات الكربون في طبقات سداسية تنزلق بسهولة فوق بعضها، مما يجعله هشاً وناعم الملمس ويستخدم في أقلام الرصاص.'}
          </div>
        </div>
      )}

      {/* TAB 2: Metal Properties (Luster & Malleability) matching Screenshot 8 */}
      {activeTab === 2 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#152349] flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">منصة اختبار الخواص:</span>
              <span className="bg-amber-950 border border-amber-500/50 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-lg">
                فلز (Metal)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMetalTest('luster');
                  playSound();
                  onEarnPoints(5);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition ${
                  metalTest === 'luster' ? 'bg-amber-400 text-slate-950' : 'bg-amber-500 text-slate-950'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>اختبار اللمعان</span>
              </button>

              <button
                onClick={() => {
                  setMetalTest('hammered');
                  playSound();
                  onEarnPoints(5);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition ${
                  metalTest === 'hammered' ? 'bg-cyan-400 text-slate-950' : 'bg-cyan-500 text-slate-950'
                }`}
              >
                <Hammer className="w-3.5 h-3.5" />
                <span>اختبار الطرق</span>
              </button>

              <button
                onClick={() => {
                  setMetalTest('normal');
                  playSound();
                }}
                className="p-2 rounded-xl bg-[#101b3b] border border-slate-700 text-slate-300 hover:text-white"
                title="إعادة ضبط"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Copper Block Visual matching Screenshot 8 */}
          <div className="relative rounded-2xl bg-[#070e20] border-2 border-[#192a54] p-6 min-h-[220px] flex items-center justify-center">
            <div
              className={`rounded-2xl border-2 flex items-center justify-center font-mono font-black text-2xl shadow-2xl transition-all duration-300 ${
                metalTest === 'luster'
                  ? 'bg-amber-500 border-amber-200 text-slate-950 ring-8 ring-amber-400/40 shadow-amber-500/50 animate-pulse'
                  : metalTest === 'hammered'
                  ? 'bg-orange-600 border-orange-400 text-white scale-x-150 scale-y-75'
                  : 'bg-orange-500 border-orange-300 text-slate-950 w-28 h-28'
              } ${metalTest !== 'normal' ? 'w-36 h-20' : ''}`}
            >
              Cu
            </div>
          </div>

          <div className="bg-[#091126] border border-[#142347] rounded-xl p-3 text-xs text-slate-300">
            <span className="font-bold text-amber-400 block mb-1">الاستنتاج العلمي:</span>
            الفلزات مثل النحاس والحديد والألومنيوم تتميز بالبريق واللمعان المعدني وقابليتها للطرق والسحب إلى صفائح وأسلاك دون أن تنكسر، على عكس اللافلزات.
          </div>
        </div>
      )}

      {/* TAB 3: Heat Conduction Simulation matching Screenshot 7 */}
      {activeTab === 3 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#152349] flex-wrap gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                محاكاة سرعة التوصيل الحراري عبر قضبان المواد
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                مقارنة انتقال الحرارة في النحاس، الألومنيوم، الفولاذ، والزجاج
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleStartHeating}
                disabled={isHeating}
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 text-slate-950 font-black text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg transition disabled:opacity-50"
              >
                <Flame className="w-4 h-4 text-amber-950" />
                <span>بدء التسخين</span>
              </button>

              <button
                onClick={resetHeating}
                className="p-2 rounded-xl bg-[#101b3b] border border-slate-700 text-slate-300 hover:text-white"
                title="إعادة ضبط"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Heat Conduction Progress Bars matching Screenshot 7 */}
          <div className="space-y-4 pt-1">
            {/* Copper */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-amber-400">1. قضيب النحاس (Copper) - فلز ممتاز التوصيل</span>
                <span className="font-mono text-cyan-300">{heatProgress.copper}% حرارة</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
                  style={{ width: `${heatProgress.copper}%` }}
                />
              </div>
            </div>

            {/* Aluminum */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-cyan-300">2. قضيب الألومنيوم (Aluminum) - فلز جيد جداً</span>
                <span className="font-mono text-cyan-300">{Math.round(heatProgress.aluminum)}% حرارة</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${heatProgress.aluminum}%` }}
                />
              </div>
            </div>

            {/* Steel */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-slate-300">3. قضيب الفولاذ (Steel) - فلز متوسط التوصيل</span>
                <span className="font-mono text-cyan-300">{Math.round(heatProgress.steel)}% حرارة</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
                <div
                  className="h-full bg-slate-400 transition-all duration-300"
                  style={{ width: `${heatProgress.steel}%` }}
                />
              </div>
            </div>

            {/* Glass */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-slate-400">4. قضيب الزجاج (Glass) - عازل رديء التوصيل للحرارة</span>
                <span className="font-mono text-cyan-300">{Math.round(heatProgress.glass)}% حرارة</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
                <div
                  className="h-full bg-slate-600 transition-all duration-300"
                  style={{ width: `${heatProgress.glass}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
