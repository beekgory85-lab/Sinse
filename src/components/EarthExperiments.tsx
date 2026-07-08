import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LabNote } from '../types';
import { 
  Globe2, 
  Wind, 
  Droplets, 
  Mountain, 
  CheckCircle2, 
  BookmarkPlus, 
  Sparkles,
  Info,
  Trees,
  CloudRain,
  Clock,
  Thermometer,
  Leaf,
  Trash2,
  HelpCircle,
  RefreshCw,
  BookOpen
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface EarthExperimentsProps {
  onSaveNote: (note: Omit<LabNote, 'id' | 'date'>) => void;
  onRunExperiment: () => void;
  soundEnabled: boolean;
}

type Unit4SubTab = 'mechanical' | 'chemical' | 'soil_erosion' | 'decomposition';

export const EarthExperiments: React.FC<EarthExperimentsProps> = ({
  onSaveNote,
  onRunExperiment,
  soundEnabled
}) => {
  const [subTab, setSubTab] = useState<Unit4SubTab>('mechanical');

  // Activity 1 (كيف يتغير شكل الصخور - ص 81) States
  const [hasWater, setHasWater] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [shakenDry, setShakenDry] = useState<boolean>(false);
  const [shakenWet, setShakenWet] = useState<boolean>(false);
  const [chalkState, setChalkState] = useState<number>(0); // 0: new, 1: shaken dry, 2: shaken wet
  const [hypothesisText, setHypothesisText] = useState<string>('أقترح أن تصادم الصخور مع بعضها يؤدي إلى تفتيتها وتنعيم حوافها، وبوجود الماء يزداد هذا الأثر وتتفتت أسرع.');
  const [activeMagnifier, setActiveMagnifier] = useState<'chalk' | 'rocks' | null>('chalk');
  const [activeStep1, setActiveStep1] = useState<number>(1);

  // Activity 2 (إذابة الصخور - ص 85) States
  const [appliedDrops, setAppliedDrops] = useState<number>(0);
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [dropperFilled, setDropperFilled] = useState<boolean>(false);
  const [activeQuestion2, setActiveQuestion2] = useState<string | null>(null);

  // Soil Erosion States
  const [rainRate, setRainRate] = useState<number>(60);
  const [hasTreesBuffer, setHasTreesBuffer] = useState<boolean>(true);

  // Decomposition (ص 97) States
  const [weeksPassed, setWeeksPassed] = useState<number>(0);
  const [moisture, setMoisture] = useState<'dry' | 'moist' | 'wet'>('moist');
  const [temperature, setTemperature] = useState<'cold' | 'warm' | 'hot'>('warm');
  const [isCovered, setIsCovered] = useState<boolean>(true);
  const [modelType, setModelType] = useState<'organic' | 'synthetic'>('organic');
  const [activeQuestion, setActiveQuestion] = useState<'q6' | 'q7' | 'q8' | null>(null);

  // Decay speed factor calculation
  const moistureFactor = moisture === 'dry' ? 0.05 : moisture === 'moist' ? 1.0 : 0.8;
  const tempFactor = temperature === 'cold' ? 0.2 : temperature === 'warm' ? 1.0 : 1.1;
  const coverFactor = isCovered ? 1.0 : 0.6;
  const speedFactor = moistureFactor * tempFactor * coverFactor;

  // Decompose percentages
  const breadDecay = Math.min(100, Math.round(weeksPassed * 65 * speedFactor));
  const peelDecay = Math.min(100, Math.round(weeksPassed * 35 * speedFactor));
  const paperDecay = Math.min(100, Math.round(weeksPassed * 18 * speedFactor));

  const plasticDecay = 0;
  const metalDecay = moisture === 'dry' ? 0 : Math.min(5, Math.round(weeksPassed * 0.8 * speedFactor)); // small rust spots only
  const aluminumDecay = 0;

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSaveObservation = () => {
    if (soundEnabled) soundEngine.playSuccess();
    
    let noteTitle = '';
    let noteHypothesis = '';
    let noteContent = '';
    let noteConclusion = '';

    if (subTab === 'mechanical') {
      noteTitle = 'استكشاف: كيف يتغير شكل الصخور؟ (ص 81)';
      noteHypothesis = hypothesisText;
      noteContent = `حالة التجربة: تم رج الوعاء المحتوي على صخور صغيرة وطباشير. حالة الوعاء المائي: ${hasWater ? 'رطب بوجود الماء 💧' : 'جاف بدون ماء 🏜️'}. حالة الطباشير: ${chalkState === 0 ? 'سليمة حادة الحواف' : chalkState === 1 ? 'مستديرة الأطراف مع تفتت طفيف ومسحوق جاف' : 'متآكلة بشدة مع ذوبان جزئي ومياه بيضاء حليبية'}.`;
      noteConclusion = 'يتغير شكل الصخور وحجمها نتيجة الاصطدام والاحتجاج الميكانيكي المستمر بينها (كما يحدث في الطبيعة في الأنهار والشواطئ)، ووجود الماء يسرع ويسهل عملية الحت الميكانيكي وتنعيم حواف الصخور والتربة بمرور الزمن.';
    } else if (subTab === 'chemical') {
      noteTitle = 'نشاط: إذابة الصخور - تجوية كيميائية (ص 85)';
      noteHypothesis = 'أفترض أن الخل (الحمض) يتفاعل كيميائياً مع كربونات الكالسيوم في الطباشير ويسبب إذابتها كلياً أو جزئياً.';
      noteContent = `العامل الكيميائي: حمض الخل. عدد القطرات المضافة: ${appliedDrops} قطرة. الملاحظة بالعدسة المكبرة: حدوث فوران فوري وتصاعد غاز ثاني أكسيد الكربون (CO2) مع تآكل موضعي للطباشير ونشوء حفر دقيقة.`;
      noteConclusion = 'حمض الخل يتفاعل كيميائياً مع كربونات الكالسيوم (المكونة للطباشير والصخور الجيرية) ويذيبها. يحاكي هذا في الطبيعة عملية التجوية الكيميائية للأمطار الحمضية التي تذيب الجبال الجيرية لتكوّن الكهوف والمغارات الجوفية ببطء عبر آلاف السنين.';
    } else if (subTab === 'soil_erosion') {
      noteTitle = `تجربة انجراف التربة وتأثير المصدات النباتية (${hasTreesBuffer ? 'مع أشجار' : 'بدون مصدات'})`;
      noteHypothesis = 'المصدات الشجرية تحمي التربة من جرف السيول والتعرية العميقة.';
      noteContent = `شدة المطر: ${rainRate}%. المصدات النباتية تحمي التربة من جرف السيول بنسبة 85%.`;
      noteConclusion = 'تتشكل التضاريس الأرضية بفعل عمليات التجوية الميكانيكية والكيميائية وتتأثر حماية التربة بالغطاء النباتي.';
    } else {
      noteTitle = 'نشاط ص 97: استقصاء تحلل المواد في التربة (أيها يتحلل أسرع؟)';
      noteHypothesis = 'المواد العضوية الطبيعية (كالخبز وقشور الفواكه) ستتحلل بسرعة بفعل كائنات التربة الدقيقة، بينما البلاستيك والمعادن الصناعية ستقاوم التحلل تماماً.';
      
      const moistureText = moisture === 'dry' ? 'جافة' : moisture === 'moist' ? 'رطبة معتدلة' : 'مشبعة بالماء';
      const tempText = temperature === 'cold' ? 'باردة جداً' : temperature === 'warm' ? 'دافئة ملائمة' : 'حارة مرتفعة';
      const coverText = isCovered ? 'مغطاة بورق ألومنيوم (تحتفظ بالحرارة والرطوبة)' : 'مكشوفة (تفقد الحرارة والرطوبة بسرعة)';
      
      const resultsText = modelType === 'organic' 
        ? `بعد مرور ${weeksPassed} أسابيع: تحللت قطعة الخبز بنسبة ${breadDecay}%، وقشور الخضراوات والفواكه بنسبة ${peelDecay}%، وورقة الجريدة بنسبة ${paperDecay}%.`
        : `بعد مرور ${weeksPassed} أسابيع: بقيت الأشياء البلاستيكية سليمة تماماً (نسبة التحلل ${plasticDecay}%)، والمشابك الفلزية أصابها صدأ طفيف بنسبة ${metalDecay}% لكنها لم تتحلل، ورقائق الألومنيوم بقيت سليمة بنسبة 100%.`;

      noteContent = `النموذج المختبر: ${modelType === 'organic' ? 'نموذج (1) المواد العضوية الطبيعية' : 'نموذج (2) المواد الصناعية والفلزية'}. ظروف التربة: رطوبة ${moistureText}، حرارة ${tempText}، والقنينة البلاستيكية ${coverText}. ${resultsText}`;
      
      noteConclusion = 'نستنتج من النشاط العملي ص 97 أن المواد النباتية والعضوية الطبيعية قابلة للتحلل الحيوي (Biodegradable) وتتحول إلى سماد مفيد للتربة بفعل المحللات الدقيقة (البكتيريا والفطريات). بالمقابل، المواد البلاستيكية والمعادن غير قابلة للتحلل وتقاوم الظروف لمئات السنين، مما يجعلها ملوثات خطيرة للتربة والبيئة يجب إعادة تدويرها بدلاً من طمرها في الطبيعة.';
    }

    onSaveNote({
      title: noteTitle,
      experimentName: 'الوحدة الرابعة: عمليات الأرض والتجوية والانجراف',
      category: 'earth',
      hypothesis: noteHypothesis,
      content: noteContent,
      conclusion: noteConclusion
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">الوحدة الرابعة: عمليات الأرض والتجوية والانجراف</h2>
            <p className="text-xs text-slate-400">التجوية الميكانيكية، التجوية الكيميائية، وانجراف التربة والمصدات</p>
          </div>
        </div>

        <button
          onClick={handleSaveObservation}
          disabled={isSaved}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            isSaved
              ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
          }`}
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
          <span>{isSaved ? 'تم الحفظ في التقرير' : 'حفظ نتائج علوم الأرض'}</span>
        </button>
      </div>

      {/* Sub-Tabs for Unit 4 */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('mechanical');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'mechanical'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          1. استكشف: كيف يتغير شكل الصخور؟ (ص 81) 🪨
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('chemical');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'chemical'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          2. نشاط: إذابة الصخور - تجوية كيميائية (ص 85) 🧪
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('soil_erosion');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'soil_erosion'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          3. انجراف التربة ومصدات الأشجار 🌲
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('decomposition');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'decomposition'
              ? 'bg-cyan-500 text-slate-950 shadow-md animate-pulse'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-dashed border-cyan-800/30'
          }`}
        >
          4. نشاط: أي المواد تتحلل أسرع؟ (ص 97) 🧪
        </button>
      </div>

      {subTab === 'mechanical' && (
        /* ACTIVITY 1: HOW DOES THE SHAPE OF ROCKS CHANGE? (ص 81) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Shaker Cup and Magnifier */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                <span className="text-sm font-bold text-slate-100">وعاء الاستكشاف البلاستيكي (ص 81):</span>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-full border border-cyan-800/30">
                {hasWater ? 'تجوية ميكانيكية رطبة 💧' : 'تجوية ميكانيكية جافة 🏜️'}
              </span>
            </div>

            {/* Container Scene with shaking */}
            <div className="relative w-full h-80 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col md:flex-row items-center justify-around overflow-hidden gap-4">
              
              {/* Background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none"></div>

              {/* Shaking Jar / Cup */}
              <motion.div 
                className="w-44 h-60 bg-sky-500/10 border-2 border-sky-400/40 rounded-t-3xl rounded-b-2xl relative flex flex-col justify-between items-center overflow-hidden shadow-2xl"
                animate={isShaking ? {
                  x: [0, -12, 12, -12, 12, -8, 8, 0],
                  y: [0, 8, -8, 8, -8, 6, -6, 0],
                  rotate: [0, -6, 6, -6, 6, -4, 4, 0]
                } : {}}
                transition={{ repeat: isShaking ? Infinity : 0, duration: 0.18, ease: "linear" }}
              >
                {/* Red Tight Lid */}
                <div className="w-full h-8 bg-red-600 border-b-4 border-red-800 flex items-center justify-center shadow-md relative z-10">
                  <span className="text-[9px] font-bold text-white tracking-wider">غطاء محكم 🔴</span>
                </div>

                {/* Water overlay inside the cup */}
                {hasWater && (
                  <div className="absolute bottom-0 inset-x-0 h-28 bg-cyan-400/25 border-t border-cyan-300/40 z-0 flex items-center justify-center animate-pulse">
                    <span className="text-[10px] text-cyan-200/40 font-bold tracking-widest">مياه التجربة</span>
                  </div>
                )}

                {/* Chalk Dust Particle Effects if shaken */}
                {chalkState > 0 && (
                  <div className={`absolute bottom-0 inset-x-0 h-10 ${hasWater ? 'bg-white/20' : 'bg-transparent'} z-1 flex flex-wrap gap-1 p-2 justify-center content-end opacity-75`}>
                    {[...Array(hasWater ? 16 : 8)].map((_, i) => (
                      <div key={i} className={`w-1 h-1 rounded-full ${hasWater ? 'bg-white/80' : 'bg-slate-300'} animate-ping`} style={{ animationDelay: `${i * 100}ms` }}></div>
                    ))}
                  </div>
                )}

                {/* Simulated Rocks and Chalk Inside */}
                <div className="flex-1 w-full relative z-2 flex flex-col justify-end items-center pb-4 space-y-2 px-3">
                  {/* Chalk Cylinders */}
                  <div className="flex gap-2">
                    {[1, 2, 3].map((num) => (
                      <div 
                        key={num} 
                        className={`w-4 transition-all duration-300 rounded-sm shadow-md ${
                          chalkState === 0 
                            ? 'h-14 bg-slate-100 border-x-2 border-slate-300' 
                            : chalkState === 1 
                            ? 'h-12 bg-slate-200 border-x-2 border-slate-400 rounded-md' 
                            : 'h-6 bg-slate-300 border-x border-slate-400 rounded-full scale-75 opacity-70'
                        }`}
                        title="قطعة طباشير"
                      />
                    ))}
                  </div>

                  {/* Sharp/Smooth Rocks */}
                  <div className="flex gap-1.5 justify-center items-center">
                    <div className={`w-9 h-7 bg-stone-600 border border-stone-500 relative flex items-center justify-center text-[8px] text-stone-300 transition-all ${chalkState === 2 ? 'rounded-full scale-95' : 'rounded-md rotate-12'}`}>🪨</div>
                    <div className={`w-10 h-8 bg-stone-700 border border-stone-600 relative flex items-center justify-center text-[8px] text-stone-300 transition-all ${chalkState === 2 ? 'rounded-full scale-95' : 'rounded-lg -rotate-12'}`}>🪨</div>
                    <div className={`w-8 h-8 bg-stone-500 border border-stone-400 relative flex items-center justify-center text-[8px] text-stone-300 transition-all ${chalkState === 2 ? 'rounded-full scale-95' : 'rounded-xl rotate-45'}`}>🪨</div>
                  </div>
                </div>
              </motion.div>

              {/* Magnified Lens Circular View (العدسة المكبرة ص 81) */}
              <div className="w-56 h-56 rounded-full border-4 border-cyan-500 bg-slate-950 flex flex-col items-center justify-center p-4 relative shadow-2xl shrink-0">
                <div className="absolute top-2 text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-3 py-0.5 rounded-full border border-cyan-800/30 flex items-center gap-1">
                  <span>العدسة المكبرة ص 81 🔍</span>
                </div>

                {/* Sub-tab selection for lens */}
                <div className="absolute bottom-2 flex bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-[9px] z-10">
                  <button 
                    onClick={() => { if (soundEnabled) soundEngine.playClick(); setActiveMagnifier('chalk'); }} 
                    className={`px-2 py-1 rounded ${activeMagnifier === 'chalk' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    تفحص الطباشير ✏️
                  </button>
                  <button 
                    onClick={() => { if (soundEnabled) soundEngine.playClick(); setActiveMagnifier('rocks'); }} 
                    className={`px-2 py-1 rounded ${activeMagnifier === 'rocks' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    تفحص الصخور 🪨
                  </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-2 space-y-1 mt-4">
                  {activeMagnifier === 'chalk' ? (
                    <>
                      <div className="flex gap-2 mb-2">
                        {chalkState === 0 && <div className="w-8 h-12 bg-white border border-slate-300 rounded-sm shadow-md animate-pulse" />}
                        {chalkState === 1 && <div className="w-7 h-10 bg-slate-200 border border-slate-400 rounded-md shadow" />}
                        {chalkState === 2 && <div className="w-5 h-5 bg-slate-300 border border-slate-500 rounded-full shadow" />}
                      </div>
                      <p className="text-[11px] font-bold text-slate-200">
                        {chalkState === 0 ? 'طباشير سليم وحاد الحواف' : chalkState === 1 ? 'طباشير متآكل الأطراف دائري' : 'طباشير مهترئ وصغير جداً'}
                      </p>
                      <p className="text-[9px] text-slate-400 leading-normal">
                        {chalkState === 0 
                          ? 'أسطوانات ناصعة البياض، حوافها حادة وقوية قبل بدء عملية الرج والاصطدام.' 
                          : chalkState === 1 
                          ? 'تآكلت الحواف والزوايا الحادة بسبب احتكاكها بالصخور وتحولت لمسحوق أبيض ناعم.' 
                          : 'تفتت شديد وذوبان جزيئي ميكانيكي بسبب تغلغل جزيئات الماء واصطدام الصخور به بقوة.'}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-12 bg-stone-600 border border-stone-400 rounded-xl flex items-center justify-center mb-2 shadow text-stone-100 font-bold text-xs">
                        {chalkState === 2 ? '🪨 ملساء' : '🪨 خشنة'}
                      </div>
                      <p className="text-[11px] font-bold text-slate-200">
                        {chalkState === 2 ? 'صخور مصقولة الأطراف' : 'صخور صلبة وحادة الحواف'}
                      </p>
                      <p className="text-[9px] text-slate-400 leading-normal">
                        {chalkState === 0 
                          ? 'صخور قاسية ذات نتوءات خشنة تساعد في كسر وطحن المواد الأقل صلابة.' 
                          : chalkState === 1 
                          ? 'النتوءات الحادة لا زالت واضحة، ولم تتأثر كثيراً بالرج الجاف لصلابتها العالية.' 
                          : 'بفعل تكرار الاصطدام الرطب بالماء، بدأت الحواف الحادة بالانصقال تدريجياً لتصبح أكثر نعومة.'}
                      </p>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Quick Controls Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setHasWater(!hasWater);
                  // Switching water resets chalk state to allow step 4 substitution naturally
                  setChalkState(0);
                }}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                  hasWater 
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span>{hasWater ? 'إزالة مياه الوعاء 🏜️' : 'إضافة ماء للوعاء 💧'}</span>
              </button>

              <button
                disabled={isShaking}
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setIsShaking(true);
                  onRunExperiment();
                  setTimeout(() => {
                    setIsShaking(false);
                    if (soundEnabled) soundEngine.playSuccess();
                    if (hasWater) {
                      setChalkState(2);
                      setShakenWet(true);
                    } else {
                      setChalkState(1);
                      setShakenDry(true);
                    }
                  }, 3000);
                }}
                className="py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
              >
                {isShaking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري الرج بقوة (5د)...</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4" />
                    <span>أرج الوعاء بقوة (5 دقائق) 🔄</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setChalkState(0);
                }}
                className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
                <span>استبدال بقطع جديدة (ص 81) ✏️</span>
              </button>
            </div>
          </div>

          {/* Right Column: Workbook Guide & Scientific Observations */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-right">
            <h3 className="text-sm font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center justify-end gap-1.5">
              <span>خطوات الاستكشاف المدرسي ص 81</span>
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </h3>

            {/* Checklist of steps */}
            <div className="space-y-2.5">
              {[
                { 
                  step: 1, 
                  title: 'تحضير المواد والأدوات', 
                  desc: 'أضع الصخور الصغيرة و3 قطع طباشير في الوعاء البلاستيكي وأحكم إغلاقه.',
                  status: true
                },
                { 
                  step: 2, 
                  title: 'التجريب والرج الجاف', 
                  desc: 'أرج الوعاء بقوة مدة 5 دقائق جافاً دون إضافة ماء.',
                  status: shakenDry
                },
                { 
                  step: 3, 
                  title: 'الملاحظة بالعدسة', 
                  desc: 'أفحص بالعدسة المكبرة التآكل الطفيف وتجمع البودرة البيضاء أسفل الكوب.',
                  status: shakenDry && chalkState === 1
                },
                { 
                  step: 4, 
                  title: 'التعديل والرج الرطب', 
                  desc: 'أستبدل الطباشير، ثم أضيف الماء المعتدل للوعاء وأعلق الغطاء.',
                  status: hasWater
                },
                { 
                  step: 5, 
                  title: 'التكرار والملاحظة المائية', 
                  desc: 'أرج مجدداً لـ 5 دقائق، وألاحظ الذوبان الشديد وتلون الماء بالحليبي.',
                  status: shakenWet && chalkState === 2
                }
              ].map((s) => (
                <div 
                  key={s.step}
                  onClick={() => {
                    if (soundEnabled) soundEngine.playClick();
                    setActiveStep1(s.step);
                  }}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all space-y-1 ${
                    activeStep1 === s.step
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-200 font-bold'
                      : s.status
                      ? 'bg-slate-950/40 border-emerald-900/60 text-slate-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex justify-between items-center flex-row-reverse">
                    <span className="flex items-center gap-1.5">
                      {s.step}. {s.title}
                    </span>
                    {s.status && <span className="text-emerald-400 font-mono">✓ مكتمل</span>}
                  </div>
                  {activeStep1 === s.step && (
                    <p className="text-[10px] text-slate-400 font-normal leading-normal">{s.desc}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Hypothesis Formulation Box */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <label className="text-[11px] font-bold text-cyan-400 block">صياغة الفرضية ص 81 ✍️:</label>
              <textarea
                value={hypothesisText}
                onChange={(e) => setHypothesisText(e.target.value)}
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                placeholder="أكتب جملة أو عبارة تمثل فرضيتك..."
              />
              <p className="text-[9px] text-slate-500">تمثل الفرضية جملة أو عبارة تحمل مضموناً محتملاً ليجري اختباره.</p>
            </div>

            {/* Scientific Explanation Card */}
            <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-xs space-y-1 text-right">
              <p className="font-bold text-emerald-400 flex items-center justify-end gap-1">
                <span>الاستنتاج العلمي ص 81:</span>
                <Info className="w-3.5 h-3.5" />
              </p>
              <p className="text-slate-300 text-[10px] leading-relaxed">
                يتغير شكل الصخور بفعل الاصطدام الميكانيكي المستمر (كالذي يحدث في الطبيعة بمجاري الأنهار بفعل السيول، والشواطئ بفعل الأمواج والرياح)، ووجود الماء يضاعف ويسرع عمليات التفتت وتنعيم الصخور بشكل مذهل.
              </p>
            </div>
          </div>

        </div>
      )}

      {subTab === 'chemical' && (
        /* ACTIVITY 2: DISSOLVING ROCKS - CHEMICAL WEATHERING (ص 85) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Petri Dish and Dropper */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-bold text-slate-100">تجربة إذابة الصخر الجيري كيميائياً (ص 85):</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-800/30">
                حمض الخل (CH₃COOH) 🧪
              </span>
            </div>

            {/* Dropper and Dish Scene */}
            <div className="relative w-full h-80 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col md:flex-row items-center justify-around overflow-hidden gap-4">
              
              {/* Background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none"></div>

              {/* Lab Setup: Watch glass & Chalk & Dropper */}
              <div className="flex-1 flex flex-col items-center justify-center relative h-full">
                
                {/* Floating Acid Dropper */}
                <motion.div 
                  className="absolute z-20"
                  style={{ top: '10px' }}
                  animate={isReacting ? { y: [10, 25, 10] } : { y: 10 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Squeeze bulb */}
                    <div className={`w-6 h-6 rounded-t-full transition-all ${dropperFilled ? 'bg-amber-600' : 'bg-red-500'} shadow-md`} />
                    {/* Glass tube */}
                    <div className="w-2.5 h-16 bg-slate-100/80 border-x border-slate-400/50 relative flex items-end justify-center">
                      {/* Acid Liquid inside dropper */}
                      {dropperFilled && (
                        <div className="w-full h-10 bg-amber-200/50 border-t border-amber-300 animate-pulse" />
                      )}
                    </div>
                    {/* Dropper nozzle */}
                    <div className="w-1 h-3 bg-slate-300" />
                    
                    {/* Dropping acid animation */}
                    {isReacting && (
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-amber-300 absolute"
                        initial={{ top: '85px', opacity: 1, scale: 0.8 }}
                        animate={{ top: '160px', opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.5, ease: 'easeIn' }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Petri Dish / Watch Glass */}
                <div className="w-52 h-20 border-4 border-slate-700/60 bg-slate-900/40 rounded-[100px] flex items-center justify-center relative shadow-lg mt-20 z-10">
                  {/* Dish Liquid residues */}
                  {appliedDrops > 0 && (
                    <div className="absolute inset-2 bg-amber-400/10 rounded-[100px] blur-sm animate-pulse" />
                  )}

                  {/* Chalk block on glass */}
                  <div className="relative flex flex-col items-center">
                    {/* Active effervescence bubbles */}
                    {isReacting && (
                      <div className="absolute -top-6 inset-x-0 flex justify-center gap-1 z-10">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-white/70 border border-slate-200/50"
                            initial={{ y: 5, opacity: 1, scale: 0.5 }}
                            animate={{ y: -25, opacity: 0, scale: 1.5 }}
                            transition={{ duration: 1, delay: i * 0.15, repeat: 2 }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Chalk cylinder */}
                    <div 
                      className={`w-28 bg-slate-100 border-x-4 border-slate-300 shadow-md transition-all duration-500 rounded-sm ${
                        appliedDrops === 0 
                          ? 'h-10' 
                          : appliedDrops < 4 
                          ? 'h-9 border-b border-amber-200/50' 
                          : 'h-7 border-b-2 border-amber-300/60'
                      }`}
                    >
                      {/* Interactive Pitted cavities (حفر نتيجة التجوية الكيميائية ص 85) */}
                      {appliedDrops > 0 && (
                        <div className="absolute top-1 inset-x-0 flex justify-around px-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-900/40 border border-amber-800/30 blur-[0.5px]" />
                          {appliedDrops >= 3 && <div className="w-3 h-2 rounded-full bg-stone-900/50 border border-stone-800/30 blur-[0.5px]" />}
                          {appliedDrops >= 6 && <div className="w-2 h-3 rounded-full bg-amber-950/60 border border-amber-900/30 blur-[0.5px]" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Acid gas overlay label */}
                {isReacting && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-1 bg-white/90 text-slate-950 text-[9px] px-2 py-0.5 rounded-md font-bold shadow border border-slate-200 z-30"
                  >
                    CO₂ تصاعد غاز ثاني أكسيد الكربون 🫧
                  </motion.div>
                )}
              </div>

              {/* Magnified Lens Circular View (العدسة المكبرة ص 85) */}
              <div className="w-56 h-56 rounded-full border-4 border-emerald-500 bg-slate-950 flex flex-col items-center justify-center p-4 relative shadow-2xl shrink-0">
                <div className="absolute top-2 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-3 py-0.5 rounded-full border border-emerald-800/30 flex items-center gap-1">
                  <span>العدسة المكبرة ص 85 🔍</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-1 space-y-1.5 mt-4">
                  {appliedDrops === 0 ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center text-xs shadow">✏️</div>
                      <p className="text-[11px] font-bold text-slate-200">الطباشير قبل التفاعل</p>
                      <p className="text-[9px] text-slate-400 leading-normal">
                        يتكون الطباشير أساساً من مركب كربونات الكالسيوم (CaCO₃) المتراص وذي الروابط المتماسكة، والسطح الخارجي أملس تماماً.
                      </p>
                    </>
                  ) : (
                    <>
                      {/* Interactive reaction details inside lens */}
                      <div className="flex gap-2 items-center mb-1">
                        <span className="text-[10px] bg-emerald-900/40 text-emerald-300 border border-emerald-800/50 px-1.5 py-0.5 rounded font-mono font-bold">CaCO₃</span>
                        <span className="text-xs text-white">✚</span>
                        <span className="text-[10px] bg-amber-900/40 text-amber-300 border border-amber-800/50 px-1.5 py-0.5 rounded font-mono font-bold">Acid</span>
                      </div>
                      <div className="w-full bg-stone-900/80 border border-stone-800 p-1.5 rounded text-[8px] font-mono text-emerald-400 text-center leading-tight">
                        CaCO₃ + 2H⁺ ➔ Ca²⁺ + CO₂↑ + H₂O
                      </div>
                      <p className="text-[10px] font-bold text-slate-200">
                        {appliedDrops < 4 ? 'تآكل موضعي وتصاعد CO₂ 🫧' : 'نشوء حفر عميقة وتفكك صخري 🧪'}
                      </p>
                      <p className="text-[9px] text-slate-400 leading-normal">
                        {appliedDrops < 4 
                          ? 'يتفاعل الحمض مع كربونات الكالسيوم فتنطلق فقاعات غاز CO2 وتتفتت قشرة الطباشير.' 
                          : 'تآكل تام في الروابط الكيميائية، وتشكلت تجاويف وحفر عميقة تشبه تماماً التجوية الكيميائية في الكهوف.'}
                      </p>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Quick Controls Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setDropperFilled(true);
                }}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                  dropperFilled 
                    ? 'bg-amber-950 border-amber-500 text-amber-300' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span>ملء القطارة بالخل 🧪</span>
              </button>

              <button
                disabled={!dropperFilled || isReacting}
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setIsReacting(true);
                  setAppliedDrops(prev => Math.min(prev + 1, 10));
                  onRunExperiment();
                  setTimeout(() => {
                    setIsReacting(false);
                    if (soundEnabled) soundEngine.playSuccess();
                  }, 2500);
                }}
                className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
              >
                {isReacting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>تفاعل وفوران نشط...</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4" />
                    <span>وضع قطرة على الطباشير ({appliedDrops}) 💧</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setAppliedDrops(0);
                  setDropperFilled(false);
                  setIsReacting(false);
                }}
                className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
                <span>إعادة تصفير التجربة 🔄</span>
              </button>
            </div>
          </div>

          {/* Right Column: Textbook Workbook & Questions */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-right">
            <h3 className="text-sm font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center justify-end gap-1.5">
              <span>الأسئلة والتحليل ص 85</span>
              <BookOpen className="w-4 h-4 text-emerald-400" />
            </h3>

            {/* Questions list */}
            <div className="space-y-2.5">
              {[
                { 
                  id: 'q1', 
                  title: 'ألاحظ (الخطوة 2 ص 85)', 
                  desc: 'ألاحظ باستخدام العدسة المكبرة ما سيحدث لقطعة الطباشير؟',
                  ans: 'يحدث تفاعل فوري وفوران قوي وتصاعد لفقاعات الغاز مع اهتراء السطح الخارجي للطباشير ونشوء حفر وتجاويف دقيقة فيه.'
                },
                { 
                  id: 'q2', 
                  title: 'أحلل (الخطوة 3 ص 85)', 
                  desc: 'أصف أثر الخل في الطباشير.',
                  ans: 'الخل (حمض الأستيك) يتفاعل كيميائياً مع مادة كربونات الكالسيوم (المكونة للطباشير) فيذيبها ويؤدي إلى تفتتها، وينتج عن هذا التفاعل ماء وغاز CO2 ذو الفقاعات.'
                },
                { 
                  id: 'q3', 
                  title: 'أستنتج (الخطوة 4 ص 85)', 
                  desc: 'ما نوع التجوية التي حصلت للطباشير؟ ولماذا؟',
                  ans: 'تجوية كيميائية (Chemical Weathering)؛ لأن تركيب مادة الطباشير الأصلية قد تغير كيميائياً تماماً ونتجت عنه مواد جديدة لم تكن موجودة من قبل.'
                },
                { 
                  id: 'q4', 
                  title: 'أستنتج التجوية بالطبيعة', 
                  desc: 'كيف تجري عملية إذابة الصخور في الطبيعة بفعل الأمطار؟',
                  ans: 'عند تساقط مياه الأمطار الحمضية (الناتجة من ذوبان غاز CO2 أو غازات المصانع بالجو) على الصخور الجيرية، فإنها تذيب كربونات الكالسيوم تدريجياً لتخلق الكهوف والمغارات الجوفية ببطء مذهل.'
                }
              ].map((q) => (
                <div 
                  key={q.id}
                  onClick={() => {
                    if (soundEnabled) soundEngine.playClick();
                    setActiveQuestion2(activeQuestion2 === q.id ? null : q.id);
                  }}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all space-y-1 ${
                    activeQuestion2 === q.id
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <p className="font-semibold flex items-center justify-between flex-row-reverse">
                    <span>{q.title}</span>
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </p>
                  <p className="text-[10px] text-slate-400 font-normal leading-normal">{q.desc}</p>
                  {activeQuestion2 === q.id && (
                    <div className="mt-2 p-2 bg-slate-900 border-r-2 border-emerald-500 text-emerald-300 rounded text-[10px] leading-relaxed font-normal">
                      <span className="font-bold text-emerald-400 block mb-0.5">الإجابة النموذجية:</span>
                      {q.ans}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Scientific Explanation Card */}
            <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-xs space-y-1 text-right">
              <p className="font-bold text-emerald-400 flex items-center justify-end gap-1">
                <span>معلومة علمية هامة:</span>
                <Info className="w-3.5 h-3.5" />
              </p>
              <p className="text-slate-300 text-[10px] leading-relaxed">
                الصخور الجيرية في الطبيعة حساسة جداً للأمطار الحمضية. التجوية الكيميائية هي المسؤولة الأساسية عن تكوين الكهوف الكارستية الضخمة والهوابط والصواعد الجمالية في باطن الأرض.
              </p>
            </div>
          </div>

        </div>
      )}

      {subTab === 'soil_erosion' && (
        /* SOIL EROSION & TREE BUFFERS SIMULATOR */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <Trees className="w-5 h-5 text-emerald-400" />
              <span>محاكاة انجراف التربة وتأثير جذور الأشجار والمصدات</span>
            </h3>

            <button
              onClick={() => setHasTreesBuffer(!hasTreesBuffer)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                hasTreesBuffer ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {hasTreesBuffer ? 'تفعيل مصدات الأشجار 🌳' : 'إزالة المصدات (تربة مكشوفة) 🏜️'}
            </button>
          </div>

          <div className="relative w-full h-64 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex items-end justify-between overflow-hidden">
            <div className={`w-full h-24 bg-amber-900/80 rounded-b-xl border-t-4 ${hasTreesBuffer ? 'border-emerald-500' : 'border-amber-700'} relative flex justify-around items-center`}>
              {hasTreesBuffer ? (
                <>
                  <Trees className="w-12 h-12 text-emerald-400 -mt-10 animate-bounce" />
                  <Trees className="w-12 h-12 text-emerald-400 -mt-10 animate-bounce" />
                  <Trees className="w-12 h-12 text-emerald-400 -mt-10 animate-bounce" />
                </>
              ) : (
                <p className="text-xs text-amber-300 font-mono">تربة معراة قابلة للجرف والتعرية الشديدة ⚠️</p>
              )}
            </div>
          </div>
        </div>
      )}

      {subTab === 'decomposition' && (
        /* WASTE DECOMPOSITION SIMULATOR - PAGE 97 */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Bottle Visualizer & Lab Book Questions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Visualizer Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></span>
                  <span className="text-sm font-bold text-slate-100">نموذج القنينة الاستقصائية (ص 97):</span>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-full border border-cyan-800/30">
                  {weeksPassed === 0 ? 'الأسبوع 0 (بداية التجربة)' : `بعد مرور ${weeksPassed} أسابيع`}
                </span>
              </div>

              {/* Plastic Bottle Mockup */}
              <div className="relative w-full min-h-[420px] bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center overflow-hidden">
                
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

                {/* 3D-like Plastic Bottle Outline */}
                <div className="w-48 h-[380px] bg-sky-500/5 border-2 border-sky-400/30 rounded-t-[40px] rounded-b-[20px] relative flex flex-col justify-between overflow-hidden shadow-2xl shadow-cyan-950/20">
                  
                  {/* Aluminum Foil Cover Top (Taped) */}
                  {isCovered ? (
                    <div className="absolute top-0 inset-x-0 h-10 bg-slate-400 border-b-2 border-slate-500 rounded-t-[40px] flex flex-col items-center justify-center shadow-lg z-10 animate-pulse">
                      <div className="w-full h-1 bg-amber-600/60 mt-3 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-amber-100 scale-90 tracking-widest uppercase">شريط لاصق</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-800 -mt-1">رقائق ألومنيوم 🛡️</span>
                    </div>
                  ) : (
                    <div className="absolute top-0 inset-x-0 h-10 border-b-2 border-dashed border-sky-400/20 rounded-t-[40px] flex items-center justify-center z-10 bg-transparent">
                      <span className="text-[8px] font-mono text-slate-500">فوهة مفتوحة 💨</span>
                    </div>
                  )}

                  {/* Top Layer of Soil (5 cm) */}
                  <div className="h-24 bg-amber-950/90 border-b border-amber-900/60 relative flex flex-col justify-center items-center px-2 pt-8 z-0">
                    <div className="text-[10px] font-bold text-amber-200/50 tracking-wider">طبقة تربة علوية (5 سم)</div>
                    <div className="flex gap-1 mt-1">
                      <span className="w-1 h-1 bg-amber-800 rounded-full"></span>
                      <span className="w-1.5 h-1.5 bg-amber-900 rounded-full"></span>
                      <span className="w-1 h-1 bg-amber-700 rounded-full"></span>
                    </div>
                  </div>

                  {/* Middle Layer (Active Waste/Materials Decomposition) */}
                  <div className="flex-1 bg-amber-900/40 relative flex flex-col justify-around items-center p-3 z-0 min-h-[160px]">
                    
                    {/* Background soil dust in middle layer */}
                    <div className="absolute inset-0 bg-amber-950/60 z-[-1] pointer-events-none flex flex-wrap gap-2 p-4 justify-around content-around opacity-40">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-900"></div>
                      ))}
                    </div>

                    {modelType === 'organic' ? (
                      /* MODEL 1: ORGANIC MATERIALS */
                      <div className="w-full space-y-4">
                        
                        {/* 1. Fruit/Veg Peels */}
                        <div 
                          className="flex items-center justify-between p-1.5 bg-slate-900/80 rounded-xl border border-slate-800 transition-all duration-300"
                          style={{
                            opacity: 1 - (peelDecay / 100) * 0.85,
                            transform: `scale(${1 - (peelDecay / 100) * 0.25})`
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">🍎🍌</span>
                            <span className="text-[10px] font-medium text-slate-200">قشور الفاكهة والخضروات</span>
                          </div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            peelDecay === 0 ? 'bg-emerald-950 text-emerald-400' : peelDecay === 100 ? 'bg-red-950 text-red-400' : 'bg-amber-950 text-amber-400'
                          }`}>
                            {peelDecay === 0 ? 'سليمة' : peelDecay === 100 ? 'تحللت 🍂' : `${peelDecay}% تحلل`}
                          </span>
                        </div>

                        {/* 2. Bread Piece */}
                        <div 
                          className="flex items-center justify-between p-1.5 bg-slate-900/80 rounded-xl border border-slate-800 transition-all duration-300"
                          style={{
                            opacity: 1 - (breadDecay / 100) * 0.95,
                            transform: `scale(${1 - (breadDecay / 100) * 0.35})`
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">🍞</span>
                            <div className="text-right">
                              <span className="text-[10px] font-medium text-slate-200 block">قطعة خبز بلدي</span>
                              {breadDecay > 15 && breadDecay < 100 && (
                                <span className="text-[8px] text-emerald-400 block -mt-1 font-bold animate-pulse">عفن فطري نشط 🦠</span>
                              )}
                            </div>
                          </div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            breadDecay === 0 ? 'bg-emerald-950 text-emerald-400' : breadDecay === 100 ? 'bg-red-950 text-red-400' : 'bg-amber-950 text-amber-400'
                          }`}>
                            {breadDecay === 0 ? 'سليمة' : breadDecay === 100 ? 'تحللت 🍂' : `${breadDecay}% تحلل`}
                          </span>
                        </div>

                        {/* 3. Newspaper Sheet */}
                        <div 
                          className="flex items-center justify-between p-1.5 bg-slate-900/80 rounded-xl border border-slate-800 transition-all duration-300"
                          style={{
                            opacity: 1 - (paperDecay / 100) * 0.75,
                            transform: `scale(${1 - (paperDecay / 100) * 0.15})`
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">📰</span>
                            <span className="text-[10px] font-medium text-slate-200">ورق جرائد سلولوز</span>
                          </div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            paperDecay === 0 ? 'bg-emerald-950 text-emerald-400' : paperDecay === 100 ? 'bg-red-950 text-red-400' : 'bg-amber-950 text-amber-400'
                          }`}>
                            {paperDecay === 0 ? 'سليمة' : paperDecay === 100 ? 'تحللت 🍂' : `${paperDecay}% تحلل`}
                          </span>
                        </div>

                      </div>
                    ) : (
                      /* MODEL 2: SYNTHETIC/METALLIC MATERIALS */
                      <div className="w-full space-y-4">
                        
                        {/* 1. Plastic Items */}
                        <div className="flex items-center justify-between p-1.5 bg-slate-900/80 rounded-xl border border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="text-base">🥤🛒</span>
                            <span className="text-[10px] font-medium text-slate-200">أشياء بلاستيكية (بوليمر)</span>
                          </div>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400">
                            لا تتحلل (0%)
                          </span>
                        </div>

                        {/* 2. Metal clips/Pins */}
                        <div className="flex items-center justify-between p-1.5 bg-slate-900/80 rounded-xl border border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="text-base">📎📌</span>
                            <div className="text-right">
                              <span className="text-[10px] font-medium text-slate-200 block">مشابك ودبابيس حديد</span>
                              {metalDecay > 0 && (
                                <span className="text-[8px] text-amber-500 block -mt-1 font-bold">بدء التآكل والصدأ 🟤</span>
                              )}
                            </div>
                          </div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            metalDecay > 0 ? 'bg-amber-950 text-amber-400' : 'bg-emerald-950 text-emerald-400'
                          }`}>
                            {metalDecay > 0 ? 'تأكسد صدأ' : 'سليمة'}
                          </span>
                        </div>

                        {/* 3. Aluminum Foil pieces */}
                        <div className="flex items-center justify-between p-1.5 bg-slate-900/80 rounded-xl border border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="text-base">🥫🍳</span>
                            <span className="text-[10px] font-medium text-slate-200">رقائق ألومنيوم</span>
                          </div>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400">
                            لا تتحلل (0%)
                          </span>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Bottom Layer of Soil (5 cm) */}
                  <div className="h-16 bg-amber-950 border-t border-amber-900/60 relative flex flex-col justify-center items-center px-2 z-0">
                    <div className="text-[10px] font-bold text-amber-200/50 tracking-wider">طبقة تربة سفلية (5 سم)</div>
                    <div className="flex gap-1 mt-0.5">
                      <span className="w-1 h-1 bg-amber-800 rounded-full"></span>
                      <span className="w-1.5 h-1.5 bg-amber-900 rounded-full"></span>
                      <span className="w-1.5 h-1 bg-amber-700 rounded-full"></span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Textbook Analysis & Self-Evaluation Questions (p97) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>أسئلة التحليل والتقويم للنشاط (ص 97)</span>
              </h3>

              <div className="space-y-3">
                {[
                  {
                    id: 'q6',
                    num: '6',
                    question: 'أتوقع: أي المواد ستتحلل أسرع؟ وأيها لا تتحلل بسهولة؟',
                    answer: 'المواد النباتية والعضوية الطبيعية (كقشور الفواكه وقطعة الخبز والجرائد) ستتحلل بسرعة ملحوظة بمساعدة الفطريات والبكتيريا، بينما المواد البلاستيكية والفلزية المعدنية لن تتحلل إطلاقاً وتقاوم التآكل.'
                  },
                  {
                    id: 'q7',
                    num: '7',
                    question: 'أفسّر: لماذا تتحلل المواد النباتية أسرع من المواد الأخرى؟',
                    answer: 'لأنها مواد طبيعية حيوية تتكون من مركبات كربوهيدراتية وسليولوزية سهلة التفكيك والتغذية بالنسبة للكائنات الحية الدقيقة المحللة (البكتيريا والفطريات) المتواجدة طبيعياً في التربة الرطبة.'
                  },
                  {
                    id: 'q8',
                    num: '8',
                    question: 'أصنّف: صنف المواد إلى ملوثة للتربة وغير ملوثة لها.',
                    answer: '• غير ملوثة للتربة (قابلة للتحلل): قشور الخضار والفواكه، بقايا الخبز، وورق الجرائد.\n• ملوثة للتربة (مستديمة غير قابلة للتحلل): الأكياس والزجاجات البلاستيكية، المشابك الفلزية، ورقائق الألومنيوم.'
                  }
                ].map((q) => (
                  <div key={q.id} className="border border-slate-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => {
                        if (soundEnabled) soundEngine.playClick();
                        setActiveQuestion(activeQuestion === q.id as any ? null : q.id as any);
                      }}
                      className="w-full text-right p-3 bg-slate-950/50 hover:bg-slate-950 transition-all flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-slate-200 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-cyan-950 text-cyan-400 flex items-center justify-center text-[10px] font-mono border border-cyan-800/40">
                          {q.num}
                        </span>
                        {q.question}
                      </span>
                      <span className="text-cyan-400 font-bold ml-2">
                        {activeQuestion === q.id ? '▲' : '▼'}
                      </span>
                    </button>
                    {activeQuestion === q.id && (
                      <div className="p-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line animate-slide-down">
                        <p className="font-semibold text-cyan-400 mb-1">الجواب النموذجي:</p>
                        {q.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Parameters & Control Panel */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Parameters Control Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Thermometer className="w-4 h-4 text-cyan-400" />
                <span>تعديل المتغيرات البيئية وظروف التحلل:</span>
              </h3>

              {/* Model Choice */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 block">1. اختر نموذج الاستقصاء (ص 97):</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setModelType('organic');
                      onRunExperiment();
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-right flex items-center justify-between ${
                      modelType === 'organic'
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>نموذج (1): المواد الطبيعية 🍎</span>
                    <span className="text-[9px] opacity-60">قابلة للتحلل</span>
                  </button>

                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setModelType('synthetic');
                      onRunExperiment();
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-right flex items-center justify-between ${
                      modelType === 'synthetic'
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>نموذج (2): المواد الصناعية 🥤</span>
                    <span className="text-[9px] opacity-60">غير قابلة للتحلل</span>
                  </button>
                </div>
              </div>

              {/* Moisture Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-slate-400 block">2. درجة رطوبة التربة (ترطيب التربة بالماء):</label>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/40 px-2 rounded-full font-bold">
                    {moisture === 'dry' ? 'جافة 🏜️' : moisture === 'moist' ? 'رطبة ملائمة 💧' : 'مشبعة جداً 🌊'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'dry', name: 'جافة بالكامل' },
                    { id: 'moist', name: 'رطوبة ري معتدلة' },
                    { id: 'wet', name: 'مغمورة بالمياه' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        if (soundEnabled) soundEngine.playClick();
                        setMoisture(m.id as any);
                        onRunExperiment();
                      }}
                      className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all border ${
                        moisture === m.id
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-slate-400 block">3. درجة الحرارة (البيئة المحيطة بالقنينة):</label>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/40 px-2 rounded-full font-bold">
                    {temperature === 'cold' ? 'باردة (في الثلاجة) ❄️' : temperature === 'warm' ? 'دافئة (غرفة دافئة) ☀️' : 'حارة جداً 🔥'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cold', name: 'بيئة باردة' },
                    { id: 'warm', name: 'مكان دافئ ملائم' },
                    { id: 'hot', name: 'بيئة حارة مشمسة' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        if (soundEnabled) soundEngine.playClick();
                        setTemperature(t.id as any);
                        onRunExperiment();
                      }}
                      className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all border ${
                        temperature === t.id
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Foil Cover Switch */}
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-200">تغطية القنينة بورق ألومنيوم 🛡️</p>
                  <p className="text-[9px] text-slate-400">تحبس التغطية الرطوبة والحرارة وتهيئ بيئة معتمة للمحللات.</p>
                </div>
                <button
                  onClick={() => {
                    if (soundEnabled) soundEngine.playClick();
                    setIsCovered(!isCovered);
                    onRunExperiment();
                  }}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    isCovered ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    isCovered ? '-translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Time Simulation Range Slider */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-xs text-slate-300 font-bold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    مراقبة القنينة عبر الزمن:
                  </span>
                  <span className="font-mono text-cyan-400 bg-cyan-950/40 px-2 rounded-full">
                    {weeksPassed === 0 ? 'اليوم الأول' : weeksPassed === 1 ? 'بعد أسبوع واحد' : `بعد ${weeksPassed} أسابيع`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  value={weeksPassed}
                  onChange={(e) => {
                    setWeeksPassed(Number(e.target.value));
                    if (soundEnabled && Number(e.target.value) % 2 === 0) {
                      soundEngine.playClick();
                    }
                  }}
                  className="w-full accent-cyan-500 bg-slate-950 h-2.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 px-1 font-mono">
                  <span>أسبوع 0</span>
                  <span>أسبوع 2</span>
                  <span>أسبوع 4</span>
                  <span>أسبوع 6</span>
                  <span>أسبوع 8</span>
                </div>
              </div>

            </div>

            {/* Scientific Explanation & Conclusion (p97) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                <Leaf className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>النتيجة العلمية المستخلصة ص 97:</span>
              </h4>
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>
                  • <strong className="text-slate-200">التحلل الحيوي:</strong> يتم بواسطة فُطريات وبكتيريا التربة التي تتغذى على الفضلات العضوية وتفكك جزيئاتها المعقدة وتحولها لعناصر غذائية تغني التربة (صنع الكومبوست الطبيعي).
                </p>
                <p>
                  • <strong className="text-slate-200">أثر الملوثات:</strong> المواد مثل الأكياس البلاستيكية والعبوات المعدنية لا تتأثر بالبكتيريا، فتبقى في التربة لمئات السنين مما يعيق تهويتها ويسد مساماتها ويضر بالكائنات المفيدة وجذور النباتات.
                </p>

                {/* Educational Alert Box */}
                <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl text-[11px] text-amber-300/90 flex gap-2">
                  <span className="text-base select-none">💡</span>
                  <p>
                    <strong>توجيه تربوي:</strong> يمكنك حفظ نتائج هذا الاستكشاف العلمي في <strong>تقرير المعمل</strong> بالضغط على الزر الأزرق في الأعلى لإضافتها لدفترك المطبوع!
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
