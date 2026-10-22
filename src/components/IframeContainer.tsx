import React, { forwardRef, useState, useEffect } from 'react';
import { Loader2, ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react';
import { EMBED_URL } from '../types';

interface IframeContainerProps {
  iframeKey: number;
  onLoadStart: () => void;
  onLoadComplete: () => void;
  isLoading: boolean;
  onRefresh: () => void;
  backNotice: string | null;
}

export const IframeContainer = forwardRef<HTMLIFrameElement, IframeContainerProps>(
  ({ iframeKey, onLoadStart, onLoadComplete, isLoading, onRefresh, backNotice }, ref) => {
    const [loadError, setLoadError] = useState(false);
    const [timedOut, setTimedOut] = useState(false);

    useEffect(() => {
      setLoadError(false);
      setTimedOut(false);
      onLoadStart();

      const timer = setTimeout(() => {
        if (isLoading) {
          setTimedOut(true);
        }
      }, 10000);

      return () => clearTimeout(timer);
    }, [iframeKey]);

    const handleLoad = () => {
      onLoadComplete();
      setTimedOut(false);
    };

    const handleError = () => {
      setLoadError(true);
      onLoadComplete();
    };

    return (
      <div className="relative w-full h-full flex-1 bg-slate-900 overflow-hidden">
        {/* Loading Progress Bar at top */}
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 z-30 overflow-hidden">
            <div className="h-full bg-emerald-500 animate-pulse w-full origin-left" />
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xs text-slate-200 transition-opacity">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-white tracking-tight">Loading Smart Hishab...</p>
                <p className="text-xs text-slate-400 mt-0.5">Connecting to smart-hishab.vercel.app</p>
              </div>
            </div>
          </div>
        )}

        {/* Transient Notice Toast (e.g. Back Action triggered) */}
        {backNotice && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-slate-900/95 border border-slate-700/80 shadow-xl text-xs font-medium text-emerald-400 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
            {backNotice}
          </div>
        )}

        {/* Timeout / Slow Connection Helper Banner */}
        {timedOut && (
          <div className="absolute bottom-16 sm:bottom-4 left-4 right-4 z-30 max-w-md mx-auto p-3 bg-slate-900/95 border border-amber-500/40 rounded-xl shadow-2xl backdrop-blur-md text-xs text-slate-200 flex items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Loading is taking longer than usual</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onRefresh}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 flex items-center gap-1 font-medium transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry</span>
              </button>
              <a
                href={EMBED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1 font-medium transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Open Direct</span>
              </a>
            </div>
          </div>
        )}

        {/* Error Fallback (if browser blocks iframe or offline) */}
        {loadError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-300 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-600/40 flex items-center justify-center text-amber-400 mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Unable to Load Embed</h3>
            <p className="text-xs text-slate-400 max-w-sm mb-5 leading-relaxed">
              The external application could not be rendered inside the frame due to network interruption or security restrictions.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onRefresh}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
              <a
                href={EMBED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-950/40"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in New Tab</span>
              </a>
            </div>
          </div>
        )}

        {/* The Embed Iframe */}
        <iframe
          ref={ref}
          key={iframeKey}
          src={EMBED_URL}
          title="Smart Hishab - Accounting & Ledger App"
          className="w-full h-full border-0 bg-white"
          onLoad={handleLoad}
          onError={handleError}
          allow="accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; microphone; picture-in-picture; web-share"
        />
      </div>
    );
  }
);

IframeContainer.displayName = 'IframeContainer';
