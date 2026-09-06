import React from 'react';
import { Bookmark } from '../types';
import { Folder, Globe, ChevronRight } from 'lucide-react';
import { IE11Logo } from './IE11Logo';

interface IE11FavoritesBarProps {
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
  onOpenFolder?: (folder: string) => void;
}

export const IE11FavoritesBar: React.FC<IE11FavoritesBarProps> = ({
  bookmarks,
  onNavigate,
}) => {
  return (
    <div className="bg-[#F8F9FA] border-b border-[#E1E1E2] px-2 py-0.5 flex items-center gap-1 text-[11.5px] font-['Segoe_UI',_Tahoma,_sans-serif] text-[#333333] select-none overflow-x-auto no-scrollbar h-6">
      {/* Suggested Sites folder */}
      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-[2px] hover:bg-[#E5F1FB] hover:border-[#70C0E7] border border-transparent cursor-pointer text-[#444444] shrink-0">
        <Folder size={12} className="text-[#F1C40F] fill-[#F9E79F]" />
        <span>Suggested Sites</span>
        <ChevronRight size={10} className="text-[#888888]" />
      </div>

      <div className="w-[1px] h-3.5 bg-[#D9D9D9] mx-1 shrink-0" />

      {/* Bookmarks */}
      {bookmarks.map((bm) => (
        <button
          key={bm.id}
          onClick={() => onNavigate(bm.url)}
          className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-[2px] hover:bg-[#E5F1FB] hover:border-[#70C0E7] border border-transparent cursor-pointer text-[#222222] shrink-0 max-w-[170px]"
          title={`${bm.title}\n${bm.url}`}
        >
          {bm.url.startsWith('chrome://') || bm.url.startsWith('about:') ? (
            <IE11Logo size={12} />
          ) : (
            <Globe size={11.5} className="text-[#0072C6] shrink-0" />
          )}
          <span className="truncate">{bm.title}</span>
        </button>
      ))}
    </div>
  );
};
