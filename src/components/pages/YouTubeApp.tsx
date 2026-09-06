import React, { useState, useEffect } from 'react';
import {
  Search,
  Mic,
  Video,
  Bell,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  MoreHorizontal,
  Bookmark,
  CheckCircle2,
  Play,
  Volume2,
  MessageSquare,
  Send,
  Sparkles,
} from 'lucide-react';

interface YouTubeAppProps {
  initialVideoId?: string;
  onNavigateUrl?: (url: string) => void;
}

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  views: string;
  timestamp: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string; // Direct video source or embed
  embedId: string;
  description: string;
  subscribers: string;
  likes: number;
}

export const YOUTUBE_VIDEOS: VideoItem[] = [
  {
    id: 'dQw4w9WgXcQ',
    embedId: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
    channel: 'Rick Astley',
    channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    views: '1.5B views',
    timestamp: '14 years ago',
    duration: '3:32',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    description: 'The official video for Never Gonna Give You Up by Rick Astley. Remastered in 4K resolution. Taken from the album Whenever You Need Somebody.',
    subscribers: '4.2M subscribers',
    likes: 16420000,
  },
  {
    id: 'jfKfPfyJRdk',
    embedId: 'jfKfPfyJRdk',
    title: 'lofi hip hop radio - beats to relax/study to',
    channel: 'Lofi Girl',
    channelAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    views: '84M views',
    timestamp: 'Live stream',
    duration: 'LIVE',
    thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80',
    description: 'Peaceful lofi hip hop radio beats to relax, study, code, and sleep to. Welcome to the 24/7 live music stream.',
    subscribers: '14.1M subscribers',
    likes: 7200000,
  },
  {
    id: 'kJQP7kiw5Fk',
    embedId: 'kJQP7kiw5Fk',
    title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    channel: 'Luis Fonsi',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    views: '8.4B views',
    timestamp: '7 years ago',
    duration: '4:42',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    description: 'Luis Fonsi - Despacito ft. Daddy Yankee. The worldwide Latin sensation hit with over 8 billion views.',
    subscribers: '31.8M subscribers',
    likes: 52100000,
  },
  {
    id: 'L_LUpnjgPso',
    embedId: 'L_LUpnjgPso',
    title: 'Building a Modern Web Browser from Scratch in TypeScript',
    channel: 'TechCraft',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    views: '420K views',
    timestamp: '2 weeks ago',
    duration: '28:15',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    description: 'In this deep dive, we explore how modern Chromium engines integrate with retro IE11 styling, handling tabs, OneBox, and iframe sandboxes.',
    subscribers: '890K subscribers',
    likes: 38500,
  },
  {
    id: 'fJ9rUzIMcZQ',
    embedId: 'fJ9rUzIMcZQ',
    title: 'Queen - Bohemian Rhapsody (Official Video Remastered)',
    channel: 'Queen Official',
    channelAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    views: '1.7B views',
    timestamp: '15 years ago',
    duration: '5:59',
    thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    description: 'Bohemian Rhapsody by Queen. Taken from A Night At The Opera, 1975. The greatest rock opera ballad ever recorded.',
    subscribers: '17.6M subscribers',
    likes: 12800000,
  },
  {
    id: '9bZkp7q19f0',
    embedId: '9bZkp7q19f0',
    title: 'PSY - GANGNAM STYLE(강남스타일) M/V',
    channel: 'officialpsy',
    channelAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    views: '5.1B views',
    timestamp: '11 years ago',
    duration: '4:12',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    description: 'PSY - GANGNAM STYLE (강남스타일) Official Music Video. The viral sensation that broke the YouTube view counter.',
    subscribers: '18.9M subscribers',
    likes: 27900000,
  },
];

