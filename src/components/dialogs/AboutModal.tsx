import React, { useState } from 'react';
import { IE11Logo } from '../IE11Logo';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [autoUpdate, setAutoUpdate] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 select-none font-['Segoe_UI',_Tahoma,_sans-serif]">
      <div className="w-[500px] bg-[#FFFFFF] border border-[#707070] shadow-2xl rounded-[2px] overflow-hidden text-[12px] text-[#222222]">
        {/* Title bar */}
        <div className="bg-[#FFFFFF] border-b border-[#E5E5E5] h-7 px-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-normal text-[12px] text-[#333333]">
            <IE11Logo size={15} />
            <span>About Neo-Internet Explorer 11</span>
          </div>
          <button
            onClick={onClose}
            className="h-full px-3 -mr-3 hover:bg-[#E81123] hover:text-white transition-colors text-[#333333] flex items-center justify-center"
            title="Close"
          >
            <X size={13} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-start gap-6">
            {/* Authentic IE11 Logo */}
            <div className="shrink-0 flex flex-col items-center pt-1">
              <IE11Logo size={80} />
            </div>

            {/* Version Information */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-[26px] font-light text-[#0072C6] tracking-tight leading-none mb-1">
                Neo-Internet Explorer 11
              </div>

              <div className="flex flex-col gap-1 text-[12px] text-[#333333]">
                <div>
                  <span className="font-semibold text-[#111111]">Version:</span> 11.0.9600.19825
                </div>
                <div>
                  <span className="font-semibold text-[#111111]">Update Versions:</span> 11.0.220 (KB5034123)
                </div>
                <div>
                  <span className="font-semibold text-[#111111]">Product ID:</span> 00150-01923-00003-AA772
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 mt-3 cursor-pointer text-[#333333]">
                <input
                  type="checkbox"
                  checked={autoUpdate}
                  onChange={(e) => setAutoUpdate(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#0072C6]"
                />
                <span>Install new versions automatically</span>
              </label>

              {/* Copyright notice */}
              <div className="mt-4 pt-3 border-t border-[#E5E5E5] text-[11px] text-[#666666] leading-relaxed">
                © 2013 Microsoft Corporation. All rights reserved.
                <br />
                Certain portions utilize Microsoft Windows and Internet Explorer technologies.
              </div>
            </div>
          </div>

          {/* Bottom Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-7 py-1 bg-[#E1E1E1] hover:bg-[#E5F1FB] hover:border-[#0078D7] border border-[#ADADAD] text-[#111111] rounded-[2px] transition-all font-normal shadow-xs active:bg-[#CCE4F7]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
