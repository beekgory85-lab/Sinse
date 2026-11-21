import React, { useState } from 'react';
import { RotateCw, RotateCcw, Sparkles, HelpCircle, Settings, Activity } from 'lucide-react';

interface GearSimulationActivityProps {
  onEarnPoints?: (pts: number) => void;
  playSound?: () => void;
}

export const GearSimulationActivity: React.FC<GearSimulationActivityProps> = ({
  onEarnPoints,
  playSound,
}) => {
  // Configuration: 2 gears (large + medium) OR 3 gears (large + medium + small)
  const [gearCount, setGearCount] = useState<2 | 3>(3);

  // Rotation angles
  // Large: 30 teeth, Medium: 15 teeth (ratio 2.0), Small: 10 teeth (ratio 3.0)
  const [largeAngle, setLargeAngle] = useState<number>(0);
  const [mediumAngle, setMediumAngle] = useState<number>(0);
  const [smallAngle, setSmallAngle] = useState<number>(0);

  const [largeTurns, setLargeTurns] = useState<number>(0);
  const [mediumTurns, setMediumTurns] = useState<number>(0);
  const [smallTurns, setSmallTurns] = useState<number>(0);

  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [observation, setObservation] = useState<string>(
    'لم يتم تدوير التروس بعد. حدد النظام واضغط تدوير لتسجيل ملاحظة التعشيق.'
  );

  const handleRotate = (direction: 'cw' | 'ccw') => {
    if (isRotating) return;
    setIsRotating(true);
    playSound?.();

    const sign = direction === 'cw' ? 1 : -1;
    // Large turns 1 full cycle (360°), Medium turns 2 cycles (-720°), Small turns 3 cycles (+1080°)
    const nextLargeAngle = largeAngle + sign * 360;
    const nextMediumAngle = mediumAngle - sign * 720;
    const nextSmallAngle = smallAngle + sign * 1080;

    const nextLargeTurns = largeTurns + 1;
    const nextMediumTurns = mediumTurns + 2;
    const nextSmallTurns = smallTurns + 3;

    setLargeAngle(nextLargeAngle);
    setMediumAngle(nextMediumAngle);
    setSmallAngle(nextSmallAngle);
    setLargeTurns(nextLargeTurns);
    setMediumTurns(nextMediumTurns);
    setSmallTurns(nextSmallTurns);

    const dirLabel = direction === 'cw' ? 'مع عقارب الساعة' : 'عكس عقارب الساعة';
    const oppDirLabel = direction === 'cw' ? 'عكس عقارب الساعة' : 'مع عقارب الساعة';

    if (gearCount === 2) {
      setObservation(
        `دار الترس الأكبر (30 سن) دورة واحدة ${dirLabel}، فدفع الترس المتوسط (15 سن) ليدور دورتين كاملتين ${oppDirLabel} (نسبة التعشيق 2:1).`
      );
    } else {
      setObservation(
        `دار الترس الأكبر (30 سن) دورة واحدة ${dirLabel}، فدار الترس المتوسط (15 سن) دورتين ${oppDirLabel}، ودار الترس الصغير (10 أسنان) 3 دورات كاملة ${dirLabel} (نفس اتجاه الترس الكبير)!`
      );
    }

    onEarnPoints?.(10);
    setTimeout(() => setIsRotating(false), 850);
  };

  const handleReset = () => {
    playSound?.();
    setLargeAngle(0);
    setMediumAngle(0);
    setSmallAngle(0);
    setLargeTurns(0);
    setMediumTurns(0);
    setSmallTurns(0);
    setObservation('لم يتم تدوير التروس بعد. حدد النظام واضغط تدوير لتسجيل ملاحظة التعشيق.');
  };

  const handleSwitchSystem = (count: 2 | 3) => {
    playSound?.();
    setGearCount(count);
    setLargeAngle(0);
    setMediumAngle(0);
    setSmallAngle(0);
    setLargeTurns(0);
    setMediumTurns(0);
    setSmallTurns(0);
    setObservation('لم يتم تدوير التروس بعد. حدد النظام واضغط تدوير لتسجيل ملاحظة التعشيق.');
  };

  return (
    <div className="space-y-5">
      {/* Intro Card matching Screenshot 976e64f1.png */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex justify-end mb-3">
          <span className="bg-[#2b1f09] border border-amber-500/40 text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full">
            الوحدة الثانية - تجربة عملية ص 71
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-black text-white text-left sm:text-right leading-snug mb-4">
          نشاط استكشاف حركة التروس المسننة ونقل الحركة الدورانية
        </h2>

        {/* Tools Row */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-slate-400 font-bold">أدوات النموذج الورقي ص 71:</span>
            <span className="bg-[#0a1226] border border-slate-700/80 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-xl">
              كرتون سميك كقاعدة
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="bg-[#0a1226] border border-slate-700/80 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-xl">
              دبابيس تثبيت
            </span>
            <span className="bg-[#0a1226] border border-amber-500/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl">
              الترس الأكبر (30 سن)
            </span>
            <span className="bg-[#0a1226] border border-orange-500/30 text-orange-300 text-xs font-bold px-3 py-1.5 rounded-xl">
              المتوسط (15 سن)
            </span>
            <span className="bg-[#0a1226] border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl">
              الصغير (10 أسنان)
            </span>
          </div>
        </div>

        <div className="h-px bg-[#152349] my-4" />

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <span className="text-amber-400 font-bold">فكرة النشاط ص 71: </span>
          نقوم بقص نماذج تروس كرتونية مسننة ووضع علامة على أحد أسنان كل ترس لتحديد نقطة بداية الحركة. عند تدوير الترس الكبير دورة كاملة نراقب اتجاه دوران التروس الأخرى وعدد الدورات التي تكملها لنتعلم أهمية التروس في الآلات ونقل الطاقة ميكانيكياً.
        </p>
      </div>

      {/* Interactive Gears Board Card matching Screenshot 369db3b3.png */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-4 sm:p-6 shadow-2xl">
        {/* Title & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#152349]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleRotate('cw')}
              disabled={isRotating}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
            >
              <span>أدر دورة مع العقارب</span>
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleRotate('ccw')}
              disabled={isRotating}
              className="flex items-center gap-1.5 bg-[#152347] hover:bg-[#1d3060] border border-slate-600/80 text-white font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition active:scale-95 disabled:opacity-50"
            >
              <span>أدر دورة عكس العقارب</span>
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              title="إعادة ضبط التروس"
              className="w-10 h-10 rounded-xl bg-[#0e1936] hover:bg-[#162752] border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-sm sm:text-base font-black text-white leading-snug">
            التروس الكرتونية التفاعلية وعلامات التعشيق (الخطوات 2-5):
          </h3>
        </div>

        {/* Cardboard Base Container */}
        <div className="mt-4 relative rounded-2xl bg-[#080f23] border-2 border-amber-900/50 p-4 sm:p-6 overflow-hidden min-h-[360px] flex flex-col justify-between shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(#92400e_1px,transparent_1px)] [background-size:22px_22px] opacity-15 pointer-events-none" />

          {/* Interlocking Gears Visual Area */}
          <div className="relative w-full flex items-center justify-center py-6 sm:py-8 overflow-x-auto">
            <div className="flex items-center justify-center gap-1 sm:gap-2 min-w-[290px]" dir="ltr">
              {/* SMALL GEAR (10 Teeth - Emerald) */}
              {gearCount === 3 && (
                <div className="flex flex-col items-center -mr-2 z-10">
                  <div
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-dashed border-emerald-400 bg-emerald-950/35 flex items-center justify-center shadow-lg transition-transform duration-700 ease-out"
                    style={{ transform: `rotate(${smallAngle}deg)` }}
                  >
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-3 bg-emerald-400 rounded-sm"
                        style={{
                          top: '-6px',
                          left: 'calc(50% - 4px)',
                          transformOrigin: '50% calc(100% + 44px)',
                          transform: `rotate(${i * 36}deg)`,
                        }}
                      />
                    ))}
                    <div className="absolute top-1.5 w-3 h-3 rounded-full bg-emerald-300 border border-white shadow-sm z-10" />
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#091126] border border-emerald-400/70 flex flex-col items-center justify-center text-center z-10">
                      <span className="text-[9px] font-bold text-emerald-200 leading-none">الصغير</span>
                      <span className="text-[10px] font-black text-emerald-400 font-mono leading-tight">10 سن</span>
                    </div>
                  </div>
                  <div className="mt-3 bg-[#0d1a38] border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg">
                    الدورات : {smallTurns}
                  </div>
                </div>
              )}

              {/* MEDIUM GEAR (15 Teeth - Orange) */}
              <div className="flex flex-col items-center -mr-2 z-20">
                <div
                  className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-dashed border-orange-500 bg-orange-950/30 flex items-center justify-center shadow-lg transition-transform duration-700 ease-out"
                  style={{ transform: `rotate(${mediumAngle}deg)` }}
                >
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-3.5 bg-orange-500 rounded-sm"
                      style={{
                        top: '-6px',
                        left: 'calc(50% - 4px)',
                        transformOrigin: '50% calc(100% + 60px)',
                        transform: `rotate(${i * 24}deg)`,
                      }}
                    />
                  ))}
                  <div className="absolute top-1.5 w-3.5 h-3.5 rounded-full bg-orange-300 border border-white shadow-sm z-10" />
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#091126] border border-orange-400/70 flex flex-col items-center justify-center text-center z-10">
                    <span className="text-[10px] font-bold text-orange-200 leading-none">المتوسط</span>
                    <span className="text-xs font-black text-orange-400 font-mono leading-tight">15 سن</span>
                  </div>
                </div>
                <div className="mt-3 bg-[#0d1a38] border border-orange-500/40 text-orange-300 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg">
                  الدورات : {mediumTurns}
                </div>
              </div>

              {/* LARGE GEAR (30 Teeth - Cyan) */}
              <div className="flex flex-col items-center z-30">
                <div
                  className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-dashed border-cyan-400 bg-cyan-950/25 flex items-center justify-center shadow-2xl transition-transform duration-700 ease-out"
                  style={{ transform: `rotate(${largeAngle}deg)` }}
                >
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-4 bg-cyan-400 rounded-sm"
                      style={{
                        top: '-6px',
                        left: 'calc(50% - 4px)',
                        transformOrigin: '50% calc(100% + 86px)',
                        transform: `rotate(${i * 12}deg)`,
                      }}
                    />
                  ))}
                  <div className="absolute top-2 w-4 h-4 rounded-full bg-cyan-200 border-2 border-white shadow-md z-10" />
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#091126] border-2 border-cyan-400/80 flex flex-col items-center justify-center text-center z-10">
                    <span className="text-xs font-bold text-cyan-200 leading-tight">الترس الأكبر</span>
                    <span className="text-sm font-black text-cyan-300 font-mono leading-tight">30 سن</span>
                  </div>
                </div>
                <div className="mt-3 bg-[#0d1a38] border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold px-3 py-1 rounded-lg">
                  الدورات : {largeTurns}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Legend (left) & Cardboard label (right) */}
          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-end justify-between gap-3 pt-2 relative z-20">
            <div className="bg-[#0a1530]/95 border border-[#1a2a54] p-2.5 rounded-xl text-[11px] space-y-1.5 shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-300" />
                <span className="text-slate-300">علامة الترس الأكبر (30 سن)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                <span className="text-slate-300">علامة الترس المتوسط (15 سن)</span>
              </div>
              {gearCount === 3 && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-slate-300">علامة الترس الصغير (10 أسنان)</span>
                </div>
              )}
            </div>

            <div className="text-[11px] font-mono font-bold text-amber-500/80 self-end">
              لوحة الكرتون السميك ص 71
            </div>
          </div>
        </div>

        {/* Observation Box */}
        <div className="mt-4 bg-[#070f23] border border-[#152349] rounded-2xl p-4 sm:p-5">
          <h4 className="font-bold text-amber-400 text-sm mb-1">الملاحظة المسجلة حالياً:</h4>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{observation}</p>
        </div>
      </div>

      {/* Gear System Settings Card matching Screenshot ce4735d1.png */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#152349] pb-3">
          <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>إعدادات نظام التروس (خطوات 3-5):</span>
          </h3>
        </div>

        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-300 block">حدد تكوين نظام التروس:</label>

          {/* Option 1: 2 Gears */}
          <button
            onClick={() => handleSwitchSystem(2)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border text-right transition ${
              gearCount === 2
                ? 'bg-[#1a1810] border-amber-400 text-white shadow-lg ring-1 ring-amber-400/40'
                : 'bg-[#091126] hover:bg-[#0e1a3a] border-slate-700/80 text-slate-300'
            }`}
          >
            <div>
              <div className={`font-black text-sm ${gearCount === 2 ? 'text-amber-300' : 'text-white'}`}>
                ترسان (كبير + متوسط) (الخطوة 3)
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                ترس 30 سن يدفع ترس 15 سن ميكانيكياً.
              </div>
            </div>
            <Settings className={`w-5 h-5 ${gearCount === 2 ? 'text-amber-400' : 'text-slate-500'}`} />
          </button>

          {/* Option 2: 3 Gears */}
          <button
            onClick={() => handleSwitchSystem(3)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border text-right transition ${
              gearCount === 3
                ? 'bg-[#1a1810] border-amber-400 text-white shadow-lg ring-1 ring-amber-400/40'
                : 'bg-[#091126] hover:bg-[#0e1a3a] border-slate-700/80 text-slate-300'
            }`}
          >
            <div>
              <div className={`font-black text-sm ${gearCount === 3 ? 'text-amber-300' : 'text-white'}`}>
                ثلاثة تروس (كبير+متوسط+صغير) (الخطوة 5)
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                ترس 30 سن يدفع 15 سن يدفع 10 أسنان.
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <Settings className={`w-4 h-4 ${gearCount === 3 ? 'text-amber-400' : 'text-slate-500'}`} />
              <Settings className={`w-4 h-4 ${gearCount === 3 ? 'text-amber-400' : 'text-slate-500'}`} />
            </div>
          </button>
        </div>

        {/* Mechanical Gear Ratio Equation Box */}
        <div className="bg-[#070f23] border border-[#152349] rounded-2xl p-4 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
            <Activity className="w-4 h-4" />
            <span>المعادلة الميكانيكية للتروس:</span>
          </div>

          <div className="text-slate-200 font-mono flex items-center gap-1.5 flex-wrap">
            <span>•</span>
            <span className="text-cyan-300">النسبة (كبير : متوسط)</span>
            <span>=</span>
            <span>30 / 15</span>
            <span>=</span>
            <span className="text-amber-400 font-black">2.0</span>
            <span className="text-slate-400 font-cairo">(دورات مضاعفة)</span>
          </div>

          <div className="text-slate-200 font-mono flex items-center gap-1.5 flex-wrap">
            <span>•</span>
            <span className="text-emerald-300">النسبة (كبير : صغير)</span>
            <span>=</span>
            <span>30 / 10</span>
            <span>=</span>
            <span className="text-amber-400 font-black">3.0</span>
            <span className="text-slate-400 font-cairo">(دورات متضاعفة ثلاثاً)</span>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-slate-400 leading-relaxed">
            تدور التروس المتشابكة باتجاهات متعاكسة. الترس الوسيط يعيد اتجاه الدوران للأصل.
          </div>
        </div>
      </div>

      {/* Analysis & Conclusion Questions Card matching Screenshot 61ae45d3.png */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#152349]">
          <h3 className="text-sm sm:text-base font-black text-white">
            تحليل واستنتاج أسئلة نشاط حركة التروس ص 71 في الكتاب المدرسي:
          </h3>
          <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        </div>

        <div className="bg-[#081024] border border-[#1a2952] rounded-2xl p-4">
          <h4 className="font-bold text-rose-400 text-xs sm:text-sm mb-1.5">
            الخطوة 6: كيف تنتقل الحركة ميكانيكياً؟
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            تنتقل الحركة الدورانية من ترس إلى آخر بالتلامس المباشر والتعشيق بين أسنان التروس المتجاورة؛ حيث تدفع أسنان الترس القائد أسنان الترس التابع ليدور بالاتجاه المعاكس فوراً.
          </p>
        </div>

        <div className="bg-[#081024] border border-[#1a2952] rounded-2xl p-4">
          <h4 className="font-bold text-emerald-400 text-xs sm:text-sm mb-1.5">
            الخطوة 7: مقارنة عدد الدورات
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            عندما يكمل الترس الكبير (30 سن) دورة واحدة، يكمل الترس المتوسط (15 سن) دورتين كاملتين (بالاتجاه المعاكس)، ويكمل الترس الصغير (10 أسنان) 3 دورات كاملة (بنفس اتجاه الترس الكبير).
          </p>
        </div>

        <div className="bg-[#081024] border border-[#1a2952] rounded-2xl p-4">
          <h4 className="font-bold text-cyan-400 text-xs sm:text-sm mb-1.5">
            الخطوة 8: أهمية التروس في الآلات
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            تكمن أهمية التروس في: (1) نقل الحركة الدورانية والطاقة لمسافات أخرى، (2) تغيير اتجاه الدوران (مع أو عكس العقارب)، (3) التحكم في سرعة الدوران وقوته (تكبير العزم أو مضاعفة السرعة لتسهيل الشغل).
          </p>
        </div>
      </div>
    </div>
  );
};
