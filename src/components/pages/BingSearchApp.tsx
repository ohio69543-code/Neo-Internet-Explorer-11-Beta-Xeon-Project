import React, { useState } from 'react';
import { Search, Sparkles, Image as ImageIcon, Video, Newspaper, Compass, ChevronRight, Mic, Camera, ArrowRight, ExternalLink } from 'lucide-react';

interface BingSearchAppProps {
  initialQuery?: string;
  onNavigate: (url: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  category?: string;
  badge?: string;
}

const DEFAULT_RESULTS: SearchResult[] = [
  {
    id: 'res-1',
    title: 'YouTube - Broadcast Yourself',
    url: 'https://www.youtube.com',
    displayUrl: 'https://www.youtube.com',
    snippet: 'Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.',
    category: 'Video Streaming',
    badge: 'Popular',
  },
  {
    id: 'res-2',
    title: 'TikTok - Make Your Day',
    url: 'https://www.tiktok.com',
    displayUrl: 'https://www.tiktok.com',
    snippet: 'TikTok is the destination for short-form mobile videos. Our mission is to inspire creativity and bring joy.',
    category: 'Entertainment',
    badge: 'Trending',
  },
  {
    id: 'res-3',
    title: 'Wikipedia, the free encyclopedia',
    url: 'https://en.wikipedia.org',
    displayUrl: 'https://en.wikipedia.org',
    snippet: 'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.',
    category: 'Reference',
  },
  {
    id: 'res-4',
    title: 'Reddit - The front page of the internet',
    url: 'https://www.reddit.com',
    displayUrl: 'https://www.reddit.com',
    snippet: 'Reddit is a network of communities where people can dive into their interests, hobbies and passions. There\'s a subreddit for everything.',
    category: 'Community',
  },
  {
    id: 'res-5',
    title: 'GitHub: Let\'s build from here',
    url: 'https://github.com',
    displayUrl: 'https://github.com',
    snippet: 'GitHub is where over 100 million developers shape the future of software, together. Discover, contribute, and open source modern applications.',
    category: 'Developer',
  },
  {
    id: 'res-6',
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    displayUrl: 'https://news.ycombinator.com',
    snippet: 'Hacker News is a social news website focusing on computer science and entrepreneurship, run by Y Combinator.',
    category: 'Tech News',
  },
  {
    id: 'res-7',
    title: 'Neo-Internet Explorer 11 Documentation & Features',
    url: 'about:tabs',
    displayUrl: 'about:tabs',
    snippet: 'Neo-Internet Explorer 11 features authentic IE11 chrome, high-performance tabs, and integrated in-app applications including YouTube, Bing, Reddit, and tools.',
    category: 'Browser',
    badge: 'Neo IE11',
  },
];

export const BingSearchApp: React.FC<BingSearchAppProps> = ({ initialQuery = '', onNavigate }) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'videos' | 'news' | 'copilot'>('all');
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(DEFAULT_RESULTS);

  const handleSearch = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const q = (customQuery !== undefined ? customQuery : query).trim();
    if (!q) return;

    setHasSearched(true);
    // Filter results or generate dynamic results for the query
    const filtered = DEFAULT_RESULTS.filter(
      (r) =>
        r.title.toLowerCase().includes(q.toLowerCase()) ||
        r.snippet.toLowerCase().includes(q.toLowerCase()) ||
        r.url.toLowerCase().includes(q.toLowerCase())
    );

