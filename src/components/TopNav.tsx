import React from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Home,
  Maximize2,
  Minimize2,
  ExternalLink,
  Smartphone,
  Monitor,
  Share2,
  Info,
} from 'lucide-react';
import { DevicePreset, EMBED_URL } from '../types';

interface TopNavProps {
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
  onHome: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  selectedPreset: DevicePreset;
  onSelectPreset: (preset: DevicePreset) => void;
  isLoading: boolean;
  onOpenInfo: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onBack,
  onRefresh,
  onHome,
  isFullscreen,
  onToggleFullscreen,
  selectedPreset,
  onSelectPreset,
  isLoading,
  onOpenInfo,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Smart Hishab',
          text: 'Smart Hishab - Accounting & Ledger Web App',
          url: EMBED_URL,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(EMBED_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="h-13 bg-slate-950/95 border-b border-slate-800/80 px-3 sm:px-5 flex items-center justify-between gap-3 select-none backdrop-blur-md z-40 shrink-0">
      {/* Zone 1: Brand & Back Navigation */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={onBack}
          aria-label="Back navigation"
          title="Go back (Alt+Left)"
          className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 active:bg-slate-600 text-slate-100 transition-colors border border-slate-700/60 shadow-xs focus-visible:outline-2 focus-visible:outline-emerald-500"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span className="text-xs font-semibold hidden xs:inline tracking-tight">Back</span>
        </button>

        <button
          onClick={onHome}
          aria-label="Home"
          title="Return to home page"
          className="min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 active:bg-slate-700 transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>

        <button
          onClick={onRefresh}
          aria-label="Refresh application"
          title="Refresh app (Ctrl+R / F5)"
          className={`min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 active:bg-slate-700 transition-colors ${
            isLoading ? 'animate-spin text-emerald-400' : ''
          }`}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

        {/* Wordmark */}
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-bold text-white tracking-tight whitespace-nowrap">
            Smart Hishab
          </span>
          <span className="hidden md:inline-flex text-[11px] font-medium text-emerald-400/90 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-md">
            স্মার্ট হিসাব
          </span>
        </div>
      </div>

      {/* Zone 2: Device & View Mode Switcher (Desktop / Tablet viewports) */}
      <div className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
        <button
          onClick={() => onSelectPreset('fluid')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            selectedPreset === 'fluid'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
          title="Full viewport fluid layout"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Screen</span>
        </button>

        <button
          onClick={() => onSelectPreset('iphone16')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            selectedPreset === 'iphone16'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
          title="iPhone 16 Pro simulator frame"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>iPhone 16</span>
        </button>

        <button
          onClick={() => onSelectPreset('galaxy24')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            selectedPreset === 'galaxy24'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
          title="Samsung Galaxy S24 frame"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Galaxy S24</span>
        </button>
      </div>

      {/* Zone 3: Primary Actions (Fullscreen, Share, Open Direct, Info) */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Info button */}
        <button
          onClick={onOpenInfo}
          aria-label="App info and navigation help"
          title="Navigation tips and app info"
          className="min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 active:bg-slate-700 transition-colors"
        >
          <Info className="w-4 h-4" />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          aria-label="Share or copy URL"
          title={copied ? 'Link copied!' : 'Share or copy URL'}
          className="min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 active:bg-slate-700 transition-colors relative"
        >
          <Share2 className="w-4 h-4" />
          {copied && (
            <span className="absolute -bottom-7 right-0 text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded shadow-md whitespace-nowrap z-50">
              Copied!
            </span>
          )}
        </button>

        {/* Fullscreen API Toggle */}
        <button
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Enter browser fullscreen (F)'}
          className="min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 active:bg-slate-700 transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>

        {/* Open in external tab */}
        <a
          href={EMBED_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Smart Hishab in new tab"
          title="Open directly in new tab"
          className="min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 active:bg-slate-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
};
