import React, { useState, useEffect } from 'react';
import { BrowserTab, BrowserSettings } from '../types';
import { NewTabPage } from './pages/NewTabPage';
import { ChromeVersionPage } from './pages/ChromeVersionPage';
import { ChromeFlagsPage } from './pages/ChromeFlagsPage';
import { Acid3Page } from './pages/Acid3Page';
import { MsnPortalPage } from './pages/MsnPortalPage';
import { WikipediaPage } from './pages/WikipediaPage';
import { YouTubeApp } from './pages/YouTubeApp';
import { TikTokApp } from './pages/TikTokApp';
import { MicrosoftIEEndPage } from './pages/MicrosoftIEEndPage';
import { BingSearchApp } from './pages/BingSearchApp';
import { GoogleSearchApp } from './pages/GoogleSearchApp';
import { RedditApp } from './pages/RedditApp';
import { HackerNewsApp } from './pages/HackerNewsApp';
import { CalculatorApp } from './pages/CalculatorApp';
import { NotepadApp } from './pages/NotepadApp';
import { MinesweeperApp } from './pages/MinesweeperApp';
import { RefreshCw, ExternalLink, ShieldAlert, ArrowLeft } from 'lucide-react';

interface BrowserViewportProps {
  tab: BrowserTab;
  settings: BrowserSettings;
  onNavigate: (url: string) => void;
  onOpenInPrivate: () => void;
  onReopenClosedTab: () => void;
  onSetStatus: (status: string) => void;
  onSetLoading: (isLoading: boolean) => void;
}