    if (filtered.length > 0) {
      setSearchResults(filtered);
    } else {
      setSearchResults([
        {
          id: 'dyn-1',
          title: `${q} - Latest Web Results & News`,
          url: `https://${q.replace(/\s+/g, '').toLowerCase()}.com`,
          displayUrl: `https://www.${q.replace(/\s+/g, '').toLowerCase()}.com`,
          snippet: `Explore all comprehensive information, updates, and community discussions regarding ${q}. Verified through Bing Neo-Search index.`,
          category: 'Web Result',
        },
        ...DEFAULT_RESULTS,
      ]);
    }
  };

  const trendingTopics = [
    { title: 'YouTube Trending', query: 'https://www.youtube.com' },
    { title: 'TikTok Trends', query: 'https://www.tiktok.com' },
    { title: 'Reddit Popular', query: 'https://www.reddit.com' },
    { title: 'GitHub Open Source', query: 'https://github.com' },
    { title: 'Hacker News Top', query: 'https://news.ycombinator.com' },
    { title: 'Windows Calculator', query: 'app:calculator' },
    { title: 'Windows Notepad', query: 'app:notepad' },
  ];

  return (
    <div className="w-full h-full bg-[#FAF9F6] font-['Segoe_UI',_Tahoma,_sans-serif] flex flex-col overflow-y-auto select-text text-[#111111]">
      {/* Bing Top Navigation Bar */}
      <header className="bg-white border-b border-[#E5E5E5] px-4 py-2.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-6">
          {/* Authentic Bing Logo with Teal 'b' */}
          <div
            onClick={() => {
              setHasSearched(false);
              setQuery('');
            }}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
              <path d="M3 1.5L7.8 3.2V11.2L11 9.4L9.8 6.5L13.5 5.2L7.8 14.5L3 11.5V1.5Z" fill="#008373" />
            </svg>
            <span className="text-[20px] font-semibold text-[#008373] tracking-tight">Bing</span>
          </div>

          {/* Search Input in Header (when searched) */}
          {hasSearched && (
            <form onSubmit={handleSearch} className="flex-1 max-w-xl flex items-center bg-white border border-[#008373] rounded-full shadow-xs px-3 py-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Bing or type a web address..."
                className="w-full bg-transparent outline-none text-[13px] text-[#222222]"
              />
              <button type="submit" className="p-1 text-[#008373] hover:opacity-80">
                <Search size={15} strokeWidth={2.2} />
              </button>
            </form>
          )}
        </div>

        {/* Right Header Navigation */}
        <div className="flex items-center gap-4 text-[12px] text-[#555555]">
          <button onClick={() => onNavigate('https://www.msn.com')} className="hover:text-[#008373] hidden sm:inline">
            MSN
          </button>
          <button onClick={() => onNavigate('https://www.youtube.com')} className="hover:text-[#008373] hidden sm:inline">
            YouTube
          </button>
          <div className="flex items-center gap-1 text-[#008373] bg-[#E6F4F1] px-2.5 py-1 rounded-full font-medium">
            <Sparkles size={12} />
            <span>Copilot AI</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#008373] text-white flex items-center justify-center font-bold text-[11px]">
            IE
          </div>
        </div>
      </header>

      {/* Main Bing Search Hero (If not currently on search results page) */}
      {!hasSearched ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative">
          {/* Background Ambient Imagery */}
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6">
              <svg width="44" height="44" viewBox="0 0 16 16" fill="none">
                <path d="M3 1.5L7.8 3.2V11.2L11 9.4L9.8 6.5L13.5 5.2L7.8 14.5L3 11.5V1.5Z" fill="#008373" />
              </svg>
              <h1 className="text-[36px] font-semibold text-[#111111] tracking-tight">Bing</h1>
            </div>

            {/* Large Search Box */}
            <form
              onSubmit={handleSearch}
              className="w-full flex items-center bg-white border-2 border-[#008373] rounded-full shadow-md px-4 py-2.5 mb-6 transition-all hover:shadow-lg"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me anything or enter website address..."
                className="w-full bg-transparent outline-none text-[15px] text-[#222222] placeholder:text-[#888888]"
                autoFocus
              />
              <div className="flex items-center gap-2 text-[#008373] shrink-0 ml-2">
                <button type="submit" className="p-1 hover:bg-[#E6F4F1] rounded-full">
                  <Search size={18} strokeWidth={2.4} />
                </button>
              </div>
            </form>

            {/* Quick In-App shortcuts */}
            <div className="w-full mt-2">
              <div className="text-[12px] text-[#666666] mb-2 font-medium flex items-center gap-1.5">
                <Compass size={13} className="text-[#008373]" />
                <span>Trending Apps & Quick Launch:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (topic.query.startsWith('http') || topic.query.startsWith('app:')) {
                        onNavigate(topic.query);
                      } else {
                        setQuery(topic.title);
                        handleSearch(undefined, topic.title);
                      }
                    }}
                    className="px-3 py-1.5 bg-white border border-[#E0E0E0] hover:border-[#008373] hover:text-[#008373] text-[12px] rounded-full transition-colors shadow-xs"
                  >
                    {topic.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Search Results Page */
        <div className="flex-1 flex flex-col">
          {/* Sub-tabs: All, Images, Videos, News, Copilot */}
          <div className="bg-white border-b border-[#E5E5E5] px-6 flex gap-6 text-[13px] font-medium text-[#666666]">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-2 border-b-2 transition-colors ${
                activeTab === 'all' ? 'border-[#008373] text-[#008373] font-semibold' : 'border-transparent hover:text-[#222222]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`py-2 border-b-2 flex items-center gap-1 transition-colors ${
                activeTab === 'images' ? 'border-[#008373] text-[#008373] font-semibold' : 'border-transparent hover:text-[#222222]'
              }`}
            >
              <ImageIcon size={13} />
              Images
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`py-2 border-b-2 flex items-center gap-1 transition-colors ${
                activeTab === 'videos' ? 'border-[#008373] text-[#008373] font-semibold' : 'border-transparent hover:text-[#222222]'
              }`}
            >
              <Video size={13} />
              Videos
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`py-2 border-b-2 flex items-center gap-1 transition-colors ${
                activeTab === 'news' ? 'border-[#008373] text-[#008373] font-semibold' : 'border-transparent hover:text-[#222222]'
              }`}
            >
              <Newspaper size={13} />
              News
            </button>
            <button
              onClick={() => setActiveTab('copilot')}
              className={`py-2 border-b-2 flex items-center gap-1 transition-colors ${
                activeTab === 'copilot' ? 'border-[#008373] text-[#008373] font-semibold' : 'border-transparent hover:text-[#222222]'
              }`}
            >
              <Sparkles size={13} />
              Copilot AI
            </button>
          </div>

          {/* Results List */}
          <div className="flex-1 max-w-5xl px-6 py-6 flex flex-col md:flex-row gap-8">
            {/* Main Column */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Copilot Smart Summary Box */}
              <div className="bg-[#EBF7F5] border border-[#B3E3DB] rounded-xl p-4 shadow-xs">
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#008373] mb-1.5">
                  <Sparkles size={15} />
                  <span>Bing Copilot Summary</span>
                </div>
                <p className="text-[13px] text-[#222222] leading-relaxed">
                  Displaying interactive results for <strong>"{query}"</strong>. In Neo-Internet Explorer 11, popular web apps like YouTube, TikTok, Bing, Wikipedia, Reddit, and Hacker News load directly inside the browser viewport with full hardware acceleration and without external window redirects.
                </p>
              </div>

              {/* Search Results */}
              {searchResults.map((result) => (
                <div key={result.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[12px] text-[#555555]">
                    <span className="truncate">{result.displayUrl}</span>
                    {result.badge && (
                      <span className="bg-[#008373] text-white text-[10px] px-1.5 py-0.2 rounded font-semibold">
                        {result.badge}
                      </span>
                    )}
                  </div>
                  <h3
                    onClick={() => onNavigate(result.url)}
                    className="text-[18px] text-[#008373] hover:underline cursor-pointer font-medium leading-snug"
                  >
                    {result.title}
                  </h3>
                  <p className="text-[13px] text-[#444444] leading-relaxed">{result.snippet}</p>
                </div>
              ))}
            </div>

            {/* Sidebar Quick Card */}
            <div className="w-full md:w-80 shrink-0 flex flex-col gap-4">
              <div className="bg-white border border-[#E0E0E0] rounded-xl p-4 shadow-xs">
                <h4 className="font-semibold text-[15px] text-[#111111] mb-2">Explore In-App</h4>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onNavigate('https://www.youtube.com')}
                    className="w-full text-left p-2 hover:bg-[#F0F8F6] rounded-lg transition-colors flex items-center justify-between text-[13px]"
                  >
                    <span className="font-medium text-[#111111]">Watch YouTube Videos</span>
                    <ChevronRight size={14} className="text-[#888888]" />
                  </button>
                  <button
                    onClick={() => onNavigate('https://www.tiktok.com')}
                    className="w-full text-left p-2 hover:bg-[#F0F8F6] rounded-lg transition-colors flex items-center justify-between text-[13px]"
                  >
                    <span className="font-medium text-[#111111]">Scroll TikTok Shorts</span>
                    <ChevronRight size={14} className="text-[#888888]" />
                  </button>
                  <button
                    onClick={() => onNavigate('https://www.reddit.com')}
                    className="w-full text-left p-2 hover:bg-[#F0F8F6] rounded-lg transition-colors flex items-center justify-between text-[13px]"
                  >
                    <span className="font-medium text-[#111111]">Browse Reddit</span>
                    <ChevronRight size={14} className="text-[#888888]" />
                  </button>
                  <button
                    onClick={() => onNavigate('app:calculator')}
                    className="w-full text-left p-2 hover:bg-[#F0F8F6] rounded-lg transition-colors flex items-center justify-between text-[13px]"
                  >
                    <span className="font-medium text-[#111111]">Windows Calculator</span>
                    <ChevronRight size={14} className="text-[#888888]" />
                  </button>
                  <button
                    onClick={() => onNavigate('app:notepad')}
                    className="w-full text-left p-2 hover:bg-[#F0F8F6] rounded-lg transition-colors flex items-center justify-between text-[13px]"
                  >
                    <span className="font-medium text-[#111111]">Windows Notepad</span>
                    <ChevronRight size={14} className="text-[#888888]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
