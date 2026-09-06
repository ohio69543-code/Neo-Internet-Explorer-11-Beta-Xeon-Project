import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Music,
  Plus,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  Compass,
  Home,
  Users,
  Tv,
} from 'lucide-react';

interface TikTokVideo {
  id: string;
  creator: string;
  avatar: string;
  verified: boolean;
  description: string;
  song: string;
  videoSrc: string; // real playable HTML5 video
  likes: number;
  commentsCount: number;
  bookmarksCount: number;
  sharesCount: number;
}

export const TIKTOK_VIDEOS: TikTokVideo[] = [
  {
    id: 'vid-1',
    creator: 'ultramarine_browser',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    verified: true,
    description: 'Running modern TikTok natively inside Internet Explorer 11 aesthetic using Chromium engine! Rate this 1-10 #fyp #tech #browser #retro #windows10',
    song: 'original sound - Ultramarine Tech Vibes',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 245800,
    commentsCount: 3820,
    bookmarksCount: 19400,
    sharesCount: 12100,
  },
  {
    id: 'vid-2',
    creator: 'cyber_nature',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    verified: true,
    description: 'Deep ocean glowing bioluminescence captured in 4K 60FPS #nature #satisfying #relaxing #oceanlife #viral',
    song: 'Peaceful Ambient Waves - Chill Beats',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 512300,
    commentsCount: 6420,
    bookmarksCount: 42100,
    sharesCount: 28900,
  },
  {
    id: 'vid-3',
    creator: 'speed_runner_99',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    verified: false,
    description: 'Impossible trickshot on first attempt?! Wait until the end #gaming #gamer #esports #clip #insane',
    song: 'Hyped Beat Remix 2026 - DJ Pulse',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    likes: 893100,
    commentsCount: 11200,
    bookmarksCount: 67800,
    sharesCount: 49300,
  },
  {
    id: 'vid-4',
    creator: 'tokyo_drift_vibes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    verified: true,
    description: 'Night drive through Shibuya crossing with rain reflections #tokyo #nightdrive #cyberpunk #aesthetic',
    song: 'City Lights Synthwave - NeoTokyo',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 384000,
    commentsCount: 4900,
    bookmarksCount: 31200,
    sharesCount: 18500,
  },
];

interface TikTokAppProps {
  onNavigateUrl?: (url: string) => void;
}

