import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { quizQuestions } from '../data/quizData';

interface QuizSectionProps {
  onEarnPoints?: (pts: number) => void;
  playSound?: () => void;
}

export function QuizSection({ onEarnPoints, playSound }: QuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentQ = quizQuestions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
    if (playSound) playSound();
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      if (playSound) playSound();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      if (playSound) playSound();
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const earned = correctCount * 30;
    if (onEarnPoints) onEarnPoints(earned);

    if (correctCount >= 7) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
    if (playSound) playSound();
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    if (playSound) playSound();
  };

  // Score calculation
  const totalCorrect = quizQuestions.filter(
    (q) => selectedAnswers[q.id] === q.correctAnswer
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0e1938] border border-[#1a2c59] rounded-2xl p-5 shadow-lg shadow-black/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              مسابقات التحدي والاختبارات المنهجية
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              🏆 اختبار العلوم الشامل — الصف السادس الابتدائي
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              أسئلة وزارية وتطبيقية تغطي وحدات الخلية، الدارات، التفاعلات الكيميائية، وطبقات الأرض وتغيراتها.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 bg-[#122247] border border-cyan-500/30 text-cyan-300 rounded-xl">
              10 أسئلة وزارية
            </span>
            {isSubmitted && (
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" /> إعادة الاختبار
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Quiz Body */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Card */}
          <div className="lg:col-span-8 bg-[#0e1834] border border-[#1a2b56] rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div>
              {/* Question progress and category */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-4 pb-3 border-b border-[#16234b]">
                <span className="text-cyan-300 bg-[#12234d] border border-cyan-500/30 px-3 py-1 rounded-lg">
                  {currentQ.category}
                </span>
                <span className="text-slate-300">
                  السؤال {(currentIndex + 1).toLocaleString('ar-EG')} من {quizQuestions.length.toLocaleString('ar-EG')}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedAnswers[currentQ.id] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      className={`w-full text-right p-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-cyan-400 bg-[#142854] text-white ring-2 ring-cyan-500/30 shadow-md'
                          : 'border-[#182752] hover:border-slate-500 bg-[#091126] text-slate-200'
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0 mr-3 font-mono font-bold ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-600 text-white'
                            : 'border-slate-600 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#16234b]">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-[#111e40] hover:bg-[#182a57] border border-slate-700 text-slate-200"
              >
                <ArrowRight className="w-4 h-4" /> السابق
              </button>

              {currentIndex === quizQuestions.length - 1 ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all"
                >
                  تسليم الإجابات وإنهاء الاختبار 🏁
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-all"
                >
                  التالي <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Question Grid Map (Right) */}
          <div className="lg:col-span-4 bg-[#0e1834] border border-[#1a2b56] rounded-2xl p-5 shadow-md">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              خريطة الأسئلة المنهجية:
            </h4>
            <div className="grid grid-cols-5 gap-2 mb-6">
              {quizQuestions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl text-xs font-bold transition-all border ${
                      isCurrent
                        ? 'bg-cyan-600 border-cyan-400 text-white ring-2 ring-cyan-400/40'
                        : isAnswered
                        ? 'bg-[#152750] border-cyan-500/40 text-cyan-300'
                        : 'bg-[#091126] border-slate-700/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="p-3.5 bg-[#091126] rounded-xl border border-purple-500/30 text-xs text-purple-200 leading-relaxed">
              <strong className="text-purple-300">💡 نصيحة تعليمية:</strong>
              <p className="mt-1 text-slate-300">
                تغطي هذه الأسئلة المهارات الأساسية المطلوبة في الاختبارات المدرسية والوزارية النهائية للصف السادس الابتدائي.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Result Summary View */
        <div className="bg-[#0e1834] border border-[#1a2b56] rounded-2xl p-8 shadow-xl text-center max-w-2xl mx-auto space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-lg">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">
              {totalCorrect >= 9
                ? 'ممتاز جداً! درجة كاملة وشبه كاملة 🌟'
                : totalCorrect >= 6
                ? 'أداء رائع جداً! أحسنت العمل 👏'
                : 'محاولة طيبة! ننصحك بمراجعة صفحات الكتاب والتجارب 📚'}
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              لقد أجبت على <strong className="text-cyan-400 font-mono text-lg">{totalCorrect.toLocaleString('ar-EG')}</strong> من أصل{' '}
              <strong className="text-white font-mono text-lg">{quizQuestions.length.toLocaleString('ar-EG')}</strong> أسئلة صحيحة.
            </p>
          </div>

          {/* Score percentage bar */}
          <div className="w-full bg-[#091126] rounded-full h-4 overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-1000 ${
                totalCorrect >= 7 ? 'bg-emerald-500' : totalCorrect >= 5 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${(totalCorrect / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* Detailed Question Review */}
          <div className="text-right space-y-3 mt-6 pt-6 border-t border-[#16234b] max-h-96 overflow-y-auto pr-1">
            <h4 className="font-bold text-sm text-cyan-300 mb-2">مراجعة الإجابات النموذجية والشرح:</h4>
            {quizQuestions.map((q, idx) => {
              const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-3.5 rounded-xl border text-xs text-right ${
                    isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/40'
                      : 'bg-rose-950/40 border-rose-500/40'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="text-white">
                      السؤال {idx + 1}: {q.question}
                    </span>
                  </div>
                  <div className="text-slate-300 mt-1">
                    الإجابة الصحيحة: <strong className="text-cyan-300">{q.options[q.correctAnswer]}</strong>
                  </div>
                  <div className="text-slate-400 mt-1 italic">
                    💡 الشرح: {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            إعادة الاختبار من البداية 🔄
          </button>
        </div>
      )}
    </div>
  );
}
