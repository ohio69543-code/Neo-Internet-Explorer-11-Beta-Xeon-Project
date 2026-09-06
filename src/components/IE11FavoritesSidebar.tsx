import React, { useState } from 'react';
import { Bookmark, HistoryEntry } from '../types';
import {
  Star,
  Rss,
  Clock,
  Pin,
  X,
  Folder,
  Globe,
  Trash2,
  Search,
  ChevronDown,
} from 'lucide-react';
import { UltramarineLogo } from './UltramarineLogo';

interface IE11FavoritesSidebarProps {
  isOpen: boolean;
  isPinned: boolean;
  bookmarks: Bookmark[];
  history: HistoryEntry[];
  onClose: () => void;
  onTogglePin: () => void;
  onNavigate: (url: string) => void;
  onAddCurrentToFavorites: () => void;
  onClearHistory: () => void;
}

export const IE11FavoritesSidebar: React.FC<IE11FavoritesSidebarProps> = ({
  isOpen,
  isPinned,
  bookmarks,
  history,
  onClose,
  onTogglePin,
  onNavigate,
  onAddCurrentToFavorites,
  onClearHistory,
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'feeds' | 'history'>('favorites');
  const [historyFilter, setHistoryFilter] = useState('');
  const [historyGrouping, setHistoryGrouping] = useState<'date' | 'site' | 'visited'>('date');

  if (!isOpen) return null;

  const filteredHistory = history.filter(
    (h) =>
      h.title.toLowerCase().includes(historyFilter.toLowerCase()) ||
      h.url.toLowerCase().includes(historyFilter.toLowerCase())
  );

  return (
    <div
      className={`bg-[#FFFFFF] border-l border-[#C8C8C8] shadow-lg flex flex-col z-40 select-none font-['Segoe_UI',_Tahoma,_sans-serif] ${
        isPinned ? 'relative w-80 shrink-0 h-full' : 'absolute top-0 right-0 bottom-0 w-80'
      }`}
    >
      {/* Top Header: Tab Icons and Pin / Close Controls */}
      <div className="bg-[#F5F6F7] border-b border-[#D8D8D8] px-2 pt-2 flex items-center justify-between">
        {/* The 3 iconic tabs: Favorites (Star), Feeds (RSS), History (Clock) */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] border-t border-l border-r rounded-t-[3px] transition-colors ${
              activeTab === 'favorites'
                ? 'bg-white border-[#C8C8C8] text-[#0072C6] font-semibold -mb-[1px]'
                : 'bg-[#EDEDED] border-transparent text-[#555555] hover:bg-[#E5E5E5]'
            }`}
            title="Favorites"
          >
            <Star size={13} className="fill-[#FFF3D0] text-[#E0A000]" />
            <span>Favorites</span>
          </button>

          <button
            onClick={() => setActiveTab('feeds')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] border-t border-l border-r rounded-t-[3px] transition-colors ${
              activeTab === 'feeds'
                ? 'bg-white border-[#C8C8C8] text-[#0072C6] font-semibold -mb-[1px]'
                : 'bg-[#EDEDED] border-transparent text-[#555555] hover:bg-[#E5E5E5]'
            }`}
            title="Feeds"
          >
            <Rss size={13} className="text-[#FF8C00]" />
            <span>Feeds</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] border-t border-l border-r rounded-t-[3px] transition-colors ${
              activeTab === 'history'
                ? 'bg-white border-[#C8C8C8] text-[#0072C6] font-semibold -mb-[1px]'
                : 'bg-[#EDEDED] border-transparent text-[#555555] hover:bg-[#E5E5E5]'
            }`}
            title="History"
          >
            <Clock size={13} className="text-[#0072C6]" />
            <span>History</span>
          </button>
        </div>

        {/* Pin and Close */}
        <div className="flex items-center gap-1 mb-1">
          <button
            onClick={onTogglePin}
            className={`p-1 rounded-[2px] hover:bg-[#E5E5E5] transition-colors ${
              isPinned ? 'text-[#0072C6] bg-[#E5F1FB]' : 'text-[#666666]'
            }`}
            title={isPinned ? 'Unpin the Favorites Center' : 'Pin the Favorites Center'}
          >
            <Pin size={13} className={isPinned ? 'rotate-45' : ''} />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-[2px] hover:bg-[#E81123] hover:text-white transition-colors text-[#666666]"
            title="Close (Esc)"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3 text-[12px]">
        {/* FAVORITES TAB */}
        {activeTab === 'favorites' && (
          <div className="flex flex-col gap-3">
            {/* Add to favorites button */}
            <div className="flex gap-2">
              <button
                onClick={onAddCurrentToFavorites}
                className="flex-1 py-1.5 px-3 bg-[#FBFBFB] hover:bg-[#E5F1FB] border border-[#CCCCCC] hover:border-[#70C0E7] text-[#0072C6] text-center font-medium rounded-[2px] flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Star size={12} className="fill-[#FFF3D0] text-[#E0A000]" />
                <span>Add to favorites</span>
              </button>
            </div>

            {/* Folder: Favorites Bar */}
            <div>
              <div className="flex items-center gap-1.5 py-1 px-1 font-semibold text-[#333333] border-b border-[#EAEAEA]">
                <Folder size={13} className="text-[#F1C40F] fill-[#F9E79F]" />
                <span>Favorites Bar</span>
              </div>
              <div className="flex flex-col pl-4 mt-1 divide-y divide-[#F7F7F7]">
                {bookmarks.map((bm) => (
                  <button
                    key={bm.id}
                    onClick={() => onNavigate(bm.url)}
                    className="flex items-center gap-2 py-1.5 px-1 hover:bg-[#E5F1FB] text-left text-[#222222] group rounded-[2px]"
                  >
                    {bm.url.startsWith('chrome://') || bm.url.startsWith('about:') ? (
                      <UltramarineLogo size={13} />
                    ) : (
                      <Globe size={13} className="text-[#0072C6] shrink-0" />
                    )}
                    <span className="truncate group-hover:text-[#0072C6]">{bm.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FEEDS TAB */}
        {activeTab === 'feeds' && (
          <div className="flex flex-col gap-2">
            <div className="text-[#666666] text-[11px] bg-[#F7F7F7] p-2 rounded border border-[#EBEBEB]">
              You haven't subscribed to any Web Slices or RSS feeds yet.
            </div>
            <div className="mt-2 text-[#444444] text-[12px] font-semibold">Suggested Feeds</div>
            <button
              onClick={() => onNavigate('https://news.ycombinator.com')}
              className="flex items-center gap-2 p-1.5 hover:bg-[#E5F1FB] text-left rounded"
            >
              <Rss size={13} className="text-[#FF8C00]" />
              <div>
                <div className="font-medium text-[#222222]">Hacker News Front Page</div>
                <div className="text-[10px] text-[#777]">Tech & developer insights</div>
              </div>
            </button>
            <button
              onClick={() => onNavigate('https://www.msn.com')}
              className="flex items-center gap-2 p-1.5 hover:bg-[#E5F1FB] text-left rounded"
            >
              <Rss size={13} className="text-[#FF8C00]" />
              <div>
                <div className="font-medium text-[#222222]">MSN Top Headlines</div>
                <div className="text-[10px] text-[#777]">World news and market updates</div>
              </div>
            </button>
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="flex flex-col gap-2">
            {/* View by filter dropdown */}
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-2">
              <div className="flex items-center gap-1 text-[11px] text-[#555555]">
                <span>View by:</span>
                <select
                  value={historyGrouping}
                  onChange={(e) => setHistoryGrouping(e.target.value as any)}
                  className="bg-transparent border border-[#CCCCCC] rounded-[2px] px-1 py-0.5 text-[11px]"
                >
                  <option value="date">Date</option>
                  <option value="site">Site</option>
                  <option value="visited">Most Visited</option>
                </select>
              </div>

              <button
                onClick={onClearHistory}
                className="text-[11px] text-[#D83B01] hover:underline flex items-center gap-1"
                title="Clear browsing history"
              >
                <Trash2 size={11} />
                <span>Clear</span>
              </button>
            </div>

            {/* Search History */}
            <div className="flex items-center bg-[#FAFAFA] border border-[#CCCCCC] px-2 py-1 rounded-[2px]">
              <Search size={12} className="text-[#888888] mr-1.5" />
              <input
                type="text"
                value={historyFilter}
                onChange={(e) => setHistoryFilter(e.target.value)}
                placeholder="Search History"
                className="w-full bg-transparent outline-none text-[11.5px]"
              />
            </div>

            {/* History Items List */}
            <div className="flex flex-col divide-y divide-[#F0F0F0] mt-1">
              <div className="py-1 text-[11px] font-semibold text-[#666666]">Today</div>
              {filteredHistory.length === 0 ? (
                <div className="py-4 text-center text-[#888888] text-[11px]">No history entries found.</div>
              ) : (
                filteredHistory.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.url)}
                    className="flex items-center gap-2 py-1.5 px-1 hover:bg-[#E5F1FB] text-left text-[#333333] group rounded-[2px]"
                  >
                    {item.url.startsWith('chrome://') || item.url.startsWith('about:') ? (
                      <UltramarineLogo size={12} />
                    ) : (
                      <Globe size={12} className="text-[#0072C6] shrink-0" />
                    )}
                    <div className="truncate flex-1">
                      <div className="truncate group-hover:text-[#0072C6] font-normal">{item.title}</div>
                      <div className="truncate text-[10px] text-[#888888]">{item.url}</div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
