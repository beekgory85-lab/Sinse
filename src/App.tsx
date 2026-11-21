import { useState } from 'react';
import { UnitId, AppMode, Unit2SubView } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeOverview } from './components/HomeOverview';
import { TextbookViewer } from './components/TextbookViewer';
import { Unit1CellBody } from './components/units/Unit1CellBody';
import { Unit2EnergyMachines } from './components/units/Unit2EnergyMachines';
import { Unit3MatterReactions } from './components/units/Unit3MatterReactions';
import { Unit4HumanEarth } from './components/units/Unit4HumanEarth';
import { QuizSection } from './components/QuizSection';
import { MicroscopeSimulator } from './components/MicroscopeSimulator';

export function App() {
  // Default to 'home' (الرئيسية والمشاهدات) matching Screenshot 4
  const [currentMode, setCurrentMode] = useState<AppMode>('home');
  const [unit2SubView, setUnit2SubView] = useState<Unit2SubView>('catapult');
  const [score, setScore] = useState<number>(1455);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Gentle scientific chime using Web Audio API
  const playSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.22);
    } catch {
      // AudioContext unavailable or blocked by autoplay policy
    }
  };

  const handleEarnPoints = (pts: number) => {
    setScore((prev) => prev + pts);
  };

  const handleOpenLabFromPage = (unitId: UnitId) => {
    setCurrentMode(unitId);
    playSound();
  };

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col font-cairo selection:bg-cyan-500 selection:text-slate-950">
      {/* Header matching original screenshots */}
      <Header
        currentMode={currentMode}
        onSelectMode={(mode) => {
          setCurrentMode(mode);
          playSound();
        }}
        score={score}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-5 sm:py-6">
        {/* Screen 1: Home Overview & Visuals (الرئيسية والمشاهدات - Screenshots 4, 3, 1) */}
        {currentMode === 'home' && (
          <HomeOverview
            onSelectMode={(mode) => {
              setCurrentMode(mode);
              playSound();
            }}
            onSelectUnit2SubView={(subView) => {
              setUnit2SubView(subView);
            }}
            playSound={playSound}
          />
        )}

        {/* Screen 1.5: Compound Microscope Simulator (محاكي المجهر المركب - Screenshots 15 & 16) */}
        {currentMode === 'microscope' && (
          <MicroscopeSimulator onEarnPoints={handleEarnPoints} playSound={playSound} />
        )}

        {/* Screen 2: Unit 1 Microscope & Cell Lab (الوحدة الأولى - الخلية والمجهر) */}
        {currentMode === 'unit1' && (
          <Unit1CellBody onEarnPoints={handleEarnPoints} playSound={playSound} />
        )}

        {/* Screen 3: Unit 2 Energy, Simple Machines & Gears (الوحدة الثانية - التروس والدارات) */}
        {currentMode === 'unit2' && (
          <Unit2EnergyMachines
            initialSubView={unit2SubView}
            onEarnPoints={handleEarnPoints}
            playSound={playSound}
          />
        )}

        {/* Screen 4: Unit 3 Matter & Chemical Reactions (الوحدة الثالثة - تفاعلات المادة) */}
        {currentMode === 'unit3' && (
          <Unit3MatterReactions onEarnPoints={handleEarnPoints} playSound={playSound} />
        )}

        {/* Screen 5: Unit 4 Earth & Environment (الوحدة الرابعة - علوم الأرض والتجوية) */}
        {currentMode === 'unit4' && (
          <Unit4HumanEarth onEarnPoints={handleEarnPoints} playSound={playSound} />
        )}

        {/* Screen 6: Textbook Pages Viewer (صفحات الكتاب المقررة) */}
        {currentMode === 'textbook' && (
          <TextbookViewer
            onOpenLab={handleOpenLabFromPage}
            onEarnPoints={handleEarnPoints}
            playSound={playSound}
          />
        )}

        {/* Screen 7: Curriculum Quiz Bank (اختبار المنهج الوزاري) */}
        {currentMode === 'quiz' && (
          <QuizSection onEarnPoints={handleEarnPoints} playSound={playSound} />
        )}
      </main>

      {/* Clean Footer matching original app */}
      <Footer />
    </div>
  );
}

export default App;
