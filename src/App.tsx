import React, { useState, useEffect } from 'react';
import { ActiveTab, LabNote, AppStats } from './types';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { MicroscopeSimulator } from './components/MicroscopeSimulator';
import { CellOrganelles } from './components/CellOrganelles';
import { PhysicsEnergy } from './components/PhysicsEnergy';
import { ChemistryMatter } from './components/ChemistryMatter';
import { EarthExperiments } from './components/EarthExperiments';
import { QuizAndNotebook } from './components/QuizAndNotebook';
import { AiAdvisorModal } from './components/AiAdvisorModal';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [physicsSubTab, setPhysicsSubTab] = useState<'catapult' | 'kinetic_potential' | 'gears_machines'>('catapult');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // App Stats & Views Persistence (directly satisfies owner / view queries)
  const [stats, setStats] = useState<AppStats>(() => {
    const defaultStats: AppStats = {
      totalViews: 1420,
      totalExperimentsRun: 385,
      totalQuizCompleted: 192,
      totalNotesSaved: 48,
      lastVisitedIso: new Date().toISOString(),
      adClicks: 34,
      adSimulationEnabled: false,
      adsensePublisherId: 'ca-pub-3336377424012326',
      adsenseAdSlotId: '',
      isRealAdSenseEnabled: false
    };
    try {
      const saved = localStorage.getItem('science_lab_app_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultStats, ...parsed };
      }
    } catch {
      // Fallback
    }
    return defaultStats;
  });

  // Dynamic Google AdSense script injection
  useEffect(() => {
    const pubId = stats.adsensePublisherId || 'ca-pub-3336377424012326';
    
    // Find any existing script tag for google adsense
    const existingScripts = Array.from(document.querySelectorAll('script'));
    const adsenseScript = existingScripts.find(s => s.src && s.src.includes('googlesyndication.com/pagead/js/adsbygoogle.js'));
    
    if (adsenseScript) {
      // Re-create it with the new client ID to force re-evaluation
      const currentClient = new URL(adsenseScript.src).searchParams.get('client');
      if (currentClient !== pubId) {
        adsenseScript.remove();
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      }
    } else {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, [stats.adsensePublisherId]);

  // Lab Notes State
  const [notes, setNotes] = useState<LabNote[]>(() => {
    try {
      const saved = localStorage.getItem('science_lab_notes');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [
      {
        id: 'note_1',
        title: 'فحص عينة خلايا بشرة البصل',
        experimentName: 'محاكي المجهر المركب',
        category: 'biology',
        date: '2026-07-06',
        hypothesis: 'اختبار وضوح الجدار الخلوي والنواة عند تكبير 10x و 40x.',
        content: 'أظهرت عينة البصل خلايا نباتية متراصة بوضوح مع جدار خلوي سميك ونواة واضحة مع إضاءة 80%.',
        conclusion: 'المجهر الضوئي يمنح دقة عالية للرؤية بوضوح عند تعديل الضابط الدقيق.'
      }
    ];
  });

  // Auto-increment page views on visit
  useEffect(() => {
    try {
      const updated = {
        ...stats,
        totalViews: stats.totalViews + 1,
        lastVisitedIso: new Date().toISOString()
      };
      setStats(updated);
      localStorage.setItem('science_lab_app_stats', JSON.stringify(updated));
    } catch {
      // Storage fallback
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('science_lab_app_stats', JSON.stringify(stats));
    } catch {}
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem('science_lab_notes', JSON.stringify(notes));
    } catch {}
  }, [notes]);

  const handleIncrementViews = () => {
    setStats(prev => ({
      ...prev,
      totalViews: prev.totalViews + 1
    }));
  };

  const handleIncrementAdClicks = () => {
    setStats(prev => ({
      ...prev,
      adClicks: prev.adClicks + 1
    }));
  };

  const handleToggleAdSimulation = (enabled: boolean) => {
    setStats(prev => ({
      ...prev,
      adSimulationEnabled: enabled
    }));
  };

  const handleUpdateAdSenseSettings = (publisherId: string, adSlotId: string, isRealEnabled: boolean) => {
    setStats(prev => ({
      ...prev,
      adsensePublisherId: publisherId,
      adsenseAdSlotId: adSlotId,
      isRealAdSenseEnabled: isRealEnabled
    }));
  };

  const handleResetStats = () => {
    setStats({
      totalViews: 1,
      totalExperimentsRun: 0,
      totalQuizCompleted: 0,
      totalNotesSaved: notes.length,
      lastVisitedIso: new Date().toISOString(),
      adClicks: 0,
      adSimulationEnabled: false,
      adsensePublisherId: stats.adsensePublisherId || 'ca-pub-3336377424012326',
      adsenseAdSlotId: stats.adsenseAdSlotId || '',
      isRealAdSenseEnabled: stats.isRealAdSenseEnabled || false
    });
  };

  const handleRunExperiment = () => {
    setStats(prev => ({
      ...prev,
      totalExperimentsRun: prev.totalExperimentsRun + 1
    }));
  };

  const handleQuizCompleted = () => {
    setStats(prev => ({
      ...prev,
      totalQuizCompleted: prev.totalQuizCompleted + 1
    }));
  };

  const handleAddNote = (newNote: Omit<LabNote, 'id' | 'date'>) => {
    const fullNote: LabNote = {
      ...newNote,
      id: 'note_' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };

    setNotes(prev => [fullNote, ...prev]);
    setStats(prev => ({
      ...prev,
      totalNotesSaved: prev.totalNotesSaved + 1
    }));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950" dir="rtl">
      
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        totalViews={stats.totalViews}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {activeTab === 'dashboard' && (
          <Dashboard
            stats={stats}
            onNavigate={(tab, subTab) => {
              setActiveTab(tab);
              if (subTab) {
                setPhysicsSubTab(subTab);
              }
            }}
            onIncrementViews={handleIncrementViews}
            onResetStats={handleResetStats}
            onIncrementAdClicks={handleIncrementAdClicks}
            onToggleAdSimulation={handleToggleAdSimulation}
            onUpdateAdSenseSettings={handleUpdateAdSenseSettings}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'microscope' && (
          <MicroscopeSimulator
            onSaveNote={handleAddNote}
            onRunExperiment={handleRunExperiment}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'cell_organelles' && (
          <CellOrganelles
            onSaveNote={handleAddNote}
            onRunExperiment={handleRunExperiment}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'physics_energy' && (
          <PhysicsEnergy
            onSaveNote={handleAddNote}
            onRunExperiment={handleRunExperiment}
            soundEnabled={soundEnabled}
            initialSubTab={physicsSubTab}
          />
        )}

        {activeTab === 'chemistry_matter' && (
          <ChemistryMatter
            onSaveNote={handleAddNote}
            onRunExperiment={handleRunExperiment}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'earth_experiments' && (
          <EarthExperiments
            onSaveNote={handleAddNote}
            onRunExperiment={handleRunExperiment}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'quiz_notebook' && (
          <QuizAndNotebook
            notes={notes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            onQuizCompleted={handleQuizCompleted}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'ai_advisor' && (
          <AiAdvisorModal
            soundEnabled={soundEnabled}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium text-slate-400">
            مختبر العلوم التفاعلي — Interactive Science Lab 🧪
          </p>
          <div className="flex items-center gap-2 text-slate-500 flex-wrap justify-center font-mono">
            <span>محاكي المجهر 🔬</span>
            <span>•</span>
            <span>تفاعل الأحماض ⚛️</span>
            <span>•</span>
            <span>الطاقة الحركية ⚡</span>
            <span>•</span>
            <span>علوم الأرض 🌍</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
