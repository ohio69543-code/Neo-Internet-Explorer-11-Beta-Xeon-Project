import React, { useState } from 'react';
import { CHROMIUM_FLAGS } from '../../data/defaultData';
import { UltramarineLogo } from '../UltramarineLogo';
import { Search, AlertTriangle } from 'lucide-react';

export const ChromeFlagsPage: React.FC = () => {
  const [flags, setFlags] = useState(CHROMIUM_FLAGS);
  const [search, setSearch] = useState('');

  const toggleFlag = (id: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const filtered = flags.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-[#FFFFFF] overflow-y-auto p-8 font-['Segoe_UI',_Tahoma,_sans-serif] text-[#222222]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DCDCDC] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <UltramarineLogo size={32} />
            <div>
              <h1 className="text-[22px] font-normal text-[#1A1A1A]">Experiments</h1>
              <p className="text-[12px] text-[#666666]">chrome://flags</p>
            </div>
          </div>

          <div className="flex items-center bg-[#F1F3F4] px-3 py-1 rounded-[2px] border border-[#CCCCCC]">
            <Search size={14} className="text-[#666666] mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search experiments"
              className="bg-transparent outline-none text-[12px]"
            />
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-[#FFF4CE] border-l-4 border-[#F4B400] p-3 text-[12px] flex items-start gap-2.5 mb-6 rounded-r-[2px]">
          <AlertTriangle size={18} className="text-[#B78103] shrink-0 mt-0.5" />
          <div className="text-[#333333] leading-relaxed">
            <strong>WARNING: EXPERIMENTAL FEATURES AHEAD!</strong> By enabling these features, you could lose browser data or compromise your security or privacy. Enabled features apply to all tabs within Ultramarine Explorer.
          </div>
        </div>

        {/* Flags List */}
        <div className="flex flex-col divide-y divide-[#EAEAEA]">
          {filtered.map((flag) => (
            <div key={flag.id} className="py-3 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="font-semibold text-[13px] text-[#0072C6]">{flag.name}</div>
                <div className="text-[12px] text-[#555555] mt-1">{flag.description}</div>
                <div className="text-[11px] text-[#888888] font-mono mt-0.5">#{flag.id}</div>
              </div>

              <select
                value={flag.enabled ? 'Enabled' : 'Disabled'}
                onChange={() => toggleFlag(flag.id)}
                className={`text-[12px] border px-2 py-1 rounded-[2px] outline-none font-medium cursor-pointer ${
                  flag.enabled
                    ? 'bg-[#E5F1FB] border-[#0078D7] text-[#0072C6]'
                    : 'bg-[#F0F0F0] border-[#CCCCCC] text-[#555555]'
                }`}
              >
                <option value="Default">Default</option>
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
