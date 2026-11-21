import React, { useState } from 'react';
import { Sparkles, Dna, Eye, CheckCircle2, BookmarkCheck, Clock, BookOpen, Heart, Activity } from 'lucide-react';
import { organellesData } from '../../data/curriculumUnits';
import { Organelle } from '../../types';

interface Unit1CellBodyProps {
  onEarnPoints: (pts: number) => void;
  playSound: () => void;
}

export const Unit1CellBody: React.FC<Unit1CellBodyProps> = ({ onEarnPoints, playSound }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Tab 1: Organelles & Osmosis
  const [cellType, setCellType] = useState<'plant' | 'animal'>('plant');
  const [selectedOrganelle, setSelectedOrganelle] = useState<Organelle>(organellesData[0]);

  // Tab 2: Potato Slices Activity (ص 19)
  const [potatoTime, setPotatoTime] = useState<'0min' | '15min' | '24h'>('0min');

  // Tab 3: Slide Preparation (الخطوة 1 من 4)
  const [slideStep, setSlideStep] = useState<number>(1);

  // Tab 6: Pulse Rate & Integrated Body Systems (ص 26)
  const [isExercising, setIsExercising] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(72);

  const handleSaveResults = () => {
    playSound();
    setIsSaved(true);
    onEarnPoints(15);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleExerciseToggle = () => {
    playSound();
    if (!isExercising) {
      setIsExercising(true);
      setPulseCount(128);
      onEarnPoints(10);
    } else {
      setIsExercising(false);
      setPulseCount(72);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Unit Banner matching Screenshot 6 */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              الوحدة الأولى: تجارب الخلية والأجهزة الحية
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              إعداد الشرائح، المجهر، العضيات، العلماء، الأنسجة، التناضح، وتكامل الأجهزة
            </p>
          </div>

          <div className="w-13 h-13 rounded-2xl bg-[#092b23] border border-emerald-500/40 text-emerald-400 flex items-center justify-center p-3 shadow-md flex-shrink-0">
            <Sparkles className="w-7 h-7 stroke-[2]" />
          </div>
        </div>

        {/* Save button matching Screenshot 6 */}
        <button
          onClick={handleSaveResults}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm py-3 rounded-2xl shadow-lg shadow-emerald-500/20 transition active:scale-98"
        >
          <BookmarkCheck className="w-4 h-4 stroke-[2.5]" />
          <span>{isSaved ? 'تم حفظ نتائج التجربة في التقرير ✓' : 'حفظ نتائج التجربة'}</span>
        </button>
      </div>

      {/* Activity Navigation Pills matching Screenshots 4, 6, 8, 10 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => {
              setActiveTab(1);
              playSound();
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
              activeTab === 1
                ? 'bg-emerald-400 border-emerald-300 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
            }`}
          >
            1. العضيات والخلايا والتناضح 🧬
          </button>

          <button
            onClick={() => {
              setActiveTab(2);
              playSound();
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
              activeTab === 2
                ? 'bg-emerald-400 border-emerald-300 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
            }`}
          >
            2. نشاط: تغير قطر شرائح البطاطا 🥔
          </button>

          <button
            onClick={() => {
              setActiveTab(3);
              playSound();
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
              activeTab === 3
                ? 'bg-emerald-400 border-emerald-300 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
            }`}
          >
            3. إعداد مقاطع الشرائح 🔬
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => {
              setActiveTab(4);
              playSound();
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
              activeTab === 4
                ? 'bg-emerald-400 border-emerald-300 text-slate-950 shadow-md'
                : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
            }`}
          >
            4. الدرس الأول: المجهر ونظرية الخلية 📖
          </button>

          <button
            onClick={() => {
              setActiveTab(5);
              playSound();
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
              activeTab === 5
                ? 'bg-emerald-400 border-emerald-300 text-slate-950 shadow-md'
                : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
            }`}
          >
            5. أجهزة جسم الكائن الحي 🫀
          </button>

          <button
            onClick={() => {
              setActiveTab(6);
              playSound();
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
              activeTab === 6
                ? 'bg-emerald-400 border-emerald-300 text-slate-950 shadow-md'
                : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700 text-slate-300'
            }`}
          >
            6. نشاط: قياس النبض وتكامل الأجهزة ⏱️ (ص 26)
          </button>
        </div>
      </div>

      {/* ACTIVITY 1: Organelles & Osmosis matching Screenshot 4 */}
      {activeTab === 1 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-300">نوع الخلية المعروضة:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCellType('plant');
                  playSound();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  cellType === 'plant'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                    : 'bg-[#101b38] text-slate-300 border border-slate-700'
                }`}
              >
                خلية نباتية 🌿
              </button>
              <button
                onClick={() => {
                  setCellType('animal');
                  playSound();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  cellType === 'animal'
                    ? 'bg-blue-500 text-white font-black shadow-md'
                    : 'bg-[#101b38] text-slate-300 border border-slate-700'
                }`}
              >
                خلية حيوانية 🐾
              </button>
            </div>
          </div>

          {/* Interactive Cell Model */}
          <div className="relative rounded-2xl bg-[#070e20] border-2 border-[#192a54] p-6 min-h-[300px] flex items-center justify-center overflow-hidden">
            <div
              className={`relative w-64 h-52 sm:w-72 sm:h-60 transition-all flex flex-col items-center justify-center p-4 ${
                cellType === 'plant'
                  ? 'border-4 border-emerald-400 rounded-[36px] bg-emerald-950/25 shadow-lg shadow-emerald-900/30'
                  : 'border-4 border-blue-400 rounded-full bg-blue-950/25 shadow-lg shadow-blue-900/30'
              }`}
            >
              {/* Nucleus in center */}
              <div className="w-20 h-20 rounded-full bg-cyan-600/90 border-2 border-cyan-300 shadow-xl flex flex-col items-center justify-center text-center">
                <span className="text-white font-black text-xs">النواة</span>
                <span className="text-[10px] text-cyan-200 font-mono">DNA</span>
              </div>

              {/* Water Droplets indicating Osmosis */}
              <div className="absolute top-6 left-6 text-cyan-400 animate-pulse text-lg">💧</div>
              <div className="absolute bottom-6 right-6 text-cyan-400 animate-pulse text-lg">💧</div>

              {cellType === 'plant' && (
                <span className="absolute bottom-3 text-[11px] text-emerald-300 font-bold">
                  جدار سيللوزي غشائي
                </span>
              )}
            </div>
          </div>

          <div className="bg-[#091126] border border-[#142347] rounded-xl p-3 text-xs text-slate-300">
            <span className="text-cyan-300 font-bold block mb-1">الخاصية الإسموزية والتناضح:</span>
            انتقال جزيئات الماء عبر الغشاء الخلوي شبه المنفذ من منطقة التركيز الأعلى للماء (الأقل أملاحاً) إلى منطقة التركيز الأقل للماء (الأعلى أملاحاً).
          </div>
        </div>
      )}

      {/* ACTIVITY 2: Potato Slices Osmosis Activity (ص 19) matching Screenshot 10 */}
      {activeTab === 2 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="bg-amber-950 border border-amber-500/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-1 inline-block">
                نشاط الصف السادس - ص 19
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">
                نشاط: لماذا يتغير قطر شرائح البطاطا؟ 🥔
              </h3>
            </div>

            {/* Time Tabs */}
            <div className="flex items-center gap-1.5 bg-[#091024] p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => {
                  setPotatoTime('0min');
                  playSound();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  potatoTime === '0min' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'
                }`}
              >
                البداية (0 min)
              </button>
              <button
                onClick={() => {
                  setPotatoTime('15min');
                  playSound();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  potatoTime === '15min' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'
                }`}
              >
                بعد 15 min
              </button>
              <button
                onClick={() => {
                  setPotatoTime('24h');
                  playSound();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  potatoTime === '24h' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'
                }`}
              >
                بعد 24 h
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            استكشاف تأثير الخاصية الاسموزية في الخلايا النباتية عند وضع شرائح البطاطا في ماء عذب مقابل ماء مالح.
          </p>

          {/* Visual Beakers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Beaker A: Pure Water */}
            <div className="bg-[#08152e] border border-cyan-500/40 rounded-2xl p-4 text-center">
              <h4 className="font-bold text-cyan-300 text-xs sm:text-sm mb-2">
                الكأس (أ): ماء عذب نقي 💧
              </h4>
              <div className="h-32 rounded-xl bg-cyan-950/40 border-2 border-cyan-500/50 flex flex-col items-center justify-center relative p-3">
                <div
                  className={`rounded-full bg-amber-400 border-2 border-amber-600 transition-all duration-500 flex items-center justify-center font-bold text-slate-950 text-xs ${
                    potatoTime === '0min'
                      ? 'w-16 h-16'
                      : potatoTime === '15min'
                      ? 'w-18 h-18'
                      : 'w-22 h-22 ring-4 ring-cyan-400/50'
                  }`}
                >
                  {potatoTime === '24h' ? 'منتفخة (صلبة)' : 'طبيعية'}
                </div>
              </div>
              <p className="text-[11px] text-slate-300 mt-2">
                يدخل الماء إلى خلايا البطاطا بالخاصية الاسموزية فتنتفخ ويزداد قطرها وتصبح قاسية.
              </p>
            </div>

            {/* Beaker B: Salt Water */}
            <div className="bg-[#08152e] border border-amber-500/40 rounded-2xl p-4 text-center">
              <h4 className="font-bold text-amber-300 text-xs sm:text-sm mb-2">
                الكأس (ب): ماء مالح شديد التركيز 🧂
              </h4>
              <div className="h-32 rounded-xl bg-amber-950/30 border-2 border-amber-500/50 flex flex-col items-center justify-center relative p-3">
                <div
                  className={`rounded-full bg-amber-600/80 border-2 border-amber-800 transition-all duration-500 flex items-center justify-center font-bold text-white text-xs ${
                    potatoTime === '0min'
                      ? 'w-16 h-16'
                      : potatoTime === '15min'
                      ? 'w-14 h-14'
                      : 'w-11 h-11 ring-2 ring-rose-400/40'
                  }`}
                >
                  {potatoTime === '24h' ? 'ذابلة (رخوة)' : 'طبيعية'}
                </div>
              </div>
              <p className="text-[11px] text-slate-300 mt-2">
                يخرج الماء من خلايا البطاطا نحو المحلول المالح فتنكمش ويقل قطرها وتصبح طرية مرنة.
              </p>
            </div>
          </div>

          <div className="bg-[#091126] border border-[#142347] rounded-xl p-3 text-xs text-slate-300">
            <span className="font-bold text-amber-400 block mb-1">الأدوات المستخدمة:</span>
            🥔 حبة بطاطا صغيرة | 🔪 سكين ومسطرة | 🧪 كأسان مع غطاءين | 💧 ماء عذب | 🧂 ملح طعام | 📄 ورق أبيض وقلم
          </div>
        </div>
      )}

      {/* ACTIVITY 3: Slide Preparation matching Screenshot 8 */}
      {activeTab === 3 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#152349]">
            <h3 className="text-base sm:text-lg font-black text-white">
              خطوات إعداد شريحة مجهرية زجاجية مثبتة بالصبغة 💉
            </h3>
            <span className="bg-[#0e2747] text-cyan-300 font-mono font-bold text-xs px-3 py-1 rounded-lg border border-cyan-500/40">
              الخطوة {slideStep} من 4
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                step: 1,
                title: '1. أخذ العينة',
                desc: 'نزع غشاء غضروفي شفاف ورقيق جداً من بشرة البصل باستخدام الملقط.',
              },
              {
                step: 2,
                title: '2. إضافة قطرة ماء / صبغة',
                desc: 'وضع قطرة من صبغة اليود أو أزرق الميثيلين لتلوين وإظهار العضيات والنواة.',
              },
              {
                step: 3,
                title: '3. وضع غطاء الشريحة',
                desc: 'تثبيت ساتر الشريحة الزجاجي بزاوية 45 درجة بلطف لمنع تكون فقاعات الهواء.',
              },
              {
                step: 4,
                title: '4. فحص الشريحة بالمجهر',
                desc: 'وضع الشريحة على المسرح والبدء بالعدسة الصغرى 4x ثم التدرج إلى 40x و 100x.',
              },
            ].map((st) => (
              <button
                key={st.step}
                onClick={() => {
                  setSlideStep(st.step);
                  playSound();
                }}
                className={`w-full p-4 rounded-2xl border text-right transition ${
                  slideStep === st.step
                    ? 'bg-emerald-950/40 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-400/40'
                    : 'bg-[#091126] border-slate-800 text-slate-300'
                }`}
              >
                <h4 className="font-bold text-sm text-emerald-300">{st.title}</h4>
                <p className="text-xs text-slate-300 mt-1">{st.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVITY 4: Cell Theory & History */}
      {activeTab === 4 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <h3 className="text-base sm:text-lg font-black text-white">
            رواد نظرية الخلية وتاريخ اكتشافها 📖
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#08152e] border border-cyan-500/30 p-3.5 rounded-2xl">
              <h4 className="font-bold text-cyan-300">🔬 روبرت هوك (1665م):</h4>
              <p className="text-slate-300 mt-1">أول من شاهد خلايا الفلين بالمجهر وأطلق عليها اسم «الخلية» (Cell).</p>
            </div>
            <div className="bg-[#08152e] border-cyan-500/30 border p-3.5 rounded-2xl">
              <h4 className="font-bold text-cyan-300">💧 فان ليفنهوك (1674م):</h4>
              <p className="text-slate-300 mt-1">أول من شاهد كائنات حية دقيقة وحيدة الخلية في قطرة ماء المستنقع.</p>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVITY 5: Levels of Biological Organization */}
      {activeTab === 5 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <h3 className="text-base sm:text-lg font-black text-white">
            مستويات التنظيم الحيوي في الكائن الحي 🫀
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold text-center">
            <div className="bg-emerald-950 border border-emerald-500/40 p-3 rounded-xl w-full">الخلية (وحدة البناء)</div>
            <span className="text-cyan-400">←</span>
            <div className="bg-blue-950 border border-blue-500/40 p-3 rounded-xl w-full">النسيج (مجموعة خلايا)</div>
            <span className="text-cyan-400">←</span>
            <div className="bg-purple-950 border border-purple-500/40 p-3 rounded-xl w-full">العضو (كالقلب والرئة)</div>
            <span className="text-cyan-400">←</span>
            <div className="bg-rose-950 border border-rose-500/40 p-3 rounded-xl w-full">الجهاز الحيوي</div>
          </div>
        </div>
      )}

      {/* ACTIVITY 6: Pulse Rate & Exercise Activity (ص 26) */}
      {activeTab === 6 && (
        <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 shadow-2xl space-y-4">
          <h3 className="text-base sm:text-lg font-black text-white">
            نشاط: قياس النبض وتكامل الأجهزة ⏱️ (ص 26)
          </h3>
          <div className="bg-[#070e20] border border-rose-500/40 rounded-2xl p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-950 border-2 border-rose-500 mx-auto flex items-center justify-center text-rose-400 mb-3 animate-pulse">
              <Heart className="w-10 h-10 fill-rose-500" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{pulseCount} نبضة/دقيقة</div>
            <p className="text-xs text-slate-300 mt-1">
              الحالة: {isExercising ? 'بعد ممارسة نشاط بدني مكثف 🏃‍♂️' : 'وقت الراحة والاسترخاء 🧘‍♂️'}
            </p>
            <button
              onClick={handleExerciseToggle}
              className="mt-4 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition"
            >
              {isExercising ? 'العودة لحالة الراحة' : 'بدء تمرين رياضي لمدة دقيقة 🏃'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
