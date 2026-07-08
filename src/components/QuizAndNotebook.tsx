import React, { useState } from 'react';
import { LabNote } from '../types';
import { SCIENCE_QUIZ } from '../data/labData';
import { 
  BookOpenCheck, 
  FileText, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Printer, 
  Plus, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface QuizAndNotebookProps {
  notes: LabNote[];
  onAddNote: (note: Omit<LabNote, 'id' | 'date'>) => void;
  onDeleteNote: (id: string) => void;
  onQuizCompleted: () => void;
  soundEnabled: boolean;
}

export const QuizAndNotebook: React.FC<QuizAndNotebookProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  onQuizCompleted,
  soundEnabled
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'notebook'>('quiz');

  // Quiz States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  // New Note Form States
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [experimentName, setExperimentName] = useState<string>('');
  const [noteCategory, setNoteCategory] = useState<'biology' | 'physics' | 'chemistry' | 'earth'>('physics');
  const [hypothesis, setHypothesis] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [conclusion, setConclusion] = useState<string>('');

  const currentQ = SCIENCE_QUIZ[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (soundEnabled) soundEngine.playClick();
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: optionIndex });
  };

  const handleNextQuestion = () => {
    if (soundEnabled) soundEngine.playClick();
    if (currentQuestionIndex < SCIENCE_QUIZ.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      if (soundEnabled) soundEngine.playSuccess();
      onQuizCompleted();
    }
  };

  const calculateScore = () => {
    let score = 0;
    SCIENCE_QUIZ.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        score++;
      }
    });
    return score;
  };

  const handleCreateNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !content) return;

    if (soundEnabled) soundEngine.playSuccess();
    onAddNote({
      title: noteTitle,
      experimentName: experimentName || 'تجربة معملية حرة',
      category: noteCategory,
      hypothesis: hypothesis || 'صياغة فرضية التجارب وتأكيد النتائج.',
      content: content,
      conclusion: conclusion || 'تمت كتابة التقرير وتوثيق المشاهدات بنجاح.'
    });

    setNoteTitle('');
    setExperimentName('');
    setHypothesis('');
    setContent('');
    setConclusion('');
    setShowAddForm(false);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">الاختبارات وتقارير دفتر المعمل</h2>
            <p className="text-xs text-slate-400">اختبر استيعابك العلمي واكتب ودون ملاحظات تجاربك وطباعتها بسهولة</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (soundEnabled) soundEngine.playClick();
              setActiveTab('quiz');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1. الاختبار التقييمي 📝
          </button>
          
          <button
            onClick={() => {
              if (soundEnabled) soundEngine.playClick();
              setActiveTab('notebook');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'notebook'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            2. دفتر تقارير المعمل ({notes.length}) 📖
          </button>
        </div>
      </div>

      {activeTab === 'quiz' ? (
        /* QUIZ SECTION */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          
          {!showResults ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              
              {/* Question Progress bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>سؤال {currentQuestionIndex + 1} من {SCIENCE_QUIZ.length}</span>
                <span className="text-cyan-400 font-bold">{Math.round(((currentQuestionIndex + 1) / SCIENCE_QUIZ.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / SCIENCE_QUIZ.length) * 100}%` }}
                />
              </div>

              {/* Question Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-800">
                  فرع: {currentQ.category === 'biology' ? 'أحياء' : currentQ.category === 'physics' ? 'فيزياء' : currentQ.category === 'chemistry' ? 'كيمياء' : 'علوم الأرض'}
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
                  {currentQ.questionAr}
                </h3>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  {currentQ.optionsAr.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`p-4 rounded-xl border text-right transition-all text-xs font-semibold flex items-center justify-between ${
                          isSelected
                            ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{option}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                          isSelected ? 'border-cyan-400 bg-cyan-500 text-slate-950 font-bold' : 'border-slate-700'
                        }`}>
                          {idx + 1}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md disabled:opacity-50 transition-all"
                >
                  {currentQuestionIndex < SCIENCE_QUIZ.length - 1 ? 'السؤال التالي ←' : 'عرض النتيجة النهائية 🎉'}
                </button>
              </div>

            </div>
          ) : (
            /* RESULTS SCREEN */
            <div className="text-center space-y-6 py-8 max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-cyan-950 text-cyan-400 border-2 border-cyan-500 mx-auto flex items-center justify-center shadow-xl">
                <Award className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-100">نتيجتك في الاختبار العلمي</h3>
                <p className="text-3xl font-mono font-bold text-cyan-400">
                  {calculateScore()} / {SCIENCE_QUIZ.length}
                </p>
                <p className="text-xs text-slate-400">
                  {calculateScore() >= 6 ? 'ممتاز جداً! أظهرت استيعاباً رائعاً للمفاهيم والتجارب.' : 'أداء جيد! يمكنك إعادة الاختبار أو التعمق أكثر في أقسام المحاكاة.'}
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setShowResults(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>إعادة الاختبار</span>
              </button>
            </div>
          )}

        </div>
      ) : (
        /* NOTEBOOK SECTION */
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>تقارير وتجارب المعمل المسجلة:</span>
            </h3>

            <div className="flex gap-2">
              <button
                onClick={handlePrintReport}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة التقرير</span>
              </button>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة تقرير يدوي</span>
              </button>
            </div>
          </div>

          {/* New Note Form Modal / Drawer */}
          {showAddForm && (
            <form onSubmit={handleCreateNoteSubmit} className="bg-slate-900 border border-cyan-800/80 rounded-2xl p-5 space-y-4">
              <h4 className="font-bold text-sm text-cyan-300">تدوين تقرير جديد في دفتر المعمل:</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="عنوان التقرير..."
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  required
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-cyan-500 outline-none"
                />
                
                <input
                  type="text"
                  placeholder="اسم التجربة..."
                  value={experimentName}
                  onChange={(e) => setExperimentName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-cyan-500 outline-none"
                />
              </div>

              <textarea
                placeholder="الملاحظات والنتائج بالتفصيل..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-cyan-500 outline-none"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  حفظ التقرير
                </button>
              </div>
            </form>
          )}

          {/* Notes List */}
          {notes.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
              لا توجد تقارير مسجلة بعد. استخدم أزرار "حفظ النتائج" أثناء إجراء التجارب لتدوينها هنا تلقائياً!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 relative group">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-slate-100 text-sm">{note.title}</span>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{note.content}</p>

                  {note.conclusion && (
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] text-cyan-400 font-mono">
                      الاستنتاج: {note.conclusion}
                    </div>
                  )}

                  <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                    <span>التجربة: {note.experimentName}</span>
                    <span>{note.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
