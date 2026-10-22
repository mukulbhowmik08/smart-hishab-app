import React from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Home,
  Maximize2,
  Minimize2,
  ChevronDown,
  Navigation,
} from 'lucide-react';

interface MobileThumbBarProps {
  onBack: () => void;
  onRefresh: () => void;
  onHome: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isLoading: boolean;
}

export const MobileThumbBar: React.FC<MobileThumbBarProps> = ({
  onBack,
  onRefresh,
  onHome,
  isFullscreen,
  onToggleFullscreen,
  isLoading,
}) => {
  const [isMinimized, setIsMinimized] = React.useState(false);

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          aria-label="Expand mobile controls"
          title="Show navigation bar"
          className="w-12 h-12 rounded-full bg-slate-900/90 text-emerald-400 border border-slate-700/80 shadow-xl flex items-center justify-center backdrop-blur-md active:scale-95 transition-transform"
        >
          <Navigation className="w-5 h-5 rotate-45" />
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Mobile Navigation Controls"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-[380px] bg-slate-950/90 border border-slate-800/90 rounded-2xl shadow-2xl backdrop-blur-lg px-3 py-2 flex items-center justify-between transition-all"
    >
      {/* Back button (primary thumb action) */}
      <button
        onClick={onBack}
        aria-label="Back"
        className="min-h-[44px] px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-emerald-950/40 transition-transform"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Back</span>
      </button>

      {/* Secondary Quick Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={onHome}
          aria-label="Go to Home"
          title="Home"
          className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-300 hover:text-white active:bg-slate-800/80 transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>

        <button
          onClick={onRefresh}
          aria-label="Refresh app"
          title="Refresh"
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-slate-300 hover:text-white active:bg-slate-800/80 transition-colors ${
            isLoading ? 'animate-spin text-emerald-400' : ''
          }`}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          title="Fullscreen"
          className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-300 hover:text-white active:bg-slate-800/80 transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Minimize chevron */}
      <button
        onClick={() => setIsMinimized(true)}
        aria-label="Minimize navigation bar"
        title="Minimize controls"
        className="w-9 h-11 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 active:bg-slate-800/60 transition-colors"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </aside>
  );
};
