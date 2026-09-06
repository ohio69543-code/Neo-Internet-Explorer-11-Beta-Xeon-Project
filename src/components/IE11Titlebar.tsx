import React from 'react';
import { IE11Logo } from './IE11Logo';
import { Minus, Square, Copy, X } from 'lucide-react';

interface IE11TitlebarProps {
  title: string;
  inPrivate?: boolean;
  isMaximized: boolean;
  onToggleMaximize: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

export const IE11Titlebar: React.FC<IE11TitlebarProps> = ({
  title,
  inPrivate = false,
  isMaximized,
  onToggleMaximize,
  onMinimize,
  onClose,
}) => {
  return (
    <div className="h-7 bg-[#FFFFFF] border-b border-[#DCDCDC] flex items-center justify-between select-none px-2 text-[12px] font-['Segoe_UI',_Tahoma,_sans-serif] text-[#1A1A1A]">
      {/* Left: Window Icon and App Title */}
      <div className="flex items-center gap-2 overflow-hidden">
        <IE11Logo size={16} />
        <span className="truncate font-normal text-[#333333]">
          {title ? `${title} - Neo-Internet Explorer 11` : 'Neo-Internet Explorer 11'}
        </span>
        {inPrivate && (
          <span className="bg-[#0072C6] text-white text-[10px] px-1.5 py-0.2 rounded font-semibold tracking-wide">
            InPrivate
          </span>
        )}
      </div>

      {/* Right: Window Controls */}
      <div className="flex items-center h-full -mr-2">
        <button
          onClick={onMinimize}
          className="h-full w-11 flex items-center justify-center hover:bg-[#E5E5E5] transition-colors text-[#333333]"
          title="Minimize"
        >
          <Minus size={13} strokeWidth={1.5} />
        </button>
        <button
          onClick={onToggleMaximize}
          className="h-full w-11 flex items-center justify-center hover:bg-[#E5E5E5] transition-colors text-[#333333]"
          title={isMaximized ? 'Restore Down' : 'Maximize'}
        >
          {isMaximized ? (
            <Copy size={12} strokeWidth={1.5} />
          ) : (
            <Square size={11} strokeWidth={1.5} />
          )}
        </button>
        <button
          onClick={onClose}
          className="h-full w-11 flex items-center justify-center hover:bg-[#E81123] hover:text-white transition-colors text-[#333333]"
          title="Close (Alt+F4)"
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};
