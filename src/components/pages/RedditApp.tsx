import React, { useState } from 'react';
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
  TrendingUp,
  Search,
  Flame,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

interface RedditAppProps {
  onNavigateUrl?: (url: string) => void;
}

interface RedditPost {
  id: string;
  subreddit: string;
  author: string;
  title: string;
  time: string;
  upvotes: number;
  commentsCount: number;
  image?: string;
  body?: string;
  userVote?: 'up' | 'down' | null;
  comments?: Array<{ id: string; author: string; text: string; time: string; upvotes: number }>;
}

const SAMPLE_POSTS: RedditPost[] = [
  {
    id: 'post-1',
    subreddit: 'r/webdev',
    author: 'u/modern_browser_dev',
    title: 'Neo-Internet Explorer 11 running modern YouTube & Chromium apps natively inside the browser!',
    time: '2 hours ago',
    upvotes: 4280,
    commentsCount: 312,
    body: 'We recreated the 1:1 authentic Internet Explorer 11 UI with tab groups, OneBox, and classic F12 tools, but integrated modern video streaming and in-app web clients. Check out the screenshots and let me know your thoughts!',
    comments: [
      { id: 'c1', author: 'u/retro_enthusiast', text: 'This looks so authentic! The golden star new tab button and menu bar are spots on.', time: '1 hour ago', upvotes: 245 },
      { id: 'c2', author: 'u/frontend_wiz', text: 'Never thought I would see YouTube 4K playback framed in the classic IE11 chrome. Super clean execution.', time: '45 mins ago', upvotes: 89 },
    ],
  },
  {
    id: 'post-2',
    subreddit: 'r/technology',
    author: 'u/tech_insider',
    title: 'New benchmarks show specialized in-app rendering reduces memory overhead by 40%',
    time: '5 hours ago',
    upvotes: 8120,
    commentsCount: 654,
    body: 'By rendering rich embedded applications like YouTube, Wikipedia, and Reddit inside the active tab sandbox, modern browsers avoid cross-origin frame thrashing and reduce DOM latency.',
    comments: [
      { id: 'c3', author: 'u/kernel_dev', text: 'Avoiding iframe sandbox nesting is a massive win for rendering pipelines.', time: '3 hours ago', upvotes: 120 },
    ],
  },
  {
    id: 'post-3',
    subreddit: 'r/gaming',
    author: 'u/retro_gamer_99',
    title: 'Anyone remember playing classic Minesweeper on Windows during computer lab in 2004?',
    time: '7 hours ago',
    upvotes: 12500,
    commentsCount: 890,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=80',
    comments: [
      { id: 'c4', author: 'u/minesweeper_pro', text: 'The smiley face turning to sunglasses when you cleared a 99-mine expert board was the ultimate flex.', time: '6 hours ago', upvotes: 340 },
    ],
  },
  {
    id: 'post-4',
    subreddit: 'r/AskReddit',
    author: 'u/curious_mind',
    title: 'What is your favorite retro UI aesthetic that you genuinely miss from early 2010s software?',
    time: '9 hours ago',
    upvotes: 19400,
    commentsCount: 2100,
    body: 'For me it was Aero Glass and the crisp Segoe UI typography of Windows 7 and IE11. The beveled gradient buttons had so much soul.',
  },
];

