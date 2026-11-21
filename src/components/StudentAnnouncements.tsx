import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  ExternalLink,
  BookOpen,
  Microscope,
  Trophy,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { AppMode } from '../types';

interface StudentAd {
  id: string;
  badge: string;
  title: string;
  description: string;
  actionLabel: string;
  href?: string;
  targetMode?: AppMode;
  accent: 'cyan' | 'amber' | 'emerald';
  isCustom?: boolean;
}

const DEFAULT_STUDENT_ADS: StudentAd[] = [
  {
    id: 'since2026-platform',
    badge: 'منصة الطلاب التعليمية',
    title: 'ملازم وشروحات الصف السادس — موقع since2026.online',
    description:
      'تصفح الملازم المبسطة، الملخصات المركزّة، وأسئلة الاختبارات الوزارية في العلوم وجميع المواد الدراسية مجاناً.',
    actionLabel: 'دخول الموقع التعليمي',
    href: 'https://since2026.online/',
    accent: 'cyan',
  },
  {
    id: 'microscope-lab-ad',
    badge: 'نشاط تفاعلي موصى به',
    title: 'شاهد الخلايا الحقيقية تحت المجهر المركب',
    description:
      'افحص شرائح خلايا البصل، خلايا باطن الفم، وورقة الشجر بدقة عالية واختبر قوى التكبير حتى 100x.',
    actionLabel: 'افتح المجهر المركب',
    targetMode: 'microscope',
    accent: 'emerald',
  },
  {
    id: 'quiz-challenge-ad',
    badge: 'تحدي التفوق',
    title: 'اختبر معلوماتك في جميع تجارب المنهج',
    description:
      'أسئلة شاملة تغطي الخلية، الطاقة والآلات، المادة والتفاعلات، وعلوم الأرض مع تصحيح فوري وشرح كل إجابة.',
    actionLabel: 'ابدأ الاختبار الآن',
    targetMode: 'quiz',
    accent: 'amber',
  },
];

const STORAGE_KEY = 'science6_custom_student_ads';

interface StudentAnnouncementsProps {
  onSelectMode: (mode: AppMode) => void;
  playSound: () => void;
}

export const StudentAnnouncements: React.FC<StudentAnnouncementsProps> = ({
  onSelectMode,
  playSound,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [customAds, setCustomAds] = useState<StudentAd[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as StudentAd[]) : [];
    } catch {
      return [];
    }
  });

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customAds));
    } catch {
      // Storage unavailable
    }
  }, [customAds]);

  const allAds = [...customAds, ...DEFAULT_STUDENT_ADS];

  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const trimmedLink = newLink.trim();
    const validHref =
      trimmedLink && (trimmedLink.startsWith('http://') || trimmedLink.startsWith('https://'))
        ? trimmedLink
        : trimmedLink
        ? `https://${trimmedLink}`
        : undefined;

    const item: StudentAd = {
      id: `custom-${Date.now()}`,
      badge: 'إعلان جديد للطلاب',
      title: newTitle.trim(),
      description: newDesc.trim(),
      actionLabel: validHref ? 'انتقال للرابط' : 'إعلان للطلبة',
      href: validHref,
      accent: 'cyan',
      isCustom: true,
    };

    setCustomAds((prev) => [item, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setNewLink('');
    setShowAddForm(false);
    playSound();
  };

  const handleDeleteCustomAd = (id: string) => {
    setCustomAds((prev) => prev.filter((ad) => ad.id !== id));
    playSound();
  };

  const accentStyles = {
    cyan: {
      card: 'border-cyan-500/35 bg-[#08152e]/90',
      badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      button: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
      icon: <BookOpen className="w-4 h-4 text-cyan-300" />,
    },
    emerald: {
      card: 'border-emerald-500/35 bg-[#071c22]/90',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      button: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
      icon: <Microscope className="w-4 h-4 text-emerald-300" />,
    },
    amber: {
      card: 'border-amber-500/35 bg-[#1b1710]/90',
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      button: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
      icon: <Trophy className="w-4 h-4 text-amber-300" />,
    },
  };

  return (
    <section
      aria-label="إعلانات للطلاب"
      className="mb-5 rounded-3xl bg-[#0b1328] border border-[#1b2e5e] shadow-xl overflow-hidden"
    >
      {/* Top Bar */}
      <div className="px-4 py-3 bg-[#091024] border-b border-[#16254d] flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 flex-shrink-0">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-black text-white">
                إعلانات وتوجيهات للطلاب
              </h2>
              <span className="bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                <span>الصف السادس</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (!isExpanded) setIsExpanded(true);
              playSound();
            }}
            className="flex items-center gap-1 bg-[#101e40] hover:bg-[#162957] border border-cyan-500/30 text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-xl transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة إعلان</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'طي الإعلانات' : 'عرض الإعلانات'}
            className="p-1.5 rounded-xl bg-[#101e40] hover:bg-[#162957] border border-slate-700 text-slate-300 hover:text-white transition"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Optional Form to Add Custom Student Announcement */}
          {showAddForm && (
            <form
              onSubmit={handleAddAd}
              className="bg-[#070e20] border border-cyan-500/40 rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <Sparkles className="w-4 h-4" />
                <span>نشر إعلان تعليمي جديد للطلاب:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="عنوان الإعلان (مثال: موعد اختبار الوحدة الثانية)"
                  required
                  className="bg-[#0b1530] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none"
                />
                <input
                  type="text"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="رابط اختياري (مثال: https://since2026.online/)"
                  className="bg-[#0b1530] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none font-mono"
                  dir="ltr"
                />
              </div>

              <textarea
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="تفاصيل الإعلان أو النصيحة الموجهة للطلبة..."
                required
                className="w-full bg-[#0b1530] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none resize-none"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition"
                >
                  نشر الإعلان
                </button>
              </div>
            </form>
          )}

          {/* Student Announcement Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {allAds.map((ad) => {
              const style = accentStyles[ad.accent];
              return (
                <div
                  key={ad.id}
                  className={`rounded-2xl border p-4 flex flex-col justify-between gap-3 transition hover:border-opacity-80 ${style.card}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 ${style.badge}`}
                      >
                        {style.icon}
                        <span>{ad.badge}</span>
                      </span>

                      {ad.isCustom && (
                        <button
                          onClick={() => handleDeleteCustomAd(ad.id)}
                          aria-label="حذف الإعلان"
                          className="text-slate-400 hover:text-rose-400 p-1 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <h3 className="text-sm font-black text-white leading-snug">
                      {ad.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {ad.description}
                    </p>
                  </div>

                  {ad.href ? (
                    <a
                      href={ad.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playSound}
                      className={`w-full inline-flex items-center justify-center gap-1.5 font-black text-xs py-2 px-3 rounded-xl transition active:scale-98 shadow-sm ${style.button}`}
                    >
                      <span>{ad.actionLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : ad.targetMode ? (
                    <button
                      onClick={() => {
                        onSelectMode(ad.targetMode!);
                        playSound();
                      }}
                      className={`w-full inline-flex items-center justify-center gap-1.5 font-black text-xs py-2 px-3 rounded-xl transition active:scale-98 shadow-sm ${style.button}`}
                    >
                      <span>{ad.actionLabel}</span>
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
