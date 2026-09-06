export interface BrowserTab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  history: string[];
  historyIndex: number;
  zoom: number; // e.g. 100
  documentMode?: number; // 11, 10, 9, 8, 7, 5
  isMuted?: boolean;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  folder?: string;
}

export interface HistoryEntry {
  id: string;
  title: string;
  url: string;
  visitedAt: Date;
  favicon?: string;
}

export interface DownloadItem {
  id: string;
  fileName: string;
  fileSize: string;
  sourceUrl: string;
  progress: number; // 0-100
  status: 'downloading' | 'completed' | 'cancelled';
  date: Date;
}

export interface NotificationPrompt {
  id: string;
  type: 'download' | 'security' | 'addon';
  message: string;
  fileName?: string;
  fileSize?: string;
  url?: string;
  onConfirm?: () => void;
  onSaveAs?: () => void;
  onCancel?: () => void;
}

export interface BrowserSettings {
  homePage: string;
  searchEngine: 'bing' | 'google' | 'duckduckgo';
  showTabsOnSeparateRow: boolean;
  showMenuBar: boolean;
  showFavoritesBar: boolean;
  showCommandBar: boolean;
  showStatusBar: boolean;
  enableProtectedMode: boolean;
  enableSmartScreen: boolean;
  defaultZoom: number;
  inPrivateMode: boolean;
  emulationMode: 'edge' | '11' | '10' | '9' | '8' | '7' | '5';
  renderEngine: 'chromium-blink' | 'v8-accelerated';
}

export interface ConsoleLogMessage {
  id: string;
  type: 'log' | 'info' | 'warn' | 'error';
  text: string;
  timestamp: string;
  source?: string;
}

export interface NetworkRequestLog {
  id: string;
  url: string;
  method: string;
  status: number;
  type: string;
  size: string;
  time: string;
}
