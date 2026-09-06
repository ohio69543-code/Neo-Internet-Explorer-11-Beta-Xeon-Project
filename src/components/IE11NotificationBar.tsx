import React from 'react';
import { NotificationPrompt } from '../types';
import { Download, ShieldAlert, X, ChevronDown } from 'lucide-react';
import { UltramarineLogo } from './UltramarineLogo';

interface IE11NotificationBarProps {
  notification: NotificationPrompt | null;
  onDismiss: () => void;
  onOpen: () => void;
  onSave: () => void;
}

export const IE11NotificationBar: React.FC<IE11NotificationBarProps> = ({
  notification,
  onDismiss,
  onOpen,
  onSave,
}) => {
  if (!notification) return null;

  return (
    <div className="absolute bottom-6 left-0 right-0 bg-[#FDFCEB] border-t-2 border-b border-[#F4B400] px-4 py-2 flex items-center justify-between z-40 text-[12px] font-['Segoe_UI',_Tahoma,_sans-serif] text-[#222222] shadow-lg animate-in slide-in-from-bottom duration-200">
      {/* Left Icon and Message */}
      <div className="flex items-center gap-3">
        {notification.type === 'download' ? (
          <div className="w-6 h-6 bg-[#0072C6] rounded flex items-center justify-center text-white shrink-0">
            <Download size={14} />
          </div>
        ) : (
          <div className="w-6 h-6 bg-[#D83B01] rounded flex items-center justify-center text-white shrink-0">
            <ShieldAlert size={14} />
          </div>
        )}

        <div className="text-[12px]">
          <span>{notification.message}</span>{' '}
          {notification.fileName && (
            <strong className="text-[#0072C6] font-semibold">
              {notification.fileName}
            </strong>
          )}{' '}
          {notification.fileSize && (
            <span className="text-[#666666]">({notification.fileSize})</span>
          )}
          {notification.url && (
            <span className="text-[#666666]"> from {new URL(notification.url).hostname}</span>
          )}
        </div>
      </div>

      {/* Action Buttons: [ Open ] [ Save v ] [ Cancel ] [ X ] */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpen}
          className="px-4 py-1 bg-[#FFFFFF] hover:bg-[#E5F1FB] border border-[#ABABAB] hover:border-[#70C0E7] text-[#222222] rounded-[2px] transition-colors shadow-xs"
        >
          Open
        </button>

        <div className="flex items-center">
          <button
            onClick={onSave}
            className="px-4 py-1 bg-[#FFFFFF] hover:bg-[#E5F1FB] border-t border-b border-l border-[#ABABAB] hover:border-[#70C0E7] text-[#222222] rounded-l-[2px] transition-colors shadow-xs"
          >
            Save
          </button>
          <button
            onClick={onSave}
            className="px-1.5 py-1 bg-[#FFFFFF] hover:bg-[#E5F1FB] border border-[#ABABAB] hover:border-[#70C0E7] text-[#222222] rounded-r-[2px] transition-colors shadow-xs"
          >
            <ChevronDown size={12} />
          </button>
        </div>

        <button
          onClick={onDismiss}
          className="px-3 py-1 bg-[#FFFFFF] hover:bg-[#E5F1FB] border border-[#ABABAB] hover:border-[#70C0E7] text-[#222222] rounded-[2px] transition-colors shadow-xs"
        >
          Cancel
        </button>

        <button
          onClick={onDismiss}
          className="p-1 hover:bg-[#E81123] hover:text-white rounded-[2px] transition-colors text-[#666666]"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
