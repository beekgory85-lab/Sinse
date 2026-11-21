import React, { useState } from 'react';
import { Microscope, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Camera, Palette, Sun, Focus, BookmarkCheck, Info, Check, Sparkles, Layers, Maximize2 } from 'lucide-react';

interface MicroscopeSimulatorProps {
  onEarnPoints?: (pts: number) => void;
  playSound?: () => void;
}

interface Specimen {
  id: string;
  name: string;
  englishName: string;
  defaultZoom: '4x' | '10x' | '40x' | '100x';
  cellType: 'plant' | 'animal';
  imageSrc: string;
  stainedWith: string;
  description: string;
  keyFeatures: string[];
}

const specimens: Specimen[] = [
  {
    id: 'onion',
    name: 'خلايا بشرة البصل',
    englishName: 'Onion Epidermis Cells',
    defaultZoom: '10x',
    cellType: 'plant',
    imageSrc: '/images/onion_cells.jpg',
    stainedWith: 'صبغة محلول اليود المخفف (أصفر / بني)',
    description: 'صورة مجهرية حقيقية عالية الدقة لخلايا نباتية متراصة ومستطيلة تشبه قوالب البناء، يظهر فيها بوضوح الجدار الخلوي السيللوزي السميك، والنواة الدائرية الداكنة، والفجوة العصارية الواسعة.',
    keyFeatures: ['جدار خلوي سيللوزي صلب وواضح', 'نواة دائرية مصبوغة باليود الداكن', 'فجوات عصارية وسيتوبلازم رائق'],
  },
  {
    id: 'mouth',
    name: 'خلايا باطن الفم والخد',
    englishName: 'Cheek Epithelial Cells',
    defaultZoom: '40x',
    cellType: 'animal',
    imageSrc: '/images/cheek_cells.jpg',
    stainedWith: 'صبغة أزرق الميثيلين (Methylene Blue)',
    description: 'صورة مجهرية حقيقية لخلايا طلائية حرشفية حيوانية مأخوذة بمسحة خفيفة من باطن الخد، تظهر كصفائح مضلعة غير منتظمة محاطة فقط بغشاء بلازمي رقيق ومرن دون جدار خلوي، وتبرز النواة الزرقاء في المركز.',
    keyFeatures: ['غشاء بلازمي رقيق مرن بدون جدار', 'نواة زرقاء بارزة في منتصف الخلية', 'سيتوبلازم حبيبي شفاف'],
  },
  {
    id: 'leaf',
    name: 'قطاع ورقة الشجر والثغور',
    englishName: 'Leaf Stomata & Guard Cells',
    defaultZoom: '40x',
    cellType: 'plant',
    imageSrc: '/images/leaf_stomata.jpg',
    stainedWith: 'صبغة طبيعية (أخضر الكلوروفيل)',
    description: 'صورة مجهرية حقيقية لنسيج بشرة ورقة النبات توضح الثغور التنفسية المحاطة بزوج من الخلايا الحارسة كلوية الشكل والمحملة بحبيبات البلاستيدات الخضراء، والتي تنظم تبادل الغازات وخروج بخار الماء في النتح.',
    keyFeatures: ['خلايا حارسة كلوية الشكل حول الثغر', 'بلاستيدات خضراء غنية بالكلوروفيل', 'خلايا بشرة نباتية متداخلة كالفسيفساء'],
  },
];

