import React, { useState } from 'react';
import { Search, Mic, Camera, Grid, Sparkles, ExternalLink, Image as ImageIcon, Video, Newspaper } from 'lucide-react';

interface GoogleSearchAppProps {
  initialQuery?: string;
  onNavigate: (url: string) => void;
}

export const GoogleSearchApp: React.FC<GoogleSearchAppProps> = ({ initialQuery = '', onNavigate }) => {
  const [query, setQuery] = useState(initialQuery);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'videos' | 'news'>('all');

  const handleSearch = (e?: React.FormEvent, customQ?: string) => {
    if (e) e.preventDefault();
    const q = (customQ !== undefined ? customQ : query).trim();
    if (!q) return;
    setHasSearched(true);
  };

  const sampleResults = [
    {
      title: 'YouTube: Home',
      url: 'https://www.youtube.com',
      displayUrl: 'https://www.youtube.com',
      snippet: 'Share your videos with friends, family, and the world. Stream trending music, tech discussions, and lofi beats.',
    },
    {
      title: 'Wikipedia - The Free Encyclopedia',
      url: 'https://en.wikipedia.org',
      displayUrl: 'https://en.wikipedia.org',
      snippet: 'Free encyclopedia that anyone can edit. Contains millions of articles in hundreds of languages across science, history, and culture.',
    },
    {
      title: 'Reddit - Dive into anything',
      url: 'https://www.reddit.com',
      displayUrl: 'https://www.reddit.com',
      snippet: 'Reddit is a network of communities where people can dive into their interests, hobbies, gaming news, and technical questions.',
    },
    {
      title: 'GitHub: Let’s build from here',
      url: 'https://github.com',
      displayUrl: 'https://github.com',
      snippet: 'Over 100 million developers collaborate on GitHub to host and review code, manage projects, and build software together.',
    },
    {
      title: 'TikTok - Trends Start Here',
      url: 'https://www.tiktok.com',
      displayUrl: 'https://www.tiktok.com',
      snippet: 'Watch endless short videos customized specifically for you. A personalized video feed based on what you watch and share.',
    },
  ];

  return (
    <div className="w-full h-full bg-white font-['Roboto',_Arial,_sans-serif] flex flex-col overflow-y-auto select-text text-[#202124]">
      {/* Top Header */}
      <header className="px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 text-[13px] text-[#5F6368]">
          <span className="cursor-pointer hover:underline" onClick={() => onNavigate('about:tabs')}>About</span>
          <span className="cursor-pointer hover:underline" onClick={() => onNavigate('https://www.bing.com')}>Bing</span>
        </div>

        <div className="flex items-center gap-4 text-[13px] text-[#5F6368]">
          <span className="cursor-pointer hover:underline hidden sm:inline" onClick={() => onNavigate('https://www.youtube.com')}>
            YouTube
          </span>
          <span className="cursor-pointer hover:underline hidden sm:inline" onClick={() => onNavigate('https://en.wikipedia.org')}>
            Wikipedia
          </span>
          <button className="p-2 hover:bg-[#F1F3F4] rounded-full">
            <Grid size={16} />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#1A73E8] text-white flex items-center justify-center font-medium text-[13px]">
            N
          </div>
        </div>
      </header>

      {/* Main Google View */}
      {!hasSearched ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-10">
          {/* Authentic Google Multi-Color Logo */}
          <div className="flex items-center text-[74px] font-medium tracking-tight mb-7 select-none">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-xl flex items-center border border-[#DFE1E5] hover:shadow-md focus-within:shadow-md rounded-full px-4 py-2.5 transition-shadow"
          >
            <Search size={18} className="text-[#9AA0A6] mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Google or type a URL"
              className="w-full bg-transparent outline-none text-[15px] text-[#202124]"
              autoFocus
            />
            <div className="flex items-center gap-3 text-[#5F6368] shrink-0 ml-2">
              <Mic size={18} className="cursor-pointer hover:text-[#1A73E8]" />
              <Camera size={18} className="cursor-pointer hover:text-[#1A73E8]" />
            </div>
          </form>

          {/* Search Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => handleSearch()}
              className="px-4 py-2 bg-[#F8F9FA] hover:bg-[#F1F3F4] border border-[#F8F9FA] hover:border-[#DADCE0] text-[14px] text-[#3C4043] rounded-sm transition-colors"
            >
              Google Search
            </button>
            <button
              onClick={() => onNavigate('https://www.youtube.com')}
              className="px-4 py-2 bg-[#F8F9FA] hover:bg-[#F1F3F4] border border-[#F8F9FA] hover:border-[#DADCE0] text-[14px] text-[#3C4043] rounded-sm transition-colors"
            >
              I'm Feeling Lucky
            </button>
          </div>

          {/* Quick Apps bar */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-md">
            <button
              onClick={() => onNavigate('https://www.youtube.com')}
              className="px-3 py-1.5 bg-[#F1F3F4] hover:bg-[#E8EAED] text-[12px] text-[#3C4043] rounded-full transition-colors font-medium"
            >
              Open YouTube
            </button>
            <button
              onClick={() => onNavigate('https://www.reddit.com')}
              className="px-3 py-1.5 bg-[#F1F3F4] hover:bg-[#E8EAED] text-[12px] text-[#3C4043] rounded-full transition-colors font-medium"
            >
              Open Reddit
            </button>
            <button
              onClick={() => onNavigate('app:calculator')}
              className="px-3 py-1.5 bg-[#F1F3F4] hover:bg-[#E8EAED] text-[12px] text-[#3C4043] rounded-full transition-colors font-medium"
            >
              Open Calculator
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="flex-1 flex flex-col">
          <div className="border-b border-[#EBEBEB] px-6 py-3 flex items-center gap-6">
            <div
              onClick={() => {
                setHasSearched(false);
                setQuery('');
              }}
              className="flex items-center text-[24px] font-medium tracking-tight cursor-pointer select-none"
            >
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </div>

            <form onSubmit={handleSearch} className="flex-1 max-w-2xl flex items-center border border-[#DFE1E5] rounded-full px-4 py-1.5 shadow-xs">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-[14px]"
              />
              <button type="submit" className="text-[#4285F4] p-1">
                <Search size={16} />
              </button>
            </form>
          </div>

          <div className="max-w-4xl px-8 py-6 flex flex-col gap-6">
            <div className="text-[13px] text-[#70757A]">
              About 1,840,000,000 results (0.34 seconds) - In-App Engine Active
            </div>

            {sampleResults.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-[12px] text-[#202124] truncate">{item.displayUrl}</span>
                <h3
                  onClick={() => onNavigate(item.url)}
                  className="text-[19px] text-[#1A0DAB] hover:underline cursor-pointer font-normal"
                >
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#4D5156] leading-relaxed">{item.snippet}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
