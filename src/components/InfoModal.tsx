import React from 'react';
import { X, ExternalLink, ShieldCheck, Smartphone, ArrowLeft, RefreshCw, Maximize } from 'lucide-react';
import { EMBED_URL } from '../types';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl text-slate-200 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 id="info-modal-title" className="text-base font-bold text-white flex items-center gap-2">
              <span>Smart Hishab</span>
              <span className="text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-sm">
                Web App Wrapper
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Responsive accounting ledger & bookkeeping</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-100 flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full Screen & Responsive Experience</span>
            </h3>
            <p className="text-slate-400">
              This single-page app embeds the live Smart Hishab service in an edge-to-edge responsive container with native fullscreen capabilities and mobile-first thumb ergonomics.
            </p>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2">
            <h4 className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quick Controls & Navigation</span>
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Back Button:</strong> Navigates back in browser history or resets to dashboard.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Refresh:</strong> Instantly reloads the ledger view.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Maximize className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Fullscreen:</strong> Press F or tap the expand icon for true borderless view.
                </span>
              </li>
            </ul>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
            Keyboard shortcuts: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono">Alt + ←</kbd> for Back, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono">F</kbd> for Fullscreen, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono">Esc</kbd> to exit.
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-2">
          <a
            href={EMBED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <span>Open smart-hishab.vercel.app directly</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
