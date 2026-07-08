import React, { useState, useEffect } from 'react';
import { LabNote } from '../types';
import { 
  Zap, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  BookmarkPlus, 
  TrendingUp,
  Sparkles,
  Cog,
  Target,
  Ruler,
  Activity,
  ArrowRightLeft,
  Scale,
  Eye,
  HelpCircle
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface PhysicsEnergyProps {
  onSaveNote: (note: Omit<LabNote, 'id' | 'date'>) => void;
  onRunExperiment: () => void;
  soundEnabled: boolean;
  initialSubTab?: Unit2SubTab;
}

type Unit2SubTab = 'catapult' | 'kinetic_potential' | 'gears_machines';

export const PhysicsEnergy: React.FC<PhysicsEnergyProps> = ({
  onSaveNote,
  onRunExperiment,
  soundEnabled,
  initialSubTab
}) => {
  const [subTab, setSubTab] = useState<Unit2SubTab>(initialSubTab || 'gears_machines');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // ==========================================
  // ACTIVITY 1: CATAPULT (تحولات الطاقة ص 57)
  // ==========================================
  const [pullDownCm, setPullDownCm] = useState<number>(6); // 2cm to 10cm
  const [rubberBands, setRubberBands] = useState<number>(3); // 1 to 5 bands
  const [ballType, setBallType] = useState<'tennis' | 'paper'>('tennis');
  const [isCatapultFired, setIsCatapultFired] = useState<boolean>(false);
  const [catapultProgress, setCatapultProgress] = useState<number>(0); // animation progress
  const [catapultRangeCm, setCatapultRangeCm] = useState<number>(0);
  const [activeCatapultObservation, setActiveCatapultObservation] = useState<string>('');

  // Ball masses: Tennis = 57g (0.057kg), Paper = 10g (0.010kg)
  const ballMassKg = ballType === 'tennis' ? 0.057 : 0.010;
  
  // Spring constant k increases with rubber bands (k = 50 * bands N/m)
  const kSpring = 50 * rubberBands;
  
  // Elastic potential energy = 0.5 * k * x^2 (where x is pull distance in meters)
  const pullMeters = pullDownCm / 100;
  const elasticPotentialEnergyJ = 0.5 * kSpring * Math.pow(pullMeters, 2);
  
  // Launch speed: v = sqrt(2 * E_pe / m)
  const launchSpeedMs = Math.sqrt((2 * elasticPotentialEnergyJ) / ballMassKg);
  
  // Expected distance at 45deg: R = v^2 / g (in meters, converted to cm)
  const rawRangeM = Math.pow(launchSpeedMs, 2) / 9.8;
  const expectedRangeCm = Math.round(rawRangeM * 100);

  // Handle Catapult Fire Animation
  const handleFireCatapult = () => {
    if (soundEnabled) soundEngine.playBeep();
    setIsCatapultFired(true);
    setCatapultProgress(0);
    setCatapultRangeCm(0);
    onRunExperiment();

    let start: number | null = null;
    const duration = 1200; // 1.2s animation

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      setCatapultProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation finished
        setIsCatapultFired(false);
        setCatapultRangeCm(expectedRangeCm);
        if (soundEnabled) soundEngine.playSuccess();
        
        // Generate automatic student observation
        setActiveCatapultObservation(
          `تم إطلاق ${ballType === 'tennis' ? 'كرة التنس' : 'الكرة الورقية'} بسحب قدره ${pullDownCm} سم وبقوة ${rubberBands} أربطة مطاطية. قطعت الكرة مسافة ${expectedRangeCm} سم على مسطرة القياس التفاعلية.`
        );
      }
    };
    requestAnimationFrame(animate);
  };

  // ==========================================
  // ACTIVITY 2: RAMP & CUP (كتلة وحركة ص 63)
  // ==========================================
  const [selectedRampBall, setSelectedRampBall] = useState<'glass' | 'steel'>('glass');
  const [rampHeightCm, setRampHeightCm] = useState<number>(20); // 10cm to 30cm
  const [releasePosition, setReleasePosition] = useState<'top' | 'middle'>('top');
  const [isBallRolling, setIsBallRolling] = useState<boolean>(false);
  const [rollProgress, setRollProgress] = useState<number>(0);
  const [isWeighing, setIsWeighing] = useState<boolean>(false);
  const [weighedValue, setWeighedValue] = useState<number | null>(null);
  const [cupDistanceCm, setCupDistanceCm] = useState<number>(0);
  const [activeRampObservation, setActiveRampObservation] = useState<string>('');

  // Ball Masses: Glass = 15g (0.015kg), Steel = 85g (0.085kg)
  const rampBallMassKg = selectedRampBall === 'glass' ? 0.015 : 0.085;
  const positionMultiplier = releasePosition === 'top' ? 1.0 : 0.5;
  
  // Potential energy: Ep = m * g * h * position
  const rampHeightMeters = rampHeightCm / 100;
  const potentialEnergyJ = rampBallMassKg * 9.8 * rampHeightMeters * positionMultiplier;

  // Sliding friction for cup (assumed 0.12 N on wooden board)
  const frictionForceN = 0.12;
  // d = Ek / F_friction (m, converted to cm)
  const rawCupDistanceM = potentialEnergyJ / frictionForceN;
  const expectedCupDistanceCm = Math.round(Math.min(250, rawCupDistanceM * 100)); // limit to 250cm max for visual layout

  const handleWeighBall = () => {
    if (soundEnabled) soundEngine.playClick();
    setIsWeighing(true);
    setWeighedValue(null);
    setTimeout(() => {
      setWeighedValue(selectedRampBall === 'glass' ? 15 : 85);
      setIsWeighing(false);
      if (soundEnabled) soundEngine.playBeep();
    }, 800);
  };

  const handleRollBall = () => {
    if (soundEnabled) soundEngine.playBeep();
    setIsBallRolling(true);
    setRollProgress(0);
    setCupDistanceCm(0);
    onRunExperiment();

    let start: number | null = null;
    const duration = 1500; // 1.5s roll + hit

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      setRollProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsBallRolling(false);
        setCupDistanceCm(expectedCupDistanceCm);
        if (soundEnabled) soundEngine.playSuccess();

        setActiveRampObservation(
          `تم إفلات كرة ${selectedRampBall === 'glass' ? 'الزجاج الخفيفة (15غ)' : 'الفولاذ الثقيلة (85غ)'} من ${releasePosition === 'top' ? 'أعلى' : 'منتصف'} المنحدر (ارتفاع ${rampHeightCm} سم). اصطدمت الكرة بالكأس البلاستيكية ودفعتها لمسافة ${expectedCupDistanceCm} سم بسبب طاقتها الحركية.`
        );
      }
    };
    requestAnimationFrame(animate);
  };

  // ==========================================
  // ACTIVITY 3: GEARS (حركة التروس ص 71)
  // ==========================================
  const [gearSystem, setGearSystem] = useState<'2gears' | '3gears'>('2gears');
  const [bigGearTurns, setBigGearTurns] = useState<number>(0);
  const [rotationDirection, setRotationDirection] = useState<'cw' | 'ccw'>('cw');
  const [isGearsRotating, setIsGearsRotating] = useState<boolean>(false);
  const [gearsRotationProgress, setGearsRotationProgress] = useState<number>(0);
  const [activeGearObservation, setActiveGearObservation] = useState<string>('');

  const bigGearTeeth = 30;
  const mediumGearTeeth = 15;
  const smallGearTeeth = 10;

  // Counts of revolutions:
  // Medium turns = Big turns * (Big teeth / Medium teeth)
  // Small turns = Big turns * (Big teeth / Small teeth)
  const mediumGearTurnsResult = bigGearTurns * (bigGearTeeth / mediumGearTeeth);
  const smallGearTurnsResult = bigGearTurns * (bigGearTeeth / smallGearTeeth);

  const handleRotateGears = (turns: number, dir: 'cw' | 'ccw') => {
    if (soundEnabled) soundEngine.playBeep();
    setIsGearsRotating(true);
    setBigGearTurns(0);
    setRotationDirection(dir);
    setGearsRotationProgress(0);
    onRunExperiment();

    let start: number | null = null;
    const duration = turns * 1500; // 1.5s per turn

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      setGearsRotationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsGearsRotating(false);
        setBigGearTurns(turns);
        if (soundEnabled) soundEngine.playSuccess();

        const medDirText = dir === 'cw' ? 'عكس عقارب الساعة ↺' : 'مع عقارب الساعة ↻';
        const smallDirText = dir === 'cw' ? 'مع عقارب الساعة ↻' : 'عكس عقارب الساعة ↺';
        
        const text = gearSystem === '2gears'
          ? `عند تدوير الترس الكبير (30 سن) بمقدار ${turns} دورة ${dir === 'cw' ? 'مع' : 'عكس'} عقارب الساعة، دار الترس المتوسط المتشابك (15 سن) بمقدار ${turns * 2} دورة بالاتجاه المعاكس (${medDirText}).`
          : `عند تدوير الترس الكبير (30 سن) بمقدار ${turns} دورة، دار الترس المتوسط (15 سن) بمقدار ${turns * 2} دورة بالاتجاه المعاكس (${medDirText})، بينما دار الترس الصغير (10 سن) بمقدار ${turns * 3} دورات كاملة بنفس اتجاه الترس الكبير (${smallDirText}).`;

        setActiveGearObservation(text);
      }
    };
    requestAnimationFrame(animate);
  };

  const handleSaveObservation = () => {
    if (soundEnabled) soundEngine.playSuccess();

    let noteTitle = '';
    let noteHypothesis = '';
    let noteContent = '';
    let noteConclusion = '';

    if (subTab === 'catapult') {
      noteTitle = 'نشاط: تحولات الطاقة الميكانيكية للعبة قذف الكرات';
      noteHypothesis = 'تحول طاقة الوضع المرونية المختزنة في الأربطة المطاطية والملعقة المشدودة إلى طاقة حركية تطير بها الكرة.';
      noteContent = activeCatapultObservation || `تم اختبار إطلاق الكرات باستخدام نموذج المنجنيق. الطاقة الميكانيكية محفوظة وتتحول من وضع مروني إلى حركة.`;
      noteConclusion = 'نستنتج أن الملعقة والأربطة المطاطية تختزن طاقة وضع مرونية عند شدها، وتتحول بالكامل إلى طاقة حركية للكرة عند الإفلات. يمكن زيادة المسافة بزيادة شد الأربطة أو تقليل كتلة الكرة.';
    } else if (subTab === 'kinetic_potential') {
      noteTitle = 'نشاط: العلاقة بين الطاقة الحركية وكتلة الجسم على المنحدر المائل';
      noteHypothesis = 'كلما زادت كتلة الكرة أو زاد ارتفاع المنحدر الرأسي، زادت الطاقة الحركية للكرة وازدادت مسافة اندفاع الكأس.';
      noteContent = activeRampObservation || `تم اختبار دحرجة كرات مختلفة الكتلة على منحدر خشبي بمسار توجيهي وقياس إزاحة كأس بلاستيكية.`;
      noteConclusion = 'نستنتج وجود علاقة طردية بين الطاقة الحركية والكتلة، حيث دفعت الكرة الفولاذية الأثقل الكأس لمسافة أكبر بكثير من الكرة الزجاجية. كما أن زيادة الارتفاع الرأسي تزيد طاقة الوضع المختزنة وبالتالي تزيد الطاقة الحركية الناتجة.';
    } else {
      noteTitle = 'نشاط: حركة التروس ونقل الحركة الميكانيكية';
      noteHypothesis = 'تنتقل الحركة بين التروس المتشابكة مع عكس اتجاه الدوران، وتعتمد عدد الدورات عكسياً على عدد الأسنان (نسبة التروس).';
      noteContent = activeGearObservation || `تم تحليل حركة نظام تروس متشابكة وملاحظة العلاقة بين عدد الأسنان وعدد الدورات واتجاه الحركة.`;
      noteConclusion = 'تنتقل الحركة بالتعشيق المباشر للأسنان. يدور الترس المتشابك التالي باتجاه معاكس. نسبة دوران التروس ثابتة ومحددة بنسبة أسنانها (الترس الكبير يدور دورة واحدة فيدور المتوسط دورتين والصغير 3 دورات). للتروس أهمية بالغة في تغيير اتجاه الحركة وتعديل القوة والسرعة.';
    }

    onSaveNote({
      title: noteTitle,
      experimentName: 'الوحدة الثانية: الطاقة الميكانيكية والآلات البسيطة',
      category: 'physics',
      hypothesis: noteHypothesis,
      content: noteContent,
      conclusion: noteConclusion
    });
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      
      {/* Textbook Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                كتاب الطالب المعتمد ص 57، 63، 71
              </span>
              <h2 className="text-lg font-bold text-slate-100">الوحدة الثانية: الطاقة الميكانيكية والآلات البسيطة ⚙️</h2>
            </div>
            <p className="text-xs text-slate-400">الأنشطة العملية الرسمية المقررة لمبحث العلوم للصف السادس الابتدائي</p>
          </div>
        </div>

        <button
          onClick={handleSaveObservation}
          disabled={isSaved}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            isSaved
              ? 'bg-amber-950 text-amber-400 border border-amber-800 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
          }`}
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
          <span>{isSaved ? 'تم الحفظ في تقرير المعمل' : 'حفظ نتائج النشاط في التقرير'}</span>
        </button>
      </div>

      {/* Activities Navigation Buttons */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('catapult');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'catapult'
              ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>1. نشاط: تحولات الطاقة الميكانيكية (ص 57) 🎯</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('kinetic_potential');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'kinetic_potential'
              ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>2. نشاط: الطاقة الحركية وكتلة الجسم (ص 63) ⚖️</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundEngine.playClick();
            setSubTab('gears_machines');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'gears_machines'
              ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <span>3. نشاط: حركة التروس ونقل الحركة (ص 71) ⚙️</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* SUB-TAB 1: TOY CATAPULT (تحولات الطاقة الميكانيكية ص 57) */}
      {/* =================================================================== */}
      {subTab === 'catapult' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Card Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                  الدرس الأول: الطاقة الميكانيكية - تجربة عملية ص 57
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-1">نموذج قاذف كرات التنس (عيدان خشبية وملعقة)</h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="font-bold text-slate-400">المواد والأدوات المستخدمة:</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">7 عيدان خشبية</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">أربطة مطاطية</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">ملعقة بلاستيكية</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">كرة تنس ومسطرة</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>فكرة النشاط:</strong> نقوم ببناء نموذج اللعبة كما هو موضح بالصورة في الكتاب باستخدام عيدان الخشب كقاعدة ورافعة، والمطاط لتثبيت الملعقة وخزن الطاقة. عند ضغط الملعقة للأسفل تختزن <strong>طاقة وضع مرونية</strong>، وعند إفلاتها تتحول فجأة إلى <strong>طاقة حركية</strong> تنطلق بها كرة التنس لمسافة نقيسها بالمسطرة.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Interactive Panel */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-slate-200">شاشة محاكاة إطلاق الكرة وقراءة مسطرة القياس:</span>
                <button
                  onClick={handleFireCatapult}
                  disabled={isCatapultFired}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Target className="w-4 h-4" />
                  <span>{isCatapultFired ? 'جاري الإطلاق...' : 'اضغط الملعقة للأسفل وأفلتها! 🚀'}</span>
                </button>
              </div>

              {/* Graphical Catapult Field */}
              <div className="relative w-full h-80 bg-slate-950 rounded-2xl border border-slate-850 p-4 overflow-hidden flex flex-col justify-end">
                
                {/* Measuring Grid Lines */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px)] [background-size:40px_100%]"></div>
                
                {/* Cloud & Sun ambient background */}
                <div className="absolute top-6 right-8 opacity-20 text-[10px] text-slate-500 font-mono">
                  نموذج قاذف أعواد الخشب ص 57
                </div>

                {/* Physics Stats Overlay */}
                <div className="absolute top-4 left-4 bg-slate-900/95 border border-slate-800 p-3.5 rounded-xl font-mono text-xs space-y-1.5 text-slate-300 z-10 shadow-lg">
                  <div className="flex justify-between gap-6">
                    <span className="text-slate-400">طاقة الوضع المرونية المختزنة:</span>
                    <span className="text-amber-400 font-bold">{elasticPotentialEnergyJ.toFixed(3)} جول</span>
                  </div>
                  <div className="flex justify-between gap-6">
                    <span className="text-slate-400">سرعة انطلاق الكرة:</span>
                    <span className="text-cyan-400 font-bold">{launchSpeedMs.toFixed(2)} م/ث</span>
                  </div>
                  <div className="flex justify-between gap-6">
                    <span className="text-slate-400">كتلة المقذوف المختبر:</span>
                    <span className="text-emerald-400 font-bold">{(ballMassKg * 1000).toFixed(0)} غرام</span>
                  </div>
                </div>

                {/* Simulated Catapult Toy built with Wood and Rubber Bands */}
                <div className="absolute bottom-10 right-10 flex flex-col items-center">
                  
                  {/* Catapult Arm & Spoon */}
                  <div className="relative w-28 h-24">
                    
                    {/* Rubber Bands wrap around the base */}
                    <div className="absolute bottom-1 right-8 w-10 h-10 border-4 border-dashed border-amber-600/80 rounded-full flex items-center justify-center">
                      <span className="text-[9px] text-amber-500 font-bold">{rubberBands}x مطاط</span>
                    </div>

                    {/* Wooden Base (7 sticks) */}
                    <div className="absolute bottom-0 right-0 w-24 h-4 bg-amber-800 border-2 border-amber-900 rounded shadow-md flex justify-between px-1">
                      <div className="w-2 h-full bg-amber-700"></div>
                      <div className="w-2 h-full bg-amber-700"></div>
                      <div className="w-2 h-full bg-amber-700"></div>
                    </div>

                    {/* Triangular Support (crossing sticks) */}
                    <div className="absolute bottom-3 right-8 w-6 h-10 bg-amber-700 border border-amber-900 rotate-45 rounded"></div>

                    {/* Elastic Rubber Band Loop */}
                    <div className="absolute bottom-6 right-7 w-1.5 h-12 bg-orange-400/90 rounded-full origin-bottom"></div>

                    {/* Plastic Spoon Lever Arm */}
                    <div 
                      className="absolute bottom-2 right-8 w-24 h-2 bg-slate-200 border border-slate-300 rounded origin-right transition-transform"
                      style={{ 
                        transform: isCatapultFired 
                          ? 'rotate(-20deg)' 
                          : `rotate(${pullDownCm * 4}deg)` // rotates down with pull down cm
                      }}
                    >
                      {/* Spoon Bowl containing the ball */}
                      <div className="absolute left-0 -top-3.5 w-7 h-5 bg-slate-300 border border-slate-400 rounded-b-full flex items-center justify-center">
                        {/* Ball inside spoon bowl (visible only before launching) */}
                        {!isCatapultFired && catapultRangeCm === 0 && (
                          <div className={`w-3 h-3 rounded-full ${ballType === 'tennis' ? 'bg-lime-500 border border-lime-300' : 'bg-slate-400 border border-slate-200'} shadow-sm`} />
                        )}
                      </div>
                    </div>

                  </div>
                  
                  <span className="text-[10px] text-amber-300 font-bold mt-2">النموذج الخشبي ص 57</span>
                </div>

                {/* Parabolic Flight Animation Path */}
                {isCatapultFired && (
                  <div 
                    className={`absolute w-4 h-4 rounded-full ${ballType === 'tennis' ? 'bg-lime-500' : 'bg-slate-400'} border border-white shadow-xl z-20`}
                    style={{
                      right: `${10 + catapultProgress * 70}%`,
                      bottom: `${10 + Math.sin(catapultProgress * Math.PI) * 120}px`
                    }}
                  />
                )}

                {/* Final landed ball marker */}
                {catapultRangeCm > 0 && !isCatapultFired && (
                  <div 
                    className={`absolute w-4.5 h-4.5 rounded-full ${ballType === 'tennis' ? 'bg-lime-500 border-2 border-lime-200' : 'bg-slate-400 border-2 border-slate-100'} shadow-lg z-10 flex items-center justify-center`}
                    style={{
                      right: `${10 + 70}%`,
                      bottom: '10px'
                    }}
                  >
                    <div className="text-[8px] text-slate-950 font-bold">🎯</div>
                  </div>
                )}

                {/* Grass and Ground with measuring Tape ruler */}
                <div className="w-full h-8 bg-gradient-to-t from-emerald-950 to-emerald-900 border-t border-emerald-800 flex items-center relative px-2 text-[10px] font-mono text-emerald-400 justify-between select-none">
                  <div className="flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5 text-amber-500" />
                    <span>المسافة المقطوعة بالمسطرة:</span>
                  </div>
                  <span className="text-amber-400 font-bold bg-slate-950/80 px-2.5 py-0.5 rounded border border-slate-800">
                    {catapultRangeCm > 0 ? `${catapultRangeCm} سم` : '0 سم'}
                  </span>
                </div>

              </div>

              {/* Automatic Observation text */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs space-y-1 mt-2">
                <span className="font-bold text-amber-400">الملاحظة المسجلة حالياً:</span>
                <p className="text-slate-300 leading-relaxed font-mono">
                  {activeCatapultObservation || 'لم يتم إطلاق أي مقذوف بعد. قم بضبط المتغيرات واضغط زر الإطلاق لتسجيل الملاحظة.'}
                </p>
              </div>

            </div>

            {/* Right Variables Controls Panel */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>التحكم في متغيرات اللعبة (الخطوات 2-5):</span>
              </h3>

              {/* Variable 1: Pull distance */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-300">مسافة ضغط الملعقة للأسفل (شد المطاط):</span>
                  <span className="font-mono text-amber-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{pullDownCm} سم</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={pullDownCm}
                  onChange={(e) => {
                    setPullDownCm(Number(e.target.value));
                    setCatapultRangeCm(0); // reset lander
                    setActiveCatapultObservation('');
                  }}
                  className="w-full accent-amber-500 bg-slate-950 h-2.5 rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-slate-400">بزيادة هذه المسافة يزداد شد الأربطة المطاطية وتتضاعف الطاقة المختزنة.</p>
              </div>

              {/* Variable 2: Rubber bands count */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-300">عدد الأربطة المطاطية المستخدمة لتأمين الملعقة:</span>
                  <span className="font-mono text-amber-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{rubberBands} أربطة</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        if (soundEnabled) soundEngine.playClick();
                        setRubberBands(b);
                        setCatapultRangeCm(0);
                        setActiveCatapultObservation('');
                      }}
                      className={`py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                        rubberBands === b
                          ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                          : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-850'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">الرباط المطاطي يمثل ثابت المرونة لقاذف القذيفة الميكانيكي.</p>
              </div>

              {/* Variable 3: Projectile type */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">اختر نوع الكرة المقذوفة (كتلة الجسم):</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setBallType('tennis');
                      setCatapultRangeCm(0);
                      setActiveCatapultObservation('');
                    }}
                    className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      ballType === 'tennis'
                        ? 'bg-lime-950/80 border-lime-500 text-lime-200 ring-2 ring-lime-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    <span className="font-bold text-xs">كرة تنس صفراء 🎾</span>
                    <span className="text-[10px] font-mono text-lime-400 mt-1">الكتلة: 57 غرام (ثقيلة نسبياً)</span>
                  </button>

                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setBallType('paper');
                      setCatapultRangeCm(0);
                      setActiveCatapultObservation('');
                    }}
                    className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      ballType === 'paper'
                        ? 'bg-sky-950/80 border-sky-500 text-sky-200 ring-2 ring-sky-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    <span className="font-bold text-xs">كرة ورقية خفيفة 📄</span>
                    <span className="text-[10px] font-mono text-sky-400 mt-1">الكتلة: 10 غرام (خفيفة جداً)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Answer Key Book Questions Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>التحليل والاستنتاج وحل أسئلة نشاط ص 57 في الكتاب المدرسي:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1.5">
                <span className="font-bold text-amber-400">الخطوة 6: مقارنة نتائج القياس</span>
                <p className="text-slate-300">
                  عند مقارنة المسافة المقطوعة لكرتين أُطلقتا بجهود مختلفة، نجد أن الكرة التي طُبق عليها مسافة سحب ملعقة أكبر (مثلاً 9 سم) تقطع مسافة أطول بكثير على المسطرة من الكرة التي سُحبت مسافة أقل (مثلاً 4 سم).
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1.5">
                <span className="font-bold text-emerald-400">الخطوة 7: استنتاج أشكال الطاقة</span>
                <p className="text-slate-300">
                  تمتلك الكرة عند انطلاقها <strong>طاقة حركية (Kinetic Energy)</strong>. حصلت عليها من تحول <strong>طاقة الوضع المرونية (Elastic Potential Energy)</strong> التي اختزنت في الملعقة البلاستيكية والأربطة المطاطية المشدودة عند سحبها للأسفل.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1.5">
                <span className="font-bold text-cyan-400">الخطوة 8: التوقع لزيادة المسافة</span>
                <p className="text-slate-300">
                  يمكن زيادة مسافة طيران الكرة بـ: 1) زيادة سحب الملعقة للأسفل لرفع طاقة الوضع المختزنة، 2) زيادة عدد الأربطة المطاطية، 3) استخدام كرات أخف وزناً ككرة الورق المقوى مقارنة بكرة التنس الثقيلة.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-TAB 2: KINETIC ENERGY & MASS (الطاقة الحركية وكتلة الجسم ص 63) */}
      {/* =================================================================== */}
      {subTab === 'kinetic_potential' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Card Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                  نشاط صف السادس - صفحة 63
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-1">تجربة دحرجة الكرات على المنحدر الخشبي واصطدامها بالكأس</h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="font-bold text-slate-400">الأدوات:</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  ميزان إلكتروني
                </span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">منحدر خشبي مع مسطرتين</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">كأس بلاستيكي</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 font-mono text-emerald-400">كرة زجاجية / كرة فولاذية</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>فكرة النشاط:</strong> قياس كتلة كرتين متساويتين بالحجم ومختلفتين بالكتلة (كرة زجاجية خفيفة وكرة فولاذية ثقيلة) بالميزان، ثم تركهما تنزلقان من السكون على منحدر مائل لتصطدما بكأس بلاستيكي عند النهاية. نقيس المسافة التي يندفعها الكأس لنستنتج العلاقة بين الطاقة الحركية والكتلة (ص 63).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Interactive Ramp and Balance Area */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 flex flex-col justify-between">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-slate-200">المنحدر التفاعلي وجهاز الميزان الإلكتروني:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleWeighBall}
                    disabled={isBallRolling || isWeighing}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-850 text-xs font-bold text-amber-400 flex items-center gap-1.5 transition-all disabled:opacity-40"
                  >
                    <Scale className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    <span>ضع الكرة على الميزان (خطوة 1)</span>
                  </button>

                  <button
                    onClick={handleRollBall}
                    disabled={isBallRolling || isWeighing}
                    className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/10 disabled:opacity-40"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>إفلات الكرة لتنزلق (خطوات 3-5)</span>
                  </button>
                </div>
              </div>

              {/* Graphic Lab Space */}
              <div className="relative w-full h-80 bg-slate-950 rounded-2xl border border-slate-850 p-4 flex flex-col justify-between overflow-hidden">
                
                {/* Measuring Guide Grid lines */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>

                {/* Digital Scale Box (الميزان الإلكتروني) */}
                <div className="absolute top-4 right-4 bg-slate-900 border border-slate-800 p-3 rounded-xl w-44 space-y-2 text-center shadow-lg z-10">
                  <span className="text-[10px] text-slate-400 font-bold block">ميزان قياس كتل الكرات ص 63:</span>
                  
                  {/* Digital scale cup */}
                  <div className="h-10 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center relative">
                    {/* Scale platter */}
                    <div className="absolute bottom-1 w-2/3 h-1 bg-slate-700 rounded"></div>
                    
                    {/* Measured ball display */}
                    {weighedValue !== null ? (
                      <div className={`w-4 h-4 rounded-full -mt-2 ${selectedRampBall === 'glass' ? 'bg-cyan-500/80 border border-cyan-300' : 'bg-slate-400 border border-slate-100'} shadow-sm animate-bounce`} />
                    ) : isWeighing ? (
                      <span className="text-[9px] text-amber-400 font-mono animate-pulse">جاري قياس الوزن...</span>
                    ) : (
                      <span className="text-[9px] text-slate-500">الميزان فارغ</span>
                    )}
                  </div>

                  {/* Digital Screen Indicator */}
                  <div className="bg-slate-950 py-1 px-2 rounded border border-slate-800 font-mono text-emerald-400 font-bold text-xs">
                    {weighedValue !== null ? `${weighedValue} غرام` : '0.00 غرام'}
                  </div>
                </div>

                {/* Simulated Ramp & Release Track */}
                <div className="relative w-full h-44 mt-16">
                  
                  {/* Interactive Ramp line */}
                  {/* Drawing a beautiful CSS ramp */}
                  <svg className="absolute inset-0 w-full h-full text-slate-700" viewBox="0 0 500 150" preserveAspectRatio="none">
                    {/* Wooden Board ramp */}
                    <path 
                      d={`M0,140 L280,${140 - rampHeightCm * 2.5} L280,140 Z`} 
                      fill="rgba(146, 64, 14, 0.15)" 
                      stroke="#b45309" 
                      strokeWidth="3"
                    />
                    
                    {/* Guard rulers on side of ramp */}
                    <line x1="0" y1="137" x2="280" y2={137 - rampHeightCm * 2.5} stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                    
                    {/* Flat Floor table */}
                    <line x1="280" y1="140" x2="500" y2="140" stroke="#475569" strokeWidth="4" />
                  </svg>

                  {/* Sliding Plastic Cup */}
                  <div 
                    className="absolute bottom-0 w-10 h-14 border-t-2 border-x-2 border-slate-400/80 bg-slate-200/25 rounded-t-xl transition-all duration-300 flex items-center justify-center text-[9px] text-slate-400"
                    style={{
                      left: `${280 + (cupDistanceCm / 250) * 180}px`,
                      bottom: '8px'
                    }}
                  >
                    <div className="rotate-90 font-bold">كأس ص 63</div>
                    
                    {/* Distance label above the cup */}
                    {cupDistanceCm > 0 && (
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[9px] font-mono whitespace-nowrap shadow-md">
                        {cupDistanceCm} سم إزاحة
                      </div>
                    )}
                  </div>

                  {/* Moving Ball rolling down the ramp */}
                  {isBallRolling && (
                    <div 
                      className={`absolute w-5 h-5 rounded-full ${selectedRampBall === 'glass' ? 'bg-cyan-500/90 border border-cyan-300' : 'bg-slate-400 border border-slate-100'} shadow-lg z-20`}
                      style={{
                        // 280px is the ramp width
                        left: rollProgress < 0.6 
                          ? `${(rollProgress / 0.6) * 280}px` 
                          : `${280 + ((rollProgress - 0.6) / 0.4) * ((cupDistanceCm / 250) * 180)}px`,
                        
                        bottom: rollProgress < 0.6
                          ? `${8 + (1.0 - (rollProgress / 0.6)) * (rampHeightCm * 2.5) * positionMultiplier}px`
                          : '8px'
                      }}
                    />
                  )}

                  {/* Rested Ball after impact */}
                  {!isBallRolling && cupDistanceCm > 0 && (
                    <div 
                      className={`absolute w-5 h-5 rounded-full ${selectedRampBall === 'glass' ? 'bg-cyan-500/90 border border-cyan-300' : 'bg-slate-400 border border-slate-100'} shadow-md`}
                      style={{
                        left: `${280 + (cupDistanceCm / 250) * 180 - 15}px`,
                        bottom: '8px'
                      }}
                    />
                  )}

                </div>

                {/* Ground Ruler Coordinate Tape */}
                <div className="w-full h-8 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-3 text-[10px] font-mono text-slate-400 select-none">
                  <div className="flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-blue-400" />
                    <span>مسافة زحف الكأس المقيسة بالمسطرة:</span>
                  </div>
                  <span className="text-emerald-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {cupDistanceCm > 0 ? `${cupDistanceCm} سم` : '0 سم'}
                  </span>
                </div>

              </div>

              {/* Automatic Observation log */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs space-y-1">
                <span className="font-bold text-amber-400">الملاحظة المسجلة حالياً:</span>
                <p className="text-slate-300 leading-relaxed font-mono">
                  {activeRampObservation || 'لم يتم إفلات الكرة بعد. اضبط خيارات الكتلة والارتفاع ثم اضغط زر "إفلات الكرة لتنزلق".'}
                </p>
              </div>

            </div>

            {/* Right Column: Interactive Variables controls */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>إعدادات الفحص والمتغيرات (الخطوات 1-5):</span>
              </h3>

              {/* Variable 1: Ball Type / Mass */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">اختر نوع كتلة الكرة (الخطوات 1-5):</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setSelectedRampBall('glass');
                      setCupDistanceCm(0);
                      setWeighedValue(null);
                      setActiveRampObservation('');
                    }}
                    className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      selectedRampBall === 'glass'
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 ring-2 ring-cyan-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    <span className="font-bold text-xs">كرة زجاجية صغيرة 🔵</span>
                    <span className="text-[10px] text-cyan-400 mt-1">الكتلة: 15 غرام (كتلة أقل)</span>
                  </button>

                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setSelectedRampBall('steel');
                      setCupDistanceCm(0);
                      setWeighedValue(null);
                      setActiveRampObservation('');
                    }}
                    className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      selectedRampBall === 'steel'
                        ? 'bg-slate-800 border-slate-500 text-slate-200 ring-2 ring-slate-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    <span className="font-bold text-xs">كرة فولاذية ثقيلة 🔘</span>
                    <span className="text-[10px] text-slate-400 mt-1">الكتلة: 85 غرام (كتلة أكبر)</span>
                  </button>
                </div>
              </div>

              {/* Variable 2: Ramp Height (addresses step 9: "أثر تغيير الارتفاع الرأسي") */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-300">تعديل الارتفاع الرأسي للمنحدر (خطوة 9):</span>
                  <span className="font-mono text-amber-400 font-bold bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">{rampHeightCm} سم</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="5"
                  value={rampHeightCm}
                  onChange={(e) => {
                    setRampHeightCm(Number(e.target.value));
                    setCupDistanceCm(0);
                    setActiveRampObservation('');
                  }}
                  className="w-full accent-amber-500 bg-slate-950 h-2.5 rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-slate-400">يؤدي تغيير الارتفاع إلى زيادة/تقليل طاقة الوضع الجاذبية المختزنة بالكرة.</p>
              </div>

              {/* Variable 3: Release Position */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">نقطة إفلات الكرة من السكون:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setReleasePosition('top');
                      setCupDistanceCm(0);
                      setActiveRampObservation('');
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      releasePosition === 'top'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    أعلى المنحدر (100% الارتفاع)
                  </button>

                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setReleasePosition('middle');
                      setCupDistanceCm(0);
                      setActiveRampObservation('');
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      releasePosition === 'middle'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    منتصف المنحدر (50% الارتفاع)
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Book questions and answers for Ramp experiment ص 63 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>تفسير واستنتاج أسئلة نشاط كتلة وحركة الجسم ص 63 في الكتاب المدرسي:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1.5">
                <span className="font-bold text-rose-400">الخطوة 6: تفسير اندفاع الكأس</span>
                <p className="text-slate-300">
                  تندفع الكأس البلاستيكية للأمام عند اصطدام الكرة بها بسبب انتقال <strong>الطاقة الحركية (Kinetic Energy)</strong> من الكرة المتحركة إلى الكأس الساكن، مما يؤدي لبذل شغل ميكانيكي يدفع الكأس للتغلب على الاحتكاك والانزلاق لمسافة معينة.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1.5">
                <span className="font-bold text-emerald-400">الخطوة 7: استنتاج العلاقة مع الكتلة</span>
                <p className="text-slate-300">
                  نستنتج وجود <strong>علاقة طردية</strong>؛ فكلما زادت كتلة الكرة (الكرة الفولاذية 85غ مقارنة بالزجاجية 15غ) زادت طاقتها الحركية عند وصولها لأسفل المنحدر، وبالتالي اندفعت الكأس مسافة أكبر بكثير (الكرة الفولاذية تزاح لمسافة أطول بـ 5-6 أضعاف).
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1.5">
                <span className="font-bold text-cyan-400">الخطوة 9: تصميم نشاط تغير الارتفاع</span>
                <p className="text-slate-300">
                  عند تثبيت الكرة (الفولاذية مثلاً) وتغيير الارتفاع الرأسي للمنحدر (تعديله من 10سم إلى 30سم)، نلاحظ زيادة طردية في مسافة إزاحة الكأس. التفسير: زيادة الارتفاع الرأسي يزيد طاقة الوضع الجاذبية الكامنة في الكرة والتي تتحول لسرعة وطاقة حركية أكبر في النهاية.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =================================================================== */}
      {/* SUB-TAB 3: GEAR MOVEMENT (نشاط حركة التروس ص 71) */}
      {/* =================================================================== */}
      {subTab === 'gears_machines' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Card Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                  الوحدة الثانية - تجربة عملية ص 71
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-1">نشاط استكشاف حركة التروس المسننة ونقل الحركة الدورانية</h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="font-bold text-slate-400">أدوات النموذج الورقي ص 71:</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">كرتون سميك كقاعدة</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">دبابيس تثبيت</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-amber-400">الترس الأكبر (30 سن)</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-orange-400">المتوسط (15 سن)</span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-400">الصغير (10 أسنان)</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>فكرة النشاط ص 71:</strong> نقوم بقص نماذج تروس كرتونية مسننة ووضع علامة على أحد أسنان كل ترس لتحديد نقطة بداية الحركة. عند تدوير الترس الكبير دورة كاملة نراقب اتجاه دوران التروس الأخرى وعدد الدورات التي تكملها لنتعلم أهمية التروس في الآلات ونقل الطاقة ميكانيكياً.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Interactive SVG Gears Area */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-slate-200">التروس الكرتونية التفاعلية وعلامات التعشيق (الخطوات 2-5):</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleRotateGears(1, 'cw')}
                    disabled={isGearsRotating}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <span>أدر دورة مع العقارب ↻</span>
                  </button>

                  <button
                    onClick={() => handleRotateGears(1, 'ccw')}
                    disabled={isGearsRotating}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 border border-slate-700 transition-all"
                  >
                    <span>أدر دورة عكس العقارب ↺</span>
                  </button>

                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setBigGearTurns(0);
                      setActiveGearObservation('');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-850 text-xs font-mono"
                    title="إعادة تصفير العداد"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Gears Simulation Box */}
              <div className="relative w-full h-80 bg-slate-950 rounded-2xl border border-slate-850 flex items-center justify-center p-4 overflow-hidden">
                
                {/* Background wood table texture */}
                <div className="absolute inset-0 bg-amber-950/5 [background-image:radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950"></div>
                
                {/* Rectangular Cardboard Base Plate ص 71 */}
                <div className="absolute w-[92%] h-[82%] bg-amber-900/10 border-2 border-amber-800/35 rounded-xl shadow-inner flex items-center justify-center pointer-events-none">
                  <span className="absolute bottom-2 right-4 text-[9px] text-amber-600 font-mono font-bold">لوحة الكرتون السميك ص 71</span>
                </div>

                {/* Simulated Gear Train */}
                <div className="relative flex items-center gap-0 z-10 w-full justify-center max-w-lg">
                  
                  {/* GEAR 1: BIG GEAR (الترس الأكبر - 30 teeth) */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      {/* Rotating Outer Ring representing teeth */}
                      <div 
                        className="absolute inset-0 border-8 border-dashed border-sky-500 rounded-full flex items-center justify-center transition-all"
                        style={{
                          transform: isGearsRotating 
                            ? `rotate(${rotationDirection === 'cw' ? gearsRotationProgress * 360 : -gearsRotationProgress * 360}deg)`
                            : `rotate(${rotationDirection === 'cw' ? bigGearTurns * 360 : -bigGearTurns * 360}deg)`
                        }}
                      >
                        {/* Blue Mark Dot on one of the teeth (الخطوة 1: أرسم علامة على أحد المسننات) */}
                        <div className="absolute top-0 -mt-2 w-3.5 h-3.5 bg-blue-300 border-2 border-slate-950 rounded-full shadow-lg" title="علامة المسنن ص 71" />
                        
                        {/* Internal spokes for cardboard look */}
                        <div className="w-full h-1 bg-sky-600/40 absolute"></div>
                        <div className="h-full w-1 bg-sky-600/40 absolute"></div>
                      </div>

                      {/* Cardboard Center body */}
                      <div className="w-28 h-28 rounded-full bg-sky-950/90 border-4 border-sky-500 flex flex-col items-center justify-center text-center shadow-lg">
                        <span className="text-[10px] text-sky-400 font-bold">الترس الأكبر</span>
                        <span className="font-mono text-xs font-bold text-slate-100">{bigGearTeeth} سن</span>
                        
                        {/* Pin Center (دبابيس التثبيت والقلم ص 71) */}
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-600 shadow-md mt-1 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg text-center font-mono text-[10px] text-slate-300">
                      الدورات: <span className="text-sky-400 font-bold">{bigGearTurns}</span>
                    </div>
                  </div>

                  {/* Connecting Line indicating teeth mesh */}
                  <div className="w-2 h-1 bg-orange-500/30 -mx-1 z-20"></div>

                  {/* GEAR 2: MEDIUM GEAR (الترس المتوسط - 15 teeth) */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      {/* Rotating Outer Ring representing teeth */}
                      <div 
                        className="absolute inset-0 border-6 border-dashed border-orange-500 rounded-full flex items-center justify-center transition-all"
                        style={{
                          // Directions: Medium gear spins in opposite direction of Big gear
                          transform: isGearsRotating 
                            ? `rotate(${rotationDirection === 'cw' ? -gearsRotationProgress * 360 * 2 : gearsRotationProgress * 360 * 2}deg)`
                            : `rotate(${rotationDirection === 'cw' ? -bigGearTurns * 360 * 2 : bigGearTurns * 360 * 2}deg)`
                        }}
                      >
                        {/* Orange Mark Dot on tooth */}
                        <div className="absolute top-0 -mt-1.5 w-3 h-3 bg-orange-300 border border-slate-950 rounded-full shadow" />
                        
                        <div className="w-full h-1 bg-orange-600/40 absolute"></div>
                        <div className="h-full w-1 bg-orange-600/40 absolute"></div>
                      </div>

                      {/* Cardboard Center body */}
                      <div className="w-16 h-16 rounded-full bg-orange-950/90 border-4 border-orange-500 flex flex-col items-center justify-center text-center shadow-md">
                        <span className="text-[8px] text-orange-400 font-bold">المتوسط</span>
                        <span className="font-mono text-[10px] text-slate-100">{mediumGearTeeth} سن</span>
                        
                        {/* Pin Center */}
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-600 shadow" />
                      </div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg text-center font-mono text-[10px] text-slate-300">
                      الدورات: <span className="text-orange-400 font-bold">{mediumGearTurnsResult}</span>
                    </div>
                  </div>

                  {/* GEAR 3: SMALL GEAR (الترس الصغير - 10 teeth) - Visible only if 3gears selected */}
                  {gearSystem === '3gears' && (
                    <>
                      <div className="w-2 h-1 bg-emerald-500/30 -mx-1 z-20"></div>
                      
                      <div className="flex flex-col items-center gap-2 animate-fade-in">
                        <div className="relative w-18 h-18 flex items-center justify-center">
                          {/* Rotating Outer Ring */}
                          <div 
                            className="absolute inset-0 border-4 border-dashed border-emerald-500 rounded-full flex items-center justify-center transition-all"
                            style={{
                              // Directions: Small gear spins in the opposite of Medium, which is same as Big!
                              transform: isGearsRotating 
                                ? `rotate(${rotationDirection === 'cw' ? gearsRotationProgress * 360 * 3 : -gearsRotationProgress * 360 * 3}deg)`
                                : `rotate(${rotationDirection === 'cw' ? bigGearTurns * 360 * 3 : -bigGearTurns * 360 * 3}deg)`
                            }}
                          >
                            {/* Green Mark Dot on tooth */}
                            <div className="absolute top-0 -mt-1 w-2.5 h-2.5 bg-emerald-300 border border-slate-950 rounded-full shadow" />
                            
                            <div className="w-full.5 h-0.5 bg-emerald-600/40 absolute"></div>
                            <div className="h-full w-0.5 bg-emerald-600/40 absolute"></div>
                          </div>

                          {/* Center Body */}
                          <div className="w-12 h-12 rounded-full bg-emerald-950/90 border-2 border-emerald-500 flex flex-col items-center justify-center text-center shadow">
                            <span className="text-[7px] text-emerald-400 font-bold leading-none">الصغير</span>
                            <span className="font-mono text-[9px] text-slate-100 mt-0.5">{smallGearTeeth} سن</span>
                            
                            <div className="w-2 h-2 rounded-full bg-slate-400 border border-slate-600 shadow" />
                          </div>
                        </div>

                        <div className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg text-center font-mono text-[10px] text-slate-300">
                          الدورات: <span className="text-emerald-400 font-bold">{smallGearTurnsResult}</span>
                        </div>
                      </div>
                    </>
                  )}

                </div>

                {/* Legend indicator */}
                <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-[10px] space-y-1 text-slate-400">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                    <span>علامة الترس الأكبر (30 سن)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-orange-300"></div>
                    <span>علامة الترس المتوسط (15 سن)</span>
                  </div>
                  {gearSystem === '3gears' && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-300"></div>
                      <span>علامة الترس الصغير (10 أسنان)</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Automatic Observation log */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs space-y-1">
                <span className="font-bold text-amber-400">الملاحظة المسجلة حالياً:</span>
                <p className="text-slate-300 leading-relaxed font-mono">
                  {activeGearObservation || 'لم يتم تدوير التروس بعد. حدد النظام واضغط تدوير لتسجيل ملاحظة التعشيق.'}
                </p>
              </div>

            </div>

            {/* Right Variables Controls Panel */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>إعدادات نظام التروس (خطوات 3-5):</span>
              </h3>

              {/* Variable 1: Gear system configuration */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">حدد تكوين نظام التروس:</span>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setGearSystem('2gears');
                      setBigGearTurns(0);
                      setActiveGearObservation('');
                    }}
                    className={`p-3 rounded-xl border text-right transition-all flex justify-between items-center ${
                      gearSystem === '2gears'
                        ? 'bg-amber-950/50 border-amber-500 text-amber-200 ring-2 ring-amber-500/30'
                        : 'bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs block">ترسان (كبير + متوسط) (الخطوة 3)</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">ترس 30 سن يدفع ترس 15 سن ميكانيكياً.</span>
                    </div>
                    <span className="text-xs">⚙️⚙️</span>
                  </button>

                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setGearSystem('3gears');
                      setBigGearTurns(0);
                      setActiveGearObservation('');
                    }}
                    className={`p-3 rounded-xl border text-right transition-all flex justify-between items-center ${
                      gearSystem === '3gears'
                        ? 'bg-amber-950/50 border-amber-500 text-amber-200 ring-2 ring-amber-500/30'
                        : 'bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs block">ثلاثة تروس (كبير+متوسط+صغير) (الخطوة 5)</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">ترس 30 سن يدفع 15 سن يدفع 10 أسنان.</span>
                    </div>
                    <span className="text-xs">⚙️⚙️⚙️</span>
                  </button>
                </div>
              </div>

              {/* Physical Rules and math indicator */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-amber-500" />
                  <span>المعادلة الميكانيكية للتروس:</span>
                </h4>
                
                <div className="text-[10px] font-mono text-slate-300 leading-relaxed space-y-1">
                  <p>• <span className="text-sky-400">النسبة (كبير : متوسط)</span> = 30 / 15 = <span className="text-amber-400 font-bold">2.0</span> (دورات مضاعفة)</p>
                  <p>• <span className="text-emerald-400">النسبة (كبير : صغير)</span> = 30 / 10 = <span className="text-amber-400 font-bold">3.0</span> (دورات متضاعفة ثلاثاً)</p>
                  <p className="border-t border-slate-800 pt-1.5 text-slate-400">تدور التروس المتشابكة باتجاهات متعاكسة. الترس الوسيط يعيد اتجاه الدوران للأصل.</p>
                </div>
              </div>

            </div>

          </div>

          {/* Book questions and answers for Gears ص 71 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>تحليل واستنتاج أسئلة نشاط حركة التروس ص 71 في الكتاب المدرسي:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
              <div className="bg-slate-950 border border-slate-855 p-4 rounded-xl space-y-1.5">
                <span className="font-bold text-rose-400">الخطوة 6: كيف تنتقل الحركة ميكانيكياً؟</span>
                <p className="text-slate-300">
                  تنتقل الحركة الدورانية من ترس إلى آخر بالتلامس المباشر والتعشيق بين أسنان التروس المتجاورة؛ حيث تدفع أسنان الترس القائد أسنان الترس التابع ليدور بالاتجاه المعاكس فوراً.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-855 p-4 rounded-xl space-y-1.5">
                <span className="font-bold text-emerald-400">الخطوة 7: مقارنة عدد الدورات</span>
                <p className="text-slate-300">
                  عندما يكمل الترس الكبير (30 سن) <strong>دورة واحدة</strong>، يكمل الترس المتوسط (15 سن) <strong>دورتين كاملتين</strong> (بالاتجاه المعاكس)، ويكمل الترس الصغير (10 أسنان) <strong>3 دورات كاملة</strong> (بنفس اتجاه الترس الكبير).
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-855 p-4 rounded-xl space-y-1.5">
                <span className="font-bold text-cyan-400">الخطوة 8: أهمية التروس في الآلات</span>
                <p className="text-slate-300">
                  تكمن أهمية التروس في: 1) نقل الحركة الدورانية والطاقة لمسافات أخرى، 2) تغيير اتجاه الدوران (مع أو عكس العقارب)، 3) التحكم في سرعة الدوران وقوته (تكبير العزم أو مضاعفة السرعة لتسهيل الشغل).
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
