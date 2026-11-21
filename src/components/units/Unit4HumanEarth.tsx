import React, { useState } from 'react';
import { Globe, Droplets, Trees, Wind, Sparkles, CheckCircle2, BookmarkCheck, RotateCcw } from 'lucide-react';

interface Unit4HumanEarthProps {
  onEarnPoints: (pts: number) => void;
  playSound: () => void;
}

export const Unit4HumanEarth: React.FC<Unit4HumanEarthProps> = ({ onEarnPoints, playSound }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Tab 1: Mechanical Weathering Shaker (ص 81)
  const [shakerCycles, setShakerCycles] = useState<number>(0);

  // Tab 2: Chemical Weathering with Vinegar (ص 85)
  const [vinegarDrops, setVinegarDrops] = useState<number>(0);

  // Tab 3: Soil Erosion & Tree Windbreaks
  const [hasTrees, setHasTrees] = useState<boolean>(false);
  const [isRaining, setIsRaining] = useState<boolean>(false);

  // Tab 4: Decomposition Bottle Experiment (ص 97)
  const [bottleWeek, setBottleWeek] = useState<number>(0);

  const handleSaveResults = () => {
    playSound();
    setIsSaved(true);
    onEarnPoints(15);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleShake = () => {
    playSound();
    setShakerCycles((prev) => prev + 1);
    onEarnPoints(5);
  };

  const handleAddDrop = () => {
    playSound();
    setVinegarDrops((prev) => prev + 1);
    onEarnPoints(5);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner matching Screenshot 5 */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              الوحدة الرابعة: عمليات الأرض والتجوية والانجراف
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              التجوية الميكانيكية، التجوية الكيميائية، وانجراف التربة والمصدات
            </p>
          </div>

          <div className="w-13 h-13 rounded-2xl bg-[#09223a] border border-cyan-500/40 text-cyan-300 flex items-center justify-center p-3 shadow-md flex-shrink-0">
            <Globe className="w-7 h-7 stroke-[2]" />
          </div>
        </div>

        {/* Save button matching Screenshot 5 */}
        <button
          onClick={handleSaveResults}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-black text-xs sm:text-sm py-3 rounded-2xl shadow-lg shadow-cyan-500/25 transition active:scale-98"
        >
          <BookmarkCheck className="w-4 h-4 stroke-[2.5]" />
          <span>{isSaved ? 'تم حفظ نتائج علوم الأرض في التقرير ✓' : 'حفظ نتائج علوم الأرض'}</span>
        </button>
      </div>

      {/* Activity Navigation Pills matching Screenshot 5 */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => {
            setActiveTab(1);
            playSound();
          }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
            activeTab === 1
              ? 'bg-cyan-500 border-cyan-300 text-slate-950 shadow-md'
              : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
          }`}
        >
          1. استكشف: كيف يتغير شكل الصخور؟ (ص 81) 🪨
        </button>

        <button
          onClick={() => {
            setActiveTab(2);
            playSound();
          }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
            activeTab === 2
              ? 'bg-cyan-500 border-cyan-300 text-slate-950 shadow-md'
              : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
          }`}
        >
          2. نشاط: إذابة الصخور - تجوية كيميائية (ص 85) 🧪
        </button>

        <button
          onClick={() => {
            setActiveTab(3);
            playSound();
          }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
            activeTab === 3
              ? 'bg-cyan-500 border-cyan-300 text-slate-950 shadow-md'
              : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
          }`}
        >
          3. انجراف التربة ومصدات الأشجار 🌲
        </button>

        <button
          onClick={() => {
            setActiveTab(4);
            playSound();
          }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
            activeTab === 4
              ? 'bg-cyan-500 border-cyan-300 text-slate-950 shadow-md'
              : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
          }`}
        >
          4. نشاط: أي المواد تتحلل أسرع؟ (ص 97) 🧪
        </button>
      </div>

      {/* TAB 1: Mechanical Weathering Shaker matching Screenshot 5 */}
      {activeTab === 1 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#152349] flex-wrap gap-2">
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>وعاء الاستكشاف البلاستيكي (ص 81): تجوية ميكانيكية جافة 🏜️</span>
            </h3>

            <button
              onClick={handleShake}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition shadow-md"
            >
              رج الوعاء بشدة (اهتزاز الصخور) 🪨
            </button>
          </div>

          {/* Shaker Jar Visual matching Screenshot 5 */}
          <div className="relative rounded-2xl bg-[#070e20] border-2 border-[#192a54] p-6 min-h-[220px] flex flex-col items-center justify-center">
            {/* Red Lid matching screenshot */}
            <div className="w-44 h-7 bg-red-600 rounded-t-xl border border-red-400 flex items-center justify-center text-[10px] text-white font-bold shadow-md">
              <span className="w-2 h-2 rounded-full bg-red-300 ml-1" />
              غطاء محكم
            </div>

            {/* Transparent Shaker Body */}
            <div className="w-44 h-32 rounded-b-xl border-2 border-t-0 border-cyan-400/60 bg-cyan-950/20 flex flex-wrap gap-2 p-3 items-end justify-center relative">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-slate-300 border border-white transition-all duration-300 flex items-center justify-center ${
                    shakerCycles > 3 ? 'w-5 h-5 rounded-full' : 'w-7 h-7 rounded-sm'
                  }`}
                />
              ))}

              {shakerCycles > 1 && (
                <div className="absolute bottom-1 w-full text-center text-[10px] text-amber-300 font-bold">
                  فتات صخري ورمل ناعم متكون بالأسفل ({shakerCycles * 15} فتات)
                </div>
              )}
            </div>

            {/* Magnifying Glass Indicator matching Screenshot 5 */}
            <div className="mt-4 bg-[#0a1c38] border border-cyan-400/50 px-4 py-1.5 rounded-full text-cyan-300 text-xs font-bold flex items-center gap-1.5">
              <span>🔍 العدسة المكبرة ص 81</span>
            </div>
          </div>

          <div className="bg-[#091126] border border-[#142347] rounded-xl p-3 text-xs text-slate-300">
            <span className="font-bold text-cyan-300 block mb-1">الاستنتاج العلمي ص 81:</span>
            يؤدي تصادم الصخور وحكها ببعضها أثناء الرج أو بفعل الرياح والأمواج إلى تفتتها وتكسر حوافها الحادة وتحولها إلى رمل ناعم (تجوية ميكانيكية).
          </div>
        </div>
      )}

      {/* TAB 2: Chemical Weathering with Vinegar matching Screenshot 13 */}
      {activeTab === 2 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#152349] flex-wrap gap-2">
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>تجربة إذابة الصخر الجيري كيميائياً (ص 85): حمض الخل (CH3COOH) 🧪</span>
            </h3>

            <button
              onClick={handleAddDrop}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition shadow-md"
            >
              إضافة قطرة حمض الخل 💧
            </button>
          </div>

          {/* Dropper and Rock Visual matching Screenshot 13 */}
          <div className="relative rounded-2xl bg-[#070e20] border-2 border-[#192a54] p-6 min-h-[220px] flex flex-col items-center justify-center">
            {/* Dropper */}
            <div className="flex flex-col items-center mb-3">
              <div className="w-6 h-6 rounded-full bg-red-600 shadow-md" />
              <div className="w-1.5 h-16 bg-slate-200 border border-slate-400" />
              {vinegarDrops > 0 && <div className="text-cyan-400 text-xs animate-bounce mt-1">💧</div>}
            </div>

            {/* Limestone rock */}
            <div className="w-36 h-14 bg-slate-200 border-2 border-slate-400 rounded-lg flex items-center justify-center font-bold text-slate-900 text-xs shadow-lg relative">
              صخر جيري (طباشير)
              {vinegarDrops > 0 && (
                <div className="absolute -top-3 text-cyan-400 text-xs animate-pulse">
                  🫧 فقاعات غاز CO2 ({vinegarDrops * 4})
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#091126] border border-[#142347] rounded-xl p-3 text-xs text-slate-300">
            <span className="font-bold text-emerald-400 block mb-1">الاستنتاج العلمي ص 85:</span>
            يتفاعل حمض الخل المخفف مع كربونات الكالسيوم في الصخر الجيري، مما يؤدي إلى إذابته وتصاعد فقاعات غاز ثاني أكسيد الكربون (تجوية كيميائية).
          </div>
        </div>
      )}

      {/* TAB 3: Soil Erosion & Tree Windbreaks matching Screenshot 11 */}
      {activeTab === 3 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#152349] flex-wrap gap-2">
            <h3 className="text-sm sm:text-base font-black text-white">
              محاكاة انجراف التربة وتأثير جذور الأشجار والمصدات 🌲
            </h3>

            <button
              onClick={() => {
                setHasTrees(!hasTrees);
                playSound();
                onEarnPoints(10);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                hasTrees ? 'bg-emerald-500 text-slate-950' : 'bg-[#101b3b] text-slate-300 border border-slate-700'
              }`}
            >
              تفعيل مصدات الأشجار 🌳
            </button>
          </div>

          {/* Hill & Rain Simulation */}
          <div className="relative rounded-2xl bg-[#070e20] border-2 border-[#192a54] p-6 min-h-[220px] flex flex-col justify-end overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>{hasTrees ? 'مصدات الأشجار وجذورها تثبت التربة 🌲' : 'تربة مكشوفة عرضة للجرف السريع ⚠️'}</span>
              <button
                onClick={() => {
                  setIsRaining(!isRaining);
                  playSound();
                }}
                className="text-cyan-400 font-bold bg-[#091833] px-3 py-1 rounded-lg border border-cyan-500/30"
              >
                {isRaining ? 'إيقاف الأمطار' : 'هطول أمطار غزيرة 🌧️'}
              </button>
            </div>

            {/* Hill Slope */}
            <div className="relative h-28 bg-gradient-to-t from-amber-950 to-amber-900 border-t-4 border-amber-600 rounded-t-3xl flex items-center justify-around p-3">
              {hasTrees ? (
                <>
                  <div className="text-2xl animate-bounce">🌲</div>
                  <div className="text-2xl animate-bounce">🌳</div>
                  <div className="text-2xl animate-bounce">🌲</div>
                </>
              ) : (
                <div className="text-xs text-amber-300 font-bold">
                  {isRaining ? 'انجراف حبيبات التربة مع الماء 🌊' : 'التربة جافة بدون غطاء نباتي'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Decomposition Bottle Experiment (ص 97) matching Screenshot 14 */}
      {activeTab === 4 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#152349] flex-wrap gap-2">
            <h3 className="text-sm sm:text-base font-black text-white">
              نموذج القنينة الاستقصائية (ص 97): الأسبوع {bottleWeek}
            </h3>

            <div className="flex items-center gap-1.5 bg-[#091024] p-1 rounded-xl border border-slate-700">
              {[0, 2, 4].map((wk) => (
                <button
                  key={wk}
                  onClick={() => {
                    setBottleWeek(wk);
                    playSound();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    bottleWeek === wk ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-300'
                  }`}
                >
                  الأسبوع {wk}
                </button>
              ))}
            </div>
          </div>

          {/* Bottle Layers Visual matching Screenshot 14 */}
          <div className="relative rounded-2xl bg-[#070e20] border-2 border-[#192a54] p-6 min-h-[220px] flex items-center justify-center">
            <div className="w-56 rounded-3xl border-2 border-cyan-500/50 bg-cyan-950/20 p-4 space-y-2 shadow-xl">
              <div className="bg-amber-400 text-slate-950 text-[10px] font-bold py-1 px-2 rounded text-center">
                شريط لاصق
              </div>
              <div className="bg-slate-300 text-slate-900 text-[10px] font-bold py-1 px-2 rounded text-center">
                رقائق ألومنيوم (لا تتحلل)
              </div>
              <div className="bg-amber-900 text-amber-200 text-xs font-bold py-3 px-2 rounded text-center border border-amber-700">
                طبقة تربة علوية (5 سم)
                <div className="text-[10px] mt-1 text-amber-300">
                  {bottleWeek === 0 ? 'بقايا تفاح وورق جديدة' : bottleWeek === 2 ? 'تحلل جزئي للمواد العضوية' : 'تحلل تام وتحولها لدبال غني'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
