import React, { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { BrowserSettings } from '../types';

interface IE11MenuBarProps {
  isVisible: boolean;
  settings: BrowserSettings;
  onNewTab: () => void;
  onCloseTab: () => void;
  onDuplicateTab: () => void;
  onInPrivate: () => void;
  onFind: () => void;
  onRefresh: () => void;
  onStop: () => void;
  onGoHome: () => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onOpenFavorites: () => void;
  onOpenDownloads: () => void;
  onOpenF12: () => void;
  onOpenInternetOptions: () => void;
  onOpenAbout: () => void;
  onToggleStatusBar: () => void;
  onToggleFavoritesBar: () => void;
  onToggleSeparateRow: () => void;
  onChangeZoom: (zoom: number) => void;
  onClearHistory: () => void;
  onCloseMenu?: () => void;
}

export const IE11MenuBar: React.FC<IE11MenuBarProps> = ({
  isVisible,
  settings,
  onNewTab,
  onCloseTab,
  onDuplicateTab,
  onInPrivate,
  onFind,
  onRefresh,
  onStop,
  onGoHome,
  onGoBack,
  onGoForward,
  onOpenFavorites,
  onOpenDownloads,
  onOpenF12,
  onOpenInternetOptions,
  onOpenAbout,
  onToggleStatusBar,
  onToggleFavoritesBar,
  onToggleSeparateRow,
  onChangeZoom,
  onClearHistory,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  if (!isVisible) return null;

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
    setActiveSubmenu(null);
  };

  const handleItemClick = (action?: () => void) => {
    if (action) action();
    setActiveMenu(null);
    setActiveSubmenu(null);
  };

  return (
    <div
      ref={menuBarRef}
      className="h-[23px] bg-[#EFEFEF] border-b border-[#DCDCDC] px-2 flex items-center text-[12px] font-['Segoe_UI',_Tahoma,_sans-serif] text-[#111111] select-none shrink-0 relative z-50"
    >
      {/* File */}
      <div className="relative">
        <button
          onClick={() => handleMenuClick('file')}
          onMouseEnter={() => activeMenu && setActiveMenu('file')}
          className={`px-2 py-0.5 rounded-[1px] ${
            activeMenu === 'file' ? 'bg-[#90C8F6] text-[#000000]' : 'hover:bg-[#E5F1FB]'
          }`}
        >
          <span className="underline">F</span>ile
        </button>
        {activeMenu === 'file' && (
          <div className="absolute left-0 top-full mt-[1px] w-56 bg-[#F0F0F0] border border-[#979797] shadow-lg py-1 z-50 text-[12px]">
            <button
              onClick={() => handleItemClick(onNewTab)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>New tab</span>
              <span className="text-[#666666] text-[11px]">Ctrl+T</span>
            </button>
            <button
              onClick={() => handleItemClick(onDuplicateTab)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Duplicate tab</span>
              <span className="text-[#666666] text-[11px]">Ctrl+K</span>
            </button>
            <button
              onClick={() => handleItemClick(onNewTab)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>New window</span>
              <span className="text-[#666666] text-[11px]">Ctrl+N</span>
            </button>
            <button
              onClick={() => handleItemClick(onInPrivate)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>New InPrivate window</span>
              <span className="text-[#666666] text-[11px]">Ctrl+Shift+P</span>
            </button>
            <div className="my-1 border-t border-[#D9D9D9]" />
            <button
              onClick={() => handleItemClick(() => window.print())}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Print...</span>
              <span className="text-[#666666] text-[11px]">Ctrl+P</span>
            </button>
            <div className="my-1 border-t border-[#D9D9D9]" />
            <button
              onClick={() => handleItemClick(onCloseTab)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Close tab</span>
              <span className="text-[#666666] text-[11px]">Ctrl+W</span>
            </button>
          </div>
        )}
      </div>

      {/* Edit */}
      <div className="relative">
        <button
          onClick={() => handleMenuClick('edit')}
          onMouseEnter={() => activeMenu && setActiveMenu('edit')}
          className={`px-2 py-0.5 rounded-[1px] ${
            activeMenu === 'edit' ? 'bg-[#90C8F6] text-[#000000]' : 'hover:bg-[#E5F1FB]'
          }`}
        >
          <span className="underline">E</span>dit
        </button>
        {activeMenu === 'edit' && (
          <div className="absolute left-0 top-full mt-[1px] w-52 bg-[#F0F0F0] border border-[#979797] shadow-lg py-1 z-50 text-[12px]">
            <button
              onClick={() => handleItemClick(() => document.execCommand('cut'))}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Cut</span>
              <span className="text-[#666666] text-[11px]">Ctrl+X</span>
            </button>
            <button
              onClick={() => handleItemClick(() => document.execCommand('copy'))}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Copy</span>
              <span className="text-[#666666] text-[11px]">Ctrl+C</span>
            </button>
            <button
              onClick={() => handleItemClick(() => document.execCommand('paste'))}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Paste</span>
              <span className="text-[#666666] text-[11px]">Ctrl+V</span>
            </button>
            <button
              onClick={() => handleItemClick(() => document.execCommand('selectAll'))}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Select all</span>
              <span className="text-[#666666] text-[11px]">Ctrl+A</span>
            </button>
            <div className="my-1 border-t border-[#D9D9D9]" />
            <button
              onClick={() => handleItemClick(onFind)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Find on this page...</span>
              <span className="text-[#666666] text-[11px]">Ctrl+F</span>
            </button>
          </div>
        )}
      </div>

      {/* View */}
      <div className="relative">
        <button
          onClick={() => handleMenuClick('view')}
          onMouseEnter={() => activeMenu && setActiveMenu('view')}
          className={`px-2 py-0.5 rounded-[1px] ${
            activeMenu === 'view' ? 'bg-[#90C8F6] text-[#000000]' : 'hover:bg-[#E5F1FB]'
          }`}
        >
          <span className="underline">V</span>iew
        </button>
        {activeMenu === 'view' && (
          <div className="absolute left-0 top-full mt-[1px] w-56 bg-[#F0F0F0] border border-[#979797] shadow-lg py-1 z-50 text-[12px]">
            {/* Toolbars submenu */}
            <div
              onMouseEnter={() => setActiveSubmenu('toolbars')}
              className="relative px-3 py-1 flex justify-between items-center hover:bg-[#90C8F6] cursor-pointer"
            >
              <span>Toolbars</span>
              <span className="text-[10px]">▶</span>

              {activeSubmenu === 'toolbars' && (
                <div className="absolute left-full top-0 -mt-1 w-52 bg-[#F0F0F0] border border-[#979797] shadow-lg py-1 z-50">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavoritesBar();
                    }}
                    className="px-3 py-1 flex items-center justify-between hover:bg-[#90C8F6] cursor-pointer"
                  >
                    <span>Favorites bar</span>
                    {settings.showFavoritesBar && <Check size={12} className="text-[#0072C6]" />}
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatusBar();
                    }}
                    className="px-3 py-1 flex items-center justify-between hover:bg-[#90C8F6] cursor-pointer"
                  >
                    <span>Status bar</span>
                    {settings.showStatusBar && <Check size={12} className="text-[#0072C6]" />}
                  </div>
                  <div className="my-1 border-t border-[#D9D9D9]" />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSeparateRow();
                    }}
                    className="px-3 py-1 flex items-center justify-between hover:bg-[#90C8F6] cursor-pointer"
                  >
                    <span>Show tabs on a separate row</span>
                    {settings.showTabsOnSeparateRow && <Check size={12} className="text-[#0072C6]" />}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleItemClick(onStop)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Stop</span>
              <span className="text-[#666666] text-[11px]">Esc</span>
            </button>
            <button
              onClick={() => handleItemClick(onRefresh)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Refresh</span>
              <span className="text-[#666666] text-[11px]">F5</span>
            </button>
            <div className="my-1 border-t border-[#D9D9D9]" />

            {/* Zoom Submenu */}
            <div
              onMouseEnter={() => setActiveSubmenu('zoom')}
              className="relative px-3 py-1 flex justify-between items-center hover:bg-[#90C8F6] cursor-pointer"
            >
              <span>Zoom</span>
              <span className="text-[10px]">▶</span>

              {activeSubmenu === 'zoom' && (
                <div className="absolute left-full top-0 -mt-1 w-36 bg-[#F0F0F0] border border-[#979797] shadow-lg py-1 z-50">
                  {[400, 200, 150, 125, 100, 75, 50].map((lvl) => (
                    <div
                      key={lvl}
                      onClick={() => handleItemClick(() => onChangeZoom(lvl))}
                      className="px-3 py-1 flex items-center justify-between hover:bg-[#90C8F6] cursor-pointer"
                    >
                      <span>{lvl}%</span>
                      {settings.defaultZoom === lvl && <Check size={12} className="text-[#0072C6]" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="my-1 border-t border-[#D9D9D9]" />
            <button
              onClick={() => handleItemClick(onOpenF12)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Source (DevTools)</span>
              <span className="text-[#666666] text-[11px]">F12</span>
            </button>
          </div>
        )}
      </div>

      {/* Favorites */}
      <div className="relative">
        <button
          onClick={() => handleMenuClick('favorites')}
          onMouseEnter={() => activeMenu && setActiveMenu('favorites')}
          className={`px-2 py-0.5 rounded-[1px] ${
            activeMenu === 'favorites' ? 'bg-[#90C8F6] text-[#000000]' : 'hover:bg-[#E5F1FB]'
          }`}
        >
          F<span className="underline">a</span>vorites
        </button>
        {activeMenu === 'favorites' && (
          <div className="absolute left-0 top-full mt-[1px] w-56 bg-[#F0F0F0] border border-[#979797] shadow-lg py-1 z-50 text-[12px]">
            <button
              onClick={() => handleItemClick(onOpenFavorites)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Add to favorites...</span>
              <span className="text-[#666666] text-[11px]">Ctrl+D</span>
            </button>
            <button
              onClick={() => handleItemClick(onOpenFavorites)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Organize favorites...</span>
            </button>
            <div className="my-1 border-t border-[#D9D9D9]" />
            <button
              onClick={() => handleItemClick(onOpenFavorites)}
              className="w-full px-3 py-1 hover:bg-[#90C8F6] text-left"
            >
              <span>View Favorites Bar</span>
            </button>
          </div>
        )}
      </div>

      {/* Tools */}
      <div className="relative">
        <button
          onClick={() => handleMenuClick('tools')}
          onMouseEnter={() => activeMenu && setActiveMenu('tools')}
          className={`px-2 py-0.5 rounded-[1px] ${
            activeMenu === 'tools' ? 'bg-[#90C8F6] text-[#000000]' : 'hover:bg-[#E5F1FB]'
          }`}
        >
          <span className="underline">T</span>ools
        </button>
        {activeMenu === 'tools' && (
          <div className="absolute left-0 top-full mt-[1px] w-64 bg-[#F0F0F0] border border-[#979797] shadow-lg py-1 z-50 text-[12px]">
            <button
              onClick={() => handleItemClick(onClearHistory)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Delete browsing history...</span>
              <span className="text-[#666666] text-[11px]">Ctrl+Shift+Del</span>
            </button>
            <button
              onClick={() => handleItemClick(onInPrivate)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>InPrivate Browsing</span>
              <span className="text-[#666666] text-[11px]">Ctrl+Shift+P</span>
            </button>
            <button
              onClick={() => handleItemClick(onOpenDownloads)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>View downloads</span>
              <span className="text-[#666666] text-[11px]">Ctrl+J</span>
            </button>
            <div className="my-1 border-t border-[#D9D9D9]" />
            <button
              onClick={() => handleItemClick(onOpenF12)}
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>F12 Developer Tools</span>
              <span className="text-[#666666] text-[11px]">F12</span>
            </button>
            <div className="my-1 border-t border-[#D9D9D9]" />
            <button
              onClick={() => handleItemClick(onOpenInternetOptions)}
              className="w-full px-3 py-1 hover:bg-[#90C8F6] text-left"
            >
              <span>Internet options</span>
            </button>
          </div>
        )}
      </div>

      {/* Help */}
      <div className="relative">
        <button
          onClick={() => handleMenuClick('help')}
          onMouseEnter={() => activeMenu && setActiveMenu('help')}
          className={`px-2 py-0.5 rounded-[1px] ${
            activeMenu === 'help' ? 'bg-[#90C8F6] text-[#000000]' : 'hover:bg-[#E5F1FB]'
          }`}
        >
          <span className="underline">H</span>elp
        </button>
        {activeMenu === 'help' && (
          <div className="absolute left-0 top-full mt-[1px] w-56 bg-[#F0F0F0] border border-[#979797] shadow-lg py-1 z-50 text-[12px]">
            <button
              onClick={() =>
                handleItemClick(() =>
                  window.open('https://support.microsoft.com/en-us/internet-explorer', '_blank')
                )
              }
              className="w-full px-3 py-1 flex justify-between hover:bg-[#90C8F6] text-left"
            >
              <span>Internet Explorer Help</span>
              <span className="text-[#666666] text-[11px]">F1</span>
            </button>
            <button
              onClick={() => handleItemClick(onOpenAbout)}
              className="w-full px-3 py-1 hover:bg-[#90C8F6] text-left"
            >
              <span>What's New in Neo-Internet Explorer 11</span>
            </button>
            <div className="my-1 border-t border-[#D9D9D9]" />
            <button
              onClick={() => handleItemClick(onOpenAbout)}
              className="w-full px-3 py-1 hover:bg-[#90C8F6] text-left font-medium text-[#0072C6]"
            >
              <span>About Neo-Internet Explorer 11</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
