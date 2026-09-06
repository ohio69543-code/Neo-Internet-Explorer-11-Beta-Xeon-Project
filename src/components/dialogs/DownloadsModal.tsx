import React from 'react';
import { DownloadItem } from '../../types';
import { X, FileText, CheckCircle2, Download, Trash2 } from 'lucide-react';
import { UltramarineLogo } from '../UltramarineLogo';

interface DownloadsModalProps {
  isOpen: boolean;
  downloads: DownloadItem[];
  onClose: () => void;
  onClearDownloads: () => void;
}

export const DownloadsModal: React.FC<DownloadsModalProps> = ({
  isOpen,
  downloads,
  onClose,
  onClearDownloads,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 select-none font-['Segoe_UI',_Tahoma,_sans-serif]">
      <div className="w-[580px] bg-[#FFFFFF] border border-[#707070] shadow-2xl rounded-[2px] overflow-hidden text-[12px] text-[#222222]">
        {/* Title bar */}
        <div className="bg-[#FFFFFF] border-b border-[#E5E5E5] h-7 px-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-normal text-[12px] text-[#333333]">
            <UltramarineLogo size={14} />
            <span>View Downloads - Ultramarine Explorer</span>
          </div>
          <button
            onClick={onClose}
            className="h-full px-3 -mr-3 hover:bg-[#E81123] hover:text-white transition-colors text-[#333333] flex items-center justify-center"
          >
            <X size={13} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-[#F8F9FA] px-4 py-2 border-b border-[#E5E5E5] flex justify-between items-center text-[11.5px]">
          <span className="text-[#555555]">
            Downloaded files ({downloads.length})
          </span>
          <button
            onClick={onClearDownloads}
            className="flex items-center gap-1 text-[#D83B01] hover:underline"
          >
            <Trash2 size={12} />
            <span>Clear list</span>
          </button>
        </div>

        {/* Downloads List */}
        <div className="p-4 max-h-80 overflow-y-auto min-h-48 flex flex-col divide-y divide-[#EAEAEA]">
          {downloads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-[#888888]">
              <Download size={32} className="text-[#CCCCCC] mb-2" />
              <div>No downloads in history.</div>
            </div>
          ) : (
            downloads.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#E5F1FB] border border-[#70C0E7] rounded flex items-center justify-center text-[#0072C6]">
                    <FileText size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0072C6] text-[12.5px]">{item.fileName}</div>
                    <div className="text-[11px] text-[#666666]">
                      {item.fileSize} - {item.sourceUrl}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[#107C41] text-[11px] font-medium">
                    <CheckCircle2 size={13} />
                    <span>Completed</span>
                  </span>
                  <button className="px-3 py-1 bg-[#E1E1E1] hover:bg-[#E5F1FB] border border-[#ADADAD] rounded-[2px] text-[11px]">
                    Open
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#F0F0F0] border-t border-[#DCDCDC] px-4 py-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-1 bg-[#E1E1E1] hover:bg-[#E5F1FB] hover:border-[#0078D7] border border-[#ADADAD] rounded-[2px] text-[11.5px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