export const YouTubeApp: React.FC<YouTubeAppProps> = ({ initialVideoId, onNavigateUrl }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(
    YOUTUBE_VIDEOS.find((v) => v.id === initialVideoId) || YOUTUBE_VIDEOS[0]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState(activeVideo?.likes || 16420000);
  const [comments, setComments] = useState<Array<{ id: number; user: string; text: string; time: string; likes: number }>>([
    {
      id: 1,
      user: 'WebExplorerFan',
      text: 'Running YouTube inside Neo-Internet Explorer 11 with full hardware acceleration is simply legendary!',
      time: '1 day ago',
      likes: 342,
    },
    {
      id: 2,
      user: 'RetroComputingTech',
      text: 'Finally a browser that looks like Internet Explorer 11 but actually plays modern 60FPS videos without crashing!',
      time: '3 hours ago',
      likes: 129,
    },
    {
      id: 3,
      user: 'Sarah_Codes',
      text: 'The audio and video sync is butter smooth. Love the IE11 titlebar on top while watching!',
      time: '35 minutes ago',
      likes: 45,
    },
  ]);
  const [newComment, setNewComment] = useState('');

  // Sync when initialVideoId changes
  useEffect(() => {
    if (initialVideoId) {
      const found = YOUTUBE_VIDEOS.find((v) => v.id === initialVideoId || v.embedId === initialVideoId);
      if (found) {
        setActiveVideo(found);
        setLikeCount(found.likes);
      } else {
        // Dynamically allow ANY YouTube video ID passed in URL!
        const customItem: VideoItem = {
          id: initialVideoId,
          embedId: initialVideoId,
          title: `YouTube Video: ${initialVideoId}`,
          channel: 'YouTube Video',
          channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          views: 'Streaming in Neo-IE11',
          timestamp: 'Live stream',
          duration: 'Playing',
          thumbnail: `https://img.youtube.com/vi/${initialVideoId}/hqdefault.jpg`,
          description: `Streaming YouTube video ${initialVideoId} inside Neo-Internet Explorer 11 with hardware acceleration.`,
          subscribers: '1.2M subscribers',
          likes: 34000,
        };
        setActiveVideo(customItem);
        setLikeCount(34000);
      }
    }
  }, [initialVideoId]);

  const handleSelectVideo = (video: VideoItem) => {
    setActiveVideo(video);
    setLikeCount(video.likes);
    setLiked(null);
    if (onNavigateUrl) {
      onNavigateUrl(`https://www.youtube.com/watch?v=${video.id}`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    // Check if user pasted a YouTube URL or direct video ID
    let extractedId: string | null = null;
    try {
      if (trimmed.includes('youtube.com/watch')) {
        const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
        extractedId = parsed.searchParams.get('v');
      } else if (trimmed.includes('youtu.be/')) {
        const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
        extractedId = parsed.pathname.slice(1);
      } else if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
        extractedId = trimmed;
      }
    } catch {}

    if (extractedId) {
      if (onNavigateUrl) {
        onNavigateUrl(`https://www.youtube.com/watch?v=${extractedId}`);
      }
      return;
    }
  };

  const handleLike = () => {
    if (liked === true) {
      setLiked(null);
      setLikeCount((c) => c - 1);
    } else {
      if (liked === false) {
        // was disliked
      }
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  };

  const handleDislike = () => {
    if (liked === false) {
      setLiked(null);
    } else {
      if (liked === true) {
        setLikeCount((c) => c - 1);
      }
      setLiked(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [
      {
        id: Date.now(),
        user: 'You (Neo-IE User)',
        text: newComment.trim(),
        time: 'Just now',
        likes: 0,
      },
      ...prev,
    ]);
    setNewComment('');
  };

  const categories = ['All', 'Music', 'Gaming', 'TypeScript', 'Lofi', 'Tech', 'Podcasts', 'News', 'Live'];

  const filteredVideos = YOUTUBE_VIDEOS.filter((v) => {
    const matchSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.channel.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === 'All') return matchSearch;
    return matchSearch && (v.title.toLowerCase().includes(selectedCategory.toLowerCase()) || v.channel.toLowerCase().includes(selectedCategory.toLowerCase()));
  });

  return (
    <div className="w-full h-full bg-[#0F0F0F] text-[#F1F1F1] font-['Roboto',_sans-serif] flex flex-col overflow-y-auto select-text">
      {/* YouTube Top Bar */}
      <header className="sticky top-0 z-30 bg-[#0F0F0F] px-4 py-2 flex items-center justify-between border-b border-[#272727]">
        {/* Left: YouTube Logo */}
        <div
          onClick={() => {
            if (onNavigateUrl) onNavigateUrl('https://www.youtube.com');
          }}
          className="flex items-center gap-1 cursor-pointer select-none"
        >
          <div className="bg-[#FF0000] text-white p-1 rounded-lg flex items-center justify-center">
            <Play size={16} fill="white" className="ml-0.5" />
          </div>
          <span className="font-bold text-[18px] tracking-tight font-sans">
            YouTube<span className="text-[10px] text-[#AAAAAA] ml-1 font-normal">US</span>
          </span>
        </div>

        {/* Center: Search Bar & Video URL input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center flex-1 max-w-xl mx-4">
          <div className="flex items-center w-full bg-[#121212] border border-[#303030] rounded-l-full px-4 py-1.5 focus-within:border-[#1C62B9]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or paste YouTube video link / ID..."
              className="w-full bg-transparent outline-none text-[14px] text-white placeholder:text-[#888888]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#222222] border border-l-0 border-[#303030] hover:bg-[#272727] text-[#AAAAAA] px-5 py-2 rounded-r-full flex items-center justify-center transition-colors"
            title="Search"
          >
            <Search size={16} />
          </button>
          <button type="button" className="ml-3 p-2 bg-[#222222] hover:bg-[#272727] rounded-full text-white">
            <Mic size={16} />
          </button>
        </form>

        {/* Right: Icons & User Avatar */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-[#272727] rounded-full text-white">
            <Video size={18} />
          </button>
          <button className="p-2 hover:bg-[#272727] rounded-full text-white relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 bg-[#CC0000] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0072C6] text-white font-bold flex items-center justify-center text-[12px] border border-[#303030]">
            U
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Active Video Player & Info */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* Real Embedded YouTube Video Player */}
          {activeVideo && (
            <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-video shadow-2xl border border-[#272727]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.embedId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}

          {/* Video Title */}
          <h1 className="text-[19px] font-bold text-white leading-snug mt-1">
            {activeVideo?.title}
          </h1>

          {/* Channel Info & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-[#272727]">
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <img
                src={activeVideo?.channelAvatar}
                alt={activeVideo?.channel}
                className="w-10 h-10 rounded-full object-cover border border-[#3E3E3E]"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-semibold text-[14px] flex items-center gap-1">
                  <span>{activeVideo?.channel}</span>
                  <CheckCircle2 size={13} className="text-[#AAAAAA]" />
                </div>
                <div className="text-[12px] text-[#AAAAAA]">{activeVideo?.subscribers}</div>
              </div>
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`ml-3 px-4 py-2 rounded-full font-medium text-[13px] transition-all ${
                  isSubscribed
                    ? 'bg-[#272727] text-white hover:bg-[#3E3E3E]'
                    : 'bg-white text-black hover:bg-[#E5E5E5]'
                }`}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            {/* Action Buttons: Like, Dislike, Share, Download */}
            <div className="flex items-center gap-2 text-[13px]">
              <div className="flex items-center bg-[#272727] rounded-full overflow-hidden">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3 py-1.5 hover:bg-[#3E3E3E] transition-colors border-r border-[#3E3E3E] ${
                    liked === true ? 'text-[#3EA6FF]' : 'text-white'
                  }`}
                >
                  <ThumbsUp size={15} fill={liked === true ? '#3EA6FF' : 'none'} />
                  <span>{(likeCount / 1000000).toFixed(1)}M</span>
                </button>
                <button
                  onClick={handleDislike}
                  className={`px-3 py-1.5 hover:bg-[#3E3E3E] transition-colors ${
                    liked === false ? 'text-[#3EA6FF]' : 'text-white'
                  }`}
                >
                  <ThumbsDown size={15} fill={liked === false ? '#3EA6FF' : 'none'} />
                </button>
              </div>

              <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#272727] hover:bg-[#3E3E3E] rounded-full transition-colors">
                <Share2 size={15} />
                <span>Share</span>
              </button>

              <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#272727] hover:bg-[#3E3E3E] rounded-full transition-colors">
                <Download size={15} />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Video Description Box */}
          <div className="bg-[#272727] p-3.5 rounded-xl text-[13px] text-[#F1F1F1] leading-relaxed">
            <div className="font-semibold text-white mb-1 flex items-center gap-2">
              <span>{activeVideo?.views}</span>
              <span>{activeVideo?.timestamp}</span>
            </div>
            <p>{activeVideo?.description}</p>
          </div>

          {/* Comments Section */}
          <div className="mt-4">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="font-bold text-[17px]">{comments.length} Comments</h3>
              <span className="text-[13px] text-[#AAAAAA] flex items-center gap-1 cursor-pointer">
                Sort by
              </span>
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-[#0072C6] text-white flex items-center justify-center font-bold text-[12px] shrink-0">
                U
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full bg-transparent border-b border-[#3E3E3E] focus:border-white py-1 outline-none text-[13.5px]"
                />
                {newComment.trim() && (
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setNewComment('')}
                      className="px-3 py-1.5 rounded-full hover:bg-[#272727] text-[12px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#3EA6FF] text-black font-semibold rounded-full text-[12px] hover:bg-[#65B8FF]"
                    >
                      Comment
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Comments List */}
            <div className="flex flex-col gap-4">
              {comments.map((cmt) => (
                <div key={cmt.id} className="flex gap-3 text-[13px]">
                  <div className="w-8 h-8 rounded-full bg-[#333333] text-white flex items-center justify-center text-[12px] shrink-0 font-bold">
                    {cmt.user.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-white">{cmt.user}</span>
                      <span className="text-[11px] text-[#AAAAAA]">{cmt.time}</span>
                    </div>
                    <p className="text-[#E0E0E0]">{cmt.text}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[#AAAAAA] text-[12px]">
                      <button className="flex items-center gap-1 hover:text-white">
                        <ThumbsUp size={12} />
                        <span>{cmt.likes}</span>
                      </button>
                      <button className="hover:text-white">
                        <ThumbsDown size={12} />
                      </button>
                      <button className="hover:text-white font-medium">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Category Chips & Related Videos List */}
        <div className="flex flex-col gap-3">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-black'
                    : 'bg-[#272727] text-white hover:bg-[#3E3E3E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Related Videos List */}
          <div className="flex flex-col gap-3 mt-1">
            {filteredVideos.map((video) => {
              const isSelected = activeVideo?.id === video.id;
              return (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`flex gap-3 cursor-pointer group rounded-lg p-1.5 transition-colors ${
                    isSelected ? 'bg-[#272727]' : 'hover:bg-[#1E1E1E]'
                  }`}
                >
                  {/* Thumbnail with duration */}
                  <div className="relative w-40 h-24 rounded-lg overflow-hidden shrink-0 bg-[#222222]">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10.5px] px-1.5 py-0.5 rounded font-medium">
                      {video.duration}
                    </span>
                  </div>

                  {/* Video Meta */}
                  <div className="flex-1 min-w-0 flex flex-col justify-start">
                    <h4 className="font-semibold text-[13px] text-white line-clamp-2 leading-tight group-hover:text-[#3EA6FF]">
                      {video.title}
                    </h4>
                    <div className="text-[11.5px] text-[#AAAAAA] mt-1 flex items-center gap-1">
                      <span>{video.channel}</span>
                      <CheckCircle2 size={11} />
                    </div>
                    <div className="text-[11px] text-[#AAAAAA]">
                      {video.views} * {video.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
