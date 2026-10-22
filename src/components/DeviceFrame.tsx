import React from 'react';
import { DevicePreset, DEVICE_PRESETS } from '../types';
import { Wifi, Battery, Signal, Maximize2 } from 'lucide-react';

interface DeviceFrameProps {
  preset: DevicePreset;
  onExpandFluid: () => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  preset,
  onExpandFluid,
  children,
}) => {
  const config = DEVICE_PRESETS[preset];

  // If fluid, render edge-to-edge
  if (preset === 'fluid') {
    return <div className="w-full h-full flex-1 relative overflow-hidden bg-slate-950">{children}</div>;
  }

  // Device simulation wrapper for desktop
  return (
    <div className="w-full h-full flex-1 flex items-center justify-center p-2 sm:p-6 bg-slate-950 overflow-hidden relative">
      {/* Background ambient pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      {/* Floating prompt to expand */}
      <button
        onClick={onExpandFluid}
        className="absolute top-4 right-6 z-20 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700/60 shadow-lg backdrop-blur-md transition-all active:scale-95"
      >
        <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>Expand Full Screen</span>
      </button>

      {/* Device Body */}
      <div
        className={`relative flex flex-col bg-slate-950 border border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 ${
          preset === 'iphone16'
            ? 'w-[402px] h-[874px] rounded-[52px] ring-12 ring-slate-900 border-slate-800'
            : preset === 'galaxy24'
            ? 'w-[393px] h-[852px] rounded-[42px] ring-10 ring-slate-900 border-slate-800'
            : 'w-[744px] h-[920px] rounded-[36px] ring-12 ring-slate-900 border-slate-800'
        }`}
        style={{
          maxHeight: 'calc(100vh - 80px)',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        {/* Mobile Status Bar Simulation */}
        <div className="h-10 bg-slate-950 px-6 flex items-center justify-between text-slate-400 text-[11px] font-semibold select-none shrink-0 z-30">
          <span>9:41</span>
          {/* Dynamic Island / Camera Punch Hole */}
          <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center border border-slate-800/60">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-auto mr-2 border border-slate-800" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Iframe Viewport Container */}
        <div className="flex-1 w-full relative overflow-hidden bg-white">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="h-5 bg-slate-950 flex items-center justify-center shrink-0">
          <div className="w-32 h-1 bg-slate-700/80 rounded-full" />
        </div>
      </div>
    </div>
  );
};
