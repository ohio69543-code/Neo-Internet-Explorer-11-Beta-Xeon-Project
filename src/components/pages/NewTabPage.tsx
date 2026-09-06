import React, { useState } from 'react';
import { TOP_SITES } from '../../data/defaultData';
import {
  Search,
  Shield,
  RotateCcw,
  Globe,
  LayoutGrid,
  EyeOff,
  Video,
  Tv,
  MessageSquare,
  Calculator,
  FileText,
  Smile,
  BookOpen,
  Terminal,
} from 'lucide-react';
import { IE11Logo } from '../IE11Logo';

interface NewTabPageProps {
  onNavigate: (url: string) => void;
  onOpenInPrivate: () => void;
  onReopenClosedTab: () => void;
}

export const NewTabPage: React.FC<NewTabPageProps> = ({
  onNavigate,
  onOpenInPrivate,
  onReopenClosedTab,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showTiles, setShowTiles] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onNavigate(searchInput.trim());
  };

  const renderIcon = (iconName?: string, url?: string) => {
    if (url && (url.startsWith('chrome://') || url.startsWith('about:'))) {
      return <IE11Logo size={18} />;
    }
    switch (iconName) {
      case 'video':
        return <Video size={18} />;
      case 'tv':
        return <Tv size={18} />;
      case 'search':
        return <Search size={18} />;
      case 'message-square':
        return <MessageSquare size={18} />;
      case 'calculator':
        return <Calculator size={18} />;
      case 'file-text':
        return <FileText size={18} />;
      case 'smile':
        return <Smile size={18} />;
      case 'book-open':
        return <BookOpen size={18} />;
      case 'terminal':
        return <Terminal size={18} />;
      default:
        return <Globe size={18} />;
    }
  };

  return (
    <div className="w-full h-full bg-[#FFFFFF] overflow-y-auto font-['Segoe_UI',_Tahoma,_sans-serif] select-none flex flex-col items-center py-12 px-6">
      {/* Container matching IE11 New Tab geometry */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header Branding: Authentic Neo-Internet Explorer 11 */}
        <div className="flex items-center gap-3.5 mb-6">
          <IE11Logo size={46} />
          <h1 className="text-[30px] font-light text-[#222222] tracking-tight">
            Neo-Internet Explorer 11
          </h1>
        </div>

        {/* Search Bar (Centered OneBox Style with Bing branding) */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl flex items-center h-11 bg-white border border-[#ABABAB] hover:border-[#7A7A7A] focus-within:border-[#0078D7] focus-within:ring-1 focus-within:ring-[#0078D7]/40 px-3 rounded-[2px] shadow-xs mb-10 transition-all"
        >
          <div className="mr-2.5 shrink-0">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 1.5L7.8 3.2V11.2L11 9.4L9.8 6.5L13.5 5.2L7.8 14.5L3 11.5V1.5Z"
                fill="#008373"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search the web with Bing or type an app address (e.g. youtube.com, calc, reddit.com)"
            className="w-full bg-transparent outline-none text-[14px] text-[#222222] placeholder:text-[#767676]"
          />
          <button
            type="submit"
            className="p-1.5 hover:bg-[#0078D7] hover:text-white rounded-[2px] transition-colors text-[#555555]"
            title="Search"
          >
            <Search size={18} strokeWidth={2} />
          </button>
        </form>

        {/* "What would you like to do next?" frequent sites section */}
        {showTiles && (
          <div className="w-full">
            <div className="flex items-center justify-between mb-4 border-b border-[#EAEAEA] pb-2">
              <h2 className="text-[16px] font-normal text-[#333333]">
                What would you like to do next?
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-[#666666]">In-app experiences</span>
                <button
                  onClick={() => setShowTiles(false)}
                  className="text-[12px] text-[#0072C6] hover:underline flex items-center gap-1"
                >
                  <EyeOff size={12} />
                  Hide tiles
                </button>
              </div>
            </div>

            {/* Tiles Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {TOP_SITES.map((site) => (
                <div
                  key={site.id}
                  onClick={() => onNavigate(site.url)}
                  className="group relative bg-[#F7F8F9] hover:bg-[#FFFFFF] border border-[#E0E0E0] hover:border-[#70C0E7] hover:shadow-md transition-all rounded-[3px] p-3 cursor-pointer flex flex-col justify-between h-28 overflow-hidden"
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-8 h-8 rounded-[2px] flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: site.color }}
                    >
                      {renderIcon(site.icon, site.url)}
                    </div>
                    <div className="truncate flex-1">
                      <div className="font-semibold text-[#222222] text-[13px] truncate group-hover:text-[#0072C6]">
                        {site.title}
                      </div>
                      <div className="text-[11px] text-[#777777] truncate mt-0.5">
                        {site.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Color Accent Bar (Signature IE11 tile detail!) */}
                  <div
                    className="h-1 -mx-3 -mb-3 transition-transform group-hover:h-1.5"
                    style={{ backgroundColor: site.color }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {!showTiles && (
          <div className="py-8 text-center">
            <button
              onClick={() => setShowTiles(true)}
              className="text-[#0072C6] hover:underline text-[13px] flex items-center gap-1.5 mx-auto"
            >
              <LayoutGrid size={14} />
              Show frequent sites tiles
            </button>
          </div>
        )}

        {/* Bottom Quick Utilities: Reopen closed tabs | InPrivate Browsing */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#0072C6]">
          <button
            onClick={onReopenClosedTab}
            className="flex items-center gap-1.5 hover:underline text-[#0072C6]"
          >
            <RotateCcw size={14} />
            <span>Reopen closed tabs</span>
          </button>

          <span className="text-[#CCCCCC]">|</span>

          <button
            onClick={onOpenInPrivate}
            className="flex items-center gap-1.5 hover:underline text-[#0072C6]"
          >
            <Shield size={14} />
            <span>InPrivate Browsing</span>
          </button>

          <span className="text-[#CCCCCC]">|</span>

          <button
            onClick={() => onNavigate('https://support.microsoft.com/en-us/internet-explorer/this-website-doesn-t-work-in-internet-explorer')}
            className="flex items-center gap-1.5 hover:underline text-[#0072C6]"
          >
            <IE11Logo size={13} />
            <span>Internet Explorer Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};
