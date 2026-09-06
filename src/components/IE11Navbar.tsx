import React, { useState, useRef, useEffect } from 'react';
import { BrowserTab, BrowserSettings } from '../types';
import { IE11Logo } from './IE11Logo';
import { IE11MenuBar } from './IE11MenuBar';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  X,
  Search,
  ChevronDown,
  Lock,
  Globe,
  Home,
  Star,
  Settings as GearIcon,
  Minus,
  Square,
  Copy,
  Printer,
  Shield,
  Trash2,
  ExternalLink,
  Sliders,
  Check,
  Folder,
} from 'lucide-react';

interface IE11NavbarProps {
  tabs: BrowserTab[];
  activeTabId: string;
  settings: BrowserSettings;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: (url?: string) => void;
  onDuplicateTab: (id: string) => void;
  onNavigate: (url: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
  onStop: () => void;
  onGoHome: () => void;
  onToggleFavorites: () => void;
  onOpenToolsMenu: () => void;
  onToggleCompatibilityView: () => void;
  onUpdateSettings: (settings: Partial<BrowserSettings>) => void;
  onMinimize?: () => void;
  onToggleMaximize?: () => void;
  onCloseWindow?: () => void;
  onOpenDownloads?: () => void;
  onOpenF12?: () => void;
  onOpenAbout?: () => void;
  onInPrivate?: () => void;
  onClearHistory?: () => void;
}

// Authentic Microsoft 4-Color Favicon
const MicrosoftFavicon = () => (
  <div className="grid grid-cols-2 gap-[1.5px] w-3.5 h-3.5 shrink-0">
    <div className="bg-[#F25022] w-1.5 h-1.5" />
    <div className="bg-[#7FBA00] w-1.5 h-1.5" />
    <div className="bg-[#00A4EF] w-1.5 h-1.5" />
    <div className="bg-[#FFB900] w-1.5 h-1.5" />
  </div>
);

// Authentic Bing Teal 'b' Favicon
const BingFavicon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path
      d="M3 1.5L7.8 3.2V11.2L11 9.4L9.8 6.5L13.5 5.2L7.8 14.5L3 11.5V1.5Z"
      fill="#008373"
    />
  </svg>
);

// Authentic MSN Butterfly Favicon
const MsnButterflyFavicon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path d="M8 8C5.5 3 2 4.5 2 7.5C2 10.5 5 10 8 8Z" fill="#00A4EF" />
    <path d="M8 8C10.5 3 14 4.5 14 7.5C14 10.5 11 10 8 8Z" fill="#7FBA00" />
    <path d="M8 8C5.5 13 2 11.5 2 8.5C2 5.5 5 6 8 8Z" fill="#FFB900" />
    <path d="M8 8C10.5 13 14 11.5 14 8.5C14 5.5 11 6 8 8Z" fill="#F25022" />
  </svg>
);

// Suggested Sites Dual Green/Blue Arrows Icon
const SuggestedSitesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <circle cx="8" cy="8" r="7" stroke="#0072C6" strokeWidth="1.2" fill="#F0F8FF" />
    <path d="M5 8L8 5L11 8M11 8L8 11L5 8" stroke="#107C41" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Web Slice Gallery Icon
const WebSliceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <rect x="2.5" y="2" width="11" height="12" rx="1" stroke="#107C41" strokeWidth="1.2" fill="#E8F5E9" />
    <path d="M9.5 2L13.5 6H9.5V2Z" fill="#107C41" />
    <path d="M5 9L11 9M5 11H9" stroke="#107C41" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Authentic IE11 Yellow Feedback Smiley Face Icon (from Windows 10 IE11)
const IE11SmileyIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#F4B400"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <circle cx="9" cy="9" r="1" fill="#F4B400" />
    <circle cx="15" cy="9" r="1" fill="#F4B400" />
  </svg>
);

