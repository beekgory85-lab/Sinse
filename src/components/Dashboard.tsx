import React, { useState } from 'react';
import { ActiveTab, AppStats } from '../types';
import { 
  Microscope, 
  Dna, 
  Zap, 
  Atom, 
  Globe2, 
  BookOpenCheck, 
  Bot, 
  Eye, 
  Play, 
  ShieldAlert, 
  Award, 
  CheckCircle2, 
  Sparkles,
  FlaskConical,
  RotateCcw,
  TrendingUp,
  Coins,
  MousePointer,
  Code,
  ExternalLink
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { LAB_SAFETY_RULES } from '../data/labData';

interface DashboardProps {
  stats: AppStats;
  onNavigate: (tab: ActiveTab, subTab?: 'catapult' | 'kinetic_potential' | 'gears_machines') => void;
  onIncrementViews: () => void;
  onResetStats: () => void;
  onIncrementAdClicks: () => void;
  onToggleAdSimulation: (enabled: boolean) => void;
  onUpdateAdSenseSettings: (publisherId: string, adSlotId: string, isRealEnabled: boolean) => void;
  soundEnabled: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  onNavigate,
  onIncrementViews,
  onResetStats,
  onIncrementAdClicks,
  onToggleAdSimulation,
  onUpdateAdSenseSettings,
  soundEnabled
}) => {
  const [showOwnerModal, setShowOwnerModal] = useState<boolean>(false);
  const [activeOwnerTab, setActiveOwnerTab] = useState<'stats' | 'ads' | 'code'>('stats');
  const [showCodePrompt, setShowCodePrompt] = useState<boolean>(false);
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [codeError, setCodeError] = useState<string>('');
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isOwnerAuthenticated') === 'true';
  });

  const [pubIdInput, setPubIdInput] = useState<string>(stats.adsensePublisherId || 'ca-pub-3336377424012326');
  const [adSlotInput, setAdSlotInput] = useState<string>(stats.adsenseAdSlotId || '');
  const [isRealAdSelected, setIsRealAdSelected] = useState<boolean>(stats.isRealAdSenseEnabled || false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string>('');

  const handleVerifyCode = () => {
    const validCodes = ['2026', 'beekgory85', '8585', 'admin2026'];
    if (validCodes.includes(enteredCode.trim())) {
      if (soundEnabled) soundEngine.playSuccess();
      setIsOwnerAuthenticated(true);
      localStorage.setItem('isOwnerAuthenticated', 'true');
      setShowCodePrompt(false);
      setShowOwnerModal(true);
      setEnteredCode('');
      setCodeError('');
    } else {
      if (soundEnabled) soundEngine.playBeep();
      setCodeError('الرمز السري غير صحيح! يرجى المحاولة مرة أخرى.');
    }
  };

  const handleLaunch = (tab: ActiveTab, subTab?: 'catapult' | 'kinetic_potential' | 'gears_machines') => {
    if (soundEnabled) soundEngine.playClick();
    onNavigate(tab, subTab);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-800/50 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>منهج العلوم الرسمي — الصف السادس الابتدائي</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
              تجارب العلوم التفاعلية <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">الصف السادس الابتدائي</span>
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              محاكاة تفاعلية شاملة لجميع تجارب الوحدات المقررة في كتاب العلوم للصف السادس: فحص خلايا البصل بالمجهر، التناضح، الدارات الكهربائية، تحولات الطاقة، التفاعلات الكيميائية، وتضاريس الأرض والتجوية.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={() => handleLaunch('microscope')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 transition-all text-sm"
              >
                <Microscope className="w-4 h-4" />
                <span>ابدأ تجربة المجهر</span>
              </button>
              
              <button
                onClick={() => handleLaunch('chemistry_matter')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all text-sm font-semibold"
              >
                <Atom className="w-4 h-4 text-cyan-400" />
                <span>تفاعلات الكيمياء</span>
              </button>
            </div>
          </div>

          {/* Quick Interactive Icon Hub */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center shrink-0">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute inset-4 rounded-full border border-dashed border-blue-400/30 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
            <div className="w-28 h-28 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-inner flex flex-col items-center justify-center gap-2 text-cyan-400">
              <FlaskConical className="w-10 h-10 animate-bounce" />
              <span className="text-xs font-mono font-bold text-slate-200">Interactive Lab</span>
            </div>
          </div>
        </div>
      </div>

      {/* Views & App Statistics Bar (directly answering user query) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-slate-100 text-base">إحصائيات ومشاهدات تطبيق المختبر</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (soundEnabled) soundEngine.playBeep();
                onIncrementViews();
              }}
              className="text-xs px-3 py-1 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 hover:bg-cyan-900 transition-all flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>تسجيل مشاهدة +1</span>
            </button>

            <button
              onClick={() => {
                if (soundEnabled) soundEngine.playClick();
                if (isOwnerAuthenticated) {
                  setShowOwnerModal(true);
                } else {
                  setShowCodePrompt(true);
                }
              }}
              className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all font-mono"
            >
              لوحة المالك 🔑
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-900/30 text-center">
            <p className="text-xs text-slate-400 mb-1">إجمالي المشاهدات والزيارات</p>
            <p className="text-2xl font-extrabold text-cyan-400 font-mono">
              {stats.totalViews.toLocaleString('ar-EG')}
            </p>
            <p className="text-[10px] text-cyan-500/80 mt-1">مشاهدات حية ومسجلة</p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-blue-900/30 text-center">
            <p className="text-xs text-slate-400 mb-1">التجارب المنفذة</p>
            <p className="text-2xl font-extrabold text-blue-400 font-mono">
              {stats.totalExperimentsRun.toLocaleString('ar-EG')}
            </p>
            <p className="text-[10px] text-blue-500/80 mt-1">جلسة محاكاة تفاعلية</p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-900/30 text-center">
            <p className="text-xs text-slate-400 mb-1">الاختبارات المجابة</p>
            <p className="text-2xl font-extrabold text-emerald-400 font-mono">
              {stats.totalQuizCompleted.toLocaleString('ar-EG')}
            </p>
            <p className="text-[10px] text-emerald-500/80 mt-1">تقييم علمي ناجح</p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-900/30 text-center">
            <p className="text-xs text-slate-400 mb-1">ملاحظات التقرير المحفوظة</p>
            <p className="text-2xl font-extrabold text-amber-400 font-mono">
              {stats.totalNotesSaved.toLocaleString('ar-EG')}
            </p>
            <p className="text-[10px] text-amber-500/80 mt-1">في دفتر المعمل الرقمي</p>
          </div>
        </div>
      </div>

      {/* Google AdSense / AdMob Simulator Banner */}
      {stats.isRealAdSenseEnabled ? (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-4 md:p-5 relative overflow-hidden group shadow-lg animate-fade-in space-y-4 text-right">
          <div className="absolute top-0 left-0 bg-emerald-500/20 text-emerald-300 px-3 py-1 text-[9px] rounded-br-xl font-bold border-r border-b border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>مساحة إعلانية حية نشطة | Google AdSense</span>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-100 text-sm flex items-center gap-1.5 justify-end">
                <span>تطبيقك متصل الآن بـ Google AdSense بنجاح! 🎉</span>
                <Coins className="w-4 h-4 text-emerald-400" />
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                تم تفعيل كود أدسينس الحقيقي برقم الناشر الخاص بك: <code className="text-emerald-400 font-mono text-[11px]">{stats.adsensePublisherId}</code>. عند تشغيل التطبيق على موقعك الخاص بعد رفعه، ستقوم خوادم Google بعرض الإعلانات المستهدفة وتوليد الأرباح الحقيقية تلقائياً.
              </p>
            </div>
            
            <button
              onClick={() => {
                if (soundEnabled) soundEngine.playClick();
                setShowOwnerModal(true);
                setActiveOwnerTab('ads');
                setIsRealAdSelected(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold shrink-0 transition-all flex items-center gap-1.5"
            >
              <span>إدارة الربط ⚙️</span>
            </button>
          </div>

          {/* Live Google AdSense container placeholder */}
          <div className="border border-slate-800/80 rounded-xl p-4 bg-slate-950/80 flex flex-col items-center justify-center min-h-[100px] text-center space-y-2">
            <p className="text-[10px] text-slate-500 font-bold tracking-wider">مساحة إعلان GOOGLE ADSENSE الحية</p>
            <div className="w-full max-w-lg mx-auto overflow-hidden">
              <ins className="adsbygoogle"
                   style={{ display: 'block', textDecoration: 'none' }}
                   data-ad-client={stats.adsensePublisherId || "ca-pub-3336377424012326"}
                   data-ad-slot={stats.adsenseAdSlotId || ""}
                   data-ad-format="auto"
                   data-full-width-responsive="true"></ins>
            </div>
            <p className="text-[9px] text-slate-500">
              (ستظهر الإعلانات الحية بمجرد تفعيل نطاق موقعك وقبول حسابك في Google AdSense)
            </p>
          </div>
        </div>
      ) : stats.adSimulationEnabled ? (
        <div className="bg-slate-900 border-2 border-dashed border-amber-500/50 rounded-2xl p-4 md:p-5 relative overflow-hidden group shadow-lg animate-fade-in text-right">
          {/* Decorative Google AdSense Badge */}
          <div className="absolute top-0 left-0 bg-amber-500/20 text-amber-300 px-3 py-1 text-[9px] rounded-br-xl font-bold border-r border-b border-amber-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>إعلان تجريبي نشط | Google AdSense</span>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-100 text-sm flex items-center gap-1.5 justify-end">
                <span>مساحة إعلانية تجريبية تفاعلية للربح 💰</span>
                <Coins className="w-4 h-4 text-amber-400" />
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                هكذا تظهر إعلانات Google في تطبيقك بمجرد ربط حساب AdSense. جرب الضغط على الإعلان لمحاكاة نقرة حقيقية وكسب أرباح في لوحة المالك!
              </p>
              <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 pt-1 font-mono justify-end">
                <span>سعر النقرة المتوقع (CPC): <strong className="text-amber-400">$0.22</strong></span>
                <span>•</span>
                <span>الأرباح المتراكمة الحالية: <strong className="text-emerald-400">${((stats.totalViews * 1.5 * 1.80 / 1000) + stats.adClicks * 0.22).toFixed(2)}</strong></span>
              </div>
            </div>

            <button
              onClick={() => {
                onIncrementAdClicks();
                if (soundEnabled) soundEngine.playSuccess();
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/10 active:scale-95 transition-all flex items-center gap-2 shrink-0 border border-amber-400/20"
            >
              <MousePointer className="w-4 h-4 animate-bounce" />
              <span>تفاعل مع الإعلان (+0.22$)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5 justify-end">
              <span>هل ترغب بزيادة أرباحك وتفعيل إعلانات Google AdSense في التطبيق؟</span>
              <Coins className="w-4 h-4 text-slate-400" />
            </p>
            <p className="text-[11px] text-slate-400">
              يمكنك محاكاة ظهور الإعلانات وحساب الأرباح الفعلية المتوقعة أو ربط حساب AdSense حقيقي الآن في ثوانٍ.
            </p>
          </div>
          <button
            onClick={() => {
              if (soundEnabled) soundEngine.playClick();
              setShowOwnerModal(true);
              setActiveOwnerTab('ads');
              setIsRealAdSelected(true);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-400 border border-cyan-800/50 text-xs font-bold shrink-0 self-start sm:self-auto transition-all"
          >
            تفعيل وربط الإعلانات ⚙️
          </button>
        </div>
      )}

      {/* Interactive Experiments Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-cyan-400" />
          <span>الوحدات الدراسية المقررة في منهج علوم الصف السادس</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Unit 1 Microscope */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Microscope className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  الوحدة الأولى
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-100 group-hover:text-cyan-400 transition-colors">
                1. الخلايا والمجهر الضوئي
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                فحص عينات خلوية حقيقية (بشرة البصل، خلايا الدم، البكتيريا، والأميبا)، التحكم بدقة التكبير (100x)، الإضاءة، والتركيز الدقيق.
              </p>
            </div>
            <button
              onClick={() => handleLaunch('microscope')}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 text-xs font-bold border border-slate-700 hover:border-cyan-400 transition-all flex items-center justify-center gap-2"
            >
              <span>دخول تجارب المجهر (الوحدة 1)</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Card 2: Unit 1 Cell & Osmosis */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Dna className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  تابع الوحدة الأولى
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-400 transition-colors">
                2. العضيات الخلوية والتناضح
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                استكشاف العضيات (النواة، الميتوكندريا، البلاستيدات الخضراء)، وتجربة التناضح مع غشاء الخلية النباتية والحيوانية.
              </p>
            </div>
            <button
              onClick={() => handleLaunch('cell_organelles')}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 text-xs font-bold border border-slate-700 hover:border-emerald-400 transition-all flex items-center justify-center gap-2"
            >
              <span>دخول أجزاء الخلية والتناضح</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Card 3: Unit 2 Physics & Energy (Mechanical Energy & Simple Machines) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                  الوحدة الثانية
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-100 group-hover:text-amber-400 transition-colors">
                3. الطاقة الميكانيكية والآلات البسيطة
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                قاذف الكرات ص 57 (طاقة الوضع المرونية)، تجربة دحرجة الكرات واصطدامها بالكأس ص 63 (أثر الكتلة والارتفاع)، ونشاط حركة التروس ص 71.
              </p>
            </div>
            <div className="mt-5 space-y-2">
              <button
                onClick={() => handleLaunch('physics_energy', 'gears_machines')}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
              >
                <span>⚙️ تفعيل نشاط حركة التروس (ص 71)</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
              
              <button
                onClick={() => handleLaunch('physics_energy', 'catapult')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <span>🎯 قاذف الكرات ودحرجة الكرات (ص 57 - 63)</span>
              </button>
            </div>
          </div>

          {/* Card 4: Unit 3 Chemistry & Matter */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Atom className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                  الوحدة الثالثة
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-100 group-hover:text-blue-400 transition-colors">
                4. المادة والتفاعلات الكيميائية
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ترتيب جسيمات المواد الصلبة والسائلة والغازية، وتفاعل المعادن مع حمض الهيدروكلوريك HCl وتصاعد غاز الهيدروجين.
              </p>
            </div>
            <button
              onClick={() => handleLaunch('chemistry_matter')}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-blue-500 hover:text-slate-950 text-blue-400 text-xs font-bold border border-slate-700 hover:border-blue-400 transition-all flex items-center justify-center gap-2"
            >
              <span>دخول تجارب المادة (الوحدة 3)</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Card 5: Unit 4 Earth Sciences */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-950 text-purple-400 border border-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                  الوحدة الرابعة
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-100 group-hover:text-purple-400 transition-colors">
                5. عمليات الأرض والتجوية والتحلل
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                محاكاة التجوية الميكانيكية والكيميائية، وتجربة استكشاف تحلل النفايات في التربة لمعرفة أي المواد تتحلل أسرع في البيئة (نشاط ص 97).
              </p>
            </div>
            <button
              onClick={() => handleLaunch('earth_experiments')}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-purple-500 hover:text-slate-950 text-purple-400 text-xs font-bold border border-slate-700 hover:border-purple-400 transition-all flex items-center justify-center gap-2"
            >
              <span>دخول تجارب الأرض (الوحدة 4)</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Card 6: AI Science Advisor */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  مساعد معلم العلوم
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-100 group-hover:text-cyan-400 transition-colors">
                6. المستشار العلمي الذكي (Gemini)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                اسأل أي سؤال علمي في الوحدات الأربع لمنهج الصف السادس للحصول على إجابات وشروح علمية دقيقة.
              </p>
            </div>
            <button
              onClick={() => handleLaunch('ai_advisor')}
              className="mt-5 w-full py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold border border-cyan-500/40 transition-all flex items-center justify-center gap-2"
            >
              <span>فتح المستشار العلمي</span>
              <Bot className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Lab Safety Rules Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 text-amber-400 border-b border-slate-800 pb-3">
          <ShieldAlert className="w-6 h-6" />
          <h3 className="font-bold text-slate-100 text-lg">قواعد السلامة والأمان في المعمل</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          {LAB_SAFETY_RULES.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Owner Authentication Modal */}
      {showCodePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-slate-900 border border-cyan-500/50 rounded-2xl max-w-sm w-full p-6 space-y-4 text-right">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-cyan-950/80 border border-cyan-800 flex items-center justify-center mx-auto text-cyan-400">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-bold text-slate-100 text-lg">تحقق هوية المالك 🔑</h3>
              <p className="text-xs text-slate-400">
                يرجى إدخال كود المالك السري للدخول إلى لوحة التحكم والإحصائيات وأرباح AdSense.
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="password"
                placeholder="أدخل كود المالك (مثال: 2026)"
                value={enteredCode}
                onChange={(e) => {
                  setEnteredCode(e.target.value);
                  setCodeError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleVerifyCode();
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-center font-mono focus:outline-none focus:border-cyan-500 text-sm"
              />
              {codeError && (
                <p className="text-red-400 text-xs text-center font-semibold">{codeError}</p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleVerifyCode}
                className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/10"
              >
                تأكيد الكود ✅
              </button>
              <button
                onClick={() => {
                  setShowCodePrompt(false);
                  setEnteredCode('');
                  setCodeError('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Owner Control Modal & Google AdSense Dashboard */}
      {showOwnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-cyan-800/80 rounded-2xl max-w-lg w-full p-6 space-y-5 text-right my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>لوحة التحكم المتقدمة لمالك التطبيق 🔑</span>
              </h3>
              <button 
                onClick={() => setShowOwnerModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-center">
              <button
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setActiveOwnerTab('stats');
                }}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  activeOwnerTab === 'stats'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                إحصائيات المنصة
              </button>
              <button
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setActiveOwnerTab('ads');
                }}
                className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  activeOwnerTab === 'ads'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>أرباح Google Ads</span>
              </button>
              <button
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setActiveOwnerTab('code');
                }}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  activeOwnerTab === 'code'
                    ? 'bg-blue-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                طريقة دمج الإعلانات
              </button>
            </div>

            {/* TAB 1: PLATFORM STATS */}
            {activeOwnerTab === 'stats' && (
              <div className="space-y-4 text-xs text-slate-300">
                <p>
                  تابع إحصائيات الاستخدام، الزيارات، والتفاعلات الحية لطلابك في معمل العلوم بكل دقة وسهولة.
                </p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>إجمالي الزيارات والمشاهدات الحقيقية:</span>
                    <span className="font-mono text-cyan-400 font-extrabold text-base">{stats.totalViews}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>محاكاة التجارب والأنشطة المنفذة:</span>
                    <span className="font-mono text-blue-400 font-bold">{stats.totalExperimentsRun}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>الاختبارات المقيمة بنجاح:</span>
                    <span className="font-mono text-emerald-400 font-bold">{stats.totalQuizCompleted}</span>
                  </div>
                </div>

                {/* Ad Simulation Switch */}
                <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800/80">
                  <div className="space-y-1 text-right">
                    <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      <span>تفعيل الإعلانات التجريبية بالتطبيق</span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      عند تفعيل هذا الخيار، ستظهر بانرات إعلانية لـ Google AdSense في التطبيق للمحاكاة والضغط وكسب الربح.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (soundEnabled) soundEngine.playClick();
                      onToggleAdSimulation(!stats.adSimulationEnabled);
                    }}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none shrink-0 ${
                      stats.adSimulationEnabled ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <div className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      stats.adSimulationEnabled ? '-translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Quick Add Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      onIncrementViews();
                      if (soundEnabled) soundEngine.playBeep();
                    }}
                    className="flex-1 py-2 rounded-xl bg-cyan-950 text-cyan-400 hover:bg-cyan-900 border border-cyan-800/50 font-bold"
                  >
                    محاكاة زيارة (+1 مشاهدة)
                  </button>
                  
                  <button
                    onClick={() => {
                      if (confirm('هل أنت متأكد من إعادة ضبط الإحصائيات بالكامل؟')) {
                        onResetStats();
                        setShowOwnerModal(false);
                      }
                    }}
                    className="py-2 px-3 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 font-bold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ضبط الإحصائيات</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: GOOGLE ADSENSE SIMULATOR */}
            {activeOwnerTab === 'ads' && (() => {
              const impressions = Math.round(stats.totalViews * 1.5);
              const ctr = impressions > 0 ? ((stats.adClicks / impressions) * 100).toFixed(2) : '0.00';
              const cpc = 0.22; // $0.22 per click
              const rpm = 1.80; // $1.80 revenue per 1000 views
              const viewsRevenue = (impressions * rpm) / 1000;
              const clicksRevenue = stats.adClicks * cpc;
              const totalRevenue = viewsRevenue + clicksRevenue;

              const handleSaveRealSettings = () => {
                let cleanPubId = pubIdInput.trim();
                if (!cleanPubId.startsWith('ca-pub-')) {
                  if (/^\d+$/.test(cleanPubId)) {
                    cleanPubId = `ca-pub-${cleanPubId}`;
                    setPubIdInput(cleanPubId);
                  } else {
                    alert('يرجى إدخال معرف ناشر صحيح يبدأ بـ ca-pub- ويتكون من أرقام فقط.');
                    return;
                  }
                }
                
                onUpdateAdSenseSettings(cleanPubId, adSlotInput.trim(), true);
                if (soundEnabled) soundEngine.playSuccess();
                setSaveSuccessMessage('🎉 تم ربط حسابك في Google AdSense بنجاح! تم تحديث كود الرأس (Head) والوحدات الإعلانية.');
                setTimeout(() => setSaveSuccessMessage(''), 5000);
              };

              return (
                <div className="space-y-4 text-xs text-slate-300">
                  {/* Selector for Simulation vs Real Connection */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => {
                        if (soundEnabled) soundEngine.playClick();
                        setIsRealAdSelected(false);
                      }}
                      className={`py-2 rounded-lg text-[11px] font-bold transition-all ${
                        !isRealAdSelected
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      💰 محاكاة الأرباح والأداء
                    </button>
                    <button
                      onClick={() => {
                        if (soundEnabled) soundEngine.playClick();
                        setIsRealAdSelected(true);
                      }}
                      className={`py-2 rounded-lg text-[11px] font-bold transition-all ${
                        isRealAdSelected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🔗 ربط الحساب الحقيقي (Live)
                    </button>
                  </div>

                  {!isRealAdSelected ? (
                    <>
                      <div className="bg-amber-950/20 border border-amber-800/40 p-3 rounded-xl text-amber-300 leading-relaxed text-[11px]">
                        📊 <strong>أرباح Google AdSense المقدرة للزيارات الحالية:</strong> بناءً على حركة المرور الحالية لتطبيقك، هذه هي المحاكاة الدقيقة لكيفية احتساب Google للأرباح من مشاهدات الإعلان والنقرات.
                      </div>

                      {/* Earnings Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                          <p className="text-slate-400 text-[10px] mb-1">الربح المقدر المقبوض 💰</p>
                          <p className="text-lg font-extrabold text-emerald-400 font-mono">
                            ${totalRevenue.toFixed(2)} USD
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">≈ {(totalRevenue * 3.75).toFixed(2)} ريال سعودي</p>
                        </div>

                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                          <p className="text-slate-400 text-[10px] mb-1">نقرات الزوار الحقيقية (Clicks)</p>
                          <p className="text-lg font-extrabold text-amber-400 font-mono">
                            {stats.adClicks}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">معدل CTR: %{ctr}</p>
                        </div>

                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                          <p className="text-slate-400 text-[10px] mb-1">مرات ظهور الإعلان (Impressions)</p>
                          <p className="text-lg font-extrabold text-blue-400 font-mono">
                            {impressions.toLocaleString()}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">بمعدل 1.5 إعلان بالصفحة</p>
                        </div>

                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                          <p className="text-slate-400 text-[10px] mb-1">التكلفة لكل ألف ظهور (RPM)</p>
                          <p className="text-lg font-extrabold text-purple-400 font-mono">
                            ${rpm.toFixed(2)}
                          </p>
                          <p className="text-[9px] text-slate-500 mt-0.5">ومتوسط سعر النقرة: ${cpc}</p>
                        </div>
                      </div>

                      {/* Interactive Clicks Simulator inside the modal */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-3">
                        <p className="font-bold text-slate-200">اختبر نقرة إعلان تفاعلية:</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          عند قيام زائر حقيقي بالضغط على إعلانات Google في تطبيقك، ستحصل فورياً على متوسط عائد قدره <strong>$0.22</strong>. جرب الضغط على الزر أدناه لإجراء نقرة افتراضية ومراقبة تحديث رصيد أرباحك في الأعلى مباشرة!
                        </p>
                        <button
                          onClick={() => {
                            onIncrementAdClicks();
                            if (soundEnabled) soundEngine.playSuccess();
                          }}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
                        >
                          <MousePointer className="w-3.5 h-3.5 animate-bounce" />
                          <span>تسجيل نقرة إعلان وتوليد ربح (+ $0.22)</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4 animate-fade-in text-right">
                      <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-[11px] font-bold text-slate-200">إعدادات ربط Google AdSense الحقيقي</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            stats.isRealAdSenseEnabled 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' 
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}>
                            {stats.isRealAdSenseEnabled ? '🟢 متصل ونشط حياً' : '⚪ بانتظار الربط والتنشيط'}
                          </span>
                        </div>

                        {/* Success message */}
                        {saveSuccessMessage && (
                          <div className="p-2.5 bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 rounded-lg text-[10px] leading-relaxed text-center animate-pulse">
                            {saveSuccessMessage}
                          </div>
                        )}

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 block font-bold">معرّف الناشر في AdSense (Publisher ID):</label>
                            <input
                              type="text"
                              value={pubIdInput}
                              onChange={(e) => setPubIdInput(e.target.value)}
                              placeholder="مثال: ca-pub-3336377424012326"
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-left focus:outline-none focus:border-emerald-500 text-xs"
                            />
                            <p className="text-[9px] text-slate-500">
                              يبدأ دائماً بـ <code className="font-mono text-amber-500">ca-pub-</code> ويليه 16 رقماً.
                            </p>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 block font-bold">معرّف الوحدة الإعلانية (Ad Slot ID) - اختياري:</label>
                            <input
                              type="text"
                              value={adSlotInput}
                              onChange={(e) => setAdSlotInput(e.target.value)}
                              placeholder="مثال: 1234567890"
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-left focus:outline-none focus:border-emerald-500 text-xs"
                            />
                            <p className="text-[9px] text-slate-500">
                              رقم الوحدة الإعلانية المحددة من حسابك (إذا كنت ترغب باستخدام إعلان محدد بدلاً من الإعلانات التلقائية).
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={handleSaveRealSettings}
                          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/10"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>حفظ الإعدادات وتفعيل حسابي الحقيقي 💾</span>
                        </button>
                      </div>

                      <div className="bg-emerald-950/10 border border-emerald-900/40 p-3 rounded-xl text-[10px] leading-relaxed text-emerald-400 space-y-1.5">
                        <p className="font-bold text-slate-200">ℹ️ كيف يعمل الربط في التطبيق؟</p>
                        <p>
                          بمجرد ضغطك على حفظ، يقوم النظام فورياً بتبديل معرّف الناشر في التطبيق إلى معرّفك الخاص <code className="font-mono text-amber-300">{stats.adsensePublisherId || pubIdInput}</code>.
                        </p>
                        <p>
                          ليبدأ تطبيقك في عرض الإعلانات الحقيقية وجلب أرباح واقعية، يرجى نشر التطبيق على رابط عام (مثل Netlify أو Vercel)، ثم تقديم طلب مراجعة الموقع في لوحة تحكم AdSense الخاصة بك.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* TAB 3: HOW TO ADD GOOGLE ADS CODE */}
            {activeOwnerTab === 'code' && (
              <div className="space-y-4 text-xs text-slate-300 text-right">
                <p>
                  لتفعيل إعلانات Google الحقيقية في تطبيقك وكسب مئات الدولارات شهرياً من الطلاب والزوار، اتبع هذه الخطوات البسيطة:
                </p>

                <div className="space-y-3">
                  <div className="border border-slate-800 rounded-xl p-3 bg-slate-950 space-y-1">
                    <p className="font-bold text-slate-200">الخطوة 1: التسجيل في Google AdSense 📝</p>
                    <p className="text-[10px] text-slate-400">
                      قم بزيارة موقع <a href="https://adsense.google.com" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Google AdSense</a> واشترك مجاناً باستخدام حساب Gmail الخاص بك، ثم أضف رابط تطبيقك بعد نشره على خادم عام.
                    </p>
                  </div>

                  <div className="border border-slate-800 rounded-xl p-3 bg-slate-950 space-y-2">
                    <p className="font-bold text-slate-200">الخطوة 2: إضافة كود التهيئة في HTML 🌐</p>
                    <p className="text-[10px] text-slate-400">
                      انسخ هذا الكود وضعه داخل وسم <code className="text-cyan-400">&lt;head&gt;</code> في ملف <code className="text-cyan-400">index.html</code> لتطبيقك:
                    </p>
                    <pre className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-mono text-left text-slate-300 overflow-x-auto select-all leading-normal" dir="ltr">
{`<!-- كود تهيئة جوجل أدسينس -->
<script async 
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${stats.adsensePublisherId || 'ca-pub-3336377424012326'}" 
  crossorigin="anonymous">
</script>`}
                    </pre>
                    <p className="text-[9px] text-amber-500">
                      * لقد قمنا بدمج معرّف الناشر الخاص بك <code className="text-amber-400">{stats.adsensePublisherId || 'ca-pub-3336377424012326'}</code> تلقائياً في كود التطبيق!
                    </p>
                  </div>

                  <div className="border border-slate-800 rounded-xl p-3 bg-slate-950 space-y-2">
                    <p className="font-bold text-slate-200">الخطوة 3: إضافة مكوّن الإعلان في صفحات React ⚛️</p>
                    <p className="text-[10px] text-slate-400">
                      استخدم هذا المكوّن البسيط لعرض الإعلانات المستجيبة تلقائياً في أي مكان في تطبيقك:
                    </p>
                    <pre className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-[8px] font-mono text-left text-slate-300 overflow-x-auto select-all leading-tight" dir="ltr">
{`import React, { useEffect } from 'react';

export const GoogleAd: React.FC = () => {
  useEffect(() => {
    try {
      // استدعاء محرك إعلانات جوجل
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense Error: ", e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="${stats.adsensePublisherId || 'ca-pub-3336377424012326'}"
         data-ad-slot="${stats.adsenseAdSlotId || 'YYYYYYYYYY'}"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  );
};`}
                    </pre>
                  </div>
                </div>

                <div className="p-3 bg-blue-950/20 border border-blue-800/40 rounded-xl text-[10px] text-blue-300 flex gap-2">
                  <span className="text-xs select-none">💡</span>
                  <p>
                    <strong>نصيحة ذهبية:</strong> تأكد أن تطبيقك يحتوي على محتوى تعليمي غني وتفاعل قوي لتوافق شركة Google على تفعيل الإعلانات فورياً عند تقديم الطلب.
                  </p>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-between items-center border-t border-slate-800 pt-3">
              <button
                onClick={() => {
                  if (soundEnabled) soundEngine.playClick();
                  setIsOwnerAuthenticated(false);
                  localStorage.removeItem('isOwnerAuthenticated');
                  setShowOwnerModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 text-xs font-bold transition-all flex items-center gap-1"
              >
                <span>قفل اللوحة 🔒</span>
              </button>
              
              <button
                onClick={() => setShowOwnerModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
              >
                إغلاق لوحة التحكم
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