export const TikTokApp: React.FC<TikTokAppProps> = ({ onNavigateUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likeCountMap, setLikeCountMap] = useState<Record<string, number>>({});
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});
  const [followedMap, setFollowedMap] = useState<Record<string, boolean>>({});
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState<Record<string, Array<{ id: number; user: string; text: string; time: string; likes: number }>>>({
    'vid-1': [
      { id: 1, user: 'DevGuy22', text: 'This IE11 browser shell playing TikTok is pure genius!', time: '2h ago', likes: 142 },
      { id: 2, user: 'RetroFan', text: 'Who needs Edge when Ultramarine runs full video acceleration?', time: '4h ago', likes: 89 },
    ],
  });
  const [newCommentText, setNewCommentText] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideo = TIKTOK_VIDEOS[currentIndex];

  // Initialize likes map
  useEffect(() => {
    const initialLikes: Record<string, number> = {};
    TIKTOK_VIDEOS.forEach((v) => {
      initialLikes[v.id] = v.likes;
    });
    setLikeCountMap(initialLikes);
  }, []);

  // Update video when currentIndex changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleNext = () => {
    if (currentIndex < TIKTOK_VIDEOS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(TIKTOK_VIDEOS.length - 1);
    }
  };

  const handleToggleLike = (vidId: string) => {
    const isLiked = !!likedMap[vidId];
    setLikedMap((prev) => ({ ...prev, [vidId]: !isLiked }));
    setLikeCountMap((prev) => ({
      ...prev,
      [vidId]: (prev[vidId] || 0) + (isLiked ? -1 : 1),
    }));
  };

  const handleToggleBookmark = (vidId: string) => {
    setBookmarkedMap((prev) => ({ ...prev, [vidId]: !prev[vidId] }));
  };

  const handleToggleFollow = (creator: string) => {
    setFollowedMap((prev) => ({ ...prev, [creator]: !prev[creator] }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const vidId = currentVideo.id;
    const newEntry = {
      id: Date.now(),
      user: 'You',
      text: newCommentText.trim(),
      time: 'Just now',
      likes: 0,
    };
    setComments((prev) => ({
      ...prev,
      [vidId]: [newEntry, ...(prev[vidId] || [])],
    }));
    setNewCommentText('');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isPlaying, isMuted]);

  const currentLikes = likeCountMap[currentVideo.id] || currentVideo.likes;
  const isCurrentLiked = !!likedMap[currentVideo.id];
  const isCurrentBookmarked = !!bookmarkedMap[currentVideo.id];
  const isCurrentFollowed = !!followedMap[currentVideo.creator];
  const currentVideoComments = comments[currentVideo.id] || [];

  return (
    <div className="w-full h-full bg-[#000000] text-white font-['Proxima_Nova',_Segoe_UI,_sans-serif] flex flex-col overflow-hidden select-none">
      {/* Top Header */}
      <header className="h-14 border-b border-[#222222] bg-[#000000] px-6 flex items-center justify-between z-30 shrink-0">
        {/* TikTok Brand Logo */}
        <div
          onClick={() => {
            if (onNavigateUrl) onNavigateUrl('https://www.tiktok.com');
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="relative font-black text-[22px] tracking-wider text-white">
            <span className="relative z-10">TikTok</span>
            <span className="absolute top-0 left-[1px] text-[#00F2FE] -z-1 opacity-80">TikTok</span>
            <span className="absolute top-0 -left-[1px] text-[#FE2C55] -z-2 opacity-80">TikTok</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center bg-[#2F2F2F] rounded-full px-4 py-1.5 w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search accounts and videos"
            className="bg-transparent outline-none text-[13px] text-white w-full placeholder:text-[#8A8B91]"
          />
          <Search size={16} className="text-[#8A8B91]" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#252525] hover:bg-[#333333] rounded-[4px] text-[13px] font-semibold transition-colors">
            <Plus size={16} />
            <span>Upload</span>
          </button>
          <button className="px-5 py-1.5 bg-[#FE2C55] hover:bg-[#E0264B] rounded-[4px] text-[13px] font-semibold transition-colors">
            Log in
          </button>
        </div>
      </header>

      {/* Main App Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-60 border-r border-[#222222] bg-[#000000] p-4 hidden md:flex flex-col justify-between shrink-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#252525] text-[#FE2C55] font-bold text-[15px] cursor-pointer">
              <Home size={20} />
              <span>For You</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1A1A1A] text-white font-medium text-[15px] cursor-pointer transition-colors">
              <Compass size={20} />
              <span>Explore</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1A1A1A] text-white font-medium text-[15px] cursor-pointer transition-colors">
              <Users size={20} />
              <span>Following</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1A1A1A] text-white font-medium text-[15px] cursor-pointer transition-colors">
              <Tv size={20} />
              <span>LIVE</span>
            </div>

            <div className="h-[1px] bg-[#222222] my-3" />

            <div className="text-[12px] text-[#8A8B91] font-semibold px-3 uppercase tracking-wider">
              Suggested accounts
            </div>

            <div className="flex flex-col gap-2 mt-2">
              {TIKTOK_VIDEOS.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setCurrentIndex(TIKTOK_VIDEOS.findIndex((x) => x.id === v.id))}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-[#1A1A1A] cursor-pointer"
                >
                  <img src={v.avatar} alt={v.creator} className="w-8 h-8 rounded-full object-cover" />
                  <div className="truncate">
                    <div className="font-semibold text-[13px] truncate text-white leading-tight">
                      {v.creator}
                    </div>
                    <div className="text-[11px] text-[#8A8B91] truncate">Verified Creator</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-[#666666] leading-relaxed">
            © 2026 TikTok inside Ultramarine Explorer Chromium
          </div>
        </aside>

        {/* Center: Vertical Short-form Video Feed Stage */}
        <main className="flex-1 flex items-center justify-center relative bg-[#0B0B0B] p-4">
          {/* Vertical Video Frame Container */}
          <div className="relative w-full max-w-[380px] h-full max-h-[640px] bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#222222] flex items-center justify-center">
            {/* Playable Video */}
            <video
              ref={videoRef}
              src={currentVideo.videoSrc}
              className="w-full h-full object-cover cursor-pointer"
              loop
              autoPlay
              muted={isMuted}
              onClick={togglePlay}
              playsInline
            />

            {/* Play/Pause Overlay indicator on pause */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play size={36} fill="white" className="ml-1 text-white" />
                </div>
              </div>
            )}

            {/* Sound Mute Toggle in top-right of video */}
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 p-2.5 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-sm transition-colors z-20"
              title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {/* Bottom Gradient Overlay for Captions */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-16 z-20 pointer-events-auto">
              {/* Creator Handle */}
              <div className="flex items-center gap-1.5 font-bold text-[15px] mb-1">
                <span>@{currentVideo.creator}</span>
                {currentVideo.verified && (
                  <span className="w-4 h-4 rounded-full bg-[#20D5EC] flex items-center justify-center text-black text-[10px] font-bold">
                    ✓
                  </span>
                )}
              </div>

              {/* Caption Description */}
              <p className="text-[13px] text-[#E0E0E0] line-clamp-2 leading-snug mb-2 font-normal">
                {currentVideo.description}
              </p>

              {/* Music Sound Track Ticker */}
              <div className="flex items-center gap-2 text-[12.5px] text-white">
                <Music size={13} className="shrink-0" />
                <span className="truncate">{currentVideo.song}</span>
              </div>
            </div>

            {/* Floating Right Actions Column */}
            <div className="absolute right-3 bottom-8 flex flex-col items-center gap-4 z-20">
              {/* Creator Avatar with Follow + */}
              <div className="relative">
                <img
                  src={currentVideo.avatar}
                  alt={currentVideo.creator}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white"
                />
                {!isCurrentFollowed && (
                  <button
                    onClick={() => handleToggleFollow(currentVideo.creator)}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#FE2C55] rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform"
                    title="Follow creator"
                  >
                    <Plus size={13} strokeWidth={3} />
                  </button>
                )}
              </div>

              {/* Like Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleToggleLike(currentVideo.id)}
                  className={`w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all ${
                    isCurrentLiked ? 'text-[#FE2C55] scale-110' : 'text-white hover:bg-black/60'
                  }`}
                >
                  <Heart size={24} fill={isCurrentLiked ? '#FE2C55' : 'none'} />
                </button>
                <span className="text-[11.5px] font-semibold mt-1">
                  {(currentLikes / 1000).toFixed(1)}K
                </span>
              </div>

              {/* Comment Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                  className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                >
                  <MessageCircle size={24} />
                </button>
                <span className="text-[11.5px] font-semibold mt-1">
                  {(currentVideo.commentsCount / 1000).toFixed(1)}K
                </span>
              </div>

              {/* Bookmark Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleToggleBookmark(currentVideo.id)}
                  className={`w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all ${
                    isCurrentBookmarked ? 'text-[#FACE15]' : 'text-white hover:bg-black/60'
                  }`}
                >
                  <Bookmark size={24} fill={isCurrentBookmarked ? '#FACE15' : 'none'} />
                </button>
                <span className="text-[11.5px] font-semibold mt-1">
                  {(currentVideo.bookmarksCount / 1000).toFixed(1)}K
                </span>
              </div>

              {/* Share Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => alert('Link copied to clipboard!')}
                  className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                >
                  <Share2 size={22} />
                </button>
                <span className="text-[11.5px] font-semibold mt-1">
                  {(currentVideo.sharesCount / 1000).toFixed(1)}K
                </span>
              </div>

              {/* Spinning Vinyl Record */}
              <div className="w-10 h-10 rounded-full bg-[#181818] border-4 border-[#333333] flex items-center justify-center animate-spin">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Up and Down Navigation Floating Controls */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            <button
              onClick={handlePrev}
              className="p-3 bg-[#202020] hover:bg-[#303030] rounded-full text-white shadow-xl transition-all"
              title="Previous Video (Arrow Up)"
            >
              <ChevronUp size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-[#202020] hover:bg-[#303030] rounded-full text-white shadow-xl transition-all"
              title="Next Video (Arrow Down)"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Sliding Comments Drawer */}
          {isCommentsOpen && (
            <div className="absolute inset-y-0 right-0 w-96 bg-[#161616] border-l border-[#2E2E2E] flex flex-col z-40 p-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3 mb-4">
                <h3 className="font-bold text-[16px] text-white">Comments ({currentVideoComments.length})</h3>
                <button onClick={() => setIsCommentsOpen(false)} className="text-[#AAAAAA] hover:text-white">
                  <X size={18} />
                </button>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-4">
                {currentVideoComments.map((cmt) => (
                  <div key={cmt.id} className="flex gap-2.5 text-[13px]">
                    <div className="w-8 h-8 rounded-full bg-[#FE2C55] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                      {cmt.user.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{cmt.user}</div>
                      <p className="text-[#DDDDDD] mt-0.5">{cmt.text}</p>
                      <div className="text-[11px] text-[#888888] mt-1">{cmt.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <form onSubmit={handleAddComment} className="mt-4 flex gap-2 border-t border-[#2A2A2A] pt-3">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Add comment..."
                  className="flex-1 bg-[#282828] px-3 py-2 rounded-full text-[13px] text-white outline-none focus:ring-1 focus:ring-[#FE2C55]"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#FE2C55] hover:bg-[#E0264B] rounded-full text-white transition-colors"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
