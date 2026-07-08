import React, { useState } from 'react';
import { MicroscopeSample, LabNote } from '../types';
import { MICROSCOPE_SAMPLES } from '../data/labData';
import { 
  Microscope, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Sliders, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2,
  BookmarkPlus,
  Sparkles,
  Info,
  Power,
  RotateCcw,
  Focus,
  Eye
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface MicroscopeSimulatorProps {
  onSaveNote: (note: Omit<LabNote, 'id' | 'date'>) => void;
  onRunExperiment: () => void;
  soundEnabled: boolean;
}

export const MicroscopeSimulator: React.FC<MicroscopeSimulatorProps> = ({
  onSaveNote,
  onRunExperiment,
  soundEnabled
}) => {
  const [selectedSample, setSelectedSample] = useState<MicroscopeSample>(MICROSCOPE_SAMPLES[0]);
  const [viewMode, setViewMode] = useState<'real' | 'schematic'>('real');
  const [magnification, setMagnification] = useState<number>(10); // 4, 10, 40, 100
  const [coarseFocus, setCoarseFocus] = useState<number>(50); // 0-100
  const [fineFocus, setFineFocus] = useState<number>(50); // 0-100
  const [lightIntensity, setLightIntensity] = useState<number>(85); // 0-100
  const [lightOn, setLightOn] = useState<boolean>(true);
  const [posX, setPosX] = useState<number>(0); // -50 to 50
  const [posY, setPosY] = useState<number>(0); // -50 to 50
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Helper to ensure data SVG URLs render reliably in <img> tag across all browsers
  const getSafeImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('data:image/svg+xml')) {
      let rawSvg = url.includes(',') ? url.substring(url.indexOf(',') + 1) : url;
      try {
        rawSvg = decodeURIComponent(rawSvg);
      } catch (e) {
        // Keep rawSvg if already clean
      }
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(rawSvg)}`;
    }
    return url;
  };

  // Calculate blur based on focus alignment
  // Ideal focus is around 50 for both coarse and fine
  const focusDeviation = Math.abs(coarseFocus - 50) * 0.15 + Math.abs(fineFocus - 50) * 0.08;
  const blurPx = Math.max(0, focusDeviation);
  const brightnessPercent = lightOn ? Math.max(20, lightIntensity) : 0;
  const isPerfectFocus = blurPx < 1.5;

  const handleSampleChange = (sample: MicroscopeSample) => {
    if (soundEnabled) soundEngine.playClick();
    setSelectedSample(sample);
    setMagnification(sample.recommendedMagnification);
    setCoarseFocus(50);
    setFineFocus(50);
    setPosX(0);
    setPosY(0);
    setIsSaved(false);
    onRunExperiment();
  };

  const handleAutoFocus = () => {
    if (soundEnabled) soundEngine.playSuccess();
    setCoarseFocus(50);
    setFineFocus(50);
  };

  const handleResetStage = () => {
    if (soundEnabled) soundEngine.playClick();
    setPosX(0);
    setPosY(0);
  };

  const handleToggleLight = () => {
    if (soundEnabled) soundEngine.playClick();
    setLightOn(!lightOn);
  };

  const handleSaveObservation = () => {
    if (soundEnabled) soundEngine.playSuccess();
    onSaveNote({
      title: `فحص عينة ${selectedSample.nameAr} بالمجهر`,
      experimentName: 'محاكي المجهر المركب',
      category: 'biology',
      hypothesis: `فحص الخصائص الشكلية والتكبير لقوة (${magnification}x) مع وضوح بؤرة الضبط.`,
      content: `تم فحص عينة ${selectedSample.nameAr} قوة التكبير: ${magnification}x. أظهرت العينة: ${selectedSample.keyFeaturesAr.join('، ')}.`,
      conclusion: `العينة تظهر بوضوح ممتاز عند قوة تكبير ${selectedSample.recommendedMagnification}x مع ضبط الإضاءة وحركة المسرح.`
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">محاكي المجهر المركب الضوئي (مكتمل وتفاعلي)</h2>
            <p className="text-xs text-slate-400">اختر العينة، اضبط العدسات والتركيز والإضاءة والمسرح للوصول لأعلى دقة وضوح</p>
          </div>
        </div>

        <button
          onClick={handleSaveObservation}
          disabled={isSaved}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            isSaved
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
          }`}
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
          <span>{isSaved ? 'تم الحفظ في التقرير' : 'حفظ الملاحظة في التقرير'}</span>
        </button>
      </div>

      {/* Main Simulator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Microscope Optical Viewfinder (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-between space-y-5">
          
          {/* Eyepiece Header & Quick Toggles */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs gap-3">
            <span className="text-slate-300 font-medium flex items-center gap-1.5 shrink-0">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>مجال الرؤية عبر العدسة العينية:</span>
            </span>

            {/* Display Mode Toggle */}
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 shrink-0">
              <button
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setViewMode('real');
                }}
                className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all font-bold ${
                  viewMode === 'real'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>صورة حقيقية 📸</span>
              </button>
              <button
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setViewMode('schematic');
                }}
                className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all font-bold ${
                  viewMode === 'schematic'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>رسم توضيحي 🎨</span>
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleAutoFocus}
                title="ضبط بؤري تلقائي"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-800 font-semibold text-[11px] transition-all"
              >
                <Focus className="w-3.5 h-3.5" />
                <span>ضبط تلقائي</span>
              </button>

              <button
                onClick={handleToggleLight}
                title={lightOn ? "إيقاف المصباح" : "تشغيل المصباح"}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-semibold text-[11px] transition-all ${
                  lightOn
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{lightOn ? 'الإضاءة: تعمل' : 'الإضاءة: متوقفة'}</span>
              </button>
            </div>
          </div>

          {/* Circular Microscope Eyepiece Viewport */}
          <div className="relative w-full max-w-sm aspect-square rounded-full border-8 border-slate-950 bg-black overflow-hidden shadow-2xl flex items-center justify-center group select-none">
            
            {/* Sample Image Element (Direct <img> rendering) */}
            <img 
              src={viewMode === 'real' && selectedSample.realImageUrl ? selectedSample.realImageUrl : getSafeImageUrl(selectedSample.imageUrl)}
              alt={selectedSample.nameAr}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-150 pointer-events-none select-none"
              style={{
                transform: `scale(${magnification / 10 * 1.3}) translate(${posX}px, ${posY}px)`,
                filter: lightOn 
                  ? `blur(${blurPx}px) brightness(${brightnessPercent}%) contrast(110%)`
                  : 'brightness(0%)'
              }}
            />

            {/* Dark Field Mask when Light is OFF */}
            {!lightOn && (
              <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-slate-500 text-xs p-4 text-center">
                <Sun className="w-8 h-8 text-slate-700 mb-2 animate-pulse" />
                <p className="font-bold">مصباح المجهر متوقف</p>
                <p className="text-[10px] mt-1">انقر على زر "تشغيل المصباح" لتوفير الضوء للعينة</p>
              </div>
            )}

            {/* Circular Grid & Pointer Overlay */}
            <div className="absolute inset-0 border border-cyan-500/20 rounded-full pointer-events-none" />
            <div className="absolute w-full h-0.5 bg-cyan-500/20 top-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute h-full w-0.5 bg-cyan-500/20 left-1/2 -translate-x-1/2 pointer-events-none" />

            {/* Magnification Badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-800 text-cyan-400 font-mono text-xs font-bold backdrop-blur">
              {magnification}x Objective Lens
            </div>

            {/* Focus Status Indicator */}
            {isPerfectFocus && lightOn && (
              <div className="absolute top-4 px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-800 text-[10px] font-bold animate-pulse shadow-md">
                وضوح بؤري تام ✨
              </div>
            )}
          </div>

          {/* X/Y Stage Movement D-Pad Controls */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-medium">تحريك الشريحة (المسرح X / Y):</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                X: {posX}px | Y: {posY}px
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setPosX(prev => Math.max(-40, prev - 5))}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all"
                title="تحريك لليمين"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="flex flex-col gap-1">
                <button 
                  onClick={() => setPosY(prev => Math.max(-40, prev - 5))}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all"
                  title="تحريك لأعلى"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setPosY(prev => Math.min(40, prev + 5))}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all"
                  title="تحريك لأسفل"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={() => setPosX(prev => Math.min(40, prev + 5))}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all"
                title="تحريك لليسار"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleResetStage}
                className="p-2 mr-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800"
                title="إعادة الشريحة للمنتصف"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Controls & Microscope Settings (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Sample Selection */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>اختر الشريحة / العينة المجهزة للفحص:</span>
            </h3>

            <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
              {MICROSCOPE_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleChange(sample)}
                  className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between text-xs ${
                    selectedSample.id === sample.id
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold shadow-md shadow-cyan-950/40'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Thumbnail Preview */}
                    <div className="w-10 h-10 rounded-full border border-slate-700 overflow-hidden bg-black shrink-0 relative">
                      <img 
                        src={viewMode === 'real' && sample.realImageUrl ? sample.realImageUrl : getSafeImageUrl(sample.imageUrl)}
                        alt={sample.nameAr}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{sample.nameAr}</p>
                      <p className="text-[10px] text-slate-400">{sample.nameEn}</p>
                    </div>
                  </div>

                  <span className="text-[10px] px-2.5 py-1 rounded bg-slate-800 text-cyan-400 font-mono font-bold shrink-0">
                    {sample.recommendedMagnification}x
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Optics & Focus Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            
            {/* Objective Lens Magnification */}
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-2">
                قوة تكبير العدسة الشيئية (Objective Lenses):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[4, 10, 40, 100].map((mag) => (
                  <button
                    key={mag}
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      setMagnification(mag);
                    }}
                    className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                      magnification === mag
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm shadow-cyan-500/30'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {mag}x
                  </button>
                ))}
              </div>
            </div>

            {/* Coarse Focus Adjustment */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>الضابط الكبير (Coarse Focus):</span>
                <span className="font-mono text-cyan-400">{coarseFocus}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={coarseFocus}
                onChange={(e) => setCoarseFocus(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Fine Focus Adjustment */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>الضابط الدقيق (Fine Focus):</span>
                <span className="font-mono text-cyan-400">{fineFocus}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={fineFocus}
                onChange={(e) => setFineFocus(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Light Source Intensity */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>شدة إضاءة المصباح:</span>
                </span>
                <span className="font-mono text-amber-400">{lightIntensity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={lightIntensity}
                disabled={!lightOn}
                onChange={(e) => setLightIntensity(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer disabled:opacity-40"
              />
            </div>

          </div>

          {/* Sample Description & Key Features */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-sm text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>معلومات وتفاصيل العينة المفحوصة:</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedSample.descriptionAr}
            </p>

            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-semibold text-slate-400">أبرز الخصائص المرئية:</span>
              {selectedSample.keyFeaturesAr.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

