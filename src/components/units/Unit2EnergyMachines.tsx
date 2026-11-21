import React, { useState, useEffect } from 'react';
import {
  Target,
  Scale,
  Cog,
  Play,
  RotateCcw,
  Ruler,
  Sparkles,
} from 'lucide-react';
import { Unit2SubView } from '../../types';
import { GearSimulationActivity } from './GearSimulationActivity';

interface Unit2EnergyMachinesProps {
  onEarnPoints: (pts: number) => void;
  playSound: () => void;
  initialSubView?: Unit2SubView;
}

export const Unit2EnergyMachines: React.FC<Unit2EnergyMachinesProps> = ({
  onEarnPoints,
  playSound,
  initialSubView = 'catapult',
}) => {
  const [activeTab, setActiveTab] = useState<Unit2SubView>(initialSubView);

  useEffect(() => {
    if (initialSubView) {
      setActiveTab(initialSubView);
    }
  }, [initialSubView]);

  // =========================================================
  // Activity 1 State: Mechanical Energy Transformations (ص 57)
  // =========================================================
  const [pressLevel, setPressLevel] = useState<number>(3); // 1 to 5
  const [projectileType, setProjectileType] = useState<'tennis' | 'pingpong' | 'rubber'>('tennis');
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [catapultDistance, setCatapultDistance] = useState<number>(0);
  const [catapultObservation, setCatapultObservation] = useState<string>(
    'لم يتم إطلاق أي مقذوف بعد. قم بضبط المتغيرات واضغط زر الإطلاق لتسجيل الملاحظة.'
  );

  const projectileSpecs = {
    tennis: { name: 'كرة تنس (قياسية)', mass: 57, color: 'bg-lime-400 border-lime-200' },
    pingpong: { name: 'كرة تنس طاولة (خفيفة)', mass: 3, color: 'bg-orange-300 border-white' },
    rubber: { name: 'كرة مطاطية (ثقيلة)', mass: 85, color: 'bg-cyan-400 border-cyan-200' },
  };

  const currentProjectile = projectileSpecs[projectileType];
  // Elastic potential energy stored (Joules): 0.030 * pressLevel^2
  const elasticEnergy = Number((0.03 * pressLevel * pressLevel).toFixed(3));
  // Theoretical speed v = sqrt(2 * E / m_kg), scaled realistically to textbook demo (~3.08 m/s for tennis ball at level 3)
  const launchSpeed = Number(Math.sqrt((2 * elasticEnergy) / (currentProjectile.mass / 1000)).toFixed(2));

  const handleLaunchCatapult = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    playSound();

    // Realistic distance in cm along ruler
    const computedDist = Math.round((elasticEnergy * 620) / Math.pow(currentProjectile.mass / 57, 0.45));

    setTimeout(() => {
      setCatapultDistance(computedDist);
      setCatapultObservation(
        `تم ضغط الملعقة واختزان ${elasticEnergy.toFixed(3)} جول من طاقة الوضع المرونية، وعند إفلاتها تحولت إلى طاقة حركية انطلقت بها الكرة (${currentProjectile.mass} غرام) بسرعة ${launchSpeed.toFixed(2)} م/ث لتقطع مسافة ${computedDist} سم على المسطرة.`
      );
      onEarnPoints(10);
    }, 350);

    setTimeout(() => {
      setIsLaunching(false);
    }, 1100);
  };

  const handleResetCatapult = () => {
    playSound();
    setCatapultDistance(0);
    setIsLaunching(false);
    setCatapultObservation(
      'لم يتم إطلاق أي مقذوف بعد. قم بضبط المتغيرات واضغط زر الإطلاق لتسجيل الملاحظة.'
    );
  };

  // =========================================================
  // Activity 2 State: Kinetic Energy & Body Mass (ص 63)
  // =========================================================
  const [ballType, setBallType] = useState<'glass' | 'steel'>('glass');
  const [rampHeight, setRampHeight] = useState<number>(20); // 10 - 30 cm
  const [releasePoint, setReleasePoint] = useState<'top' | 'mid'>('top');
  const [isBallOnScale, setIsBallOnScale] = useState<boolean>(false);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [hasRolled, setHasRolled] = useState<boolean>(false);
  const [cupDistance, setCupDistance] = useState<number>(0);
  const [rampObservation, setRampObservation] = useState<string>(
    'لم يتم إفلات الكرة بعد. اضبط خيارات الكتلة والارتفاع ثم اضغط زر "إفلات الكرة لتنزلق".'
  );

  const selectedBallMass = ballType === 'glass' ? 15 : 85;

  const handleWeighBall = () => {
    playSound();
    setIsBallOnScale(true);
    onEarnPoints(5);
  };

  const handleSelectBallType = (type: 'glass' | 'steel') => {
    playSound();
    setBallType(type);
    setHasRolled(false);
    setCupDistance(0);
  };

  const handleReleaseBall = () => {
    if (isRolling) return;
    setIsRolling(true);
    setHasRolled(false);
    playSound();

    const effectiveHeight = releasePoint === 'top' ? rampHeight : rampHeight * 0.5;
    // Kinetic energy proportional to mass * height -> slides cup farther
    const computedSlide = Math.round((selectedBallMass / 15) * (effectiveHeight / 20) * 14);

    setTimeout(() => {
      setCupDistance(computedSlide);
      setHasRolled(true);
      setIsRolling(false);
      setRampObservation(
        `انزلقت ${ballType === 'glass' ? 'الكرة الزجاجية (15 غرام)' : 'الكرة الفولاذية (85 غرام)'} من ${
          releasePoint === 'top' ? 'أعلى المنحدر (100%)' : 'منتصف المنحدر (50%)'
        } بارتفاع ${effectiveHeight} سم، ودفعت الكأس البلاستيكي لمسافة ${computedSlide} سم. الاستنتاج: كلما زادت كتلة الجسم أو ارتفاعه زادت طاقته الحركية!`
      );
      onEarnPoints(10);
    }, 750);
  };

  const handleResetRamp = () => {
    playSound();
    setHasRolled(false);
    setIsRolling(false);
    setCupDistance(0);
    setRampObservation(
      'لم يتم إفلات الكرة بعد. اضبط خيارات الكتلة والارتفاع ثم اضغط زر "إفلات الكرة لتنزلق".'
    );
  };

  return (
    <div className="space-y-5">
      {/* Top 3 Unit 2 Activity Navigation Pills ONLY (matching Screenshot dd5fa9bd.png) */}
      <div className="flex flex-col gap-2 items-end sm:items-center">
        <div className="w-full flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-2">
          <button
            onClick={() => {
              setActiveTab('catapult');
              playSound();
            }}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition border ${
              activeTab === 'catapult'
                ? 'bg-amber-500 border-amber-300 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700/80 text-slate-300'
            }`}
          >
            <span>1. نشاط: تحولات الطاقة الميكانيكية (ص 57)</span>
            <Target className="w-4 h-4 text-rose-500" />
          </button>

          <button
            onClick={() => {
              setActiveTab('kinetic');
              playSound();
            }}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition border ${
              activeTab === 'kinetic'
                ? 'bg-amber-500 border-amber-300 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700/80 text-slate-300'
            }`}
          >
            <span>2. نشاط: الطاقة الحركية وكتلة الجسم (ص 63)</span>
            <Scale className="w-4 h-4 text-cyan-400" />
          </button>

          <button
            onClick={() => {
              setActiveTab('gears');
              playSound();
            }}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition border ${
              activeTab === 'gears'
                ? 'bg-amber-500 border-amber-300 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'bg-[#0e1834] hover:bg-[#14234b] border-slate-700/80 text-slate-300'
            }`}
          >
            <span>3. نشاط: حركة التروس ونقل الحركة (ص 71)</span>
            <Cog className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>

      {/* Divider line */}
      <div className="h-px bg-[#152349]" />

      {/* ==================================================================== */}
      {/* TAB 1: Mechanical Energy Transformations - Ball Launcher (ص 57)      */}
      {/* ==================================================================== */}
      {activeTab === 'catapult' && (
        <div className="space-y-5">
          {/* Intro Card matching Screenshot dd5fa9bd.png */}
          <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl">
            <div className="flex justify-end mb-3">
              <span className="bg-[#2b1f09] border border-amber-500/40 text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full">
                الدرس الأول: الطاقة الميكانيكية - تجربة عملية ص 57
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-white leading-snug mb-4">
              نموذج قاذف كرات التنس (عيدان خشبية وملعقة)
            </h2>

            {/* Materials Row */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-slate-400 font-bold">المواد والأدوات المستخدمة:</span>
                <span className="bg-[#0a1226] border border-slate-700/80 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-xl">
                  7 عيدان خشبية
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="bg-[#0a1226] border border-slate-700/80 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-xl">
                  أربطة مطاطية
                </span>
                <span className="bg-[#0a1226] border border-slate-700/80 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-xl">
                  ملعقة بلاستيكية
                </span>
                <span className="bg-[#0a1226] border border-slate-700/80 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-xl">
                  كرة تنس ومسطرة
                </span>
              </div>
            </div>

            <div className="h-px bg-[#152349] my-4" />

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="text-amber-400 font-bold">فكرة النشاط: </span>
              نقوم ببناء نموذج اللعبة كما هو موضح بالصورة في الكتاب باستخدام عيدان الخشب كقاعدة ورافعة، والمطاط لتثبيت الملعقة وخزن الطاقة. عند ضغط الملعقة للأسفل تختزن{' '}
              <span className="text-white font-bold">طاقة وضع مرونية</span>، وعند إفلاتها تتحول فجأة إلى{' '}
              <span className="text-white font-bold">طاقة حركية</span> تنطلق بها كرة التنس لمسافة نقيسها بالمسطرة.
            </p>
          </div>

          {/* Launch Simulator Card matching Screenshot 5277c7a5.png */}
          <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-4 sm:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#152349]">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLaunchCatapult}
                  disabled={isLaunching}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 transition active:scale-95 disabled:opacity-60"
                >
                  <Target className="w-4 h-4" />
                  <span>اضغط الملعقة للأسفل وأفلتها! 🚀</span>
                </button>

                <button
                  onClick={handleResetCatapult}
                  title="إعادة الضبط"
                  className="w-10 h-10 rounded-xl bg-[#0e1936] hover:bg-[#162752] border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-sm sm:text-base font-black text-white leading-snug">
                شاشة محاكاة إطلاق الكرة وقراءة مسطرة القياس:
              </h3>
            </div>

            {/* Simulation Grid Area */}
            <div className="mt-4 relative rounded-2xl bg-[#060d1f] border border-[#1b2b54] p-4 sm:p-5 overflow-hidden min-h-[300px] flex flex-col justify-between">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#111d3c_1px,transparent_1px),linear-gradient(to_bottom,#111d3c_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 pointer-events-none" />

              {/* Stats Overlay Panel matching Screenshot 5277c7a5.png */}
              <div className="relative z-10 bg-[#091229]/90 border border-[#1a2b56] rounded-2xl p-3.5 sm:p-4 max-w-md space-y-2 text-xs sm:text-sm shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-300">طاقة الوضع المرونية المختزنة :</span>
                  <span className="font-mono font-black text-amber-400">{elasticEnergy.toFixed(3)} جول</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-300">سرعة انطلاق الكرة :</span>
                  <span className="font-mono font-black text-cyan-400">{launchSpeed.toFixed(2)} م/ث</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-300">كتلة المقذوف المختبر :</span>
                  <span className="font-mono font-black text-emerald-400">{currentProjectile.mass} غرام</span>
                </div>
              </div>

              {/* Catapult Visual Track */}
              <div className="relative z-10 h-32 flex items-end justify-between px-4 sm:px-8 mt-4 mb-2" dir="ltr">
                {/* Wooden Sticks + Spoon Lever */}
                <div className="relative flex flex-col items-center">
                  {/* Rotating Spoon */}
                  <div
                    className="relative origin-bottom-right transition-transform duration-300"
                    style={{
                      transform: isLaunching ? 'rotate(18deg)' : `rotate(${-15 - pressLevel * 5}deg)`,
                    }}
                  >
                    <div className="w-28 h-2.5 bg-slate-200 rounded-full border border-slate-400 shadow-md relative flex items-center">
                      {/* Spoon bowl */}
                      <div className="w-9 h-7 -ml-3 -mt-3 rounded-b-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center relative">
                        {/* Ball sitting in spoon when not launched */}
                        {!isLaunching && catapultDistance === 0 && (
                          <div className={`w-5 h-5 rounded-full border-2 ${currentProjectile.color} shadow-md`} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Craft sticks fulcrum */}
                  <div className="w-12 h-6 bg-amber-800 border border-amber-600 rounded-md -mt-2 z-10 shadow-md" />
                  {/* Craft sticks base */}
                  <div className="w-36 h-3.5 bg-amber-700 border border-amber-500 rounded-full shadow-lg" />
                </div>

                {/* Flying / Landed Ball */}
                {(isLaunching || catapultDistance > 0) && (
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${currentProjectile.color} shadow-lg transition-all duration-700`}
                    style={{
                      transform: isLaunching
                        ? 'translate(140px, -65px)'
                        : `translate(${Math.min(180, catapultDistance * 0.9)}px, 0px)`,
                    }}
                  />
                )}
              </div>

              {/* Ruler Readout Bar at bottom of box */}
              <div className="relative z-10 bg-emerald-950/70 border border-emerald-500/40 rounded-xl px-4 py-2 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-amber-300 bg-[#071124] px-3 py-1 rounded-lg border border-amber-500/30">
                  {catapultDistance} سم
                </span>
                <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                  <span>المسافة المقطوعة بالمسطرة :</span>
                  <Ruler className="w-4 h-4 text-amber-400" />
                </span>
              </div>
            </div>

            {/* Observation Box */}
            <div className="mt-4 bg-[#070f23] border border-[#152349] rounded-2xl p-4 sm:p-5">
              <h4 className="font-bold text-amber-400 text-sm mb-1">الملاحظة المسجلة حالياً:</h4>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{catapultObservation}</p>
            </div>
          </div>

          {/* Variables Control Card for Activity 1 */}
          <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#152349] pb-3">
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>إعدادات الفحص والمتغيرات (الخطوات 2-5):</span>
              </h3>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-slate-300">مقدار ضغط الملعقة للأسفل (خزن طاقة الوضع):</span>
                <span className="font-mono text-amber-300 bg-[#091126] px-2.5 py-1 rounded-lg border border-amber-500/30">
                  المستوى {pressLevel} / 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={pressLevel}
                onChange={(e) => {
                  setPressLevel(Number(e.target.value));
                  setCatapultDistance(0);
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">اختر نوع المقذوف المختبر:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['tennis', 'pingpong', 'rubber'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setProjectileType(type);
                      setCatapultDistance(0);
                      playSound();
                    }}
                    className={`p-3 rounded-2xl border text-right transition ${
                      projectileType === type
                        ? 'bg-[#0b243b] border-cyan-400 text-white shadow-md'
                        : 'bg-[#091126] border-slate-700/80 text-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs">{projectileSpecs[type].name}</div>
                    <div className="text-[11px] text-cyan-300 font-mono mt-0.5">
                      الكتلة: {projectileSpecs[type].mass} غرام
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: Kinetic Energy & Body Mass - Ramp & Scale (ص 63)              */}
      {/* ==================================================================== */}
      {activeTab === 'kinetic' && (
        <div className="space-y-5">
          {/* Intro Card matching Screenshot 847ba2dd.png & aecab13e.png */}
          <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl">
            <div className="flex justify-end mb-3">
              <span className="bg-[#2b1f09] border border-amber-500/40 text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full">
                نشاط صف السادس - صفحة 63
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-white leading-snug mb-4">
              تجربة دحرجة الكرات على المنحدر الخشبي واصطدامها بالكأس
            </h2>

            {/* Tools Row */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-slate-400 font-bold">الأدوات:</span>
                <span className="bg-[#0a1226] border border-amber-500/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  <span>ميزان إلكتروني</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="bg-[#0a1226] border border-slate-700/80 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-xl">
                  كأس بلاستيكي
                </span>
                <span className="bg-[#0a1226] border border-slate-700/80 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-xl">
                  منحدر خشبي مع مسطرتين
                </span>
                <span className="bg-[#0a1226] border border-cyan-500/30 text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-xl">
                  كرة زجاجية / كرة فولاذية
                </span>
              </div>
            </div>

            <div className="h-px bg-[#152349] my-4" />

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="text-amber-400 font-bold">فكرة النشاط: </span>
              قياس كتلة كرتين متساويتين بالحجم ومختلفتين بالكتلة (كرة زجاجية خفيفة وكرة فولاذية ثقيلة) بالميزان، ثم تركهما تنزلقان من السكون على منحدر مائل لتصطدما بكأس بلاستيكي عند النهاية. نقيس المسافة التي يندفعها الكأس لنستنتج العلاقة بين الطاقة الحركية والكتلة (ص 63).
            </p>
          </div>

          {/* Interactive Ramp & Electronic Scale Card matching Screenshots 7a6fda50.png & aecab13e.png */}
          <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-4 sm:p-6 shadow-2xl">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#152349]">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleReleaseBall}
                  disabled={isRolling}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition active:scale-95 disabled:opacity-60"
                >
                  <span>إفلات الكرة لتنزلق (خطوات 3-5)</span>
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                </button>

                <button
                  onClick={handleWeighBall}
                  className="flex items-center gap-1.5 bg-[#111e3f] hover:bg-[#192b59] border border-amber-500/40 text-amber-300 font-bold text-xs px-3.5 py-2.5 rounded-xl transition active:scale-95"
                >
                  <span>ضع الكرة على الميزان (خطوة 1)</span>
                  <Scale className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleResetRamp}
                  title="إعادة الضبط"
                  className="w-10 h-10 rounded-xl bg-[#0e1936] hover:bg-[#162752] border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-sm sm:text-base font-black text-white leading-snug">
                المنحدر التفاعلي وجهاز الميزان الإلكتروني:
              </h3>
            </div>

            {/* Simulation Grid Container matching Screenshot 7a6fda50.png */}
            <div className="mt-4 relative rounded-2xl bg-[#060d1f] border border-[#1b2b54] p-4 sm:p-5 overflow-hidden min-h-[340px] flex flex-col justify-between">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#111d3c_1px,transparent_1px),linear-gradient(to_bottom,#111d3c_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 pointer-events-none" />

              {/* Electronic Scale Card at top */}
              <div className="relative z-10 bg-[#0a132b]/95 border border-[#1c2d5c] rounded-2xl p-4 max-w-sm self-end w-full space-y-2.5 shadow-lg">
                <div className="text-xs font-bold text-slate-200 text-right">
                  ميزان قياس كتل الكرات ص 63:
                </div>

                {/* Scale Weighing Tray */}
                <div className="h-12 rounded-xl bg-[#060c1d] border border-slate-700/80 flex items-center justify-center relative">
                  {isBallOnScale ? (
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full border-2 shadow-md ${
                          ballType === 'glass'
                            ? 'bg-blue-500 border-cyan-200'
                            : 'bg-slate-400 border-white'
                        }`}
                      />
                      <span className="text-xs text-cyan-300 font-bold">
                        {ballType === 'glass' ? 'كرة زجاجية' : 'كرة فولاذية'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500">الميزان فارغ</span>
                  )}
                </div>

                {/* Digital Weight Display */}
                <div className="rounded-xl bg-[#050a18] border border-emerald-500/30 py-2 px-3 text-center font-mono font-black text-emerald-400 text-sm">
                  {isBallOnScale ? selectedBallMass.toFixed(2) : '0.00'} غرام
                </div>
              </div>

              {/* Wooden Ramp & Sliding Cup Track */}
              <div className="relative z-10 h-32 flex items-end justify-between px-2 sm:px-6 mt-4 mb-2" dir="ltr">
                {/* Wooden Triangle Ramp */}
                <div className="relative flex items-end">
                  <svg
                    width="180"
                    height={40 + rampHeight * 2.2}
                    viewBox="0 0 180 110"
                    className="overflow-visible"
                  >
                    {/* Ramp body */}
                    <polygon
                      points={`0,${110 - (30 + rampHeight * 2.2)} 0,110 175,110`}
                      fill="#451a03"
                      fillOpacity="0.65"
                      stroke="#d97706"
                      strokeWidth="2.5"
                    />
                    {/* Dashed cyan ruler strip along ramp */}
                    <line
                      x1="0"
                      y1={106 - (30 + rampHeight * 2.2)}
                      x2="175"
                      y2="106"
                      stroke="#38bdf8"
                      strokeWidth="3"
                      strokeDasharray="4 3"
                    />
                  </svg>

                  {/* Ball on Ramp */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 shadow-lg absolute transition-all duration-700 ${
                      ballType === 'glass'
                        ? 'bg-blue-500 border-cyan-200'
                        : 'bg-slate-400 border-white'
                    }`}
                    style={{
                      left: isRolling || hasRolled ? '170px' : releasePoint === 'top' ? '4px' : '82px',
                      bottom:
                        isRolling || hasRolled
                          ? '2px'
                          : releasePoint === 'top'
                          ? `${26 + rampHeight * 2.1}px`
                          : `${12 + rampHeight * 1.05}px`,
                    }}
                  />
                </div>

                {/* Horizontal ruler track & Plastic Cup */}
                <div className="flex-1 h-1.5 bg-slate-700 relative flex items-end ml-1 rounded-full">
                  <div
                    className="w-9 h-12 bg-amber-100/90 border-2 border-amber-400 rounded-t-md flex items-center justify-center text-[9px] font-bold text-slate-900 shadow-md transition-transform duration-700 mb-1"
                    style={{
                      transform: `translateX(${Math.min(110, cupDistance * 1.1)}px)`,
                    }}
                  >
                    كأس
                  </div>
                </div>
              </div>

              {/* Ruler Readout Bar at bottom */}
              <div className="relative z-10 bg-[#0b1633]/90 border border-[#1d3061] rounded-xl px-4 py-2 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-emerald-300 bg-[#060d20] px-3 py-1 rounded-lg border border-emerald-500/30">
                  {cupDistance} سم
                </span>
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <span>مسافة زحف الكأس المقيسة بالمسطرة :</span>
                  <Ruler className="w-4 h-4 text-cyan-400" />
                </span>
              </div>
            </div>

            {/* Observation Box */}
            <div className="mt-4 bg-[#070f23] border border-[#152349] rounded-2xl p-4 sm:p-5">
              <h4 className="font-bold text-amber-400 text-sm mb-1">الملاحظة المسجلة حالياً:</h4>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{rampObservation}</p>
            </div>
          </div>

          {/* Settings & Variables Card matching Screenshot 63e0c0d0.png */}
          <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#152349] pb-3">
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>إعدادات الفحص والمتغيرات (الخطوات 1-5):</span>
              </h3>
            </div>

            {/* Ball Mass Type */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2.5">
                اختر نوع كتلة الكرة (الخطوات 1-5):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleSelectBallType('glass')}
                  className={`p-3.5 rounded-2xl border text-right transition flex items-center justify-between ${
                    ballType === 'glass'
                      ? 'bg-[#092438] border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400/40'
                      : 'bg-[#091126] hover:bg-[#0e1938] border-slate-700/80 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-black text-sm text-white">كرة زجاجية صغيرة</div>
                    <div className="text-xs text-cyan-300 mt-0.5">الكتلة: 15 غرام (كتلة أقل)</div>
                  </div>
                  <span className="w-4 h-4 rounded-full bg-blue-500 border border-cyan-200 flex-shrink-0" />
                </button>

                <button
                  onClick={() => handleSelectBallType('steel')}
                  className={`p-3.5 rounded-2xl border text-right transition flex items-center justify-between ${
                    ballType === 'steel'
                      ? 'bg-[#092438] border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400/40'
                      : 'bg-[#091126] hover:bg-[#0e1938] border-slate-700/80 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-black text-sm text-white">كرة فولاذية ثقيلة</div>
                    <div className="text-xs text-slate-400 mt-0.5">الكتلة: 85 غرام (كتلة أكبر)</div>
                  </div>
                  <span className="w-4 h-4 rounded-full bg-slate-400 border border-white flex-shrink-0" />
                </button>
              </div>
            </div>

            {/* Ramp Height Slider (Step 9) */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-slate-300">تعديل الارتفاع الرأسي للمنحدر (خطوة 9):</span>
                <span className="font-mono text-amber-300 bg-[#091126] px-3 py-1 rounded-lg border border-amber-500/30">
                  {rampHeight} سم
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="5"
                value={rampHeight}
                onChange={(e) => {
                  setRampHeight(Number(e.target.value));
                  setHasRolled(false);
                  setCupDistance(0);
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">
                يؤدي تغيير الارتفاع إلى زيادة/تقليل طاقة الوضع الجاذبية المختزنة بالكرة.
              </p>
            </div>

            {/* Ball Release Point */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2.5">
                نقطة إفلات الكرة من السكون:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setReleasePoint('top');
                    setHasRolled(false);
                    setCupDistance(0);
                    playSound();
                  }}
                  className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-black transition ${
                    releasePoint === 'top'
                      ? 'bg-amber-500 border-amber-300 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-[#091126] border-slate-700/80 text-slate-300'
                  }`}
                >
                  أعلى المنحدر (100% الارتفاع)
                </button>

                <button
                  onClick={() => {
                    setReleasePoint('mid');
                    setHasRolled(false);
                    setCupDistance(0);
                    playSound();
                  }}
                  className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-black transition ${
                    releasePoint === 'mid'
                      ? 'bg-amber-500 border-amber-300 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-[#091126] border-slate-700/80 text-slate-300'
                  }`}
                >
                  منتصف المنحدر (50% الارتفاع)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: Gears Movement & Rotation Transfer (ص 71)                     */}
      {/* ==================================================================== */}
      {activeTab === 'gears' && (
        <GearSimulationActivity onEarnPoints={onEarnPoints} playSound={playSound} />
      )}
    </div>
  );
};
