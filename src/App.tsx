/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { TopNav } from './components/TopNav';
import { MobileThumbBar } from './components/MobileThumbBar';
import { DeviceFrame } from './components/DeviceFrame';
import { IframeContainer } from './components/IframeContainer';
import { InfoModal } from './components/InfoModal';
import { DevicePreset, EMBED_URL } from './types';

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<DevicePreset>('fluid');
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const [backNotice, setBackNotice] = useState<string | null>(null);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  // Detect mobile screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Back navigation handler
  const handleBack = useCallback(() => {
    let triggered = false;
    try {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.history.back();
        triggered = true;
      }
    } catch {
      // Cross-origin restriction may occur on contentWindow access
      triggered = false;
    }

    // Visual tactile feedback toast
    setBackNotice(triggered ? 'Navigating back in Smart Hishab' : 'Back requested');
    setTimeout(() => {
      setBackNotice(null);
    }, 2200);
  }, []);

  // Forward navigation handler
  const handleForward = useCallback(() => {
    try {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.history.forward();
      }
    } catch {
      // Cross-origin restriction
    }
  }, []);

  // Refresh handler
  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  }, []);

  // Home handler
  const handleHome = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = EMBED_URL;
    }
    setIframeKey((prev) => prev + 1);
  }, []);

  // Toggle browser fullscreen
  const handleToggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  }, []);

  // Intercept physical browser back button on mobile so user navigates back in app
  useEffect(() => {
    window.history.pushState({ app: 'smart-hishab' }, '', window.location.pathname);

    const handlePopState = () => {
      handleBack();
      // Keep state pushed so consecutive backs continue to trigger internal back
      window.history.pushState({ app: 'smart-hishab' }, '', window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handleBack]);

  // Keyboard shortcuts (Alt+Left for back, F for fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handleBack();
      } else if (e.key === 'f' || e.key === 'F') {
        // Toggle fullscreen if not holding modifier keys
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          handleToggleFullscreen();
        }
      } else if (e.key === 'Escape' && infoOpen) {
        setInfoOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack, handleToggleFullscreen, infoOpen]);

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Navigation Bar */}
      <TopNav
        onBack={handleBack}
        onForward={handleForward}
        onRefresh={handleRefresh}
        onHome={handleHome}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        selectedPreset={selectedPreset}
        onSelectPreset={setSelectedPreset}
        isLoading={isLoading}
        onOpenInfo={() => setInfoOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full relative flex flex-col overflow-hidden bg-slate-950">
        <DeviceFrame
          preset={selectedPreset}
          onExpandFluid={() => setSelectedPreset('fluid')}
        >
          <IframeContainer
            ref={iframeRef}
            iframeKey={iframeKey}
            isLoading={isLoading}
            onLoadStart={() => setIsLoading(true)}
            onLoadComplete={() => setIsLoading(false)}
            onRefresh={handleRefresh}
            backNotice={backNotice}
          />
        </DeviceFrame>

        {/* Mobile Ergonomic Thumb Navigation Bar (active on mobile viewports or simulated device frames) */}
        {(isMobileScreen || selectedPreset !== 'fluid') && (
          <MobileThumbBar
            onBack={handleBack}
            onRefresh={handleRefresh}
            onHome={handleHome}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Info & Navigation Guidance Modal */}
      <InfoModal isOpen={infoOpen} onClose={() => setInfoOpen(false)} />
    </div>
  );
}