export const MicroscopeSimulator: React.FC<MicroscopeSimulatorProps> = ({
  onEarnPoints,
  playSound,
}) => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen>(specimens[0]);
  const [zoom, setZoom] = useState<'4x' | '10x' | '40x' | '100x'>('10x');
  const [stageX, setStageX] = useState<number>(0);
  const [stageY, setStageY] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'real' | 'diagram'>('real');
  const [lightOn, setLightOn] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showGallery, setShowGallery] = useState<boolean>(false);

  const moveStage = (dx: number, dy: number) => {
    playSound?.();
    setStageX((prev) => Math.max(-50, Math.min(50, prev + dx)));
    setStageY((prev) => Math.max(-50, Math.min(50, prev + dy)));
  };

  const resetStage = () => {
    playSound?.();
    setStageX(0);
    setStageY(0);
  };

  const handleSaveObservation = () => {
    playSound?.();
    setIsSaved(true);
    onEarnPoints?.(15);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getZoomMultiplier = () => {
    switch (zoom) {
      case '4x':
        return 1.0;
      case '10x':
        return 1.35;
      case '40x':
        return 2.0;
      case '100x':
        return 2.8;
      default:
        return 1.35;
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Header Card matching Screenshot 15 */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-xl relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                صور مجهرية حقيقية معتمدة 🔬
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              محاكي المجهر المركب الضوئي (مكتمل وتفاعلي)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              فحص صور مجهرية حقيقية لخلايا البصل وباطن الفم وورقة الشجر، مع التحكم بالمسرح والعدسات والتركيز
            </p>
          </div>

          <div className="w-13 h-13 rounded-2xl bg-[#09223a] border border-cyan-500/40 text-cyan-300 flex items-center justify-center p-3 shadow-md flex-shrink-0">
            <Microscope className="w-7 h-7 stroke-[2]" />
          </div>
        </div>

        {/* Buttons Bar: Save to Report & Gallery Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={handleSaveObservation}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm py-3 rounded-2xl shadow-lg shadow-cyan-500/25 transition active:scale-98"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                <span>تم حفظ الملاحظة في التقرير العلمي ✓</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="w-4 h-4 stroke-[2.5]" />
                <span>حفظ الملاحظة في التقرير</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setShowGallery(!showGallery);
              playSound?.();
            }}
            className="flex items-center justify-center gap-2 bg-[#101f42] hover:bg-[#162a5c] border border-cyan-500/40 text-cyan-300 hover:text-white font-bold text-xs sm:text-sm py-3 rounded-2xl transition active:scale-98"
          >
            <Camera className="w-4 h-4" />
            <span>{showGallery ? 'إخفاء معرض الصور الحقيقية' : 'معرض الصور المجهرية الحقيقية (3 عينات)'}</span>
          </button>
        </div>
      </div>

      {/* Full Real Microscopic Photo Gallery (when toggled) */}
      {showGallery && (
        <div className="bg-[#0b1328] border-2 border-cyan-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#152349]">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>معرض الشرائح المجهرية الحقيقية المقارنة:</span>
            </h3>
            <span className="text-xs text-cyan-300 font-mono">3 عينات مجهرية أصلية</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {specimens.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedSpecimen(item);
                  setZoom(item.defaultZoom);
                  setViewMode('real');
                  playSound?.();
                }}
                className={`cursor-pointer rounded-2xl bg-[#070e20] border-2 overflow-hidden transition-all duration-200 transform hover:scale-[1.02] ${
                  selectedSpecimen.id === item.id
                    ? 'border-cyan-400 shadow-xl ring-2 ring-cyan-400/40'
                    : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                {/* Photo Frame */}
                <div className="relative aspect-square w-full bg-black overflow-hidden">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-cyan-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-cyan-500/40">
                    {item.defaultZoom}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-0.5 rounded-lg">
                    {item.cellType === 'plant' ? 'خلية نباتية 🌱' : 'خلية حيوانية 🐾'}
                  </div>
                </div>

                <div className="p-3.5 space-y-2">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{item.name}</h4>
                    <p className="font-mono text-xs text-cyan-300/80">{item.englishName}</p>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-[10px] text-amber-300 font-bold block mb-1">الميزات المجهرية:</span>
                    <ul className="text-[10px] text-slate-300 space-y-0.5 list-disc list-inside">
                      {item.keyFeatures.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stage Movement Controls matching Screenshot 15 */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-slate-200">
            تحريك الشريحة (المسرح X / Y):
          </span>
          <span className="font-mono text-cyan-300 bg-[#091126] px-2.5 py-1 rounded-lg border border-cyan-500/30">
            X: {stageX}px | Y: {stageY}px
          </span>
        </div>

        {/* Directional Pad */}
        <div className="flex flex-col items-center justify-center gap-1.5">
          <button
            onClick={() => moveStage(0, -10)}
            className="w-10 h-10 rounded-xl bg-[#101c3d] hover:bg-[#182a5c] border border-slate-700 text-cyan-300 flex items-center justify-center transition active:scale-90"
            title="تحريك لأعلى"
          >
            <ArrowUp className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => moveStage(-10, 0)}
              className="w-10 h-10 rounded-xl bg-[#101c3d] hover:bg-[#182a5c] border border-slate-700 text-cyan-300 flex items-center justify-center transition active:scale-90"
              title="تحريك لليسار"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={resetStage}
              className="w-10 h-10 rounded-xl bg-[#091126] hover:bg-[#14234b] border border-cyan-500/40 text-slate-300 hover:text-white flex items-center justify-center transition active:scale-90"
              title="إعادة ضبط المسرح للمركز"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => moveStage(10, 0)}
              className="w-10 h-10 rounded-xl bg-[#101c3d] hover:bg-[#182a5c] border border-slate-700 text-cyan-300 flex items-center justify-center transition active:scale-90"
              title="تحريك لليمين"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => moveStage(0, 10)}
            className="w-10 h-10 rounded-xl bg-[#101c3d] hover:bg-[#182a5c] border border-slate-700 text-cyan-300 flex items-center justify-center transition active:scale-90"
            title="تحريك لأسفل"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Specimen Picker matching Screenshot 15 with Real Photos */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3 text-sm font-bold text-white">
          <div className="flex items-center gap-2">
            <span>اختر الشريحة / العينة المجهزة للفحص:</span>
            <Info className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-xs text-cyan-300 font-normal">
            اضغط لاختيار وتكبير العينة
          </span>
        </div>

        <div className="space-y-2.5">
          {specimens.map((specimen) => {
            const isSelected = selectedSpecimen.id === specimen.id;
            return (
              <button
                key={specimen.id}
                onClick={() => {
                  setSelectedSpecimen(specimen);
                  setZoom(specimen.defaultZoom);
                  playSound?.();
                }}
                className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition text-right ${
                  isSelected
                    ? 'bg-[#0b243b] border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400/40'
                    : 'bg-[#091126] hover:bg-[#0f1c3f] border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Real Microscopic Thumbnail Circle */}
                  <div className="w-14 h-14 rounded-full border-2 border-cyan-400/60 overflow-hidden shadow-md flex-shrink-0 relative bg-black">
                    <img
                      src={specimen.imageSrc}
                      alt={specimen.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-sm sm:text-base text-white">{specimen.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        specimen.cellType === 'plant'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : 'bg-blue-950 text-blue-300 border border-blue-500/40'
                      }`}>
                        {specimen.cellType === 'plant' ? 'نباتية' : 'حيوانية'}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-cyan-300/80">{specimen.englishName}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">
                      الصبغة: {specimen.stainedWith}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="bg-[#081830] border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs px-2.5 py-1 rounded-lg">
                    {specimen.defaultZoom}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">صورة حقيقية 📷</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Magnification Objective Lenses matching Screenshot 15 */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold text-slate-300">
            قوة تكبير العدسة الشيئية (Objective Lenses):
          </label>
          <span className="text-xs font-mono text-cyan-300">
            التكبير الكلي = {parseInt(zoom)} × 10 = {parseInt(zoom) * 10}x
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {(['4x', '10x', '40x', '100x'] as const).map((level) => (
            <button
              key={level}
              onClick={() => {
                setZoom(level);
                playSound?.();
              }}
              className={`py-2.5 px-2 rounded-xl font-mono font-black text-xs sm:text-sm border transition ${
                zoom === level
                  ? 'bg-cyan-500 border-cyan-300 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-[#091126] border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Circular Viewport & Controls matching Screenshot 16 */}
      <div className="bg-[#0b1328] border border-[#17254d] rounded-3xl p-5 sm:p-6 shadow-2xl">
        {/* Controls Above Field of View matching Screenshot 16 */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#152349] flex-wrap gap-2">
          <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
            <span>مجال الرؤية عبر العدسة العينية:</span>
          </span>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                setViewMode('real');
                playSound?.();
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === 'real'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                  : 'bg-[#101b3b] text-slate-300 border border-slate-700'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>صورة حقيقية 📷</span>
            </button>

            <button
              onClick={() => {
                setViewMode('diagram');
                playSound?.();
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === 'diagram'
                  ? 'bg-blue-600 text-white font-black shadow-md'
                  : 'bg-[#101b3b] text-slate-300 border border-slate-700'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>رسم توضيحي 🎨</span>
            </button>

            <button
              onClick={() => {
                setIsFocused(!isFocused);
                playSound?.();
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                isFocused ? 'bg-cyan-700 text-white' : 'bg-[#101b3b] text-slate-300'
              }`}
            >
              <Focus className="w-3.5 h-3.5" />
              <span>ضبط تلقائي 🔎</span>
            </button>

            <button
              onClick={() => {
                setLightOn(!lightOn);
                playSound?.();
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                lightOn ? 'bg-amber-500 text-slate-950 font-black' : 'bg-[#101b3b] text-slate-400'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{lightOn ? 'الإضاءة: تعمل 💡' : 'الإضاءة: مطفأة'}</span>
            </button>
          </div>
        </div>

        {/* Circular Viewport with REAL PHOTO matching Screenshot 16 */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full bg-[#030712] border-4 border-slate-700 shadow-2xl overflow-hidden flex items-center justify-center">
          {/* Microscope Lighting */}
          <div
            className={`w-full h-full relative transition-opacity duration-300 overflow-hidden flex items-center justify-center ${
              lightOn ? 'opacity-100' : 'opacity-10'
            }`}
          >
            {/* Real High-Resolution Microscope Photograph View */}
            {viewMode === 'real' ? (
              <div
                className={`w-full h-full relative transition-all duration-300 flex items-center justify-center ${
                  isFocused ? 'blur-0' : 'blur-md'
                }`}
                style={{
                  transform: `translate(${stageX}px, ${stageY}px) scale(${getZoomMultiplier()})`,
                }}
              >
                <img
                  src={selectedSpecimen.imageSrc}
                  alt={selectedSpecimen.name}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            ) : (
              /* Diagram View (رسم توضيحي) */
              <div
                className={`w-full h-full relative transition-all duration-300 flex items-center justify-center ${
                  isFocused ? 'blur-0' : 'blur-sm'
                }`}
                style={{
                  transform: `translate(${stageX}px, ${stageY}px) scale(${getZoomMultiplier()})`,
                }}
              >
                {selectedSpecimen.id === 'onion' && (
                  <div className="w-full h-full relative bg-[#eab308]/20 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      <defs>
                        <pattern id="onionCellsSvg" width="45" height="28" patternUnits="userSpaceOnUse">
                          <rect width="43" height="26" fill="#fef08a" stroke="#78350f" strokeWidth="2" rx="3" />
                          <circle cx="22" cy="14" r="4" fill="#92400e" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#onionCellsSvg)" />
                    </svg>
                  </div>
                )}

                {selectedSpecimen.id === 'mouth' && (
                  <div className="w-full h-full relative bg-blue-950/40 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4 p-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-16 h-14 rounded-2xl bg-blue-500/40 border-2 border-blue-400 flex items-center justify-center shadow-md relative"
                        >
                          <div className="w-4 h-4 rounded-full bg-blue-950 border border-blue-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSpecimen.id === 'leaf' && (
                  <div className="w-full h-full relative bg-emerald-950/40 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-6 p-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-14 h-10 rounded-full bg-emerald-400/80 border-2 border-emerald-700 flex items-center justify-center shadow-lg"
                        >
                          <div className="w-3 h-7 bg-emerald-950 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Focal Crosshairs */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-full h-px bg-cyan-400/40" />
            <div className="h-full w-px bg-cyan-400/40 absolute" />
            <div className="w-16 h-16 rounded-full border border-cyan-400/30 absolute" />
          </div>

          {/* Focus indicator badge at top inside circle matching Screenshot 16 */}
          <div className="absolute top-3 bg-[#0a1c38]/90 border border-emerald-400/50 text-emerald-300 text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md backdrop-blur-sm">
            ✨ وضوح بؤري تام
          </div>

          {/* Objective Lens label at bottom inside circle matching Screenshot 16 */}
          <div className="absolute bottom-2 bg-[#091833]/90 border border-cyan-400/60 text-cyan-300 font-mono font-bold text-xs px-4 py-1 rounded-full shadow-lg backdrop-blur-sm">
            {zoom} Objective
          </div>
        </div>

        {/* Specimen Description & Scientific Information */}
        <div className="mt-4 bg-[#091126] border border-[#142347] rounded-2xl p-4 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white text-sm">{selectedSpecimen.name} ({selectedSpecimen.englishName})</span>
            <span className="text-cyan-300 text-xs font-mono">{selectedSpecimen.stainedWith}</span>
          </div>
          <p className="text-slate-300">{selectedSpecimen.description}</p>
          <div className="flex items-center gap-2 text-xs flex-wrap pt-1">
            <span className="text-amber-300 font-bold">المشاهدات المجهرية:</span>
            {selectedSpecimen.keyFeatures.map((feat, idx) => (
              <span key={idx} className="bg-[#0d1c3a] border border-cyan-500/30 text-cyan-200 px-2.5 py-0.5 rounded-lg text-[11px]">
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
