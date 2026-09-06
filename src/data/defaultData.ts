import { Bookmark, BrowserSettings } from '../types';

export const DEFAULT_SETTINGS: BrowserSettings = {
  homePage: 'about:tabs',
  searchEngine: 'bing',
  showTabsOnSeparateRow: false, // Default IE11 behavior: tabs next to address bar!
  showMenuBar: false, // IE11 default: hidden, press Alt to reveal
  showFavoritesBar: true,
  showCommandBar: false,
  showStatusBar: true,
  enableProtectedMode: true,
  enableSmartScreen: true,
  defaultZoom: 100,
  inPrivateMode: false,
  emulationMode: 'edge',
  renderEngine: 'chromium-blink',
};

export const DEFAULT_BOOKMARKS: Bookmark[] = [
  {
    id: 'bm-yt',
    title: 'YouTube',
    url: 'https://www.youtube.com',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-tt',
    title: 'TikTok',
    url: 'https://www.tiktok.com',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-2',
    title: 'Bing Search',
    url: 'https://www.bing.com',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-rd',
    title: 'Reddit',
    url: 'https://www.reddit.com',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-calc',
    title: 'Calculator',
    url: 'app:calculator',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-note',
    title: 'Notepad',
    url: 'app:notepad',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-mine',
    title: 'Minesweeper',
    url: 'app:minesweeper',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-1',
    title: 'MSN Portal',
    url: 'https://www.msn.com',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-3',
    title: 'Wikipedia',
    url: 'https://en.wikipedia.org',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-4',
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-goog',
    title: 'Google',
    url: 'https://www.google.com',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-5',
    title: 'Acid3 Test',
    url: 'http://acid3.acidtests.org',
    folder: 'Favorites Bar',
  },
  {
    id: 'bm-6',
    title: 'Chromium Internals',
    url: 'chrome://version',
    folder: 'Favorites Bar',
  },
];

export const TOP_SITES = [
  {
    id: 'ts-yt',
    title: 'YouTube',
    url: 'https://www.youtube.com',
    color: '#FF0000',
    subtitle: 'Videos, Music & Streams',
    icon: 'video',
  },
  {
    id: 'ts-tt',
    title: 'TikTok',
    url: 'https://www.tiktok.com',
    color: '#000000',
    subtitle: 'Short Videos & Trends',
    icon: 'tv',
  },
  {
    id: 'ts-2',
    title: 'Bing Search',
    url: 'https://www.bing.com',
    color: '#008272',
    subtitle: 'Search & Copilot AI',
    icon: 'search',
  },
  {
    id: 'ts-rd',
    title: 'Reddit',
    url: 'https://www.reddit.com',
    color: '#FF4500',
    subtitle: 'The front page of internet',
    icon: 'message-square',
  },
  {
    id: 'ts-calc',
    title: 'Calculator',
    url: 'app:calculator',
    color: '#0078D7',
    subtitle: 'Windows Math Tool',
    icon: 'calculator',
  },
  {
    id: 'ts-note',
    title: 'Notepad',
    url: 'app:notepad',
    color: '#107C41',
    subtitle: 'Text Notes & Drafts',
    icon: 'file-text',
  },
  {
    id: 'ts-mine',
    title: 'Minesweeper',
    url: 'app:minesweeper',
    color: '#707070',
    subtitle: 'Classic Windows Game',
    icon: 'smile',
  },
  {
    id: 'ts-1',
    title: 'MSN Homepage',
    url: 'https://www.msn.com',
    color: '#0072C6',
    subtitle: 'News, Weather & Money',
    icon: 'globe',
  },
  {
    id: 'ts-3',
    title: 'Wikipedia',
    url: 'https://en.wikipedia.org',
    color: '#333333',
    subtitle: 'The Free Encyclopedia',
    icon: 'book-open',
  },
  {
    id: 'ts-4',
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    color: '#FF6600',
    subtitle: 'Tech Discussions',
    icon: 'terminal',
  },
];

export const CHROMIUM_FLAGS = [
  {
    id: 'flag-trident-ua',
    name: 'Simulate Trident 7.0 User Agent',
    description: 'Sends the authentic Internet Explorer 11 Trident/7.0; rv:11.0 token alongside Chromium Blink strings.',
    enabled: true,
  },
  {
    id: 'flag-hardware-accel',
    name: 'Hardware-Accelerated Canvas & 2D Rasterization',
    description: 'Enables GPU rasterization and WebGL 2.0 pipeline acceleration on Chromium V8 runtime.',
    enabled: true,
  },
  {
    id: 'flag-activex-filter',
    name: 'ActiveX Filtering Simulation',
    description: 'Blocks legacy ActiveX controls and simulates IE11 enhanced security sandbox mode.',
    enabled: true,
  },
  {
    id: 'flag-do-not-track',
    name: 'Send "Do Not Track" and Global Privacy Control (GPC)',
    description: 'Emulates IE11 Tracking Protection List (TPL) and transmits DNT: 1 header with outgoing requests.',
    enabled: true,
  },
  {
    id: 'flag-smooth-scroll',
    name: 'Sub-Pixel Smooth Inertial Scrolling',
    description: 'Applies IE11 smooth spring physics to mouse wheel scrolling across web documents.',
    enabled: true,
  },
  {
    id: 'flag-v8-turbofan',
    name: 'V8 TurboFan JIT Compiler Optimizations',
    description: 'Uses high-performance Chromium JIT compilation for modern WebAssembly and JavaScript ES2022+.',
    enabled: true,
  },
  {
    id: 'flag-quic-http3',
    name: 'Experimental HTTP/3 & QUIC Support',
    description: 'Enables UDP-based HTTP/3 multiplexing for reduced round-trip latency.',
    enabled: true,
  },
];
