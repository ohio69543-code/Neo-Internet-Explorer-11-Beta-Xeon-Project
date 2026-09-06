import React from 'react';
import { UltramarineLogo } from '../UltramarineLogo';

export const ChromeVersionPage: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#FFFFFF] overflow-y-auto p-8 font-['Segoe_UI',_Tahoma,_sans-serif] text-[#222222] select-text">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 border-b border-[#DCDCDC] pb-4 mb-6">
          <UltramarineLogo size={36} />
          <div>
            <h1 className="text-[22px] font-normal text-[#1A1A1A]">About Version</h1>
            <p className="text-[12px] text-[#666666]">Ultramarine Explorer / Chromium Architecture</p>
          </div>
        </div>

        <div className="bg-[#F8F9FA] border border-[#E5E5E5] rounded-[3px] p-5 font-mono text-[12px] flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2 border-b border-[#EAEAEA] pb-2">
            <span className="font-sans font-semibold text-[#555555]">Ultramarine Explorer</span>
            <span className="col-span-2 text-[#0072C6] font-bold">11.0.19045.3803 (Official Build) (64-bit)</span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-[#EAEAEA] pb-2">
            <span className="font-sans font-semibold text-[#555555]">Chromium Core</span>
            <span className="col-span-2 text-[#333333]">132.0.6834.83 (Blink / V8)</span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-[#EAEAEA] pb-2">
            <span className="font-sans font-semibold text-[#555555]">Revision</span>
            <span className="col-span-2 text-[#666666] break-all">d9070dbdae833f446059c445a556adbc1814e5b9-refs/branch-heads/6834</span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-[#EAEAEA] pb-2">
            <span className="font-sans font-semibold text-[#555555]">Operating System</span>
            <span className="col-span-2 text-[#333333]">Windows 10 Version 22H2 (Build 19045.3803)</span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-[#EAEAEA] pb-2">
            <span className="font-sans font-semibold text-[#555555]">JavaScript Engine</span>
            <span className="col-span-2 text-[#333333]">V8 13.2.152</span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-[#EAEAEA] pb-2">
            <span className="font-sans font-semibold text-[#555555]">User Agent</span>
            <span className="col-span-2 text-[#333333] break-all text-[11px]">
              Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0; like Gecko) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Ultramarine/11.0
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-[#EAEAEA] pb-2">
            <span className="font-sans font-semibold text-[#555555]">Command Line</span>
            <span className="col-span-2 text-[#444444] break-all text-[11px]">
              "C:\Program Files\Ultramarine\Explorer\iexplore.exe" --flag-switches-begin --enable-gpu-rasterization --enable-subpixel-smooth-scrolling --trident-emulation-layer --flag-switches-end
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <span className="font-sans font-semibold text-[#555555]">Executable Path</span>
            <span className="col-span-2 text-[#444444]">C:\Program Files\Ultramarine\Explorer\iexplore.exe</span>
          </div>
        </div>
      </div>
    </div>
  );
};
