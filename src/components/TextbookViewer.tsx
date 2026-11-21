import { useState } from 'react';
import { BookOpen, ChevronRight, ChevronLeft, Sparkles, HelpCircle, Eye, EyeOff, Beaker, CheckCircle2, Bookmark, ArrowRight, Share2, Printer } from 'lucide-react';
import { textbookPages } from '../data/textbookData';
import { UnitId } from '../types';

interface TextbookViewerProps {
  onOpenLab: (unitId: UnitId) => void;
  onEarnPoints: (pts: number) => void;
  playSound: () => void;
}

export function TextbookViewer({ onOpenLab, onEarnPoints, playSound }: TextbookViewerProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [showThinkAnswer, setShowThinkAnswer] = useState<boolean>(false);
  const [revealedReviewAnswers, setRevealedReviewAnswers] = useState<Record<number, boolean>>({});
  const [bookmarkedPages, setBookmarkedPages] = useState<number[]>([]);

  const page = textbookPages[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < textbookPages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      setShowThinkAnswer(false);
      setRevealedReviewAnswers({});
      playSound();
      onEarnPoints(5);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      setShowThinkAnswer(false);
      setRevealedReviewAnswers({});
      playSound();
    }
  };

  const handleSelectPage = (index: number) => {
    setCurrentPageIndex(index);
    setShowThinkAnswer(false);
    setRevealedReviewAnswers({});
    playSound();
  };

  const toggleBookmark = (pageNum: number) => {
    setBookmarkedPages((prev) =>
      prev.includes(pageNum) ? prev.filter((p) => p !== pageNum) : [...prev, pageNum]
    );
    playSound();
  };

  const toggleReviewAnswer = (index: number) => {
    setRevealedReviewAnswers((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
    playSound();
    onEarnPoints(5);
  };

  return (
    <div className="space-y-6">
      {/* Textbook Header Banner */}
      <div className="bg-[#0b1633] border border-cyan-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-black/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 ring-1 ring-cyan-400/40">
            <BookOpen className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
                نسخة الكتاب المعتمدة
              </span>
              <span className="text-xs text-slate-400">وزارة التربية</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
              صفحات كتاب العلوم — الصف السادس الابتدائي
            </h2>
          </div>
        </div>

        {/* Quick Page Navigator & Bookmarks */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark(page.pageNumber)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              bookmarkedPages.includes(page.pageNumber)
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-[#101e40] border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>{bookmarkedPages.includes(page.pageNumber) ? 'محفوظة في علاماتي' : 'حفظ الصفحة'}</span>
          </button>

          <button
            onClick={() => onOpenLab(page.labTargetUnit)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 border border-cyan-400 text-white text-xs font-bold transition shadow-md shadow-cyan-600/20"
          >
            <Beaker className="w-3.5 h-3.5" />
            <span>محاكاة تجربة الصفحة</span>
          </button>
        </div>
      </div>

      {/* Page Tabs Strip */}
      <div className="bg-[#0e1834] border border-[#1a2b56] rounded-2xl p-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-md">
        <span className="text-xs font-bold text-slate-400 whitespace-nowrap px-2 flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>انتقل لصفحة:</span>
        </span>
        {textbookPages.map((p, idx) => {
          const isCurrent = idx === currentPageIndex;
          const isBookmarked = bookmarkedPages.includes(p.pageNumber);
          return (
            <button
              key={p.id}
              onClick={() => handleSelectPage(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isCurrent
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-300 text-white shadow-md shadow-cyan-900/40 ring-1 ring-cyan-400/50'
                  : 'bg-[#091126] border-slate-700/60 text-slate-300 hover:bg-[#12234a] hover:text-white'
              }`}
            >
              <span>ص {p.pageNumber.toLocaleString('ar-EG')}</span>
              {isBookmarked && <span className="text-amber-400 text-[10px]">★</span>}
            </button>
          );
        })}
      </div>

      {/* Realistic Textbook Page Card */}
      <div className="bg-[#0d1736] border-2 border-[#1c3066] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50 relative overflow-hidden">
        {/* Page Top Header with official look */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#1b2b58]">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-[#09132d] border-2 border-cyan-400 text-cyan-300 font-black text-xl flex items-center justify-center shadow-inner">
              {page.pageNumber.toLocaleString('ar-EG')}
            </span>
            <div>
              <span className="text-xs text-cyan-400 font-bold block">{page.unitTitle}</span>
              <h1 className="text-xl sm:text-2xl font-black text-white">{page.lessonTitle}</h1>
            </div>
          </div>

          {/* Navigation Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#111e40] hover:bg-[#172a59] disabled:opacity-30 border border-slate-700 text-slate-200 text-xs font-bold transition"
            >
              <ChevronRight className="w-4 h-4" />
              <span>الصفحة السابقة</span>
            </button>
            <span className="text-xs text-slate-400 font-bold px-1">
              {(currentPageIndex + 1).toLocaleString('ar-EG')} من {textbookPages.length.toLocaleString('ar-EG')}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPageIndex === textbookPages.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 border border-cyan-400 text-white text-xs font-bold transition shadow-sm"
            >
              <span>الصفحة التالية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. Main Idea Banner (الفكرة الرئيسة) */}
        <div className="mt-6 bg-[#0a142e] border-r-4 border-cyan-400 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-1">
            <Sparkles className="w-4 h-4" />
            <span>الفكرة الرئيسة للدرس (كتاب العلوم):</span>
          </div>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
            {page.mainIdea}
          </p>
        </div>

        {/* 2. Key Concepts & Vocabulary Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Key Concepts */}
          <div className="bg-[#091126] border border-[#182854] rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-[#142042]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              المفاهيم والمهارات العلمية المستهدفة
            </h3>
            <ul className="space-y-2.5">
              {page.keyConcepts.map((concept, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vocabulary */}
          <div className="bg-[#091126] border border-[#182854] rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-[#142042]">
              <Bookmark className="w-4 h-4 text-amber-400" />
              المفردات والمصطلحات العلمية في الصفحة
            </h3>
            <div className="space-y-2.5">
              {page.vocabulary.map((voc, i) => (
                <div key={i} className="bg-[#0d1838] p-3 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-xs sm:text-sm text-amber-300 block mb-0.5">
                    {voc.term}
                  </span>
                  <p className="text-[12px] text-slate-300 leading-relaxed">
                    {voc.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Practical Exploration Activity (أستكشف) */}
        <div className="mt-6 bg-[#09132e] border border-emerald-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#152550]">
            <div>
              <span className="text-xs font-bold text-emerald-400 block">نشاط علمي واستقصائي</span>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <Beaker className="w-5 h-5 text-emerald-400" />
                {page.explorationActivity.title}
              </h3>
            </div>
            <button
              onClick={() => onOpenLab(page.labTargetUnit)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-900/40"
            >
              <span>تشغيل المحاكاة الآن بالمختبر</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="bg-[#0c193c] p-3 rounded-xl border border-slate-700/50">
              <strong className="text-cyan-300 block mb-1">🎯 الهدف من التجربة:</strong>
              <p className="text-slate-200">{page.explorationActivity.objective}</p>
            </div>

            <div>
              <strong className="text-slate-400 block mb-1.5">🧰 المواد والأدوات المطلوبة في كتاب العلوم:</strong>
              <div className="flex flex-wrap gap-1.5">
                {page.explorationActivity.materials.map((mat, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#111e42] border border-slate-700 text-slate-300 text-xs font-medium"
                  >
                    • {mat}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <strong className="text-slate-400 block mb-1.5">📝 خطوات العمل والاستقصاء:</strong>
              <ol className="space-y-1.5 list-decimal list-inside text-slate-300 pr-1">
                {page.explorationActivity.steps.map((step, i) => (
                  <li key={i} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200">
              <strong className="block text-emerald-300 font-bold mb-0.5">💡 الاستنتاج العلمي:</strong>
              <p className="leading-relaxed text-xs sm:text-sm">{page.explorationActivity.conclusion}</p>
            </div>
          </div>
        </div>

        {/* 4. Think and Answer (أفكر وأجيب) */}
        <div className="mt-6 bg-[#0a132c] border border-amber-500/30 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black text-amber-300 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              سؤال: أفكر وأجيب (من كتاب العلوم)
            </h3>
            <button
              onClick={() => {
                setShowThinkAnswer(!showThinkAnswer);
                playSound();
                if (!showThinkAnswer) onEarnPoints(5);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 text-xs font-bold transition"
            >
              {showThinkAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showThinkAnswer ? 'إخفاء الإجابة النموذجية' : 'إظهار الإجابة النموذجية'}</span>
            </button>
          </div>

          <p className="text-sm font-bold text-white bg-[#0e1b3d] p-3.5 rounded-xl border border-slate-700/60 leading-relaxed">
            {page.thinkAndAnswer.question}
          </p>

          {showThinkAnswer && (
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm leading-relaxed animate-fadeIn">
              <strong className="block text-emerald-400 font-bold mb-1">✓ الإجابة المعتمدة في دليل المعلم:</strong>
              <p>{page.thinkAndAnswer.answer}</p>
            </div>
          )}
        </div>

        {/* 5. Lesson Review Questions (مراجعة الدرس) */}
        <div className="mt-6 bg-[#091126] border border-[#182854] rounded-2xl p-5 space-y-3">
          <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2 pb-2 border-b border-[#142042]">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            أسئلة مراجعة الدرس (اختبر معلوماتك)
          </h3>

          <div className="space-y-3">
            {page.lessonReviewQuestions.map((rev, i) => {
              const isRevealed = !!revealedReviewAnswers[i];
              return (
                <div key={i} className="bg-[#0d1838] p-3.5 rounded-xl border border-slate-700/50 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold text-xs sm:text-sm text-slate-100 leading-relaxed">
                      {i + 1}. {rev.q}
                    </p>
                    <button
                      onClick={() => toggleReviewAnswer(i)}
                      className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold transition border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/40"
                    >
                      {isRevealed ? 'إخفاء الحل' : 'كشف الحل'}
                    </button>
                  </div>
                  {isRevealed && (
                    <div className="p-2.5 rounded-lg bg-[#071024] border border-cyan-500/20 text-xs sm:text-sm text-cyan-200 leading-relaxed">
                      <strong className="text-cyan-400">الحل: </strong>
                      {rev.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Page Footer Indicator */}
        <div className="mt-8 pt-4 border-t border-[#182750] flex flex-wrap items-center justify-between text-xs text-slate-400">
          <span>كتاب العلوم للصف السادس الابتدائي — الفصل الدراسي المعتمد</span>
          <span className="font-bold text-cyan-400">
            صفحة {page.pageNumber.toLocaleString('ar-EG')} من الكتاب المدرسي
          </span>
        </div>
      </div>
    </div>
  );
}