export const RedditApp: React.FC<RedditAppProps> = ({ onNavigateUrl }) => {
  const [posts, setPosts] = useState<RedditPost[]>(SAMPLE_POSTS);
  const [activeSubreddit, setActiveSubreddit] = useState('r/all');
  const [selectedPost, setSelectedPost] = useState<RedditPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const subreddits = ['r/all', 'r/popular', 'r/webdev', 'r/technology', 'r/gaming', 'r/AskReddit'];

  const handleVote = (id: string, dir: 'up' | 'down') => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (p.userVote === dir) {
          // undo vote
          return {
            ...p,
            userVote: null,
            upvotes: dir === 'up' ? p.upvotes - 1 : p.upvotes + 1,
          };
        }
        const delta = p.userVote ? (dir === 'up' ? 2 : -2) : dir === 'up' ? 1 : -1;
        return {
          ...p,
          userVote: dir,
          upvotes: p.upvotes + delta,
        };
      })
    );

    if (selectedPost && selectedPost.id === id) {
      setSelectedPost((sp) => (sp ? { ...sp, upvotes: sp.upvotes + (dir === 'up' ? 1 : -1) } : null));
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !selectedPost) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: 'u/Neo_IE_User',
      text: newCommentText.trim(),
      time: 'Just now',
      upvotes: 1,
    };

    setSelectedPost((sp) =>
      sp
        ? {
            ...sp,
            comments: [newComment, ...(sp.comments || [])],
            commentsCount: sp.commentsCount + 1,
          }
        : null
    );

    setPosts((prev) =>
      prev.map((p) =>
        p.id === selectedPost.id
          ? {
              ...p,
              commentsCount: p.commentsCount + 1,
              comments: [newComment, ...(p.comments || [])],
            }
          : p
      )
    );

    setNewCommentText('');
  };

  const filteredPosts = posts.filter((p) => {
    const matchSub = activeSubreddit === 'r/all' || activeSubreddit === 'r/popular' ? true : p.subreddit === activeSubreddit;
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.body?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSub && matchSearch;
  });

  return (
    <div className="w-full h-full bg-[#DAE0E6] font-['Segoe_UI',_sans-serif] flex flex-col overflow-y-auto select-text text-[#1A1A1B]">
      {/* Reddit Header */}
      <header className="bg-white border-b border-[#CCCCCC] px-4 py-2 flex items-center justify-between sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-4">
          <div
            onClick={() => {
              setSelectedPost(null);
              setActiveSubreddit('r/all');
            }}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#FF4500] text-white flex items-center justify-center font-bold text-[18px]">
              r/
            </div>
            <span className="font-bold text-[19px] tracking-tight text-[#1C1C1C]">reddit</span>
          </div>

          {/* Subreddit Filter dropdown */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-[#F6F7F8] hover:bg-[#EDEFF1] border border-[#EDEFF1] rounded-md text-[13px] font-medium cursor-pointer">
            <span>{activeSubreddit}</span>
            <ChevronDown size={14} className="text-[#878A8C]" />
          </div>
        </div>

        {/* Search Reddit */}
        <div className="flex-1 max-w-md mx-4">
          <div className="flex items-center bg-[#F6F7F8] border border-[#EDEFF1] rounded-full px-3 py-1.5 focus-within:border-[#0079D3] focus-within:bg-white">
            <Search size={15} className="text-[#878A8C] mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Reddit"
              className="w-full bg-transparent outline-none text-[13px] text-[#1C1C1C]"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 text-[13px]">
          <button
            onClick={() => onNavigateUrl?.('https://www.youtube.com')}
            className="hidden md:inline px-3 py-1 text-[#0079D3] font-semibold hover:bg-[#F6F7F8] rounded-full"
          >
            YouTube
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0079D3] text-white flex items-center justify-center font-bold text-[12px]">
            U
          </div>
        </div>
      </header>

      {/* Main Reddit Layout */}
      <div className="max-w-5xl mx-auto w-full p-4 flex gap-6">
        {/* Posts Feed Column */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Subreddit Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {subreddits.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setActiveSubreddit(sub);
                  setSelectedPost(null);
                }}
                className={`px-3 py-1 rounded-full text-[12.5px] font-semibold transition-colors shrink-0 ${
                  activeSubreddit === sub
                    ? 'bg-[#FF4500] text-white'
                    : 'bg-white text-[#555555] hover:bg-[#ECEFF1] border border-[#D5D8DC]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* If a post is selected, show detail view */}
          {selectedPost ? (
            <div className="bg-white border border-[#CCCCCC] rounded-md p-4 shadow-xs flex flex-col gap-4">
              <button
                onClick={() => setSelectedPost(null)}
                className="text-[13px] text-[#0079D3] hover:underline flex items-center gap-1 self-start font-medium"
              >
                ← Back to {activeSubreddit}
              </button>

              <div className="flex gap-3">
                {/* Upvote Column */}
                <div className="flex flex-col items-center gap-1 text-[#878A8C]">
                  <button
                    onClick={() => handleVote(selectedPost.id, 'up')}
                    className={`p-1 hover:text-[#FF4500] ${selectedPost.userVote === 'up' ? 'text-[#FF4500]' : ''}`}
                  >
                    <ArrowBigUp size={22} fill={selectedPost.userVote === 'up' ? '#FF4500' : 'none'} />
                  </button>
                  <span className="text-[12px] font-bold text-[#1A1A1B]">{selectedPost.upvotes}</span>
                  <button
                    onClick={() => handleVote(selectedPost.id, 'down')}
                    className={`p-1 hover:text-[#7193FF] ${selectedPost.userVote === 'down' ? 'text-[#7193FF]' : ''}`}
                  >
                    <ArrowBigDown size={22} fill={selectedPost.userVote === 'down' ? '#7193FF' : 'none'} />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="text-[12px] text-[#787C7E] flex items-center gap-2">
                    <span className="font-bold text-[#1C1C1C]">{selectedPost.subreddit}</span>
                    <span>•</span>
                    <span>Posted by {selectedPost.author} {selectedPost.time}</span>
                  </div>

                  <h1 className="text-[19px] font-semibold text-[#1A1A1B] leading-snug">{selectedPost.title}</h1>

                  {selectedPost.body && (
                    <p className="text-[14px] text-[#1C1C1C] leading-relaxed whitespace-pre-line mt-2">
                      {selectedPost.body}
                    </p>
                  )}

                  {selectedPost.image && (
                    <img
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      className="rounded-lg max-h-96 object-cover w-full mt-2"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Comment Form */}
                  <form onSubmit={handleAddComment} className="mt-6 border-t border-[#EDEFF1] pt-4">
                    <div className="text-[12px] text-[#787C7E] mb-2 font-medium">Comment as Neo_IE_User</div>
                    <textarea
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="What are your thoughts?"
                      className="w-full border border-[#CCCCCC] rounded-md p-2.5 text-[13px] outline-none focus:border-[#0079D3] min-h-[80px]"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!newCommentText.trim()}
                        className="px-4 py-1.5 bg-[#0079D3] text-white font-semibold rounded-full text-[12px] disabled:opacity-50 hover:bg-[#0060A8]"
                      >
                        Comment
                      </button>
                    </div>
                  </form>

                  {/* Comments list */}
                  <div className="flex flex-col gap-3 mt-4">
                    <h3 className="font-bold text-[14px] text-[#1C1C1C]">
                      {selectedPost.commentsCount} Comments
                    </h3>
                    {selectedPost.comments?.map((c) => (
                      <div key={c.id} className="border-l-2 border-[#EDEFF1] pl-3 py-1 flex flex-col gap-1">
                        <div className="text-[11px] text-[#787C7E]">
                          <strong className="text-[#1C1C1C]">{c.author}</strong> • {c.time}
                        </div>
                        <p className="text-[13px] text-[#1A1A1B]">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Post Cards Feed */
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-[#CCCCCC] hover:border-[#898989] rounded-md overflow-hidden transition-colors flex shadow-xs cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                {/* Vote Counter */}
                <div
                  className="bg-[#F8F9FA] p-2 flex flex-col items-center gap-0.5 text-[#878A8C] shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleVote(post.id, 'up')}
                    className={`p-1 hover:text-[#FF4500] ${post.userVote === 'up' ? 'text-[#FF4500]' : ''}`}
                  >
                    <ArrowBigUp size={20} fill={post.userVote === 'up' ? '#FF4500' : 'none'} />
                  </button>
                  <span className="text-[12px] font-bold text-[#1A1A1B]">{post.upvotes}</span>
                  <button
                    onClick={() => handleVote(post.id, 'down')}
                    className={`p-1 hover:text-[#7193FF] ${post.userVote === 'down' ? 'text-[#7193FF]' : ''}`}
                  >
                    <ArrowBigDown size={20} fill={post.userVote === 'down' ? '#7193FF' : 'none'} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3 flex-1 flex flex-col gap-1.5">
                  <div className="text-[11px] text-[#787C7E] flex items-center gap-1.5">
                    <span className="font-bold text-[#1C1C1C]">{post.subreddit}</span>
                    <span>•</span>
                    <span>Posted by {post.author} {post.time}</span>
                  </div>

                  <h2 className="text-[16px] font-semibold text-[#1C1C1C] leading-snug">{post.title}</h2>

                  {post.body && (
                    <p className="text-[13px] text-[#4F5154] line-clamp-2 leading-relaxed">{post.body}</p>
                  )}

                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="rounded-md max-h-72 object-cover w-full mt-1"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Actions Bar */}
                  <div className="flex items-center gap-4 text-[12px] text-[#878A8C] font-semibold mt-2">
                    <div className="flex items-center gap-1.5 hover:bg-[#F6F7F8] p-1.5 rounded-sm">
                      <MessageSquare size={15} />
                      <span>{post.commentsCount} Comments</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:bg-[#F6F7F8] p-1.5 rounded-sm">
                      <Share2 size={15} />
                      <span>Share</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:bg-[#F6F7F8] p-1.5 rounded-sm">
                      <Bookmark size={15} />
                      <span>Save</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar Info */}
        <div className="hidden lg:flex flex-col w-72 shrink-0 gap-4">
          <div className="bg-white border border-[#CCCCCC] rounded-md p-4 shadow-xs">
            <h3 className="font-bold text-[14px] text-[#1C1C1C] mb-2">About Neo-IE In-App Apps</h3>
            <p className="text-[12.5px] text-[#555555] leading-relaxed mb-3">
              Neo-Internet Explorer 11 renders web applications like Reddit, YouTube, TikTok, and Bing directly inside the tab canvas.
            </p>
            <div className="border-t border-[#EDEFF1] pt-3 flex flex-col gap-2">
              <button
                onClick={() => onNavigateUrl?.('https://www.youtube.com')}
                className="w-full py-1.5 bg-[#FF0000] text-white font-semibold text-[12px] rounded-full hover:opacity-90"
              >
                Launch YouTube App
              </button>
              <button
                onClick={() => onNavigateUrl?.('https://www.tiktok.com')}
                className="w-full py-1.5 bg-[#000000] text-white font-semibold text-[12px] rounded-full hover:opacity-90"
              >
                Launch TikTok App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
