import React, { useState } from 'react';
import { Search, CloudSun, TrendingUp, Newspaper, ChevronRight } from 'lucide-react';

interface MsnPortalPageProps {
  onNavigate: (url: string) => void;
}

export const MsnPortalPage: React.FC<MsnPortalPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) onNavigate(search.trim());
  };

  const newsItems = [
    {
      id: 1,
      category: 'TECHNOLOGY',
      title: 'Next-Gen Chromium Browser Shell Brings Classic Windows Aesthetic to Modern Web',
      source: 'TechNet World',
      time: '18m ago',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      category: 'WORLD',
      title: 'Global High-Speed Rail Infrastructure Reaches New Sustainability Milestone',
      source: 'Reuters',
      time: '1h ago',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 3,
      category: 'SCIENCE',
      title: 'Deep Space Observatory Captures High-Resolution Star Clusters in Deep Field',
      source: 'Space Science Journal',
      time: '2h ago',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 4,
      category: 'FINANCE',
      title: 'Tech Stocks Surge as Clean Energy Innovations Drive Global Market Optimism',
      source: 'MarketWatch',
      time: '3h ago',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <div className="w-full h-full bg-[#F3F4F6] overflow-y-auto font-['Segoe_UI',_Tahoma,_sans-serif] text-[#222222] select-text">
      {/* Top Portal Banner */}
      <header className="bg-[#0072C6] text-white px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[26px] font-light tracking-wide">msn</span>
            <div className="hidden sm:flex items-center gap-4 text-[13px]">
              <span className="font-semibold underline cursor-pointer">News</span>
              <span className="hover:underline cursor-pointer">Entertainment</span>
              <span className="hover:underline cursor-pointer">Sports</span>
              <span className="hover:underline cursor-pointer">Money</span>
              <span className="hover:underline cursor-pointer">Lifestyle</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[12px]">
            <div className="flex items-center gap-1">
              <CloudSun size={16} />
              <span>72°F Sunny</span>
            </div>
          </div>
        </div>
      </header>

      {/* Bing Search Bar on MSN */}
      <div className="bg-[#FFFFFF] border-b border-[#D8D8D8] py-4 px-6 shadow-xs">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex items-center border-2 border-[#0072C6] rounded-[2px] overflow-hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Bing..."
              className="w-full px-4 py-2 text-[14px] outline-none"
            />
            <button type="submit" className="bg-[#0072C6] text-white px-5 py-2 hover:bg-[#005A9E] transition-colors">
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Financial Market Ticker */}
      <div className="bg-[#EAEAEA] border-b border-[#D5D5D5] px-6 py-1.5 text-[11.5px]">
        <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto gap-6 text-[#333333]">
          <div className="flex items-center gap-1 font-semibold text-[#0072C6]">
            <TrendingUp size={13} />
            <span>MARKETS TODAY:</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">DOW</span>
            <span className="text-[#107C41] font-semibold">39,127.14 (+0.54%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">S&P 500</span>
            <span className="text-[#107C41] font-semibold">5,477.90 (+0.41%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">NASDAQ</span>
            <span className="text-[#107C41] font-semibold">17,732.60 (+0.63%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">CRUDE OIL</span>
            <span className="text-[#107C41] font-semibold">$81.63 (+0.25%)</span>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-[#D0D0D0] pb-2">
          <Newspaper size={18} className="text-[#0072C6]" />
          <h2 className="text-[18px] font-semibold text-[#111111]">Top Headlines</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {newsItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('https://en.wikipedia.org')}
              className="bg-white border border-[#DCDCDC] hover:border-[#0072C6] hover:shadow-lg transition-all rounded-[3px] overflow-hidden cursor-pointer flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-36 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10.5px] font-bold text-[#0072C6] uppercase tracking-wider mb-1">
                    {item.category}
                  </div>
                  <h3 className="font-semibold text-[13.5px] text-[#222222] leading-snug hover:text-[#0072C6]">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#777777] mt-3 pt-2 border-t border-[#F0F0F0]">
                  <span>{item.source}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
