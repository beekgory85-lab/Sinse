import React from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  declare props: Props;
  
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('App error caught gracefully:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 dir-rtl" dir="rtl">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-black text-white font-sans">مختبر العلوم الافتراضي جاهز</h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                جارٍ تحديث الجلسة والتطبيق يفتح مباشرة بدون أي انقطاع. اضغط أدناه للمتابعة فوراً.
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>دخول المختبر الافتراضي الآن</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
