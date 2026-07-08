import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, Lightbulb, Loader2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface AiAdvisorModalProps {
  soundEnabled: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const SAMPLE_QUESTIONS = [
  'ما وظيفة الميتوكندريا والنواة في الخلية الحية؟',
  'كيف تتغير الطاقة الحركية بجسم عند مضاعفة سرعته؟',
  'لماذا يتفاعل المغنيسيوم أسرع من النحاس مع حمض HCl؟',
  'ما الفرق الرئيسي بين عمليتي التجوية والتعرية؟'
];

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({ soundEnabled }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'أهلاً بك! أنا مستشارك العلمي الذكي لمختبر العلوم التفاعلي. يسعدني الإجابة على استفساراتك وتشريح الظواهر الفيزيائية والكيميائية والحيوية بكل يسر وسهولة.'
    }
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (queryToSend?: string) => {
    const query = queryToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    if (soundEnabled) soundEngine.playClick();

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GEMINI_API_KEY) || '';
      
      let aiResponseText = '';

      if (apiKey) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `أنت مستشار معلم علوم خبير في مادة الفيزياء والكيمياء والأحياء وعلوم الأرض بأسلوب مبسط ومشجع ومباشر باللغة العربية. أجب على السؤال التالي للقيام بالتوضيح العلمي: ${query}`
                  }
                ]
              }
            ]
          })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          aiResponseText = data.candidates[0].content.parts[0].text;
        } else {
          throw new Error('لم يتم استلام رد من النموذج.');
        }
      } else {
        // Fallback explanation if key is not configured yet
        aiResponseText = `إجابة المستشار العلمي على استفسارك ("${query}"): 
بناءً على المفاهيم العلمية المقررة في مختبر العلوم، ترتبط هذه الظاهرة بالخصائص الفيزيائية والكيميائية للمادة والتغيرات الطاقة أو البنية الخلوية للمركب. يمكنك إجراء محاكاة التجربة المخصصة في أقسام المجهر أو الكيمياء لرؤيتها بصرياً!`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: 'ai_' + Date.now(),
          sender: 'ai',
          text: aiResponseText
        }
      ]);
      if (soundEnabled) soundEngine.playSuccess();
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: 'ai_err_' + Date.now(),
          sender: 'ai',
          text: 'عذراً، حدث خطأ أثناء الاتصال بالمستشار الذكي. يرجى محاولة السؤال مرة أخرى.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-4xl mx-auto animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">المستشار العلمي الذكي (Gemini)</h2>
          <p className="text-xs text-slate-400">طرح تساؤلات ومفاهيم العلوم للحصول على إجابات وشروح فورية</p>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="space-y-2">
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>أسئلة مقترحة سريعة:</span>
        </span>
        
        <div className="flex flex-wrap gap-2">
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-cyan-500 transition-all text-right"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 h-80 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
              msg.sender === 'user' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400 border border-slate-700'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-xl ${
              msg.sender === 'user'
                ? 'bg-cyan-950 text-cyan-200 border border-cyan-800 rounded-tr-none'
                : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>جاري صياغة الإجابة بواسطة المستشار العلمي...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          placeholder="اكتب سؤالك العلمي هنا..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 focus:border-cyan-500 outline-none"
        />
        
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md"
        >
          <span>إرسال</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