// Authentic IE11 Compatibility View (Broken Page) Icon
const CompatibilityViewIcon = ({ active }: { active?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <path
      d="M3 1.5H11L14 4.5V7L11 8L13 10L10 11L13 14.5H3V1.5Z"
      stroke={active ? '#0072C6' : '#666666'}
      strokeWidth="1.2"
      fill={active ? '#CCE4F7' : 'none'}
    />
    <path
      d="M11 1.5V4.5H14"
      stroke={active ? '#0072C6' : '#666666'}
      strokeWidth="1.2"
    />
    <path
      d="M5 5.5H8M5 8.5H9"
      stroke={active ? '#0072C6' : '#888888'}
      strokeWidth="1"
    />
  </svg>
);

// Authentic IE11 New Tab Icon with Sparkle / Star
const IE11NewTabStarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="2.5" width="13" height="11" rx="1" stroke="#666666" strokeWidth="1.1" fill="#FAFAFA" />
    <path d="M10.5 2.5L14.5 6.5H10.5V2.5Z" fill="#E8B000" />
    <path
      d="M7 6.5L7.8 8.2L9.5 8.5L8.2 9.7L8.5 11.5L7 10.6L5.5 11.5L5.8 9.7L4.5 8.5L6.2 8.2L7 6.5Z"
      fill="#FFC800"
      stroke="#CC9900"
      strokeWidth="0.4"
    />
  </svg>
);

// Tab Group Color Palette (authentic to IE11 tab grouping)
const TAB_GROUP_COLORS = ['#0072C6', '#107C41', '#FF8C00', '#6B2995', '#008272'];

