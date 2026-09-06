import React, { useState, useRef, useEffect } from 'react';
import { Globe, Shield, Ban, ChevronDown, Check } from 'lucide-react';
import { BrowserSettings } from '../types';

interface IE11StatusBarProps {
  statusText?: string;
  hoverUrl?: string;
  zoom: number;
  settings: BrowserSettings;
  onChangeZoom: (newZoom: number) => void;
  onOpenInternetOptions: () => void;
}

export const IE11StatusBar: React.FC<IE11StatusBarProps> = ({
  statusText = 'Done',
  hoverUrl,
  zoom,
  settings,
  onChangeZoom,
  onOpenInternetOptions,
}) => {
  const [showZoomMenu, setShowZoomMenu] = useState(false);
  const zoomMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (zoomMenuRef.current && !zoomMenuRef.current.contains(e.target as Node)) {
        setShowZoomMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const zoomLevels = [400, 200, 150, 125, 100, 75, 50];

  return (
    <div className="bg-[#F0F0F0] border-t border-[#D9D9D9] h-6 px-2 flex items-center justify-between text-[11px] font-['Segoe_UI',_Tahoma,_sans-serif] text-[#333333] select-none shrink-0 relative z-30">
      {/* Left: Link hover or status */}
      <div className="truncate flex-1 mr-4 text-[#444444]">
        {hoverUrl ? (
          <span className="text-[#0072C6] font-normal">{hoverUrl}</span>
        ) : (
          <span>{statusText}</span>
        )}
      </div>

      {/* Right: Security Zone, Tracking Protection, and Zoom Controller */}
      <div className="flex items-center divide-x divide-[#D0D0D0] shrink-0 h-full">
        {/* Tracking Protection */}
        <div
          className="flex items-center gap-1 px-2 hover:bg-[#E5E5E5] cursor-pointer h-full"
          title="Tracking Protection: Enabled (Filtering 3rd party trackers)"
        >
          <Ban size={11} className="text-[#0072C6]" />
        </div>

        {/* SmartScreen / InPrivate */}
        {settings.enableSmartScreen && (
          <div
            className="flex items-center gap-1 px-2 hover:bg-[#E5E5E5] cursor-pointer h-full"
            title="Windows Defender SmartScreen Filter: Online & Active"
          >
            <Shield size={11} className="text-[#107C41]" />
          </div>
        )}

        {/* Security Zone: Internet | Protected Mode: On */}
        <button
          onClick={onOpenInternetOptions}
          className="flex items-center gap-1.5 px-2 hover:bg-[#E5E5E5] transition-colors h-full text-left"
          title="Security zone: Internet | Protected Mode: On (Click to configure)"
        >
          <Globe size={12} className="text-[#0072C6]" />
          <span className="truncate">
            Internet | Protected Mode: {settings.enableProtectedMode ? 'On' : 'Off'}
          </span>
        </button>

        {/* Zoom Control */}
        <div ref={zoomMenuRef} className="relative h-full flex items-center">
          <button
            onClick={() => setShowZoomMenu(!showZoomMenu)}
            className="flex items-center gap-1 px-2 hover:bg-[#E5E5E5] transition-colors h-full"
            title="Change zoom level"
          >
            <span>{zoom}%</span>
            <ChevronDown size={10} className="text-[#666666]" />
          </button>

          {showZoomMenu && (
            <div className="absolute right-0 bottom-full mb-1 w-32 bg-[#F0F0F0] border border-[#979797] shadow-lg py-1 z-50 text-[12px] font-['Segoe_UI',_Tahoma,_sans-serif] rounded-[2px]">
              <div className="px-3 py-1 text-[10px] text-[#666] font-semibold uppercase">Zoom Level</div>
              {zoomLevels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    onChangeZoom(lvl);
                    setShowZoomMenu(false);
                  }}
                  className="w-full px-3 py-1 flex items-center justify-between hover:bg-[#90C8F6] text-left"
                >
                  <span>{lvl}%</span>
                  {zoom === lvl && <Check size={12} className="text-[#0072C6]" />}
                </button>
              ))}
              <div className="my-1 border-t border-[#D9D9D9]" />
              <button
                onClick={() => {
                  onChangeZoom(100);
                  setShowZoomMenu(false);
                }}
                className="w-full px-3 py-1 text-left hover:bg-[#90C8F6]"
              >
                Reset to 100%
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
