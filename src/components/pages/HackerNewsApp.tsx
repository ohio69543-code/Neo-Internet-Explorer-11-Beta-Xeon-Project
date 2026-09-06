import React, { useState } from 'react';
import { ExternalLink, MessageSquare, ArrowUp, RefreshCw } from 'lucide-react';

interface HackerNewsAppProps {
  onNavigateUrl?: (url: string) => void;
}

interface HNStory {
  id: number;
  title: string;
  url: string;
  domain: string;
  points: number;
  user: string;
  timeAgo: string;
  commentsCount: number;
  upvoted?: boolean;
}

const INITIAL_STORIES: HNStory[] = [
  {
    id: 1,
    title: 'Neo-Internet Explorer 11: Bringing back the classic IE11 UI with modern Chromium power',
    url: 'about:tabs',
    domain: 'neo-ie.org',
    points: 842,
    user: 'dhh',
    timeAgo: '2 hours ago',
    commentsCount: 284,
  },
  {
    id: 2,
    title: 'SQLite in the Browser with WebAssembly and OPFS',
    url: 'https://sqlite.org',
    domain: 'sqlite.org',
    points: 412,
    user: 'drh',
    timeAgo: '4 hours ago',
    commentsCount: 97,
  },
  {
    id: 3,
    title: 'Show HN: YouTube and Video streaming running seamlessly inside retro browser shell',
    url: 'https://www.youtube.com',
    domain: 'youtube.com',
    points: 629,
    user: 'antigravity',
    timeAgo: '5 hours ago',
    commentsCount: 153,
  },
  {
    id: 4,
    title: 'Ask HN: What happened to clean desktop application design?',
    url: 'https://news.ycombinator.com',
    domain: 'ycombinator.com',
    points: 791,
    user: 'danabramov',
    timeAgo: '7 hours ago',
    commentsCount: 512,
  },
  {
    id: 5,
    title: 'The Lost Art of GUI Controls and Sub-pixel Typography',
    url: 'https://en.wikipedia.org',
    domain: 'wikipedia.org',
    points: 310,
    user: 'tptacek',
    timeAgo: '8 hours ago',
    commentsCount: 68,
  },
  {
    id: 6,
    title: 'V8 Engine Optimization Tips for Low Latency Interactive Web Apps',
    url: 'chrome://flags',
    domain: 'v8.dev',
    points: 245,
    user: 'mraleph',
    timeAgo: '10 hours ago',
    commentsCount: 42,
  },
];

export const HackerNewsApp: React.FC<HackerNewsAppProps> = ({ onNavigateUrl }) => {
  const [stories, setStories] = useState<HNStory[]>(INITIAL_STORIES);
  const [activeTab, setActiveTab] = useState('top');

  const handleUpvote = (id: number) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const upvoted = !s.upvoted;
        return {
          ...s,
          upvoted,
          points: upvoted ? s.points + 1 : s.points - 1,
        };
      })
    );
  };

  return (
    <div className="w-full h-full bg-[#F6F6EF] font-['Verdana',_Geneva,_sans-serif] flex flex-col overflow-y-auto select-text text-[#222222]">
      {/* Top Y Combinator Orange Bar */}
      <header className="bg-[#FF6600] px-3 py-1.5 flex items-center justify-between shrink-0 text-[13px]">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setActiveTab('top')}
            className="w-5 h-5 border border-white text-white font-bold flex items-center justify-center text-[12px] cursor-pointer"
          >
            Y
          </div>
          <span className="font-bold text-[#222222] mr-2">Hacker News</span>
          <div className="flex items-center gap-2 text-[12px] text-[#222222]">
            <button onClick={() => setActiveTab('new')} className="hover:underline">new</button>
            <span>|</span>
            <button onClick={() => setActiveTab('past')} className="hover:underline">past</button>
            <span>|</span>
            <button onClick={() => setActiveTab('comments')} className="hover:underline">comments</button>
            <span>|</span>
            <button onClick={() => setActiveTab('ask')} className="hover:underline">ask</button>
            <span>|</span>
            <button onClick={() => setActiveTab('show')} className="hover:underline">show</button>
            <span>|</span>
            <button onClick={() => setActiveTab('jobs')} className="hover:underline">jobs</button>
          </div>
        </div>

        <div className="text-[12px] text-[#222222]">
          <span className="cursor-pointer hover:underline" onClick={() => onNavigateUrl?.('https://www.youtube.com')}>
            YouTube
          </span>
          <span className="mx-1.5">|</span>
          <span className="cursor-pointer hover:underline" onClick={() => onNavigateUrl?.('https://www.reddit.com')}>
            Reddit
          </span>
        </div>
      </header>

      {/* Stories list */}
      <div className="p-4 max-w-4xl">
        <ol className="flex flex-col gap-2.5 list-decimal list-inside text-[13px]">
          {stories.map((story, index) => (
            <li key={story.id} className="text-[#828282]">
              <span className="text-[#222222] inline">
                <button
                  onClick={() => handleUpvote(story.id)}
                  className={`inline-block mr-1.5 p-0.5 text-[#828282] hover:text-[#FF6600] ${
                    story.upvoted ? 'text-[#FF6600]' : ''
                  }`}
                  title="upvote"
                >
                  ▲
                </button>
                <a
                  href={story.url}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateUrl) onNavigateUrl(story.url);
                  }}
                  className="text-[#000000] hover:underline font-normal cursor-pointer"
                >
                  {story.title}
                </a>
                <span className="text-[11px] text-[#828282] ml-1.5">({story.domain})</span>
              </span>

              <div className="text-[10px] text-[#828282] ml-6 mt-0.5">
                {story.points} points by {story.user} {story.timeAgo} |{' '}
                <span
                  onClick={() => onNavigateUrl?.(`https://news.ycombinator.com/item?id=${story.id}`)}
                  className="hover:underline cursor-pointer"
                >
                  {story.commentsCount} comments
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