export const IE11Navbar: React.FC<IE11NavbarProps> = ({
  tabs,
  activeTabId,
  settings,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onDuplicateTab,
  onNavigate,
  onGoBack,
  onGoForward,
  onRefresh,
  onStop,
  onGoHome,
  onToggleFavorites,
  onOpenToolsMenu,
  onToggleCompatibilityView,
  onUpdateSettings,
  onMinimize,
  onToggleMaximize,
  onCloseWindow,
  onOpenDownloads,
  onOpenF12,
  onOpenAbout,
  onInPrivate,
  onClearHistory,
}) => {
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const [addressInput, setAddressInput] = useState(activeTab ? activeTab.url : '');
  const [searchInput, setSearchInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [showSafetySubmenu, setShowSafetySubmenu] = useState(false);
  const [showZoomSubmenu, setShowZoomSubmenu] = useState(false);
  const [showBackHistory, setShowBackHistory] = useState(false);
  const [contextMenuTabId, setContextMenuTabId] = useState<string | null>(null);
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [toolbarContextMenuPos, setToolbarContextMenuPos] = useState<{ x: number; y: number } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab && !isInputFocused) {
      setAddressInput(activeTab.url);
    }
  }, [activeTab?.url, activeTabId, isInputFocused]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowHistoryDropdown(false);
      }
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target as Node)) {
        setShowToolsDropdown(false);
      }
      if (backBtnRef.current && !backBtnRef.current.contains(e.target as Node)) {
        setShowBackHistory(false);
      }
      setContextMenuTabId(null);
      setToolbarContextMenuPos(null);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;
    onNavigate(addressInput.trim());
    setShowHistoryDropdown(false);
    setIsInputFocused(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onNavigate(searchInput.trim());
    setSearchInput('');
  };

  const getTabFavicon = (url: string) => {
    if (url.includes('microsoft.com') || url.includes('support.microsoft') || url.includes('this-website-doesn-t-work')) {
      return <MicrosoftFavicon />;
    }
    if (url.includes('bing.com')) {
      return <BingFavicon />;
    }
    if (url.includes('msn.com')) {
      return <MsnButterflyFavicon />;
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return (
        <div className="w-3.5 h-3.5 bg-[#FF0000] text-white rounded-xs flex items-center justify-center font-bold text-[8px]">
          ▶
        </div>
      );
    }
    if (url.includes('reddit.com')) {
      return (
        <div className="w-3.5 h-3.5 bg-[#FF4500] text-white rounded-full flex items-center justify-center font-bold text-[8px]">
          r/
        </div>
      );
    }
    if (url.includes('news.ycombinator.com') || url.includes('ycombinator.com')) {
      return (
        <div className="w-3.5 h-3.5 bg-[#FF6600] text-white flex items-center justify-center font-bold text-[8px]">
          Y
        </div>
      );
    }
    if (url === 'app:calculator' || url === 'calc') {
      return <span className="text-[11px]">🧮</span>;
    }
    if (url === 'app:notepad' || url === 'notepad') {
      return <span className="text-[11px]">📝</span>;
    }
    if (url === 'app:minesweeper' || url === 'minesweeper') {
      return <span className="text-[11px]">💣</span>;
    }
    if (url.startsWith('chrome://') || url.startsWith('about:')) {
      return <IE11Logo size={14} />;
    }
    return <Globe size={14} className="text-[#0072C6]" />;
  };

  // Split URL into domain and path for IE11 two-tone styling
  const renderFormattedUrl = (url: string) => {
    try {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        const parsed = new URL(url);
        const protocol = `${parsed.protocol}//`;
        const domain = parsed.host;
        const path = `${parsed.pathname}${parsed.search}${parsed.hash}`;
        return (
          <div className="flex items-center truncate text-[12px] pointer-events-none">
            <span className="text-[#666666] font-normal">{protocol}</span>
            <span className="text-[#000000] font-semibold">{domain}</span>
            <span className="text-[#666666] font-normal">{path}</span>
          </div>
        );
      }
    } catch {}
    return <span className="text-[#000000] text-[12px] truncate pointer-events-none">{url}</span>;
  };

  const commonHistory = [
    'https://support.microsoft.com/en-us/internet-explorer/this-website-doesn-t-work-in-internet-explorer',
    'https://www.bing.com',
    'https://www.msn.com',
    'https://www.youtube.com',
    'https://www.tiktok.com',
    'https://en.wikipedia.org',
    'chrome://version',
    'chrome://flags',
    'about:tabs',
  ];

  const handleToolbarContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setToolbarContextMenuPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onContextMenu={handleToolbarContextMenu}
      className="bg-[#FFFFFF] select-none border-b border-[#D4D4D4] relative z-40 font-['Segoe_UI',_Tahoma,_sans-serif]"
    >
      {/* ========================================================================= */}
      {/* WINDOW TITLE BAR (Windows 10 / 8.1 / 7 Desktop Chrome)                   */}
      {/* [e] Title - Internet Explorer .............................. [_] [□] [✕]  */}
      {/* ========================================================================= */}
      <div className="flex items-center h-[30px] px-2 bg-[#FFFFFF] border-b border-[#EAEAEA] text-[#333333]">
        {/* Left: IE11 Blue/Gold Logo & Window Title */}
        <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
          <IE11Logo size={16} />
          {settings.inPrivateMode && (
            <span className="bg-[#0072C6] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-[1px]">
              InPrivate
            </span>
          )}
          <span className="text-[12px] text-[#222222] truncate font-normal">
            {activeTab?.title ? `${activeTab.title} - Internet Explorer` : 'Internet Explorer'}
          </span>
        </div>

        {/* Right: Windows Caption Buttons [_] [□] [✕] */}
        <div className="flex items-center h-full -mr-2">
          <button
            onClick={onMinimize}
            className="w-11 h-full flex items-center justify-center hover:bg-[#E5E5E5] text-[#333333] transition-colors"
            title="Minimize"
          >
            <Minus size={13} strokeWidth={1.5} />
          </button>
          <button
            onClick={onToggleMaximize}
            className="w-11 h-full flex items-center justify-center hover:bg-[#E5E5E5] text-[#333333] transition-colors"
            title="Maximize"
          >
            <Square size={11} strokeWidth={1.5} />
          </button>
          <button
            onClick={onCloseWindow}
            className="w-11 h-full flex items-center justify-center hover:bg-[#E81123] hover:text-white text-[#333333] transition-colors"
            title="Close"
          >
            <X size={14} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CLASSIC MENU BAR (File Edit View Favorites Tools Help)                    */}
      {/* ========================================================================= */}
      {settings.showMenuBar && (
        <IE11MenuBar
          isVisible={settings.showMenuBar}
          settings={settings}
          onNewTab={() => onNewTab()}
          onCloseTab={() => onCloseTab(activeTabId)}
          onDuplicateTab={() => onDuplicateTab(activeTabId)}
          onInPrivate={onInPrivate || (() => {})}
          onFind={() => {}}
          onRefresh={onRefresh}
          onStop={onStop}
          onGoHome={onGoHome}
          onGoBack={onGoBack}
          onGoForward={onGoForward}
          onOpenFavorites={onToggleFavorites}
          onOpenDownloads={onOpenDownloads || (() => {})}
          onOpenF12={onOpenF12 || (() => {})}
          onOpenInternetOptions={onOpenToolsMenu}
          onOpenAbout={onOpenAbout || (() => {})}
          onToggleStatusBar={() => onUpdateSettings({ showStatusBar: !settings.showStatusBar })}
          onToggleFavoritesBar={() => onUpdateSettings({ showFavoritesBar: !settings.showFavoritesBar })}
          onToggleSeparateRow={() => onUpdateSettings({ showTabsOnSeparateRow: !settings.showTabsOnSeparateRow })}
          onChangeZoom={(lvl) => onUpdateSettings({ defaultZoom: lvl })}
          onClearHistory={onClearHistory || (() => {})}
        />
      )}

      {/* ========================================================================= */}
      {/* ROW 1: [Back] [Forward] [Address Bar (OneBox)] [Search] [⌂] [★] [⚙] [☺]   */}
      {/* ========================================================================= */}
      <div className="flex items-center h-[38px] px-2 gap-2 bg-[#FFFFFF]">
        {/* Navigation Buttons: Big Circular Back Button + Forward Button */}
        <div ref={backBtnRef} className="relative flex items-center gap-1 shrink-0">
          {/* Circular Back Button (Classic IE11 Blue / Metallic Circle) */}
          <button
            onClick={onGoBack}
            disabled={!activeTab?.canGoBack}
            className={`w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all ${
              activeTab?.canGoBack
                ? 'bg-[#0072C6] hover:bg-[#005A9E] active:bg-[#004578] text-white shadow-xs cursor-pointer'
                : 'bg-[#EDEDED] text-[#A6A6A6] cursor-default border border-[#D9D9D9]'
            }`}
            title="Back (Alt+Left Arrow)"
          >
            <ArrowLeft size={16} strokeWidth={2.6} className={activeTab?.canGoBack ? 'text-white' : 'text-[#A6A6A6]'} />
          </button>

          {/* Forward Button (Smaller Circle) */}
          <button
            onClick={onGoForward}
            disabled={!activeTab?.canGoForward}
            className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all border ${
              activeTab?.canGoForward
                ? 'border-[#0072C6] text-[#0072C6] hover:bg-[#E5F1FB] cursor-pointer'
                : 'border-[#E0E0E0] text-[#B8B8B8] cursor-default'
            }`}
            title="Forward (Alt+Right Arrow)"
          >
            <ArrowRight size={13} strokeWidth={2.4} />
          </button>

          {/* Dropdown Chevron for Back/Forward History */}
          <button
            onClick={() => setShowBackHistory(!showBackHistory)}
            className="w-4 h-[26px] flex items-center justify-center hover:bg-[#E5E5E5] rounded-[1px] text-[#666666]"
            title="Recent history"
          >
            <ChevronDown size={10} strokeWidth={2} />
          </button>

          {/* Back/Forward Stack Popup */}
          {showBackHistory && activeTab && (
            <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-[#979797] shadow-xl py-1 z-50 text-[12px]">
              <div className="px-3 py-1 text-[11px] font-semibold text-[#666666] bg-[#F7F7F7] border-b border-[#EEEEEE]">
                History for this tab
              </div>
              {activeTab.history.map((url, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onNavigate(url);
                    setShowBackHistory(false);
                  }}
                  className={`px-3 py-1.5 hover:bg-[#E5F1FB] cursor-pointer flex items-center gap-2 ${
                    idx === activeTab.historyIndex ? 'font-semibold text-[#0072C6]' : 'text-[#333333]'
                  }`}
                >
                  {getTabFavicon(url)}
                  <span className="truncate flex-1">{url}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Address Bar (OneBox) */}
        <div ref={dropdownRef} className="relative flex-1 min-w-[220px]">
          <form
            onSubmit={handleAddressSubmit}
            className={`flex items-center h-[28px] bg-white border px-2 rounded-[1px] transition-colors ${
              isInputFocused
                ? 'border-[#0078D7] ring-1 ring-[#0078D7]/40 shadow-inner'
                : 'border-[#ABABAB] hover:border-[#7A7A7A]'
            }`}
          >
            {/* Favicon inside left of address bar */}
            <div className="mr-2 flex items-center shrink-0">
              {getTabFavicon(activeTab?.url || '')}
            </div>

            {/* Input field or formatted text */}
            <div className="relative w-full h-full flex items-center overflow-hidden">
              {/* If not focused, show two-tone formatted URL */}
              {!isInputFocused && (
                <div
                  onClick={() => {
                    setIsInputFocused(true);
                    setTimeout(() => inputRef.current?.focus(), 10);
                  }}
                  className="absolute inset-0 flex items-center cursor-text overflow-hidden"
                >
                  {renderFormattedUrl(addressInput)}
                </div>
              )}

              <input
                ref={inputRef}
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                onFocus={() => {
                  setIsInputFocused(true);
                  setShowHistoryDropdown(true);
                }}
                onBlur={() => setIsInputFocused(false)}
                className={`w-full bg-transparent outline-none text-[#222222] text-[12px] ${
                  isInputFocused ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {/* Right internal address bar icons: [Compatibility View] [Lock] [Refresh/Stop] [▼] */}
            <div className="flex items-center gap-0.5 ml-1 shrink-0 text-[#666666]">
              {/* Compatibility View Icon (Torn Page) */}
              <button
                type="button"
                onClick={onToggleCompatibilityView}
                className={`p-1 hover:bg-[#E5E5E5] rounded-[1px] ${
                  settings.emulationMode !== 'edge' ? 'text-[#0072C6] bg-[#CCE4F7]' : ''
                }`}
                title="Compatibility View: Websites designed for older browsers will often look better... (Alt+T)"
              >
                <CompatibilityViewIcon active={settings.emulationMode !== 'edge'} />
              </button>

              {/* Padlock Icon */}
              <div className="p-1 text-[#666666]" title="SSL Encrypted Connection">
                <Lock size={12} strokeWidth={2} />
              </div>

              {/* Refresh / Stop Icon */}
              {activeTab?.isLoading ? (
                <button
                  type="button"
                  onClick={onStop}
                  className="p-1 hover:bg-[#E5E5E5] text-[#D83B01] rounded-[1px]"
                  title="Stop (Esc)"
                >
                  <X size={13} strokeWidth={2.2} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onRefresh}
                  className="p-1 hover:bg-[#E5E5E5] hover:text-[#0072C6] rounded-[1px]"
                  title="Refresh (F5)"
                >
                  <RotateCw size={12} strokeWidth={2.2} />
                </button>
              )}

              {/* Dropdown Caret */}
              <button
                type="button"
                onClick={() => setShowHistoryDropdown(!showHistoryDropdown)}
                className="p-1 hover:bg-[#E5E5E5] rounded-[1px]"
                title="Address Bar History"
              >
                <ChevronDown size={11} strokeWidth={2.2} />
              </button>
            </div>
          </form>

          {/* Autocomplete / History Dropdown */}
          {showHistoryDropdown && (
            <div className="absolute top-full left-0 right-0 mt-0.5 bg-white border border-[#979797] shadow-xl rounded-[1px] py-1 z-50 text-[12px]">
              <div className="px-3 py-1 text-[11px] font-semibold text-[#666666] bg-[#F7F7F7] border-b border-[#EEEEEE] flex justify-between">
                <span>Frequently Visited & Quick Links</span>
                <span className="text-[10px] text-[#0072C6]">Internet Explorer 11</span>
              </div>
              {commonHistory.map((item) => (
                <div
                  key={item}
                  onMouseDown={() => {
                    setAddressInput(item);
                    onNavigate(item);
                    setShowHistoryDropdown(false);
                  }}
                  className="px-3 py-1.5 hover:bg-[#E5F1FB] hover:text-[#0072C6] cursor-pointer flex items-center gap-2"
                >
                  {getTabFavicon(item)}
                  <span className="truncate text-[#333333]">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Separate Search Box (with Bing Magnifier and Provider Arrow) */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center h-[28px] w-48 sm:w-56 bg-white border border-[#ABABAB] hover:border-[#7A7A7A] px-2 rounded-[1px] shrink-0"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent outline-none text-[12px] text-[#222222] placeholder:text-[#666666] placeholder:italic"
          />
          <button
            type="submit"
            className="p-0.5 text-[#008373] hover:text-[#005A9E]"
            title="Search with Bing"
          >
            <Search size={13} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="p-0.5 text-[#666666] hover:text-[#0072C6] ml-0.5"
            title="Search Providers"
          >
            <ChevronDown size={10} strokeWidth={2} />
          </button>
        </form>

        {/* Right Command Icons: [⌂ Home] [★ Favorites] [⚙ Tools] [☺ Feedback] */}
        <div className="flex items-center gap-0.5 shrink-0 text-[#444444]">
          {/* Home Button */}
          <button
            onClick={onGoHome}
            className="w-[28px] h-[28px] flex items-center justify-center hover:bg-[#E5E5E5] hover:text-[#0072C6] rounded-[2px] transition-colors"
            title="Home"
          >
            <Home size={16} strokeWidth={1.6} />
          </button>

          {/* Favorites Star Button */}
          <button
            onClick={onToggleFavorites}
            className="w-[28px] h-[28px] flex items-center justify-center hover:bg-[#E5E5E5] rounded-[2px] transition-colors"
            title="View favorites, feeds, and history (Alt+C)"
          >
            <Star size={16} strokeWidth={1.6} className="text-[#666666]" />
          </button>

          {/* Tools Gear Button (Opens Authentic IE11 Tools Dropdown) */}
          <div ref={toolsMenuRef} className="relative">
            <button
              onClick={() => setShowToolsDropdown(!showToolsDropdown)}
              className={`w-[28px] h-[28px] flex items-center justify-center rounded-[2px] transition-colors ${
                showToolsDropdown ? 'bg-[#90C8F6] text-[#000000]' : 'hover:bg-[#E5E5E5] text-[#444444]'
              }`}
              title="Tools (Alt+X)"
            >
              <GearIcon size={16} strokeWidth={1.6} />
            </button>

            {/* Authentic IE11 Tools Dropdown Menu */}
            {showToolsDropdown && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-[#F0F0F0] border border-[#979797] shadow-xl py-1 z-50 text-[12px] font-['Segoe_UI',_Tahoma,_sans-serif] select-none">
                <button
                  onClick={() => {
                    setShowToolsDropdown(false);
                    window.print();
                  }}
                  className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left text-[#111111]"
                >
                  <span className="flex items-center gap-2">
                    <Printer size={13} className="text-[#666666]" />
                    Print
                  </span>
                  <span className="text-[#666666] text-[11px]">Ctrl+P</span>
                </button>

                {/* Safety Submenu */}
                <div
                  onMouseEnter={() => setShowSafetySubmenu(true)}
                  onMouseLeave={() => setShowSafetySubmenu(false)}
                  className="relative px-3 py-1 flex justify-between items-center hover:bg-[#90C8F6] cursor-pointer text-[#111111]"
                >
                  <span className="flex items-center gap-2">
                    <Shield size={13} className="text-[#107C41]" />
                    Safety
                  </span>
                  <span className="text-[10px]">▶</span>

                  {showSafetySubmenu && (
                    <div className="absolute right-full top-0 -mt-1 w-60 bg-[#F0F0F0] border border-[#979797] shadow-lg py-1 z-50">
                      <button
                        onClick={() => {
                          setShowToolsDropdown(false);
                          if (onClearHistory) onClearHistory();
                        }}
                        className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
                      >
                        <span>Delete browsing history...</span>
                        <span className="text-[#666666] text-[10px]">Ctrl+Shift+Del</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowToolsDropdown(false);
                          if (onInPrivate) onInPrivate();
                        }}
                        className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
                      >
                        <span>InPrivate Browsing</span>
                        <span className="text-[#666666] text-[10px]">Ctrl+Shift+P</span>
                      </button>
                      <div className="my-1 border-t border-[#D9D9D9]" />
                      <div className="px-3 py-1 hover:bg-[#90C8F6]">Turn on Tracking Protection</div>
                      <div className="px-3 py-1 hover:bg-[#90C8F6]">ActiveX Filtering</div>
                      <div className="px-3 py-1 hover:bg-[#90C8F6]">SmartScreen Filter</div>
                    </div>
                  )}
                </div>

                <div className="my-1 border-t border-[#D9D9D9]" />

                {/* View Downloads */}
                <button
                  onClick={() => {
                    setShowToolsDropdown(false);
                    if (onOpenDownloads) onOpenDownloads();
                  }}
                  className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left text-[#111111]"
                >
                  <span>View downloads</span>
                  <span className="text-[#666666] text-[11px]">Ctrl+J</span>
                </button>

                {/* F12 DevTools */}
                <button
                  onClick={() => {
                    setShowToolsDropdown(false);
                    if (onOpenF12) onOpenF12();
                  }}
                  className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left text-[#111111]"
                >
                  <span>F12 Developer Tools</span>
                  <span className="text-[#666666] text-[11px]">F12</span>
                </button>

                {/* Compatibility View Settings */}
                <button
                  onClick={() => {
                    setShowToolsDropdown(false);
                    onToggleCompatibilityView();
                  }}
                  className="w-full px-3 py-1 hover:bg-[#90C8F6] text-left text-[#111111]"
                >
                  Compatibility View settings
                </button>

                <div className="my-1 border-t border-[#D9D9D9]" />

                {/* Internet Options */}
                <button
                  onClick={() => {
                    setShowToolsDropdown(false);
                    onOpenToolsMenu();
                  }}
                  className="w-full px-3 py-1 hover:bg-[#90C8F6] text-left text-[#111111]"
                >
                  Internet options
                </button>

                {/* About Neo-Internet Explorer 11 */}
                <button
                  onClick={() => {
                    setShowToolsDropdown(false);
                    if (onOpenAbout) onOpenAbout();
                  }}
                  className="w-full px-3 py-1 hover:bg-[#90C8F6] text-left text-[#0072C6] font-medium"
                >
                  About Neo-Internet Explorer 11
                </button>
              </div>
            )}
          </div>

          {/* Windows 10 IE11 Yellow Smiley Feedback Button */}
          <button
            onClick={() => alert('Send a Smile: Thank you for providing feedback on Internet Explorer 11!')}
            className="w-[28px] h-[28px] flex items-center justify-center hover:bg-[#E5E5E5] rounded-[2px] transition-colors"
            title="Send a Smile (Feedback)"
          >
            <IE11SmileyIcon />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 2: Favorites Bar & Tabs Strip (Authentic IE11 Layout)                 */}
      {/* [★] MSN | Bing | Suggested Sites | [Tab 1: Title ✕] [Tab 2 ✕] [* New Tab] */}
      {/* ========================================================================= */}
      <div className="flex items-center h-[34px] px-2 bg-[#FFFFFF] border-t border-[#F0F0F0] gap-1">
        {/* Left: Quick Favorites Bar Items (MSN, Bing, Suggested Sites, Web Slice) */}
        {settings.showFavoritesBar && (
          <div className="flex items-center gap-1 shrink-0 pr-2 border-r border-[#D9D9D9] mr-1">
            {/* Favorites Star Icon */}
            <button
              onClick={onToggleFavorites}
              className="p-1 text-[#E0A000] hover:bg-[#E5E5E5] rounded-[2px]"
              title="Favorites"
            >
              <Star size={14} fill="#FFC800" stroke="#CC9900" />
            </button>

            {/* MSN */}
            <button
              onClick={() => onNavigate('https://www.msn.com')}
              className="flex items-center gap-1.5 px-2 py-1 text-[12px] text-[#222222] hover:bg-[#E5E5E5] rounded-[1px] transition-colors"
            >
              <MsnButterflyFavicon />
              <span>MSN</span>
            </button>

            {/* Bing */}
            <button
              onClick={() => onNavigate('https://www.bing.com')}
              className="flex items-center gap-1.5 px-2 py-1 text-[12px] text-[#222222] hover:bg-[#E5E5E5] rounded-[1px] transition-colors"
            >
              <BingFavicon />
              <span>Bing</span>
            </button>

            {/* Suggested Sites */}
            <button
              onClick={() => onNavigate('https://www.bing.com')}
              className="hidden md:flex items-center gap-1.5 px-2 py-1 text-[12px] text-[#222222] hover:bg-[#E5E5E5] rounded-[1px] transition-colors"
            >
              <SuggestedSitesIcon />
              <span>Suggested Sites</span>
            </button>

            {/* Web Slice Gallery */}
            <button
              onClick={() => onNavigate('https://www.msn.com')}
              className="hidden lg:flex items-center gap-1.5 px-2 py-1 text-[12px] text-[#222222] hover:bg-[#E5E5E5] rounded-[1px] transition-colors"
            >
              <WebSliceIcon />
              <span>Web Slice Gallery</span>
            </button>
          </div>
        )}

        {/* Tabs Strip (Authentic IE11 Tabs Geometry & Color Strips) */}
        <div className="flex-1 flex items-end h-full overflow-x-auto no-scrollbar gap-[1px]">
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTabId;
            const groupColor = TAB_GROUP_COLORS[index % TAB_GROUP_COLORS.length];

            return (
              <div
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setContextMenuTabId(tab.id);
                  setContextMenuPos({ x: e.clientX, y: e.clientY });
                }}
                className={`group relative flex items-center h-[31px] px-2.5 max-w-[260px] min-w-[140px] cursor-pointer text-[12px] border-t border-l border-r rounded-t-[3px] transition-all select-none ${
                  isActive
                    ? 'bg-white border-[#D4D4D4] text-[#111111] shadow-[0_1px_0_0_#FFFFFF] font-normal'
                    : 'bg-[#F2F2F2] hover:bg-[#F9F9F9] border-[#E0E0E0] text-[#555555]'
                }`}
              >
                {/* Authentic IE11 Tab Group Accent Bar on top */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[3px]"
                    style={{ backgroundColor: groupColor }}
                  />
                )}

                {/* Tab Favicon */}
                <div className="mr-2 shrink-0">
                  {getTabFavicon(tab.url)}
                </div>

                {/* Tab Title */}
                <span className="truncate flex-1" title={tab.title}>
                  {tab.title || 'New tab'}
                </span>

                {/* Close Tab Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                  className={`ml-2 p-0.5 rounded-[1px] text-[#666666] hover:bg-[#E81123] hover:text-white transition-colors ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  title="Close tab (Ctrl+W)"
                >
                  <X size={11} strokeWidth={2.2} />
                </button>
              </div>
            );
          })}

          {/* New Tab Button with Sparkle / Star (1:1 with IE11) */}
          <button
            onClick={() => onNewTab()}
            className="w-[28px] h-[26px] self-center flex items-center justify-center hover:bg-[#E5E5E5] rounded-[1px] transition-colors ml-1 shrink-0"
            title="New tab (Ctrl+T)"
          >
            <IE11NewTabStarIcon />
          </button>
        </div>
      </div>

      {/* Tab Context Menu */}
      {contextMenuTabId && contextMenuPos && (
        <div
          style={{ top: contextMenuPos.y, left: contextMenuPos.x }}
          className="fixed bg-[#F0F0F0] border border-[#979797] shadow-xl rounded-[2px] py-1 z-50 text-[12px] min-w-[180px] font-['Segoe_UI',_Tahoma,_sans-serif]"
        >
          <div
            onClick={() => {
              onDuplicateTab(contextMenuTabId);
              setContextMenuTabId(null);
            }}
            className="px-3 py-1.5 hover:bg-[#90C8F6] cursor-pointer"
          >
            Duplicate tab
          </div>
          <div
            onClick={() => {
              onCloseTab(contextMenuTabId);
              setContextMenuTabId(null);
            }}
            className="px-3 py-1.5 hover:bg-[#90C8F6] cursor-pointer"
          >
            Close tab
          </div>
          <div
            onClick={() => {
              tabs.filter((t) => t.id !== contextMenuTabId).forEach((t) => onCloseTab(t.id));
              setContextMenuTabId(null);
            }}
            className="px-3 py-1.5 hover:bg-[#90C8F6] cursor-pointer"
          >
            Close other tabs
          </div>
          <div className="my-1 border-t border-[#D9D9D9]" />
          <div
            onClick={() => {
              onUpdateSettings({ showTabsOnSeparateRow: !settings.showTabsOnSeparateRow });
              setContextMenuTabId(null);
            }}
            className="px-3 py-1.5 hover:bg-[#90C8F6] cursor-pointer flex items-center justify-between"
          >
            <span>Show tabs on a separate row</span>
            {settings.showTabsOnSeparateRow && <Check size={12} className="text-[#0072C6]" />}
          </div>
        </div>
      )}

      {/* Toolbar Context Menu (Right Click on Toolbar) */}
      {toolbarContextMenuPos && (
        <div
          style={{ top: toolbarContextMenuPos.y, left: toolbarContextMenuPos.x }}
          className="fixed bg-[#F0F0F0] border border-[#979797] shadow-xl rounded-[2px] py-1 z-50 text-[12px] min-w-[200px] font-['Segoe_UI',_Tahoma,_sans-serif]"
        >
          <div
            onClick={() => {
              onUpdateSettings({ showMenuBar: !settings.showMenuBar });
              setToolbarContextMenuPos(null);
            }}
            className="px-3 py-1.5 hover:bg-[#90C8F6] cursor-pointer flex items-center justify-between"
          >
            <span>Menu bar</span>
            {settings.showMenuBar && <Check size={12} className="text-[#0072C6]" />}
          </div>
          <div
            onClick={() => {
              onUpdateSettings({ showFavoritesBar: !settings.showFavoritesBar });
              setToolbarContextMenuPos(null);
            }}
            className="px-3 py-1.5 hover:bg-[#90C8F6] cursor-pointer flex items-center justify-between"
          >
            <span>Favorites bar</span>
            {settings.showFavoritesBar && <Check size={12} className="text-[#0072C6]" />}
          </div>
          <div
            onClick={() => {
              onUpdateSettings({ showStatusBar: !settings.showStatusBar });
              setToolbarContextMenuPos(null);
            }}
            className="px-3 py-1.5 hover:bg-[#90C8F6] cursor-pointer flex items-center justify-between"
          >
            <span>Status bar</span>
            {settings.showStatusBar && <Check size={12} className="text-[#0072C6]" />}
          </div>
          <div className="my-1 border-t border-[#D9D9D9]" />
          <div
            onClick={() => {
              onUpdateSettings({ showTabsOnSeparateRow: !settings.showTabsOnSeparateRow });
              setToolbarContextMenuPos(null);
            }}
            className="px-3 py-1.5 hover:bg-[#90C8F6] cursor-pointer flex items-center justify-between"
          >
            <span>Show tabs on a separate row</span>
            {settings.showTabsOnSeparateRow && <Check size={12} className="text-[#0072C6]" />}
          </div>
        </div>
      )}
    </div>
  );
};
