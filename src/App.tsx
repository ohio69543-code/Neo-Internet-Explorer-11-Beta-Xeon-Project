import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserTab,
  BrowserSettings,
  Bookmark,
  HistoryEntry,
  DownloadItem,
  NotificationPrompt,
} from './types';
import {
  DEFAULT_SETTINGS,
  DEFAULT_BOOKMARKS,
} from './data/defaultData';
import { IE11Navbar } from './components/IE11Navbar';
import { IE11StatusBar } from './components/IE11StatusBar';
import { IE11FavoritesSidebar } from './components/IE11FavoritesSidebar';
import { IE11FindBar } from './components/IE11FindBar';
import { IE11NotificationBar } from './components/IE11NotificationBar';
import { BrowserViewport } from './components/BrowserViewport';
import { AboutModal } from './components/dialogs/AboutModal';
import { InternetOptionsModal } from './components/dialogs/InternetOptionsModal';
import { DownloadsModal } from './components/dialogs/DownloadsModal';
import { F12DevTools } from './components/dialogs/F12DevTools';

export default function App() {
  // Tabs State - Initialized with the exact page from image.png!
  const [tabs, setTabs] = useState<BrowserTab[]>([
    {
      id: 'tab-1',
      url: 'https://support.microsoft.com/en-us/internet-explorer/this-website-doesn-t-work-in-internet-explorer',
      title: "This website doesn't work in...",
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
      history: ['https://support.microsoft.com/en-us/internet-explorer/this-website-doesn-t-work-in-internet-explorer'],
      historyIndex: 0,
      zoom: 100,
      documentMode: 11,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [closedTabs, setClosedTabs] = useState<BrowserTab[]>([]);

  // Settings & Bookmarks
  const [settings, setSettings] = useState<BrowserSettings>(DEFAULT_SETTINGS);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(DEFAULT_BOOKMARKS);
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: 'h-1',
      title: "This website doesn't work in Internet Explorer",
      url: 'https://support.microsoft.com/en-us/internet-explorer/this-website-doesn-t-work-in-internet-explorer',
      visitedAt: new Date(),
    },
    {
      id: 'h-2',
      title: 'YouTube - Watch & Listen',
      url: 'https://www.youtube.com',
      visitedAt: new Date(Date.now() - 1800000),
    },
    {
      id: 'h-3',
      title: 'TikTok - Make Your Day',
      url: 'https://www.tiktok.com',
      visitedAt: new Date(Date.now() - 3600000),
    },
  ]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    {
      id: 'dl-1',
      fileName: 'ultramarine-setup-x64.msi',
      fileSize: '42.8 MB',
      sourceUrl: 'https://ultramarine-project.org',
      progress: 100,
      status: 'completed',
      date: new Date(),
    },
  ]);

  // Dialogs and Panels State
  const [isMaximized, setIsMaximized] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isInternetOptionsOpen, setIsInternetOptionsOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [isF12Open, setIsF12Open] = useState(false);
  const [isFindOpen, setIsFindOpen] = useState(false);
  const [isFavoritesSidebarOpen, setIsFavoritesSidebarOpen] = useState(false);
  const [isFavoritesSidebarPinned, setIsFavoritesSidebarPinned] = useState(false);
  const [statusText, setStatusText] = useState('Done');
  const [hoverUrl, setHoverUrl] = useState<string | undefined>(undefined);
  const [notification, setNotification] = useState<NotificationPrompt | null>(null);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  // Sync document title
  useEffect(() => {
    if (activeTab) {
      const pageTitle = activeTab.title ? `${activeTab.title} - Neo-Internet Explorer 11` : 'Neo-Internet Explorer 11';
      document.title = pageTitle;
    }
  }, [activeTab?.title]);

  // Helpers to resolve URLs
  const normalizeUrl = (input: string): { url: string; title: string } => {
    const trimmed = input.trim();
    if (!trimmed || trimmed === 'about:tabs' || trimmed === 'about:home') {
      return { url: 'about:tabs', title: 'New tab' };
    }
    if (trimmed === 'about:blank') {
      return { url: 'about:blank', title: 'Blank' };
    }
    if (
      trimmed === 'calc' ||
      trimmed === 'calc.exe' ||
      trimmed === 'app:calculator' ||
      trimmed === 'about:calculator' ||
      trimmed === 'calculator'
    ) {
      return { url: 'app:calculator', title: 'Calculator' };
    }
    if (
      trimmed === 'notepad' ||
      trimmed === 'notepad.exe' ||
      trimmed === 'app:notepad' ||
      trimmed === 'about:notepad'
    ) {
      return { url: 'app:notepad', title: 'Notepad' };
    }
    if (
      trimmed === 'minesweeper' ||
      trimmed === 'minesweeper.exe' ||
      trimmed === 'app:minesweeper' ||
      trimmed === 'about:minesweeper'
    ) {
      return { url: 'app:minesweeper', title: 'Minesweeper' };
    }
    if (trimmed.includes('this-website-doesn-t-work') || trimmed.includes('support.microsoft.com') || trimmed === 'about:ie-support') {
      return {
        url: 'https://support.microsoft.com/en-us/internet-explorer/this-website-doesn-t-work-in-internet-explorer',
        title: "This website doesn't work in...",
      };
    }
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be') || trimmed === 'about:youtube') {
      const formatted = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      return { url: formatted, title: 'YouTube' };
    }
    if (trimmed.includes('tiktok.com') || trimmed === 'about:tiktok') {
      const formatted = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      return { url: formatted, title: 'TikTok' };
    }
    if (trimmed.includes('bing.com') || trimmed === 'about:bing') {
      const formatted = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      return { url: formatted, title: 'Bing Search' };
    }
    if (trimmed.includes('google.com') || trimmed === 'about:google') {
      const formatted = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      return { url: formatted, title: 'Google' };
    }
    if (trimmed.includes('reddit.com') || trimmed === 'about:reddit') {
      const formatted = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      return { url: formatted, title: 'Reddit' };
    }
    if (trimmed.includes('news.ycombinator.com') || trimmed.includes('ycombinator.com') || trimmed === 'about:hn') {
      const formatted = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      return { url: formatted, title: 'Hacker News' };
    }
    if (trimmed.includes('wikipedia.org')) {
      const formatted = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      return { url: formatted, title: 'Wikipedia' };
    }
    if (trimmed.includes('msn.com')) {
      const formatted = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      return { url: formatted, title: 'MSN Homepage' };
    }
    if (trimmed.startsWith('chrome://') || trimmed.startsWith('about:')) {
      const name = trimmed.replace(/^(chrome:\/\/|about:)/, '');
      return { url: trimmed, title: `${name.toUpperCase()} - Neo-IE11` };
    }
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      try {
        const parsed = new URL(trimmed);
        return { url: trimmed, title: parsed.hostname };
      } catch {
        return { url: trimmed, title: trimmed };
      }
    }
    // Check if domain
    if (trimmed.includes('.') && !trimmed.includes(' ')) {
      const fullUrl = `https://${trimmed}`;
      return { url: fullUrl, title: trimmed };
    }
    // Search Bing
    return {
      url: `https://www.bing.com/search?q=${encodeURIComponent(trimmed)}`,
      title: `${trimmed} - Bing Search`,
    };
  };

  // Navigate active tab
  const handleNavigate = useCallback((rawUrl: string) => {
    const { url, title } = normalizeUrl(rawUrl);

    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTabId) return tab;
        const newHistory = tab.history.slice(0, tab.historyIndex + 1).concat(url);
        return {
          ...tab,
          url,
          title,
          isLoading: true,
          history: newHistory,
          historyIndex: newHistory.length - 1,
          canGoBack: newHistory.length > 1,
          canGoForward: false,
        };
      })
    );

    setStatusText(`Waiting for ${url}...`);

    setHistory((prev) => [
      {
        id: `h-${Date.now()}`,
        title,
        url,
        visitedAt: new Date(),
      },
      ...prev,
    ]);

    setTimeout(() => {
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, isLoading: false } : t))
      );
      setStatusText('Done');
    }, 300);
  }, [activeTabId]);

  // Back / Forward
  const handleGoBack = useCallback(() => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTabId || tab.historyIndex <= 0) return tab;
        const nextIndex = tab.historyIndex - 1;
        const targetUrl = tab.history[nextIndex];
        const { title } = normalizeUrl(targetUrl);
        return {
          ...tab,
          url: targetUrl,
          title,
          historyIndex: nextIndex,
          canGoBack: nextIndex > 0,
          canGoForward: true,
        };
      })
    );
  }, [activeTabId]);

  const handleGoForward = useCallback(() => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTabId || tab.historyIndex >= tab.history.length - 1) return tab;
        const nextIndex = tab.historyIndex + 1;
        const targetUrl = tab.history[nextIndex];
        const { title } = normalizeUrl(targetUrl);
        return {
          ...tab,
          url: targetUrl,
          title,
          historyIndex: nextIndex,
          canGoBack: true,
          canGoForward: nextIndex < tab.history.length - 1,
        };
      })
    );
  }, [activeTabId]);

  // Refresh / Stop
  const handleRefresh = useCallback(() => {
    if (!activeTab) return;
    setStatusText(`Refreshing ${activeTab.url}...`);
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, isLoading: true } : t))
    );
    setTimeout(() => {
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, isLoading: false } : t))
      );
      setStatusText('Done');
    }, 300);
  }, [activeTab, activeTabId]);

  const handleStop = useCallback(() => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, isLoading: false } : t))
    );
    setStatusText('Stopped');
  }, [activeTabId]);

  // Tab management
  const handleNewTab = useCallback((url = 'about:tabs') => {
    const newId = `tab-${Date.now()}`;
    const { title } = normalizeUrl(url);
    const newTab: BrowserTab = {
      id: newId,
      url,
      title,
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
      history: [url],
      historyIndex: 0,
      zoom: settings.defaultZoom,
      documentMode: 11,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
  }, [settings.defaultZoom]);

  const handleCloseTab = useCallback((idToClose: string) => {
    setTabs((prev) => {
      if (prev.length <= 1) {
        const freshId = `tab-${Date.now()}`;
        return [
          {
            id: freshId,
            url: 'about:tabs',
            title: 'New tab',
            isLoading: false,
            canGoBack: false,
            canGoForward: false,
            history: ['about:tabs'],
            historyIndex: 0,
            zoom: 100,
          },
        ];
      }
      const closed = prev.find((t) => t.id === idToClose);
      if (closed) {
        setClosedTabs((c) => [closed, ...c]);
      }
      const remaining = prev.filter((t) => t.id !== idToClose);
      if (activeTabId === idToClose) {
        setActiveTabId(remaining[remaining.length - 1].id);
      }
      return remaining;
    });
  }, [activeTabId]);

  const handleDuplicateTab = useCallback((idToDup: string) => {
    const target = tabs.find((t) => t.id === idToDup) || activeTab;
    if (!target) return;
    const newId = `tab-${Date.now()}`;
    const dup: BrowserTab = {
      ...target,
      id: newId,
    };
    setTabs((prev) => [...prev, dup]);
    setActiveTabId(newId);
  }, [tabs, activeTab]);

  const handleReopenClosedTab = useCallback(() => {
    if (closedTabs.length === 0) return;
    const [lastClosed, ...rest] = closedTabs;
    setClosedTabs(rest);
    const restoredId = `tab-${Date.now()}`;
    const restored: BrowserTab = {
      ...lastClosed,
      id: restoredId,
    };
    setTabs((prev) => [...prev, restored]);
    setActiveTabId(restoredId);
  }, [closedTabs]);

  const handleInPrivateWindow = useCallback(() => {
    setSettings((s) => ({ ...s, inPrivateMode: !s.inPrivateMode }));
    handleNewTab('about:tabs');
  }, [handleNewTab]);

  const handleChangeZoom = (newZoom: number) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, zoom: newZoom } : t))
    );
  };

  const handleToggleCompatibilityView = () => {
    const nextMode = settings.emulationMode === 'edge' ? '10' : 'edge';
    setSettings((s) => ({ ...s, emulationMode: nextMode }));
    setStatusText(`Emulation mode set to ${nextMode.toUpperCase()}`);
    handleRefresh();
  };

  const handleAddCurrentToFavorites = () => {
    if (!activeTab) return;
    const exists = bookmarks.some((b) => b.url === activeTab.url);
    if (!exists) {
      const newBm: Bookmark = {
        id: `bm-${Date.now()}`,
        title: activeTab.title || 'Page',
        url: activeTab.url,
        folder: 'Favorites Bar',
      };
      setBookmarks((b) => [...b, newBm]);
      setStatusText(`Added "${activeTab.title}" to favorites.`);
    }
  };

  const handleClearBrowsingData = useCallback(() => {
    setHistory([]);
    setStatusText('Browsing history cleared.');
  }, []);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        e.preventDefault();
        setSettings((s) => ({ ...s, showMenuBar: !s.showMenuBar }));
      }
      if (e.key === 'F12') {
        e.preventDefault();
        setIsF12Open((prev) => !prev);
      }
      if (e.key === 'F5') {
        e.preventDefault();
        handleRefresh();
      }
      if (e.ctrlKey) {
        if (e.key === 't' || e.key === 'T') {
          e.preventDefault();
          handleNewTab();
        } else if (e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          handleCloseTab(activeTabId);
        } else if (e.key === 'j' || e.key === 'J') {
          e.preventDefault();
          setIsDownloadsOpen(true);
        } else if (e.key === 'f' || e.key === 'F') {
          e.preventDefault();
          setIsFindOpen((prev) => !prev);
        } else if (e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          handleAddCurrentToFavorites();
        } else if (e.key === 'h' || e.key === 'H') {
          e.preventDefault();
          setIsFavoritesSidebarOpen((prev) => !prev);
        } else if (e.shiftKey && (e.key === 'p' || e.key === 'P')) {
          e.preventDefault();
          handleInPrivateWindow();
        } else if (e.shiftKey && (e.key === 't' || e.key === 'T')) {
          e.preventDefault();
          handleReopenClosedTab();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeTabId,
    handleNewTab,
    handleCloseTab,
    handleRefresh,
    handleReopenClosedTab,
    handleInPrivateWindow,
  ]);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#FFFFFF] overflow-hidden select-none font-['Segoe_UI',_Tahoma,_sans-serif]">
      {/* 1. Authentic IE11 2-Row Chrome: OneBox, Search Box, Tabs, and Caption Controls (1:1 with image.png) */}
      <IE11Navbar
        tabs={tabs}
        activeTabId={activeTabId}
        settings={settings}
        onSelectTab={(id) => setActiveTabId(id)}
        onCloseTab={handleCloseTab}
        onNewTab={() => handleNewTab()}
        onDuplicateTab={handleDuplicateTab}
        onNavigate={handleNavigate}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onRefresh={handleRefresh}
        onStop={handleStop}
        onGoHome={() => handleNavigate(settings.homePage || 'about:tabs')}
        onToggleFavorites={() => setIsFavoritesSidebarOpen(!isFavoritesSidebarOpen)}
        onOpenToolsMenu={() => setIsInternetOptionsOpen(true)}
        onToggleCompatibilityView={handleToggleCompatibilityView}
        onUpdateSettings={(newS) => setSettings((s) => ({ ...s, ...newS }))}
        onMinimize={() => setStatusText('Internet Explorer minimized')}
        onToggleMaximize={() => setIsMaximized(!isMaximized)}
        onCloseWindow={() => {
          if (confirm('Do you want to close all tabs?')) {
            window.close();
          }
        }}
        onOpenDownloads={() => setIsDownloadsOpen(true)}
        onOpenF12={() => setIsF12Open(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onInPrivate={handleInPrivateWindow}
        onClearHistory={handleClearBrowsingData}
      />

      {/* 2. Main Canvas / Viewport Area with optional Favorites Sidebar */}
      <div className="flex-1 flex overflow-hidden relative bg-[#FFFFFF]">
        {/* Web Viewport (Runs YouTube, TikTok, Microsoft IE End Page, and Proxied Websites) */}
        <div className="flex-1 h-full overflow-hidden relative">
          <BrowserViewport
            tab={activeTab}
            settings={settings}
            onNavigate={handleNavigate}
            onOpenInPrivate={handleInPrivateWindow}
            onReopenClosedTab={handleReopenClosedTab}
            onSetStatus={setStatusText}
            onSetLoading={(isLoading) => {
              setTabs((prev) =>
                prev.map((t) => (t.id === activeTabId ? { ...t, isLoading } : t))
              );
            }}
          />

          {/* Find on Page (Ctrl+F) Bar */}
          <IE11FindBar
            isOpen={isFindOpen}
            onClose={() => setIsFindOpen(false)}
          />

          {/* Download / Security Notification Prompt Bar */}
          <IE11NotificationBar
            notification={notification}
            onDismiss={() => setNotification(null)}
            onOpen={() => {
              setStatusText('Opening downloaded resource...');
              setNotification(null);
            }}
            onSave={() => {
              setStatusText('File saved to Downloads folder.');
              setNotification(null);
            }}
          />
        </div>

        {/* Favorites, Feeds, and History Sidebar */}
        <IE11FavoritesSidebar
          isOpen={isFavoritesSidebarOpen}
          isPinned={isFavoritesSidebarPinned}
          bookmarks={bookmarks}
          history={history}
          onClose={() => setIsFavoritesSidebarOpen(false)}
          onTogglePin={() => setIsFavoritesSidebarPinned(!isFavoritesSidebarPinned)}
          onNavigate={(url) => {
            handleNavigate(url);
            if (!isFavoritesSidebarPinned) {
              setIsFavoritesSidebarOpen(false);
            }
          }}
          onAddCurrentToFavorites={handleAddCurrentToFavorites}
          onClearHistory={() => setHistory([])}
        />
      </div>

      {/* 3. Authentic IE11 F12 Developer Tools (Docked at bottom) */}
      <F12DevTools
        isOpen={isF12Open}
        onClose={() => setIsF12Open(false)}
        currentUrl={activeTab?.url || ''}
        currentTitle={activeTab?.title || ''}
        documentMode={settings.emulationMode}
        onChangeDocumentMode={(mode) => setSettings((s) => ({ ...s, emulationMode: mode }))}
      />

      {/* 4. Optional Status Bar */}
      {settings.showStatusBar && (
        <IE11StatusBar
          statusText={statusText}
          hoverUrl={hoverUrl}
          zoom={activeTab?.zoom || 100}
          settings={settings}
          onChangeZoom={handleChangeZoom}
          onOpenInternetOptions={() => setIsInternetOptionsOpen(true)}
        />
      )}

      {/* Dialog Modals */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <InternetOptionsModal
        isOpen={isInternetOptionsOpen}
        settings={settings}
        currentUrl={activeTab?.url || ''}
        onClose={() => setIsInternetOptionsOpen(false)}
        onSaveSettings={(newS) => setSettings((s) => ({ ...s, ...newS }))}
        onClearHistory={() => {
          setHistory([]);
          setStatusText('Browsing history and temporary cache cleared.');
        }}
      />

      <DownloadsModal
        isOpen={isDownloadsOpen}
        downloads={downloads}
        onClose={() => setIsDownloadsOpen(false)}
        onClearDownloads={() => setDownloads([])}
      />
    </div>
  );
}