export const BrowserViewport: React.FC<BrowserViewportProps> = ({
  tab,
  settings,
  onNavigate,
  onOpenInPrivate,
  onReopenClosedTab,
  onSetStatus,
  onSetLoading,
}) => {
  const [loadError, setLoadError] = useState(false);
  const [useDirectIframe, setUseDirectIframe] = useState(false);

  useEffect(() => {
    setLoadError(false);
  }, [tab.url]);

  // Listen for navigation messages from our proxy script
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        (event.data.type === 'NEO_NAVIGATE' || event.data.type === 'ULTRAMARINE_NAVIGATE') &&
        event.data.url
      ) {
        onNavigate(event.data.url);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onNavigate]);

  const zoomFactor = (tab.zoom || 100) / 100;

  // Helper to extract YouTube video ID if provided in query string or path
  const getYouTubeVideoId = (url: string): string | undefined => {
    try {
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      if (parsed.hostname.includes('youtube.com')) {
        if (parsed.searchParams.get('v')) return parsed.searchParams.get('v') || undefined;
        if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.replace('/embed/', '');
        if (parsed.pathname.startsWith('/shorts/')) return parsed.pathname.replace('/shorts/', '');
      }
      if (parsed.hostname.includes('youtu.be')) {
        return parsed.pathname.slice(1).split('?')[0] || undefined;
      }
    } catch {}
    return undefined;
  };

  // Render built-in internal and special pages
  if (!tab.url || tab.url === 'about:tabs' || tab.url === 'about:home' || tab.url === 'about:blank') {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <NewTabPage
          onNavigate={onNavigate}
          onOpenInPrivate={onOpenInPrivate}
          onReopenClosedTab={onReopenClosedTab}
        />
      </div>
    );
  }

  // Windows Calculator in-app app
  if (
    tab.url === 'app:calculator' ||
    tab.url === 'calc' ||
    tab.url === 'calc.exe' ||
    tab.url === 'about:calculator' ||
    tab.url === 'https://calculator.app'
  ) {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <CalculatorApp />
      </div>
    );
  }

  // Windows Notepad in-app app
  if (
    tab.url === 'app:notepad' ||
    tab.url === 'notepad' ||
    tab.url === 'notepad.exe' ||
    tab.url === 'about:notepad' ||
    tab.url === 'https://notepad.app'
  ) {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <NotepadApp />
      </div>
    );
  }

  // Classic Minesweeper in-app app
  if (
    tab.url === 'app:minesweeper' ||
    tab.url === 'minesweeper' ||
    tab.url === 'about:minesweeper' ||
    tab.url === 'https://minesweeper.app'
  ) {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <MinesweeperApp />
      </div>
    );
  }

  // 1:1 reproduction of the Microsoft IE End of Support page from screenshot
  if (
    tab.url.includes('this-website-doesn-t-work-in-internet-explorer') ||
    tab.url.includes('this-website-doesnt-work') ||
    tab.url.includes('support.microsoft.com') ||
    tab.url === 'about:ie-support'
  ) {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <MicrosoftIEEndPage onNavigate={onNavigate} />
      </div>
    );
  }

  // YouTube App Integration (Opens directly inside the app, supports full video streaming & search)
  if (tab.url.includes('youtube.com') || tab.url.includes('youtu.be') || tab.url === 'about:youtube') {
    const videoId = getYouTubeVideoId(tab.url);
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <YouTubeApp initialVideoId={videoId} onNavigateUrl={onNavigate} />
      </div>
    );
  }

  // TikTok App Integration (Opens directly inside the app, short-form video player)
  if (tab.url.includes('tiktok.com') || tab.url === 'about:tiktok') {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <TikTokApp onNavigateUrl={onNavigate} />
      </div>
    );
  }

  // Bing Search Engine (Opens directly inside the app with full search & Copilot)
  if (tab.url.includes('bing.com') || tab.url === 'about:bing') {
    let q = '';
    try {
      const parsed = new URL(tab.url.startsWith('http') ? tab.url : `https://${tab.url}`);
      q = parsed.searchParams.get('q') || '';
    } catch {}
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <BingSearchApp initialQuery={q} onNavigate={onNavigate} />
      </div>
    );
  }

  // Google Search Engine (Opens directly inside the app)
  if (tab.url.includes('google.com') || tab.url === 'about:google') {
    let q = '';
    try {
      const parsed = new URL(tab.url.startsWith('http') ? tab.url : `https://${tab.url}`);
      q = parsed.searchParams.get('q') || '';
    } catch {}
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <GoogleSearchApp initialQuery={q} onNavigate={onNavigate} />
      </div>
    );
  }

  // Reddit in-app reader & community
  if (tab.url.includes('reddit.com') || tab.url === 'about:reddit') {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <RedditApp onNavigateUrl={onNavigate} />
      </div>
    );
  }

  // Hacker News in-app client
  if (tab.url.includes('news.ycombinator.com') || tab.url.includes('ycombinator.com') || tab.url === 'about:hn') {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <HackerNewsApp onNavigateUrl={onNavigate} />
      </div>
    );
  }

  if (tab.url === 'chrome://version' || tab.url === 'about:version') {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <ChromeVersionPage />
      </div>
    );
  }

  if (tab.url === 'chrome://flags' || tab.url === 'about:flags') {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <ChromeFlagsPage />
      </div>
    );
  }

  if (tab.url.includes('acidtests.org') || tab.url.includes('acid3')) {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <Acid3Page />
      </div>
    );
  }

  if (tab.url === 'https://www.msn.com' || tab.url.startsWith('https://msn.com')) {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <MsnPortalPage onNavigate={onNavigate} />
      </div>
    );
  }

  if (tab.url === 'https://en.wikipedia.org' || tab.url === 'https://www.wikipedia.org' || tab.url.includes('wikipedia.org')) {
    return (
      <div className="w-full h-full relative" style={{ zoom: zoomFactor }}>
        <WikipediaPage onNavigate={onNavigate} />
      </div>
    );
  }

  // External web URL rendering
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(tab.url)}`;
  const iframeSrc = useDirectIframe ? tab.url : proxyUrl;

  return (
    <div className="w-full h-full relative bg-[#FFFFFF] flex flex-col overflow-hidden">
      {/* Top Bar for External Proxy Mode */}
      <div className="bg-[#F2F4F7] border-b border-[#D8D8D8] px-3 py-1 flex items-center justify-between text-[11px] font-['Segoe_UI',_Tahoma,_sans-serif] text-[#555555] shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="bg-[#0072C6] text-white px-1 rounded font-semibold text-[10px]">
            {useDirectIframe ? 'Direct Iframe' : 'Blink Proxy Engine'}
          </span>
          <span className="truncate">{tab.url}</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setUseDirectIframe(!useDirectIframe)}
            className="text-[#0072C6] hover:underline"
          >
            Switch to {useDirectIframe ? 'Proxy Mode' : 'Direct Iframe'}
          </button>
          <a
            href={tab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#0072C6] hover:underline"
            title="Open in external browser window"
          >
            <span>Open in new tab</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Main Iframe Viewer or Error Screen */}
      {loadError ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center font-['Segoe_UI',_Tahoma,_sans-serif] bg-white">
          <ShieldAlert size={48} className="text-[#0072C6] mb-4" />
          <h2 className="text-[24px] font-light text-[#0072C6] mb-2">This page can't be displayed</h2>
          <p className="text-[13px] text-[#666666] max-w-md mb-6 leading-relaxed">
            Neo-Internet Explorer 11 encountered a connection issue or X-Frame restriction while loading{' '}
            <strong className="text-[#333333]">{tab.url}</strong>.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setLoadError(false);
                setUseDirectIframe(!useDirectIframe);
              }}
              className="px-4 py-1.5 bg-[#0078D7] text-white hover:bg-[#005A9E] border border-[#005A9E] rounded-[2px] text-[12px] font-medium"
            >
              Try with {useDirectIframe ? 'Proxy Engine' : 'Direct Frame'}
            </button>
            <button
              onClick={() => onNavigate('about:tabs')}
              className="px-4 py-1.5 bg-[#E1E1E1] hover:bg-[#E5F1FB] border border-[#ADADAD] rounded-[2px] text-[12px]"
            >
              Return to New Tab
            </button>
          </div>
        </div>
      ) : (
        <iframe
          key={iframeSrc}
          src={iframeSrc}
          title={tab.title}
          className="w-full flex-1 border-none bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          style={{ zoom: zoomFactor }}
          onLoad={() => {
            onSetLoading(false);
            onSetStatus('Done');
          }}
          onError={() => setLoadError(true)}
        />
      )}
    </div>
  );
};

