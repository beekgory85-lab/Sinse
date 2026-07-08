import React, { useState } from 'react';
import { CellOrganelle, LabNote } from '../types';
import { CELL_ORGANELLES, CELL_SCIENTISTS, ORGAN_SYSTEMS } from '../data/labData';
import { 
  Dna, 
  Droplet, 
  Shield, 
  Zap, 
  Sun, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  BookmarkPlus, 
  Play, 
  ArrowLeftRight,
  Info,
  UserCheck,
  Activity,
  Pipette,
  Ruler,
  Clock,
  RotateCcw,
  Sparkles,
  Heart,
  Timer,
  Flame,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CellOrganellesProps {
  onSaveNote: (note: Omit<LabNote, 'id' | 'date'>) => void;
  onRunExperiment: () => void;
  soundEnabled: boolean;
}

type SolutionType = 'hypertonic' | 'isotonic' | 'hypotonic';
type Unit1SubTab = 'organelles_osmosis' | 'potato_osmosis' | 'slide_prep' | 'scientists' | 'organ_systems' | 'pulse_integration';

export const CellOrganelles: React.FC<CellOrganellesProps> = ({
  onSaveNote,
  onRunExperiment,
  soundEnabled
}) => {
  const [subTab, setSubTab] = useState<Unit1SubTab>('organelles_osmosis');

  // Organelles & Osmosis States
  const [cellType, setCellType] = useState<'plant' | 'animal'>('plant');
  const [selectedOrganelle, setSelectedOrganelle] = useState<CellOrganelle>(CELL_ORGANELLES[0]);
  const [solutionType, setSolutionType] = useState<SolutionType>('isotonic');
  
  // Potato Slices Activity Simulator States (Textbook Page 19)
  const [potatoTime, setPotatoTime] = useState<'0' | '15' | '24'>('0');

  // Slide Prep Simulator States
  const [prepStep, setPrepStep] = useState<number>(1);
  const [stainColor, setStainColor] = useState<'iodine' | 'methylene_blue'>('iodine');

  // Organ Systems Integration States
  const [activeSystem, setActiveSystem] = useState<string>(ORGAN_SYSTEMS[0].id);

  // Pulse & Body Systems Integration Activity States (Textbook Page 26)
  const [pulseState, setPulseState] = useState<'rest' | 'walk' | 'run'>('rest');
  const [stopwatchSec, setStopwatchSec] = useState<number>(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState<boolean>(false);
  const [showRulerOverlay, setShowRulerOverlay] = useState<boolean>(false);

  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Lesson 1 - Microscope & Cell Theory States (Jordan Science Textbook)
  const [lessonSubTab, setLessonSubTab] = useState<'anatomy' | 'theory' | 'components' | 'types'>('anatomy');
  const [selectedPart, setSelectedPart] = useState<string>('eyepiece');
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string | null}>({});
  const [quizResults, setQuizResults] = useState<{[key: string]: boolean | null}>({});

  // Stopwatch effect for Page 26 activity
  React.useEffect(() => {
    let timer: any;
    if (isStopwatchRunning && stopwatchSec < 60) {
      timer = setInterval(() => {
        setStopwatchSec((prev) => prev + 1);
      }, 1000);
    } else if (stopwatchSec >= 60) {
      setIsStopwatchRunning(false);
    }
    return () => clearInterval(timer);
  }, [isStopwatchRunning, stopwatchSec]);

  // Potato slice dimensions based on time
  const getPotatoDiameter = (time: '0' | '15' | '24', type: 'fresh' | 'salty') => {
    if (time === '0') return 40; // Initial diameter = 40 mm (4.0 cm)
    if (type === 'fresh') {
      return time === '15' ? 43 : 46; // Expands in fresh water
    } else {
      return time === '15' ? 36 : 32; // Shrinks in salty water
    }
  };

  const handlePotatoTimeChange = (time: '0' | '15' | '24') => {
    if (soundEnabled) soundEngine.playWaterSplash();
    setPotatoTime(time);
    onRunExperiment();
  };

  const handlePulseStateChange = (state: 'rest' | 'walk' | 'run') => {
    if (soundEnabled) soundEngine.playClick();
    setPulseState(state);
    setStopwatchSec(0);
    setIsStopwatchRunning(false);
    onRunExperiment();
  };

  const filteredOrganelles = CELL_ORGANELLES.filter(o => {
    if (cellType === 'plant') return o.foundIn === 'both' || o.foundIn === 'plant_only';
    return o.foundIn === 'both' || o.foundIn === 'animal_only';
  });

  const handleCellTypeChange = (type: 'plant' | 'animal') => {
    if (soundEnabled) soundEngine.playClick();
    setCellType(type);
    setIsSaved(false);
  };

  const handleSolutionChange = (sol: SolutionType) => {
    if (soundEnabled) soundEngine.playWaterSplash();
    setSolutionType(sol);
    setIsSaved(false);
    onRunExperiment();
  };

  const handleSaveObservation = () => {
    if (soundEnabled) soundEngine.playSuccess();

    let titleStr = '';
    let contentStr = '';
    let conclusionStr = '';

    if (subTab === 'organelles_osmosis') {
      titleStr = `تجربة التركيب الخلوي والتناضح (${cellType === 'plant' ? 'خلية نباتية' : 'خلية حيوانية'})`;
      contentStr = `العضية: ${selectedOrganelle.nameAr}. المحلول: ${solutionType}.`;
      conclusionStr = 'الغشاء البلازمي ينظم مرور المواد بالخاصية الاسموزية.';
    } else if (subTab === 'potato_osmosis') {
      const freshD = getPotatoDiameter(potatoTime, 'fresh');
      const saltyD = getPotatoDiameter(potatoTime, 'salty');
      titleStr = 'نشاط: لماذا يتغير قطر شرائح البطاطا؟ (الخاصية الاسموزية)';
      contentStr = `مدة الغمر المختارة: ${potatoTime === '0' ? 'بداية التجربة (0 min)' : potatoTime === '15' ? 'بعد 15 دقيقة' : 'بعد 24 ساعة'}. قطر شريحة الماء العذب: ${freshD} مم (الاصلي 40 مم). قطر شريحة الماء المالح: ${saltyD} مم (الاصلي 40 مم).`;
      conclusionStr = 'انتقلت جزيئات الماء بالخاصية الاسموزية من الكأس ذو تركيز المذاب المنخفض (الماء العذب) إلى داخل خلايا البطاطا فانتفخت وارتفع قطرها، بينما خرج الماء من خلايا البطاطا إلى الكأس ذو التركيز المرتفع (الماء المالح) فانكمشت وقل قطرها.';
    } else if (subTab === 'pulse_integration') {
      titleStr = 'نشاط: تكامل أجهزة الجسم (قياس النبض والجري) - ص 26';
      contentStr = `الحالة المحددة: ${pulseState === 'rest' ? 'الوضع الطبيعي / الراحة (72 نبضة/دقيقة)' : pulseState === 'walk' ? 'بعد المشي لمدة دقيقة (95 نبضة/دقيقة)' : 'بعد الجري في المكان لمدة دقيقة (138 نبضة/دقيقة)'}. مؤشر توقيت القياس: ${stopwatchSec} ثانية.`;
      conclusionStr = 'يتكامل جهاز الدوران والجهاز العضلي والتنفسي؛ فعند زيادة المجهود البدني تزداد حاجة العضلات للأكسجين والغذاء، فيزداد معدل نبضات القلب ومعدل التنفس لتلبية احتياجات الجسم.';
    } else if (subTab === 'slide_prep') {
      titleStr = 'تجربة إعداد الشريحة المجهرية وتثبيتها بالصبغة';
      contentStr = `خطوة التحضير: ${prepStep}/4. الصبغة المستخدمة: ${stainColor === 'iodine' ? 'صيغ اليود للخلية النباتية' : 'أزرق الميثيلين للخلية الحيوانية'}.`;
      conclusionStr = 'تساعد الصبغات المجهرية على توضيح تراكيب الخلية والنواة أثناء الفحص.';
    } else if (subTab === 'scientists') {
      titleStr = 'دراسة تاريخ اكتشاف الخلية والنظرية الخلوية';
      contentStr = 'دراسة مساهمات هوك وليفينهوك وشلايدن وشوان في النظرية الخلوية.';
      conclusionStr = 'جميع الكائنات الحية تتكون من خلية واحدة أو أكثر والخلية وحدة البناء والوظيفة.';
    } else {
      titleStr = 'تجربة الأنسجة وتكامل أجهزة جسم الكائن الحي';
      contentStr = `الجهاز المفحوص: ${ORGAN_SYSTEMS.find(s => s.id === activeSystem)?.nameAr}.`;
      conclusionStr = 'تتآزر الخلايا والأنسجة والأعضاء لتكوين جهاز حيوي مكتمل يعمل بانسجام.';
    }

    onSaveNote({
      title: titleStr,
      experimentName: 'الوحدة الأولى: تجارب الخلية والأجهزة الحية',
      category: 'biology',
      hypothesis: 'دراسة تراكيب الخلية، الخاصية الاسموزية في شرائح البطاطا، خطواط تحضير الشريحة، وتكامل الأنسجة.',
      content: contentStr,
      conclusion: conclusionStr
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
            <Dna className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">الوحدة الأولى: تجارب الخلية والأجهزة الحية</h2>
            <p className="text-xs text-slate-400">إعداد الشرائح، المجهر، العضيات، العلماء، الأنسجة، التناضح، وتكامل الأجهزة</p>
          </div>
        </div>

        <button
          onClick={handleSaveObservation}
          disabled={isSaved}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            isSaved
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
          }`}
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
          <span>{isSaved ? 'تم الحفظ في التقرير' : 'حفظ نتائج التجربة'}</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs for Unit 1 */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('organelles_osmosis');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'organelles_osmosis'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          1. العضيات والخلايا والتناضح 🧬
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('potato_osmosis');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'potato_osmosis'
              ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/50'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          2. نشاط: تغير قطر شرائح البطاطا 🥔
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('slide_prep');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'slide_prep'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          3. إعداد مقاطع الشرائح 🔬
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('scientists');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'scientists'
              ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/50'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          4. الدرس الأول: المجهر ونظرية الخلية 📖
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('organ_systems');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'organ_systems'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          5. أجهزة جسم الكائن الحي 🫀
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('pulse_integration');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'pulse_integration'
              ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/50'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          6. نشاط: قياس النبض وتكامل الأجهزة ⏱️ (ص 26)
        </button>
      </div>

      {subTab === 'organelles_osmosis' && (
        /* MAIN ORGANELLES & OSMOSIS SIMULATOR */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-slate-100">نوع الخلية المعروضة:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCellTypeChange('plant')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      cellType === 'plant'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    خلية نباتية 🌿
                  </button>
                  <button
                    onClick={() => handleCellTypeChange('animal')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      cellType === 'animal'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    خلية حيوانية 🐾
                  </button>
                </div>
              </div>

              <div className="relative w-full h-72 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden flex items-center justify-center">
                <div 
                  className={`transition-all duration-500 flex flex-col items-center justify-center relative p-6 border-4 ${
                    cellType === 'plant'
                      ? 'rounded-2xl border-emerald-500 bg-emerald-950/20'
                      : 'rounded-full border-blue-500 bg-blue-950/20'
                  } ${
                    solutionType === 'hypertonic'
                      ? 'scale-75 opacity-80 border-dashed'
                      : solutionType === 'hypotonic'
                      ? 'scale-110 border-emerald-400'
                      : 'scale-95'
                  }`}
                  style={{ width: cellType === 'plant' ? '80%' : '65%', height: '80%' }}
                >
                  <div className="text-center space-y-2 z-10">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/30 border border-cyan-400 mx-auto flex items-center justify-center text-cyan-300 font-bold text-xs shadow-lg animate-pulse">
                      النواة
                    </div>
                    <p className="text-[10px] text-slate-300 font-mono">
                      {cellType === 'plant' ? 'جدار سليلوزي غشائي' : 'غشاء بلازمي مرن'}
                    </p>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-50">
                    <Droplet className={`w-4 h-4 text-sky-400 ${solutionType === 'hypertonic' ? 'animate-bounce' : 'animate-pulse'}`} />
                    <Droplet className={`w-4 h-4 text-sky-400 ${solutionType === 'hypotonic' ? 'animate-bounce' : 'animate-pulse'}`} />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg text-[11px] text-cyan-400 font-mono">
                  حالة الخلية: {solutionType === 'hypertonic' ? 'انكماش (Shrunk)' : solutionType === 'hypotonic' ? 'انتفاخ (Turgid)' : 'توازن طبيعي (Normal)'}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-sky-400" />
                <span>محاكاة المحاليل التناضحية (Osmotic Solutions):</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleSolutionChange('hypertonic')}
                  className={`p-3 rounded-xl border text-right transition-all text-xs space-y-1 ${
                    solutionType === 'hypertonic'
                      ? 'bg-amber-950/80 border-amber-500 text-amber-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <p className="font-semibold">محلول مفرط التركيز</p>
                  <p className="text-[10px] opacity-80">يخرج الماء من الخلية فتنكمش</p>
                </button>

                <button
                  onClick={() => handleSolutionChange('isotonic')}
                  className={`p-3 rounded-xl border text-right transition-all text-xs space-y-1 ${
                    solutionType === 'isotonic'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <p className="font-semibold">محلول متساوي التركيز</p>
                  <p className="text-[10px] opacity-80">معدل دخول وخروج الماء متساوي</p>
                </button>

                <button
                  onClick={() => handleSolutionChange('hypotonic')}
                  className={`p-3 rounded-xl border text-right transition-all text-xs space-y-1 ${
                    solutionType === 'hypotonic'
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <p className="font-semibold">محلول منخفض التركيز</p>
                  <p className="text-[10px] opacity-80">يدخل الماء الخلية فتنتفخ</p>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-400" />
                <span>العضيات الخلوية (Organelles):</span>
              </h3>

              <div className="grid grid-cols-1 gap-2">
                {filteredOrganelles.map((organelle) => (
                  <button
                    key={organelle.id}
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setSelectedOrganelle(organelle);
                    }}
                    className={`p-3 rounded-xl border text-right transition-all text-xs flex items-center justify-between ${
                      selectedOrganelle.id === organelle.id
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{organelle.nameAr}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{organelle.nameEn}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold">
                  <Dna className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-base">{selectedOrganelle.nameAr}</h4>
                  <p className="text-xs text-emerald-400 font-mono">{selectedOrganelle.nameEn}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedOrganelle.functionAr}
              </p>

              <div className="pt-2 text-[11px] text-slate-400 font-mono">
                التواجد: {selectedOrganelle.foundIn === 'both' ? 'في الخلايا النباتية والحيوانية' : 'تقتصر على الخلايا النباتية فقط'}
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'potato_osmosis' && (
        /* POTATO SLICES OSMOSIS ACTIVITY SIMULATOR (Textbook Page 19) */
        <div className="space-y-6 animate-fade-in">
          
          {/* Top Info Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                    نشاط الصف السادس - ص 19
                  </span>
                  <h3 className="text-base font-bold text-slate-100">نشاط: لماذا يتغير قطر شرائح البطاطا؟ 🥔</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  استكشاف تأثير الخاصية الاسموزية في الخلايا النباتية عند وضع شرائح البطاطا في ماء عذب مقابل ماء مالح.
                </p>
              </div>

              {/* Time Duration Toggle */}
              <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <Clock className="w-4 h-4 text-emerald-400 mr-1" />
                <span className="text-xs text-slate-300 font-bold hidden sm:inline">مدة الغمر:</span>
                <button
                  onClick={() => handlePotatoTimeChange('0')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    potatoTime === '0'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  البداية (0 min)
                </button>
                <button
                  onClick={() => handlePotatoTimeChange('15')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    potatoTime === '15'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  بعد 15 min
                </button>
                <button
                  onClick={() => handlePotatoTimeChange('24')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    potatoTime === '24'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  بعد 24 h
                </button>
              </div>
            </div>

            {/* Tools Inventory badges */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
              <span className="font-bold text-slate-400">المواد والأدوات المستخدمة:</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">🥔 حبة بطاطا صغيرة</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">🔪 سكين ومسطرة</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">🧪 كأسان مع غطاءين</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">💧 ماء عذب</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">🧂 ملح طعام (ملعقتين)</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">📄 ورق أبيض وقلم</span>
            </div>
          </div>

          {/* Interactive Beakers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Fresh Water Beaker (الكأس الأولى: ماء عذب) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">الكأس الأولى: [ماء عذب]</h4>
                    <p className="text-[11px] text-sky-400">محلول منخفض التركيز بالمذابات (Hypotonic)</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-sky-950 border border-sky-800 text-sky-300">
                  القطر: {getPotatoDiameter(potatoTime, 'fresh')} مم
                </span>
              </div>

              {/* Beaker Graphic */}
              <div className="relative w-full h-56 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-end p-4 overflow-hidden">
                {/* Lid Cover */}
                <div className="absolute top-4 w-36 h-2 bg-slate-700 rounded-full border border-slate-500 z-20 shadow-md"></div>
                
                {/* Water Body */}
                <div className="w-32 h-40 bg-sky-500/20 border-2 border-t-0 border-sky-500/50 rounded-b-2xl relative flex items-center justify-center overflow-hidden">
                  {/* Floating Water Particles */}
                  <div className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-40">
                    <Droplet className="w-3 h-3 text-sky-300 animate-bounce" />
                    <Droplet className="w-3 h-3 text-sky-300 animate-pulse" />
                  </div>

                  {/* Potato Slice inside Beaker */}
                  <div 
                    className="rounded-full bg-amber-600/90 border-2 border-amber-300 shadow-lg transition-all duration-700 flex items-center justify-center text-[10px] font-bold text-slate-900"
                    style={{ 
                      width: `${getPotatoDiameter(potatoTime, 'fresh') * 1.8}px`, 
                      height: `${getPotatoDiameter(potatoTime, 'fresh') * 1.8}px` 
                    }}
                  >
                    {getPotatoDiameter(potatoTime, 'fresh')}mm
                  </div>
                </div>

                {/* Beaker Label Tape */}
                <div className="absolute bottom-2 bg-amber-100 text-slate-950 px-3 py-0.5 rounded text-[10px] font-bold font-mono border border-amber-300 shadow-sm">
                  لاصق: ماء عذب
                </div>
              </div>

              {/* Status Note */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs space-y-1">
                <span className="font-bold text-sky-400">حالة الشريحة:</span>
                <p className="text-slate-300">
                  {potatoTime === '0' && 'قطر ابتدائي مقتطع بسُمك متطابق (40 مم). قوام طبيعي.'}
                  {potatoTime === '15' && 'يمتص خلايا البطاطا الماء بالخاصية الاسموزية ➔ انتفاخ الشريحة إلى 43 مم وتحول قوامها إلى مشدود وقاسي.'}
                  {potatoTime === '24' && 'امتصاص أقصى للماء بالخاصية الاسموزية ➔ وصول القطر إلى 46 مم (+6 مم) والشريحة متصلبة ومشدودة للغاية.'}
                </p>
              </div>
            </div>

            {/* Salty Water Beaker (الكأس الثانية: ماء مالح) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">الكأس الثانية: [ماء مالح]</h4>
                    <p className="text-[11px] text-amber-400">محلول مرتفع التركيز (2 ملعقة ملح - Hypertonic)</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-950 border border-amber-800 text-amber-300">
                  القطر: {getPotatoDiameter(potatoTime, 'salty')} مم
                </span>
              </div>

              {/* Beaker Graphic */}
              <div className="relative w-full h-56 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-end p-4 overflow-hidden">
                {/* Lid Cover */}
                <div className="absolute top-4 w-36 h-2 bg-slate-700 rounded-full border border-slate-500 z-20 shadow-md"></div>
                
                {/* Water Body with Salt Grains */}
                <div className="w-32 h-40 bg-amber-500/20 border-2 border-t-0 border-amber-500/50 rounded-b-2xl relative flex items-center justify-center overflow-hidden">
                  {/* Salt Grains Graphic */}
                  <div className="absolute bottom-1 inset-x-0 flex justify-center gap-1 opacity-60">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>

                  {/* Potato Slice inside Beaker */}
                  <div 
                    className="rounded-full bg-amber-700/80 border-2 border-dashed border-amber-400 shadow-lg transition-all duration-700 flex items-center justify-center text-[10px] font-bold text-slate-100"
                    style={{ 
                      width: `${getPotatoDiameter(potatoTime, 'salty') * 1.8}px`, 
                      height: `${getPotatoDiameter(potatoTime, 'salty') * 1.8}px` 
                    }}
                  >
                    {getPotatoDiameter(potatoTime, 'salty')}mm
                  </div>
                </div>

                {/* Beaker Label Tape */}
                <div className="absolute bottom-2 bg-amber-100 text-slate-950 px-3 py-0.5 rounded text-[10px] font-bold font-mono border border-amber-300 shadow-sm">
                  لاصق: ماء مالح
                </div>
              </div>

              {/* Status Note */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs space-y-1">
                <span className="font-bold text-amber-400">حالة الشريحة:</span>
                <p className="text-slate-300">
                  {potatoTime === '0' && 'قطر ابتدائي مقتطع بسُمك متطابق (40 مم). قوام طبيعي.'}
                  {potatoTime === '15' && 'يفقد خلايا البطاطا الماء بالاسموزية إلى المحلول المالح ➔ انكماش الشريحة إلى 36 مم وتحول قوامها إلى طري ولين.'}
                  {potatoTime === '24' && 'فقدان شديد للماء بالخاصية الاسموزية ➔ انكماش القطر إلى 32 مم (-8 مم) والشريحة رخوة ومرنة جافة جداً.'}
                </p>
              </div>
            </div>

          </div>

          {/* Paper Circle Drawing & Ruler Test Platform */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-slate-100 text-sm">
                  قياس فرق القطر بالمسطرة فوق ورقة الرسم البيضاء (مقارنة الدائرة الأصلية والدائرة الجديدة)
                </h4>
              </div>
              <button
                onClick={() => setShowRulerOverlay(!showRulerOverlay)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700 flex items-center gap-1.5"
              >
                <Ruler className="w-3.5 h-3.5 text-emerald-400" />
                <span>{showRulerOverlay ? 'إخفاء المسطرة التفاعلية' : 'إظهار المسطرة التفاعلية'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 border border-slate-800 p-6 rounded-xl">
              
              {/* Paper Comparison 1: Fresh Water */}
              <div className="bg-amber-50/95 text-slate-900 p-5 rounded-xl space-y-3 relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2 text-xs font-bold">
                  <span>شريحة الماء العذب</span>
                  <span className="text-emerald-700 font-mono">القطر الحالي: {getPotatoDiameter(potatoTime, 'fresh')} mm</span>
                </div>

                <div className="relative w-full h-44 bg-white rounded-lg border border-amber-200 flex items-center justify-center overflow-hidden">
                  {/* Ruler Graphic Overlay */}
                  {showRulerOverlay && (
                    <div className="absolute top-2 inset-x-4 h-6 border-b border-slate-400 flex justify-between text-[8px] font-mono text-slate-600">
                      <span>0mm</span>
                      <span>10mm</span>
                      <span>20mm</span>
                      <span>30mm</span>
                      <span>40mm</span>
                      <span>50mm</span>
                    </div>
                  )}

                  {/* Original Drawn Circle (40mm) */}
                  <div 
                    className="absolute rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center text-[9px] text-slate-400 font-bold"
                    style={{ width: '120px', height: '120px' }}
                  >
                    الدائرة الأصلية (40mm)
                  </div>

                  {/* New Circle After Immersion */}
                  <div 
                    className="rounded-full border-2 border-emerald-600 bg-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-950 shadow-md transition-all duration-500 z-10"
                    style={{ 
                      width: `${getPotatoDiameter(potatoTime, 'fresh') * 3}px`, 
                      height: `${getPotatoDiameter(potatoTime, 'fresh') * 3}px` 
                    }}
                  >
                    {getPotatoDiameter(potatoTime, 'fresh')}mm
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-700 flex justify-between">
                  <span>التغير في القطر:</span>
                  <span className="font-bold text-emerald-700">
                    +{getPotatoDiameter(potatoTime, 'fresh') - 40} mm ({getPotatoDiameter(potatoTime, 'fresh') > 40 ? 'زيادة / انتفاخ' : 'لا تغير'})
                  </span>
                </div>
              </div>

              {/* Paper Comparison 2: Salty Water */}
              <div className="bg-amber-50/95 text-slate-900 p-5 rounded-xl space-y-3 relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2 text-xs font-bold">
                  <span>شريحة الماء المالح</span>
                  <span className="text-amber-800 font-mono">القطر الحالي: {getPotatoDiameter(potatoTime, 'salty')} mm</span>
                </div>

                <div className="relative w-full h-44 bg-white rounded-lg border border-amber-200 flex items-center justify-center overflow-hidden">
                  {/* Ruler Graphic Overlay */}
                  {showRulerOverlay && (
                    <div className="absolute top-2 inset-x-4 h-6 border-b border-slate-400 flex justify-between text-[8px] font-mono text-slate-600">
                      <span>0mm</span>
                      <span>10mm</span>
                      <span>20mm</span>
                      <span>30mm</span>
                      <span>40mm</span>
                      <span>50mm</span>
                    </div>
                  )}

                  {/* Original Drawn Circle (40mm) */}
                  <div 
                    className="absolute rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center text-[9px] text-slate-400 font-bold"
                    style={{ width: '120px', height: '120px' }}
                  >
                    الدائرة الأصلية (40mm)
                  </div>

                  {/* New Circle After Immersion */}
                  <div 
                    className="rounded-full border-2 border-amber-600 bg-amber-500/30 flex items-center justify-center text-xs font-bold text-amber-950 shadow-md transition-all duration-500 z-10"
                    style={{ 
                      width: `${getPotatoDiameter(potatoTime, 'salty') * 3}px`, 
                      height: `${getPotatoDiameter(potatoTime, 'salty') * 3}px` 
                    }}
                  >
                    {getPotatoDiameter(potatoTime, 'salty')}mm
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-700 flex justify-between">
                  <span>التغير في القطر:</span>
                  <span className="font-bold text-red-700">
                    {getPotatoDiameter(potatoTime, 'salty') - 40} mm ({getPotatoDiameter(potatoTime, 'salty') < 40 ? 'نقصان / انكماش' : 'لا تغير'})
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Scientific Interpretation & Inference (أسئلة التحليل والاستدلال من الكتاب) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Q7: أُفسر (Interpret) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>أُفسر: سبب أي تغيرات طرأت على قطري الشريحتين</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                • <strong className="text-sky-400">شريحة الماء العذب:</strong> ازداد قطرها بسبب دخول جزيئات الماء إلى خلايا البطاطا بالخاصية الاسموزية نظراً لأن تركيز المادة المذابة داخل خلايا البطاطا أعلى من تركيز الماء العذب خارجها، مما أدى لانتفاخ الخلايا وتمدد جدارها الخلوي.<br />
                • <strong className="text-amber-400">شريحة الماء المالح:</strong> تناقص قطرها وانكمشت بسبب خروج جزيئات الماء من داخل خلايا البطاطا إلى المحلول المالح الخارجي مفرط التركيز.
              </p>
            </div>

            {/* Q8: أستدل (Infer) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Dna className="w-4 h-4" />
                <span>أستدل: آلية النقل المسؤولة عن هذا التغير</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                آلية النقل المسؤولة هي <strong className="text-emerald-400 font-mono">الخاصية الاسموزية (Osmosis)</strong>: وهي الحركة التلقائية لجزيئات الماء عبر الغشاء البلازمي شبه المنفذ من المنطقة الأقل تركيزاً بالمواد المذابة (الماء العذب) إلى المنطقة الأكثر تركيزاً بها (الماء المالح).
              </p>
            </div>

          </div>

        </div>
      )}

      {subTab === 'slide_prep' && (
        /* SLIDE PREPARATION SIMULATOR */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <Pipette className="w-5 h-5 text-emerald-400" />
              <span>خطوات إعداد شريحة مجهرية زجاجية مثبتة بالصبغة</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">الخطوة {prepStep} من 4</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {[
              { step: 1, title: '1. أخذ العينة', desc: 'نزع غشاء غضروفي شفاف من بشرة البصل بالملقط.' },
              { step: 2, title: '2. إضافة قطرة ماء/صبغة', desc: 'إضافة قطرة من صبغة اليود أو أزرق الميثيلين.' },
              { step: 3, title: '3. وضع غطاء الشريحة', desc: 'إنزال الساتر الزجاجي بزاوية 45 درجة لتجنب الفقاعات.' },
              { step: 4, title: '4. تجفيف الزوائد', desc: 'سحب الصبغة الزائدة بقطعة ورق ترشيح للرؤية النظيفة.' }
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setPrepStep(s.step);
                }}
                className={`p-4 rounded-2xl border text-right transition-all text-xs space-y-2 ${
                  prepStep === s.step
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <p className="text-sm">{s.title}</p>
                <p className="text-[11px] opacity-80 leading-relaxed">{s.desc}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="w-64 h-32 mx-auto bg-slate-900 border-2 border-emerald-500/50 rounded-xl relative flex items-center justify-center">
              <div className={`w-24 h-16 rounded transition-all duration-300 border ${
                stainColor === 'iodine' ? 'bg-amber-500/30 border-amber-400' : 'bg-blue-500/30 border-blue-400'
              } flex items-center justify-center font-mono text-xs text-slate-100`}>
                شريحة مثبتة ✅
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setStainColor('iodine')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${stainColor === 'iodine' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
              >
                صبغة اليود (للخلية النباتية)
              </button>
              <button
                onClick={() => setStainColor('methylene_blue')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${stainColor === 'methylene_blue' ? 'bg-blue-500 text-slate-950 border-blue-400' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
              >
                صبغة أزرق الميثيلين (للخلية الحيوانية)
              </button>
            </div>
          </div>
        </div>
      )}

      {subTab === 'scientists' && (
        /* LESSON 1: MICROSCOPE & CELL THEORY (Jordan Science Textbook) */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold">
                مقرر الصف السادس - الدرس الأول
              </span>
              <h3 className="font-bold text-slate-100 text-base mt-1 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <span>الدرس الأول: المجهر الضوئي ونظرية الخلية وتصنيفها</span>
              </h3>
            </div>
            {/* Inner Tabs for Lesson 1 */}
            <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {[
                { id: 'anatomy', label: 'أجزاء المجهر 🔬' },
                { id: 'theory', label: 'نظرية الخلية 📜' },
                { id: 'components', label: 'مكونات الخلية 🧬' },
                { id: 'types', label: 'أنواع الخلايا 🦠' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (soundEnabled) soundEngine.playClick();
                    setLessonSubTab(tab.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    lessonSubTab === tab.id
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content 1: Microscope Anatomy */}
          {lessonSubTab === 'anatomy' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
                <span className="font-bold text-cyan-400">شرح أجزاء المجهر الضوئي الحديث (صفحة 11):</span> انقر على الأرقام التفاعلية أو أسماء الأجزاء في القائمة بالأسفل لرؤية الاسم العلمي والتعريف الدقيق والوظيفة من كتاب العلوم المدرسي.
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Interactive SVG Diagram */}
                <div className="lg:col-span-6 bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[380px]">
                  
                  {/* Microscope SVG Body */}
                  <svg viewBox="0 0 300 300" className="w-full max-w-[280px] h-auto text-slate-400 drop-shadow-xl select-none" fill="currentColor">
                    {/* Eyepiece Tube */}
                    <path d="M140,40 L160,40 L160,70 L140,70 Z" fill="#475569" />
                    <rect x="135" y="25" width="30" height="15" rx="2" fill="#1e293b" />
                    <circle cx="150" cy="25" r="8" fill="#38bdf8" opacity="0.6" />
                    
                    {/* Arm */}
                    <path d="M160,70 C190,110 200,160 180,210 L165,210 C185,160 175,110 150,85 Z" fill="#64748b" />
                    
                    {/* Revolving Nosepiece */}
                    <ellipse cx="150" cy="90" rx="20" ry="10" fill="#334155" />
                    {/* Objectives */}
                    <rect x="135" y="100" width="10" height="25" rx="1" fill="#94a3b8" />
                    <rect x="155" y="100" width="12" height="20" rx="1" fill="#cbd5e1" />
                    <rect x="145" y="100" width="8" height="15" rx="1" fill="#475569" />
                    
                    {/* Stage */}
                    <rect x="90" y="130" width="110" height="10" rx="2" fill="#1e293b" />
                    <polygon points="120,130 130,120 170,120 180,130" fill="#0f172a" />
                    
                    {/* Stage Condenser / Light source beam */}
                    <polygon points="140,240 145,140 155,140 160,240" fill="#eab308" opacity="0.15" />
                    
                    {/* Knobs */}
                    <circle cx="185" cy="180" r="14" fill="#334155" />
                    <circle cx="185" cy="180" r="8" fill="#475569" />
                    <circle cx="185" cy="180" r="12" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
                    
                    {/* Fine Knob */}
                    <circle cx="185" cy="205" r="8" fill="#1e293b" />
                    <circle cx="185" cy="205" r="4" fill="#64748b" />

                    {/* Light Source */}
                    <rect x="138" y="225" width="24" height="15" rx="4" fill="#475569" />
                    <circle cx="150" cy="225" r="6" fill="#fef08a" />
                    
                    {/* Base */}
                    <path d="M100,240 L200,240 C210,240 210,260 200,260 L100,260 C90,260 90,240 100,240 Z" fill="#1e293b" />
                    <rect x="140" y="210" width="20" height="30" fill="#334155" />
                  </svg>

                  {/* Pulsing Hotspots over Microscope Parts */}
                  {[
                    { id: 'eyepiece', cx: '142px', cy: '25px', label: '1' },
                    { id: 'arm', cx: '175px', cy: '110px', label: '2' },
                    { id: 'objectives', cx: '142px', cy: '105px', label: '3' },
                    { id: 'stage', cx: '105px', cy: '135px', label: '4' },
                    { id: 'coarse_focus', cx: '202px', cy: '172px', label: '5' },
                    { id: 'fine_focus', cx: '198px', cy: '202px', label: '6' },
                    { id: 'light', cx: '142px', cy: '225px', label: '7' }
                  ].map((pt) => (
                    <button
                      key={pt.id}
                      onClick={() => {
                        if (soundEnabled) soundEngine.playClick();
                        setSelectedPart(pt.id);
                      }}
                      className={`absolute w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-300 ${
                        selectedPart === pt.id
                          ? 'bg-cyan-500 text-slate-950 border-cyan-300 scale-125 z-20 shadow-lg shadow-cyan-500/30'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                      style={{ left: pt.cx, top: pt.cy }}
                    >
                      <span className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping opacity-60 pointer-events-none" />
                      {pt.label}
                    </button>
                  ))}
                </div>

                {/* Description and selection details */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold block">
                      الجزء المحدد بالتجربة:
                    </span>
                    
                    {(() => {
                      const partInfo = [
                        { id: 'eyepiece', num: '1', name: 'العدسة العينية', desc: 'عدسة عينية لها قوة تكبير، وتستخدم لمشاهدة العينة التي على الشريحة الزجاجية بوضوح.' },
                        { id: 'arm', num: '2', name: 'الذراع', desc: 'جزء متين ومنحنٍ من المجهر يُسخدم لحمل المجهر ونقله بشكل آمن من مكان لآخر.' },
                        { id: 'objectives', num: '3', name: 'العدسات الشيئية', desc: 'مجموعة من العدسات مثبتة على قرص دوار متحرك، لكل منها قوة تكبير معينة (مثل 4x, 10x, 40x, 100x) لفحص العينة.' },
                        { id: 'stage', num: '4', name: 'المنضدة (المسرح)', desc: 'سطح مستوٍ توضع عليه الشريحة الزجاجية المحتوية على العينة المراد دراستها، وبها فتحة يمر الضوء من خلالها.' },
                        { id: 'coarse_focus', num: '5', name: 'الضابط الكبير', desc: 'مقبض دوار كبير يُستخدم لتحريك المنضدة للأعلى والأسفل لتركيز الضوء والوصول للبعد البؤري العام للعينة.' },
                        { id: 'fine_focus', num: '6', name: 'الضابط الصغير', desc: 'مقبض دوار صغير يُسخدم للضبط البؤري الدقيق جداً لتوضيح المعالم الدقيقة والتفاصيل الخلوية الصغيرة بعد الضابط الكبير.' },
                        { id: 'light', num: '7', name: 'مصدر الإضاءة (المصباح)', desc: 'مصباح كهربائي مثبت في القاعدة يوفر الإضاءة اللازمة لاختراق العينة الرقيقة والصعود لعدسات الفحص.' }
                      ].find(p => p.id === selectedPart);

                      if (!partInfo) return null;

                      return (
                        <div className="space-y-3 animate-fade-in">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold text-sm">
                              {partInfo.num}
                            </span>
                            <h4 className="font-extrabold text-slate-100 text-base">{partInfo.name}</h4>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/60">
                            {partInfo.desc}
                          </p>
                        </div>
                      );
                    })()}
                  </div>

                  {/* List of elements for mobile-friendliness */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'eyepiece', name: '1. العدسة العينية' },
                      { id: 'arm', name: '2. الذراع' },
                      { id: 'objectives', name: '3. العدسات الشيئية' },
                      { id: 'stage', name: '4. المنضدة' },
                      { id: 'coarse_focus', name: '5. الضابط الكبير' },
                      { id: 'fine_focus', name: '6. الضابط الصغير' },
                      { id: 'light', name: '7. مصدر الإضاءة' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => {
                          if (soundEnabled) soundEngine.playClick();
                          setSelectedPart(btn.id);
                        }}
                        className={`p-2.5 rounded-xl text-right text-xs font-semibold border transition-all ${
                          selectedPart === btn.id
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {btn.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Cell Theory */}
          {lessonSubTab === 'theory' && (
            <div className="space-y-6">
              {/* Introduction */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-400">تطور نظرية الخلية (صفحة 11-12):</span> ساعد تطور صناعة المجاهر العلماء على اكتشاف الخلية وتفاصيلها. ومن خلال أبحاثهم وصياغاتهم المستمرة، تم التوصل لنظرية شاملة ومقرة عالمياً.
              </div>

              {/* The Three Main Principles of Cell Theory */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-100 text-xs text-center border-b border-slate-800 pb-2">
                  📜 البنود الثلاثة الرئيسية لنظرية الخلية (المقررة ص 12)
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { num: 'البند الأول', text: 'الخلية هي الوحدة الأساسية في تركيب أجسام الكائنات الحية كافة.', bg: 'bg-emerald-950/40 border-emerald-800 text-emerald-300' },
                    { num: 'البند الثاني', text: 'تتكون جميع الكائنات الحية من خلية واحدة أو أكثر (وحيدة الخلية أو عديدة الخلايا).', bg: 'bg-cyan-950/40 border-cyan-800 text-cyan-300' },
                    { num: 'البند الثالث', text: 'تنتج كل خلية من خلايا أخرى مماثلة لها بعملية حيوية تُسمى الانقسام الخلوي.', bg: 'bg-amber-950/40 border-amber-800 text-amber-300' }
                  ].map((rule, i) => (
                    <div key={i} className={`p-5 rounded-2xl border text-center space-y-2.5 flex flex-col items-center justify-center ${rule.bg}`}>
                      <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-bold">
                        {rule.num}
                      </span>
                      <p className="text-xs font-bold leading-relaxed">{rule.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historical Timeline of Scientists */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-100 text-xs">
                  ⏱️ التسلسل التاريخي لرواد صياغة نظرية الخلية (ص 11-12)
                </h4>

                <div className="relative border-r-2 border-slate-800 mr-4 pr-6 space-y-5">
                  {[
                    { year: '1665 م', name: 'روبرت هوك (Robert Hooke)', text: 'أول من شاهد الخلايا ووصفها بـ "الخلايا" بعد فحص مسامات نسيج الفلين الميت تحت مجهره البسيط وتشبيهها ببيت النحل.' },
                    { year: '1673 م', name: 'أنطوني فان ليفينهوك (Antoni van Leeuwenhoek)', text: 'صنع مجهراً يدوياً دقيقاً وشاهد كائنات حية دقيقة وحيدة الخلية تسبح في قطرة ماء من بركة راكدة لأول مرة في التاريخ (المجهر ص 11).' },
                    { year: '1838 م', name: 'ماتياس شلايدن (Matthias Schleiden)', text: 'درس النباتات دراسة دقيقة وتوصل إلى استنتاج أن جميع النباتات بدون استثناء تتكون من خلايا نباتية.' },
                    { year: '1839 م', name: 'ثيودور شوان (Theodor Schwann)', text: 'توسع بدراسة الحيوانات واستنتج أن جميع الكائنات الحيوانية أيضاً مبنية أساساً من خلايا حية.' },
                    { year: '1855 م', name: 'رودلف فيرشو (Rudolf Virchow)', text: 'استدل على البند الأخير وهو أن الخلايا الحية تنتج حصراً من خلايا أخرى مماثلة لها عبر الانقسام الخلوي.' }
                  ].map((sc, i) => (
                    <div key={i} className="relative space-y-1">
                      {/* Timeline dot */}
                      <span className="absolute -right-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-900" />
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          {sc.year}
                        </span>
                        <h5 className="font-bold text-slate-200 text-xs">{sc.name}</h5>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pr-1">{sc.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 3: Core Cell Components */}
          {lessonSubTab === 'components' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-emerald-400">مكونات الخلية الأساسية المشتركة (صفحة 13):</span> تشترك خلايا الكائنات الحية جميعها، نباتية كانت أم حيوانية، في ثلاثة مكونات رئيسية تُشكل هيكل الخلية الحيوي والوظيفي.
              </div>

              {/* Three Core Components Interactive Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    name: '1. الغشاء البلازمي',
                    term: 'Plasma Membrane',
                    desc: 'غشاء رقيق ومرن للغاية يحيط بكل خلية حية فيحميها من المؤثرات والظروف الخارجية، ويتميز بـ "النفاذية الاختيارية" حيث يُسهم في تنظيم وتبادل المواد والأيونات والماء بين الخلية والوسط المحيط بها (ص 13).',
                    color: 'text-cyan-400 border-cyan-800/80 bg-cyan-950/20'
                  },
                  {
                    name: '2. السيتوبلازم',
                    term: 'Cytoplasm',
                    desc: 'مادة هلامية شبه شفافة تملأ تجويف الخلية الداخلي. يتكون في معظمه من الماء والمواد العضوية والذائبة والأملاح، ويحتوي بداخله على مختلف العضيات والتراكيب الخلوية التي تسبح فيه، ويُحاط بالغشاء البلازمي (ص 13).',
                    color: 'text-emerald-400 border-emerald-800/80 bg-emerald-950/20'
                  },
                  {
                    name: '3. المادة الوراثية',
                    term: 'Genetic Material (DNA)',
                    desc: 'تتحكم المادة الوراثية في كافة أنشطة الخلايا المختلفة وحيويتها (مثل صنع البروتين، النمو، الانقسام). وتتميز بحمل الشيفرات الجينية والمخططات التي تحدد صفات الكائن وتنتقل للأجيال القادمة (ص 13).',
                    color: 'text-amber-400 border-amber-800/80 bg-amber-950/20'
                  }
                ].map((comp, i) => (
                  <div key={i} className={`p-5 rounded-2xl border space-y-3 ${comp.color}`}>
                    <div className="border-b border-slate-800 pb-2">
                      <h4 className="font-extrabold text-sm">{comp.name}</h4>
                      <span className="text-[10px] font-mono opacity-60 block mt-0.5" dir="ltr">{comp.term}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed text-justify">
                      {comp.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Verified checkpoint box from textbook */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-rose-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-bold text-xs">أتحقق (من صفحة 13): ما أهمية الغشاء البلازمي للخلية؟</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">
                  الجواب النموذجي: <strong className="text-emerald-400">يحمي الخلية من المؤثرات الخارجية، ويُنظم مرور وتبادل المواد (الأغذية، الفضلات، الماء) من الخلية وإليها بفضل النفاذية الاختيارية.</strong>
                </p>
              </div>
            </div>
          )}

          {/* Tab Content 4: Prokaryotes vs Eukaryotes */}
          {lessonSubTab === 'types' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-rose-400">تصنيف الخلايا حسب النواة (صفحة 14):</span> تصنف الخلايا الحية بشكل رئيسي بناءً على وجود غلاف نووي يحيط بالمادة الوراثية إلى نوعين رئيسيين: بدائيات وحقيقيات النواة.
              </div>

              {/* Side-by-Side Diagrammatic Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Prokaryotes */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="border-b border-slate-800 pb-2.5">
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[9px] font-bold">
                      أمثلة: البكتيريا
                    </span>
                    <h4 className="font-extrabold text-slate-100 text-sm mt-1">بدائية النواة (Prokaryote)</h4>
                  </div>
                  
                  {/* Schematic Vector Drawing */}
                  <div className="w-full h-40 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
                    <svg viewBox="0 0 200 120" className="w-full max-w-[180px] h-auto">
                      {/* Bacterial Capsule */}
                      <rect x="35" y="25" width="130" height="70" rx="35" fill="#f43f5e" fillOpacity="0.15" stroke="#f43f5e" strokeWidth="4" />
                      {/* Cell Wall */}
                      <rect x="40" y="30" width="120" height="60" rx="30" fill="none" stroke="#fb7185" strokeWidth="2" />
                      {/* Flagellum */}
                      <path d="M165,60 C185,55 180,75 195,60 C200,55 210,65 215,60" fill="none" stroke="#fb7185" strokeWidth="3" />
                      {/* Pili */}
                      <line x1="35" y1="40" x2="25" y2="35" stroke="#fb7185" strokeWidth="2" />
                      <line x1="35" y1="80" x2="25" y2="85" stroke="#fb7185" strokeWidth="2" />
                      {/* Genetic material free inside cytoplast */}
                      <path d="M75,50 Q85,75 100,50 T125,70 Q110,40 90,65 Z" fill="none" stroke="#fb923c" strokeWidth="4" strokeLinecap="round" />
                      <text x="100" y="105" fill="#f43f5e" fontSize="8" fontWeight="bold" textAnchor="middle">بكتيريا (المادة الوراثية حرة)</text>
                    </svg>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    تتميز الخلايا بدائية النواة بأن <strong className="text-rose-400">المادة الوراثية فيها حرة طليقة داخل السيتوبلازم</strong>، حيث لا يوجد غلاف نووي يحيط بها أو يفصلها عن السيتوبلازم (ص 14). هياكلها بسيطة جداً وخالية من النواة والعضيات الغشائية.
                  </p>
                </div>

                {/* 2. Eukaryotes */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="border-b border-slate-800 pb-2.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold">
                      أمثلة: النباتات والحيوانات
                    </span>
                    <h4 className="font-extrabold text-slate-100 text-sm mt-1">حقيقية النواة (Eukaryote)</h4>
                  </div>
                  
                  {/* Schematic Vector Drawing */}
                  <div className="w-full h-40 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
                    <svg viewBox="0 0 200 120" className="w-full max-w-[180px] h-auto">
                      {/* Cell wall/membrane */}
                      <rect x="45" y="15" width="110" height="90" rx="20" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="4" />
                      {/* Nuclear membrane */}
                      <circle cx="100" cy="60" r="24" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4 2" />
                      {/* DNA inside nucleus */}
                      <path d="M92,54 Q100,70 108,54 T104,66 Q96,50 100,58" fill="none" stroke="#f59e0b" strokeWidth="3" />
                      {/* Nucleolus */}
                      <circle cx="100" cy="60" r="6" fill="#1d4ed8" />
                      <text x="100" y="112" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">خلية حقيقية النواة</text>
                    </svg>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    تتميز الخلايا حقيقية النواة بأن <strong className="text-emerald-400">مادتها الوراثية محاطة ومحمية بالكامل داخل غلاف نووي متخصص</strong> يفصلها عن السيتوبلازم لتكوين تركيب خلوي واضح يسمى <strong className="text-cyan-400">النواة (Nucleus)</strong> (ص 14). تحتوي على عضيات معقدة.
                  </p>
                </div>

              </div>

              {/* Textbook check */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-rose-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-bold text-xs">أتحقق (من صفحة 14): ما الفرق بين الخلية بدائية النواة والخلية حقيقية النواة؟</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">
                  الجواب النموذجي: <strong className="text-emerald-400">الخلية حقيقية النواة تكون مادتها الوراثية محاطة بغلاف نووي خاص يفصلها عن السيتوبلازم وتوجد داخل النواة، بينما الخلايا بدائية النواة تكون المادة الوراثية فيها حرة وغير محاطة بغلاف نووي.</strong>
                </p>
              </div>

              {/* Interactive Self-Assessment Quiz Widget (أختبر نفسي) */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="font-bold text-slate-100 text-xs text-center border-b border-slate-800 pb-2">
                  📝 أختبر نفسي: تحقق من فهمك لدروس الوحدة الأولى
                </h4>

                <div className="space-y-4">
                  {[
                    {
                      id: 'q1',
                      q: '1. من هو أول عالم شاهد كائنات دقيقة حية تسبح في قطرة ماء بركة؟ (ص 11)',
                      options: [
                        { val: 'a', label: 'روبرت هوك' },
                        { val: 'b', label: 'أنطوني لوفنهوك', correct: true },
                        { val: 'c', label: 'ماتياس شلايدن' }
                      ]
                    },
                    {
                      id: 'q2',
                      q: '2. أي من الخيارات التالية يُعد من البنود الرئيسية لنظرية الخلية؟ (ص 12)',
                      options: [
                        { val: 'a', label: 'الخلية هي الوحدة الأساسية لتركيب أجسام الكائنات الحية.', correct: true },
                        { val: 'b', label: 'جميع الخلايا تحتوي على بلاستيدات خضراء وجدار خلوي.' },
                        { val: 'c', label: 'لا يمكن للخلايا المماثلة أن تنقسم لإنتاج خلايا جديدة.' }
                      ]
                    },
                    {
                      id: 'q3',
                      q: '3. ما المكون الخلوي الذي يحمي الخلية ويسهم في تنظيم تبادل المواد مع المحيط؟ (ص 13)',
                      options: [
                        { val: 'a', label: 'السيتوبلازم' },
                        { val: 'b', label: 'المادة الوراثية' },
                        { val: 'c', label: 'الغشاء البلازمي', correct: true }
                      ]
                    },
                    {
                      id: 'q4',
                      q: '4. لماذا تُصنف البكتيريا على أنها خلية بدائية النواة؟ (ص 14)',
                      options: [
                        { val: 'a', label: 'لأنها تفتقر للسيتوبلازم والغشاء البلازمي.' },
                        { val: 'b', label: 'لأن مادتها الوراثية حرة غير محاطة بغلاف نووي.', correct: true },
                        { val: 'c', label: 'لأنها لا تحتوي على مادة وراثية على الإطلاق.' }
                      ]
                    }
                  ].map((quiz) => (
                    <div key={quiz.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <p className="text-xs font-bold text-slate-200">{quiz.q}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {quiz.options.map((opt) => {
                          const isSelected = quizAnswers[quiz.id] === opt.val;
                          const isCorrect = opt.correct;

                          return (
                            <button
                              key={opt.val}
                              onClick={() => {
                                if (soundEnabled) soundEngine.playClick();
                                setQuizAnswers(prev => ({ ...prev, [quiz.id]: opt.val }));
                                setQuizResults(prev => ({ ...prev, [quiz.id]: isCorrect || false }));
                              }}
                              className={`p-2.5 rounded-lg text-right text-xs transition-all border ${
                                isSelected
                                  ? isCorrect
                                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                                    : 'bg-rose-950 border-rose-500 text-rose-300 font-bold'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && (
                                <span className="mr-1 font-mono">
                                  {isCorrect ? ' (صحيح ✓)' : ' (خاطئ ✗)'}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {subTab === 'organ_systems' && (
        /* ORGAN SYSTEMS INTEGRATION */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>تكامل أجهزة الكائن الحي (التنظيم من الخلية للجهاز)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {ORGAN_SYSTEMS.map((sys) => (
              <button
                key={sys.id}
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setActiveSystem(sys.id);
                }}
                className={`p-4 rounded-2xl border text-right transition-all text-xs space-y-2 ${
                  activeSystem === sys.id
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <p className="text-sm">{sys.nameAr}</p>
                <p className="text-[10px] opacity-80">{sys.mainOrgansAr}</p>
              </button>
            ))}
          </div>

          {(() => {
            const currentSys = ORGAN_SYSTEMS.find(s => s.id === activeSystem);
            if (!currentSys) return null;
            return (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
                <h4 className="font-bold text-emerald-400 text-base">{currentSys.nameAr}</h4>
                <p className="text-xs text-slate-200 leading-relaxed">{currentSys.functionAr}</p>
                <div className="pt-2 text-xs text-slate-400 font-mono">
                  تسلسل التنظيم الحيوي: خلية ➔ نسيج خلوي ➔ عضو متجانس ➔ جهاز حيوي مكتمل
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {subTab === 'pulse_integration' && (
        /* PULSE RATE & BODY SYSTEMS INTEGRATION ACTIVITY (Textbook Page 26) */
        <div className="space-y-6 animate-fade-in">
          
          {/* Activity Header Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                    نشاط الصف السادس - ص 26
                  </span>
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
                    <span>نشاط: تكامل أجهزة الجسم (قياس النبض والجري)</span>
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  استكشاف العلاقة بين مجهود الحركة ومعدل النبض وتوضيح التكامل بين جهاز الدوران والجهاز العضلي وبقية أجهزة الجسم.
                </p>
              </div>

              {/* Tools Inventory badges */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <span className="font-bold text-slate-400">الأدوات:</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-rose-300 flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-rose-400" />
                  ساعة توقيت
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-sky-300 flex items-center gap-1">
                  <BarChart2 className="w-3.5 h-3.5 text-sky-400" />
                  أوراق رسم بياني
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  التعاون مع زميل
                </span>
              </div>
            </div>

            {/* Exercise Mode Selection Controls */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">اختر حالة المجهود البدني لزميلك (خطوات العمل 1-3):</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handlePulseStateChange('rest')}
                  className={`p-4 rounded-xl border text-right transition-all space-y-1.5 ${
                    pulseState === 'rest'
                      ? 'bg-sky-950/80 border-sky-500 text-sky-200 ring-2 ring-sky-500/40 shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">1. الوضع الطبيعي (الراحة)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-900/50 text-sky-300">0 min جهد</span>
                  </div>
                  <p className="text-[11px] opacity-80">قياس النبض في المعصم دون بذل أي جهد لمدة 1 min.</p>
                  <div className="font-mono text-xs text-sky-400 font-bold pt-1">
                    المعدل: 72 نبضة/دقيقة
                  </div>
                </button>

                <button
                  onClick={() => handlePulseStateChange('walk')}
                  className={`p-4 rounded-xl border text-right transition-all space-y-1.5 ${
                    pulseState === 'walk'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">2. بعد المشي</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300">1 min مشي</span>
                  </div>
                  <p className="text-[11px] opacity-80">طلب المشي من الزميل لمدة 1 min ثم قياس نبضه.</p>
                  <div className="font-mono text-xs text-emerald-400 font-bold pt-1">
                    المعدل: 95 نبضة/دقيقة
                  </div>
                </button>

                <button
                  onClick={() => handlePulseStateChange('run')}
                  className={`p-4 rounded-xl border text-right transition-all space-y-1.5 ${
                    pulseState === 'run'
                      ? 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/40 shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      3. بعد الجري في المكان
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-900/50 text-rose-300">1 min جري</span>
                  </div>
                  <p className="text-[11px] opacity-80">طلب الجري في المكان لمدة 1 min ثم قياس نبضه.</p>
                  <div className="font-mono text-xs text-rose-400 font-bold pt-1">
                    المعدل: 138 نبضة/دقيقة
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Wrist Monitor & Stopwatch Dual Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Panel: Wrist Radial Artery & ECG Heart Rate Monitor */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center font-bold text-xs">
                    <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">مراقب شريان معصم اليد (Radial Pulse)</h4>
                    <p className="text-[11px] text-rose-400">الضغط بأطراف الأصابع على الشريان الكعبري</p>
                  </div>
                </div>

                <div className="font-mono font-bold text-sm px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-rose-400 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-rose-500 animate-bounce" />
                  <span>{pulseState === 'rest' ? '72 BPM' : pulseState === 'walk' ? '95 BPM' : '138 BPM'}</span>
                </div>
              </div>

              {/* Wrist & Finger Placement Graphic Simulation */}
              <div className="relative w-full h-52 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden p-4">
                
                {/* Background ECG Grid Pattern */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Simulated Hand & Wrist Illustration */}
                <div className="relative flex items-center gap-4 z-10">
                  
                  {/* Wrist Silhouette */}
                  <div className="w-36 h-20 bg-amber-900/40 border-2 border-amber-600/50 rounded-2xl relative flex items-center justify-center shadow-lg">
                    <span className="text-[10px] text-amber-200 font-bold">معصم زميلي 🤚</span>
                    
                    {/* Pulsing Artery Line */}
                    <div className="absolute top-1/2 inset-x-2 h-1 bg-rose-500/60 rounded-full animate-pulse"></div>

                    {/* Touch Points (Fingers) */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                      <div className="w-4 h-6 bg-slate-300 border-2 border-slate-500 rounded-t-full shadow-md"></div>
                      <div className="w-4 h-7 bg-slate-300 border-2 border-slate-500 rounded-t-full shadow-md"></div>
                      <div className="w-4 h-6 bg-slate-300 border-2 border-slate-500 rounded-t-full shadow-md"></div>
                    </div>

                    {/* Pulse Waves Effect */}
                    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-rose-500 ${
                      pulseState === 'run' ? 'animate-ping' : 'animate-pulse'
                    } opacity-75`}></div>
                  </div>

                  {/* Animated Heart Visual */}
                  <div className="flex flex-col items-center gap-1">
                    <div className={`p-4 rounded-2xl ${
                      pulseState === 'rest' ? 'bg-sky-950 text-sky-400 border border-sky-800' :
                      pulseState === 'walk' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      'bg-rose-950 text-rose-400 border border-rose-800 animate-bounce'
                    }`}>
                      <Heart className={`w-8 h-8 ${pulseState === 'run' ? 'animate-ping text-rose-500' : 'animate-pulse'}`} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      {pulseState === 'rest' ? 'نبض هادئ' : pulseState === 'walk' ? 'نبض نشط' : 'نبض تسارعي عالي 🔥'}
                    </span>
                  </div>

                </div>

                {/* Simulated Waveform Line */}
                <div className="absolute bottom-2 inset-x-4 h-8 flex items-center justify-center opacity-70">
                  <svg className="w-full h-full text-rose-500" viewBox="0 0 300 40">
                    <path 
                      d="M0,20 L50,20 L60,5 L70,35 L80,10 L90,25 L100,20 L200,20 L210,5 L220,35 L230,10 L240,25 L250,20 L300,20" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      className={pulseState === 'run' ? 'animate-pulse' : ''}
                    />
                  </svg>
                </div>
              </div>

              {/* Status Note */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs space-y-1">
                <span className="font-bold text-rose-400">ملاحظة الفحص الحسي:</span>
                <p className="text-slate-300">
                  {pulseState === 'rest' && 'يشعر الطالب بنبضات منتظمة وهادئة بمعدل 72 نبضة في الدقيقة أثناء حالة الراحة.'}
                  {pulseState === 'walk' && 'يشعر الطالب بارتفاع خفيف في قوة وتواتر النبضات بمعدل 95 نبضة في الدقيقة بعد المشي.'}
                  {pulseState === 'run' && 'يشعر الطالب بنبضات قوية وسريعة جداً بفرط تواتر بمعدل 138 نبضة في الدقيقة نتيجة المجهود العضلي.'}
                </p>
              </div>
            </div>

            {/* Right Panel: Interactive 1-Minute Stopwatch Widget */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-slate-100 text-sm">ساعة توقيت قياس 1 دقيقة (60 Sec)</h4>
                </div>
                <span className="text-xs font-mono text-slate-400">التوقيت الموصى به ص 26</span>
              </div>

              {/* Stopwatch Display */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center space-y-4">
                <div className="font-mono text-4xl font-extrabold text-emerald-400 tracking-wider">
                  00:{stopwatchSec < 10 ? `0${stopwatchSec}` : stopwatchSec}
                  <span className="text-xs text-slate-500 font-normal mr-2">/ 01:00 min</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${(stopwatchSec / 60) * 100}%` }}
                  ></div>
                </div>

                {/* Stopwatch Action Controls */}
                <div className="flex justify-center items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setIsStopwatchRunning(!isStopwatchRunning);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all ${
                      isStopwatchRunning
                        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                        : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                    }`}
                  >
                    {isStopwatchRunning ? (
                      <>
                        <Clock className="w-4 h-4" />
                        <span>إيقاف مؤقت</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>بدء توقيت الدقيقة (1 min)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setIsStopwatchRunning(false);
                      setStopwatchSec(0);
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    <span>إعادة ضبط</span>
                  </button>
                </div>
              </div>

              {/* Instruction Note */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-400">طريقة الحساب:</span> يتم تشغيل ساعة التوقيت لمدة دقيقة واحدة (60 ثانية) عد تنازلي/تصاعدي أثناء قياس النبض بالمعصم في كل حالة من الحالات الثلاث.
              </div>
            </div>

          </div>

          {/* Graph Paper Chart Section (أوراق رسم بياني) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-sky-400" />
                <h4 className="font-bold text-slate-100 text-sm">
                  مخطط أوراق الرسم البياني (مقارنة قيم النبضات في الحالات الثلاث)
                </h4>
              </div>
              <span className="text-xs font-mono text-sky-400 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                علاقة طردية
              </span>
            </div>

            {/* Simulated Graph Paper Canvas */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-6 relative overflow-hidden">
              
              {/* Graph Grid Background Lines */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>

              {/* Bar Chart Representation */}
              <div className="relative z-10 space-y-4">
                
                {/* Bar 1: Rest State */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-sky-500"></span>
                      1. الوضع الطبيعي (الراحة):
                    </span>
                    <span className="font-mono text-sky-400">72 نبضة/دقيقة</span>
                  </div>
                  <div className="w-full h-7 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center p-1">
                    <div 
                      className="h-full bg-sky-500 rounded text-[10px] font-bold text-slate-950 flex items-center justify-end px-2 transition-all duration-700"
                      style={{ width: `${(72 / 160) * 100}%` }}
                    >
                      72 BPM
                    </div>
                  </div>
                </div>

                {/* Bar 2: Walk State */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-emerald-500"></span>
                      2. بعد المشي لمدة 1 min:
                    </span>
                    <span className="font-mono text-emerald-400">95 نبضة/دقيقة</span>
                  </div>
                  <div className="w-full h-7 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center p-1">
                    <div 
                      className="h-full bg-emerald-500 rounded text-[10px] font-bold text-slate-950 flex items-center justify-end px-2 transition-all duration-700"
                      style={{ width: `${(95 / 160) * 100}%` }}
                    >
                      95 BPM
                    </div>
                  </div>
                </div>

                {/* Bar 3: Run State */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-rose-500"></span>
                      3. بعد الجري في المكان لمدة 1 min:
                    </span>
                    <span className="font-mono text-rose-400">138 نبضة/دقيقة</span>
                  </div>
                  <div className="w-full h-7 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center p-1">
                    <div 
                      className="h-full bg-rose-500 rounded text-[10px] font-bold text-slate-950 flex items-center justify-end px-2 transition-all duration-700"
                      style={{ width: `${(138 / 160) * 100}%` }}
                    >
                      138 BPM
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Textbook Scientific Analysis & Integration Questions (الخطوات 4 - 7) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Q4 & Q5: أُقارن وأستنتج */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>4 + 5. أُقارن وأستنتج (العلاقة)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                • <strong className="text-sky-400">المقارنة:</strong> معدل النبض أبطأ في حالة الراحة (72)، يرتفع بعد المشي (95)، ويصل لأعلى مستوى بعد الجري (138).<br />
                • <strong className="text-emerald-400">الاستنتاج:</strong> توجد <strong className="text-emerald-300">علاقة طردية</strong> بين الحركة/المجهود البدني ومعدل النبض؛ فكلما زادت حركة الجري زادت سرعة نبضات القلب.
              </p>
            </div>

            {/* Q6: أوضح التكامل بين الأجهزة */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Activity className="w-4 h-4" />
                <span>6. أوضح التكامل بين أجهزة الجسم</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                • <strong className="text-rose-400">الجهاز العضلي:</strong> يحتاج طاقة وأكسجين أكبر للحركة والتنقُّل.<br />
                • <strong className="text-emerald-400">جهاز الدوران:</strong> يسرّع القلب النبض لضخ الدم المحمل بـ O2 والغلوكوز للعضلات.<br />
                • <strong className="text-cyan-400">الجهاز التنفسي والعصبي:</strong> يسرّع التنفس لامتصاص O2 وتنظيم الإشارات الحركية.
              </p>
            </div>

            {/* Q7: أُناقش والنتيجة النهائية */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <UserCheck className="w-4 h-4" />
                <span>7. أُناقش زملائي (الخلاصة)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                تعمل أجهزة جسم الكائن الحي بشبكة متكاملة ومتآزرة؛ فلا يمكن للجهاز العضلي العمل بفاعلية دون استجابة سريعة من جهاز الدوران لزيادة ضخ الدم، والجهاز التنفسي لتبادل الغازات، والجهاز العصبي للتنسيق.
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
