import React from 'react';
import { Search, User, ChevronDown, Check, ExternalLink, Play, Tv } from 'lucide-react';
import { UltramarineLogo } from '../UltramarineLogo';

interface MicrosoftIEEndPageProps {
  onNavigate: (url: string) => void;
}

export const MicrosoftIEEndPage: React.FC<MicrosoftIEEndPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full h-full bg-[#FFFFFF] overflow-y-auto font-['Segoe_UI',_Tahoma,_sans-serif] text-[#000000] select-text">
      {/* Microsoft Support Header */}
      <header className="border-b border-[#E5E5E5] px-8 py-3 flex items-center justify-between text-[13px]">
        {/* Left Brand */}
        <div className="flex items-center gap-6">
          {/* Microsoft 4-color Logo */}
          <div className="flex items-center gap-2.5">
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <div className="bg-[#F25022] w-2 h-2" />
              <div className="bg-[#7FBA00] w-2 h-2" />
              <div className="bg-[#00A4EF] w-2 h-2" />
              <div className="bg-[#FFB900] w-2 h-2" />
            </div>
            <span className="font-semibold text-[17px] tracking-tight">Microsoft</span>
            <span className="text-[#666666] mx-1">|</span>
            <span className="text-[15px] font-semibold text-[#111111]">Support</span>
          </div>

          <nav className="hidden lg:flex items-center gap-5 text-[#262626]">
            <span className="hover:underline cursor-pointer">Microsoft 365</span>
            <span className="hover:underline cursor-pointer">Office</span>
            <span className="hover:underline cursor-pointer flex items-center gap-0.5">
              Products <ChevronDown size={12} />
            </span>
            <span className="hover:underline cursor-pointer flex items-center gap-0.5">
              Devices <ChevronDown size={12} />
            </span>
            <span className="hover:underline cursor-pointer">Account & billing</span>
            <span className="hover:underline cursor-pointer flex items-center gap-0.5">
              Resources <ChevronDown size={12} />
            </span>
          </nav>
        </div>

        {/* Right Header Options */}
        <div className="flex items-center gap-4 text-[#262626]">
          <button className="border border-[#0067B8] text-[#0067B8] px-3 py-1 font-semibold rounded-[2px] hover:bg-[#F2F2F2]">
            Buy Microsoft 365
          </button>
          <span className="hidden sm:flex items-center gap-1 hover:underline cursor-pointer">
            All Microsoft <ChevronDown size={12} />
          </span>
          <span className="flex items-center gap-1 hover:underline cursor-pointer">
            Search <Search size={14} />
          </span>
          <span className="flex items-center gap-1 hover:underline cursor-pointer">
            Sign in <User size={16} />
          </span>
        </div>
      </header>

      {/* Main Support Article Body (matching screenshot) */}
      <main className="max-w-4xl mx-auto px-8 py-10">
        <div className="text-[14px] text-[#767676] mb-2 font-medium">Index</div>
        <h1 className="text-[36px] font-light text-[#000000] tracking-tight mb-6">
          This website doesn't work in Internet Explorer
        </h1>

        <p className="text-[16px] text-[#262626] mb-8 leading-relaxed">
          The website you were trying to open doesn't work in Internet Explorer, so you've been redirected to Microsoft Edge.
        </p>

        {/* The Graphic from the screenshot */}
        <div className="bg-[#0B4F8A] rounded-md p-8 flex items-center justify-center mb-10 shadow-sm">
          <div className="relative w-full max-w-lg h-52 flex items-center justify-center">
            {/* IE window behind */}
            <div className="absolute left-8 bottom-4 w-72 h-40 bg-[#E1DFDD] border border-[#A19F9D] rounded-t-lg shadow-md p-3">
              <div className="flex items-center gap-1.5 mb-2 border-b border-[#C8C6C4] pb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E81123]" />
                <span className="text-[10px] text-[#605E5C] font-mono">iexplore.exe</span>
              </div>
              <div className="flex items-center justify-center h-24">
                <div className="w-14 h-14 rounded-full bg-[#0072C6] text-white font-bold flex items-center justify-center text-[28px] italic shadow">
                  e
                </div>
              </div>
            </div>

            {/* Transition Arrow */}
            <div className="absolute z-10 text-[#50E6FF] animate-pulse">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* Edge / Chromium window in front */}
            <div className="absolute right-8 top-2 w-80 h-44 bg-[#FFFFFF] border-2 border-[#0078D7] rounded-t-lg shadow-xl p-3 z-20">
              <div className="flex items-center justify-between mb-2 border-b border-[#E1DFDD] pb-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#107C41] flex items-center justify-center text-white text-[9px] font-bold">
                    ✓
                  </div>
                  <span className="text-[11px] text-[#0078D7] font-semibold">Ultramarine (Chromium Engine)</span>
                </div>
                <span className="text-[10px] text-[#107C41] font-bold">Active & Working</span>
              </div>
              <div className="flex items-center justify-center h-28 gap-4">
                <UltramarineLogo size={44} />
                <div className="text-left">
                  <div className="font-bold text-[14px] text-[#111111]">Modern Web Enabled</div>
                  <div className="text-[11px] text-[#666666]">YouTube, TikTok, WebGL, HTML5</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Support for Internet Explorer ended */}
        <h2 className="text-[26px] font-normal text-[#1A1A1A] mb-4">
          Support for Internet Explorer ended on June 15, 2022
        </h2>

        <p className="text-[15px] text-[#333333] mb-4 leading-relaxed">
          Internet Explorer 11 has been permanently disabled through a Microsoft Edge update on certain versions of Windows 10. If any site you visit needs modern technologies, <strong className="text-[#0072C6]">Ultramarine Explorer</strong> provides the 1:1 authentic Internet Explorer 11 appearance powered by modern Chromium, enabling seamless video playback, HTML5 streaming, and modern web apps!
        </p>

        <p className="text-[15px] text-[#333333] mb-8 leading-relaxed">
          Seamlessly browse YouTube, TikTok, and modern web platforms with no restrictions.
        </p>

        {/* Action Buttons to test YouTube and TikTok immediately */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => onNavigate('https://www.youtube.com')}
            className="flex items-center gap-2 bg-[#CC0000] hover:bg-[#AA0000] text-white px-5 py-2.5 rounded-[2px] text-[14px] font-semibold transition-colors shadow-sm"
          >
            <Play size={16} fill="white" />
            <span>Open YouTube in Ultramarine</span>
          </button>

          <button
            onClick={() => onNavigate('https://www.tiktok.com')}
            className="flex items-center gap-2 bg-[#000000] hover:bg-[#222222] text-white px-5 py-2.5 rounded-[2px] text-[14px] font-semibold transition-colors border border-[#444444] shadow-sm"
          >
            <Tv size={16} />
            <span>Open TikTok in Ultramarine</span>
          </button>

          <button
            onClick={() => onNavigate('about:tabs')}
            className="bg-[#E1E1E1] hover:bg-[#D5D5D5] text-[#222222] px-4 py-2.5 rounded-[2px] text-[14px] transition-colors border border-[#ADADAD]"
          >
            Return to New Tab
          </button>
        </div>
      </main>
    </div>
  );
};
