import React, { useState } from 'react';
import { ChevronUp, ChevronDown, X } from 'lucide-react';

interface IE11FindBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IE11FindBar: React.FC<IE11FindBarProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [matchCount, setMatchCount] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-6 bg-[#FFFFFF] border border-[#7A7A7A] shadow-md px-3 py-1.5 flex items-center gap-2 z-50 text-[12px] font-['Segoe_UI',_Tahoma,_sans-serif] rounded-[2px]">
      <span className="text-[#333333] font-medium">Find:</span>
      <input
        type="text"
        autoFocus
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setMatchCount(e.target.value ? 4 : 0);
        }}
        placeholder="Type to search..."
        className="border border-[#ABABAB] px-2 py-0.5 outline-none text-[#222222] focus:border-[#0078D7] w-48 text-[12px]"
      />

      {searchTerm && (
        <span className="text-[11px] text-[#666666]">
          {matchCount > 0 ? `1 of ${matchCount} matches` : '0 matches'}
        </span>
      )}

      <div className="flex items-center border-l border-[#D9D9D9] pl-1.5 gap-0.5">
        <button
          className="p-1 hover:bg-[#E5F1FB] text-[#444444] rounded"
          title="Previous match (Shift+Enter)"
        >
          <ChevronUp size={14} />
        </button>
        <button
          className="p-1 hover:bg-[#E5F1FB] text-[#444444] rounded"
          title="Next match (Enter)"
        >
          <ChevronDown size={14} />
        </button>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[#E81123] hover:text-white text-[#444444] rounded transition-colors ml-1"
          title="Close find bar (Esc)"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
