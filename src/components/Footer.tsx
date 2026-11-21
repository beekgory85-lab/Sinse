import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-14 py-8 border-t border-[#14234b] bg-[#070d1e] text-center text-xs text-slate-400">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
        <p className="font-bold text-slate-300 text-sm flex items-center justify-center gap-1.5 flex-wrap">
          <span>🧪 Interactive Science Lab</span>
          <span>—</span>
          <span>مختبر العلوم التفاعلي</span>
        </p>

        <p className="text-slate-400 flex items-center justify-center gap-2.5 flex-wrap text-[13px]">
          <span>⚡ الطاقة الحركية</span>
          <span>•</span>
          <span>⚛️ تفاعل الأحماض</span>
          <span>•</span>
          <span>🔬 محاكي المجهر</span>
        </p>

        <p className="text-slate-500 text-[12px] flex items-center justify-center gap-1">
          <span>🌍 علوم الأرض</span>
        </p>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-500">
          <span>تطبيق تجارب العلوم التفاعلي — جميع الحقوق محفوظة لمنهج الصف السادس</span>
        </div>
      </div>
    </footer>
  );
};
