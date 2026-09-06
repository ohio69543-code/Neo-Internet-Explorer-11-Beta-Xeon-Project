import React, { useState } from 'react';
import {
  X,
  Code2,
  Terminal,
  Bug,
  Activity,
  Layers,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface F12DevToolsProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  currentTitle: string;
  documentMode: string;
  onChangeDocumentMode: (mode: any) => void;
}

export const F12DevTools: React.FC<F12DevToolsProps> = ({
  isOpen,
  onClose,
  currentUrl,
  currentTitle,
  documentMode,
  onChangeDocumentMode,
}) => {
  const [activeTab, setActiveTab] = useState<'dom' | 'console' | 'debugger' | 'network' | 'emulation'>('dom');
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<Array<{ id: number; type: 'log' | 'warn' | 'error' | 'info'; text: string }>>([
    { id: 1, type: 'info', text: 'HTML1300: Navigation occurred to ' + (currentUrl || 'about:tabs') },
    { id: 2, type: 'info', text: 'SEC7115: :visited and :link styles can only differ by color.' },
    { id: 3, type: 'log', text: 'Ultramarine Blink/V8 JavaScript Engine Initialized (Document Mode: ' + documentMode + ')' },
  ]);
  const [selectedDomNode, setSelectedDomNode] = useState('body');
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isOpen) return null;

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;

    const cmd = consoleInput.trim();
    let result = '';
    let type: 'log' | 'error' = 'log';

    try {
      if (cmd === 'navigator.userAgent') {
        result =
          'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0; like Gecko) AppleWebKit/537.36 Chrome/132.0.0.0 Ultramarine/11.0';
      } else if (cmd === 'document.title') {
        result = `"${currentTitle || 'Ultramarine Explorer'}"`;
      } else if (cmd === 'location.href') {
        result = `"${currentUrl}"`;
      } else {
        // Safe evaluation
        const evalRes = Function(`"use strict"; return (${cmd})`)();
        result = typeof evalRes === 'object' ? JSON.stringify(evalRes) : String(evalRes);
      }
    } catch (err: any) {
      result = err.message || 'Evaluation error';
      type = 'error';
    }

    setConsoleLogs((prev) => [
      ...prev,
      { id: Date.now(), type: 'info', text: `> ${cmd}` },
      { id: Date.now() + 1, type, text: result },
    ]);
    setConsoleInput('');
  };

  const tabs = [
    { id: 'dom', label: 'DOM Explorer', icon: Code2 },
    { id: 'console', label: 'Console', icon: Terminal },
    { id: 'debugger', label: 'Debugger', icon: Bug },
    { id: 'network', label: 'Network', icon: Activity },
    { id: 'emulation', label: 'Emulation', icon: Layers },
  ] as const;

  return (
    <div
      className={`border-t-2 border-[#0072C6] bg-[#1E1E1E] text-[#D4D4D4] font-mono text-[11.5px] z-50 flex flex-col shadow-2xl transition-all ${
        isExpanded ? 'h-[500px]' : 'h-[300px]'
      }`}
    >
      {/* Top Bar of F12 Developer Tools */}
      <div className="bg-[#2D2D2D] border-b border-[#3E3E3E] h-8 px-2 flex items-center justify-between select-none shrink-0 font-['Segoe_UI',_Tahoma,_sans-serif]">
        {/* Tool Tabs */}
        <div className="flex items-center h-full gap-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`h-full px-3 flex items-center gap-1.5 text-[12px] border-b-2 transition-colors ${
                  isActive
                    ? 'border-[#007ACC] bg-[#1E1E1E] text-white font-medium'
                    : 'border-transparent text-[#999999] hover:text-white hover:bg-[#333333]'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-[#007ACC]' : ''} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Tools Controls */}
        <div className="flex items-center gap-1 text-[#CCCCCC]">
          <span className="text-[11px] text-[#888888] mr-2">Doc Mode: {documentMode}</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-[#3E3E3E] hover:text-white rounded"
            title={isExpanded ? 'Restore height' : 'Maximize F12 tools'}
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#E81123] hover:text-white rounded transition-colors"
            title="Close F12 (F12)"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Main Tool Viewport */}
      <div className="flex-1 overflow-hidden flex bg-[#1E1E1E]">
        {/* 1. DOM EXPLORER */}
        {activeTab === 'dom' && (
          <div className="flex-1 flex overflow-hidden">
            {/* HTML Tree Pane */}
            <div className="w-2/3 border-r border-[#333333] p-3 overflow-y-auto font-mono text-[11px] leading-relaxed">
              <div className="text-[#6A9955]">&lt;!DOCTYPE html&gt;</div>
              <div className="text-[#569CD6]">
                &lt;<span className="text-[#569CD6]">html</span> <span className="text-[#9CDCFE]">lang</span>=
                <span className="text-[#CE9178]">"en"</span>&gt;
              </div>
              <div className="pl-4 text-[#569CD6]">
                &lt;<span className="text-[#569CD6]">head</span>&gt;
                <div className="pl-4 text-[#9CDCFE]">
                  &lt;title&gt;<span className="text-[#D4D4D4]">{currentTitle || 'Ultramarine'}</span>&lt;/title&gt;
                </div>
                <div className="pl-4 text-[#9CDCFE]">&lt;meta charset="utf-8"&gt;</div>
                &lt;/<span className="text-[#569CD6]">head</span>&gt;
              </div>
              <div
                onClick={() => setSelectedDomNode('body')}
                className={`pl-4 text-[#569CD6] cursor-pointer hover:bg-[#264F78]/50 p-0.5 rounded ${
                  selectedDomNode === 'body' ? 'bg-[#094771]' : ''
                }`}
              >
                &lt;<span className="text-[#569CD6]">body</span> <span className="text-[#9CDCFE]">class</span>=
                <span className="text-[#CE9178]">"ultramarine-viewport"</span>&gt;
                <div className="pl-4 text-[#569CD6]">
                  &lt;div <span className="text-[#9CDCFE]">id</span>=<span className="text-[#CE9178]">"root"</span>&gt;
                  <div className="pl-4 text-[#D4D4D4]">&lt;!-- Browser Content Loaded --&gt;</div>
                  &lt;/div&gt;
                </div>
                &lt;/<span className="text-[#569CD6]">body</span>&gt;
              </div>
              <div className="text-[#569CD6]">&lt;/<span className="text-[#569CD6]">html</span>&gt;</div>
            </div>

            {/* Styles / Box Model Pane */}
            <div className="w-1/3 p-3 overflow-y-auto bg-[#252526] text-[11px]">
              <div className="font-semibold text-[#CCCCCC] mb-2 uppercase tracking-wider text-[10px] font-sans">
                Styles - &lt;body&gt;
              </div>
              <div className="bg-[#1E1E1E] p-2 border border-[#3E3E3E] rounded mb-3">
                <div className="text-[#D7BA7D]">body &#123;</div>
                <div className="pl-4 text-[#9CDCFE]">
                  margin: <span className="text-[#B5CEA8]">0px</span>;
                </div>
                <div className="pl-4 text-[#9CDCFE]">
                  font-family: <span className="text-[#CE9178]">'Segoe UI', sans-serif</span>;
                </div>
                <div className="pl-4 text-[#9CDCFE]">
                  display: <span className="text-[#CE9178]">flex</span>;
                </div>
                <div className="pl-4 text-[#9CDCFE]">
                  background-color: <span className="text-[#CE9178]">#FFFFFF</span>;
                </div>
                <div className="text-[#D7BA7D]">&#125;</div>
              </div>

              {/* Box Model Preview */}
              <div className="font-semibold text-[#CCCCCC] mb-1.5 uppercase tracking-wider text-[10px] font-sans">
                Box Model (Metrics)
              </div>
              <div className="border border-[#4A4A4A] p-2 text-center text-[10px] text-[#AAAAAA] bg-[#1E1E1E]">
                <div className="text-[#888]">margin: 0</div>
                <div className="border border-[#007ACC]/50 p-2 my-1">
                  <div className="text-[#888]">border: 0</div>
                  <div className="border border-[#4EC9B0]/50 p-2 my-1 bg-[#252526]">
                    <div className="text-[#888]">padding: 0</div>
                    <div className="text-[#4EC9B0] font-bold">1280 x 720</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CONSOLE */}
        {activeTab === 'console' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Logs List */}
            <div className="flex-1 p-3 overflow-y-auto font-mono text-[11.5px] flex flex-col gap-1">
              {consoleLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 py-0.5 border-b border-[#2A2A2A]">
                  {log.type === 'error' && <XCircle size={13} className="text-[#F14C4C] mt-0.5 shrink-0" />}
                  {log.type === 'warn' && <AlertTriangle size={13} className="text-[#CCA700] mt-0.5 shrink-0" />}
                  {log.type === 'info' && <Info size={13} className="text-[#3794FF] mt-0.5 shrink-0" />}
                  {log.type === 'log' && <CheckCircle2 size={13} className="text-[#4EC9B0] mt-0.5 shrink-0" />}
                  <span
                    className={
                      log.type === 'error'
                        ? 'text-[#F14C4C]'
                        : log.type === 'warn'
                        ? 'text-[#CCA700]'
                        : 'text-[#D4D4D4]'
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Console Input Bar */}
            <form
              onSubmit={handleConsoleSubmit}
              className="bg-[#252526] border-t border-[#3E3E3E] px-3 py-1.5 flex items-center gap-2"
            >
              <span className="text-[#007ACC] font-bold">&gt;</span>
              <input
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                placeholder="Type JavaScript command (e.g. navigator.userAgent, document.title, 2+2)..."
                className="w-full bg-transparent outline-none text-[#D4D4D4] font-mono text-[12px]"
              />
            </form>
          </div>
        )}

        {/* 3. DEBUGGER */}
        {activeTab === 'debugger' && (
          <div className="flex-1 flex p-4 items-center justify-center text-center text-[#888888]">
            <div className="flex flex-col items-center gap-2">
              <Bug size={32} className="text-[#007ACC]" />
              <div className="font-semibold text-white">Scripts Debugger Active</div>
              <div className="text-[11px] max-w-sm">
                Blink / V8 JIT engine attached. Breakpoints and call stack profiling enabled.
              </div>
            </div>
          </div>
        )}

        {/* 4. NETWORK */}
        {activeTab === 'network' && (
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="bg-[#2D2D2D] px-3 py-1.5 border-b border-[#3E3E3E] grid grid-cols-6 text-[10.5px] uppercase tracking-wider font-semibold text-[#AAAAAA]">
              <span>Name</span>
              <span>Method</span>
              <span>Status</span>
              <span>Type</span>
              <span>Size</span>
              <span>Latency</span>
            </div>
            <div className="divide-y divide-[#2A2A2A] text-[11px]">
              <div className="px-3 py-1.5 grid grid-cols-6 hover:bg-[#2A2D2E]">
                <span className="text-[#4EC9B0] truncate">{currentUrl || 'about:tabs'}</span>
                <span>GET</span>
                <span className="text-[#4EC9B0]">200 OK</span>
                <span>document</span>
                <span>14.2 KB</span>
                <span className="text-[#888]">42 ms</span>
              </div>
              <div className="px-3 py-1.5 grid grid-cols-6 hover:bg-[#2A2D2E]">
                <span className="text-[#9CDCFE] truncate">ultramarine-theme.css</span>
                <span>GET</span>
                <span className="text-[#4EC9B0]">200 OK</span>
                <span>stylesheet</span>
                <span>8.1 KB</span>
                <span className="text-[#888]">18 ms</span>
              </div>
              <div className="px-3 py-1.5 grid grid-cols-6 hover:bg-[#2A2D2E]">
                <span className="text-[#CE9178] truncate">favicon.ico</span>
                <span>GET</span>
                <span className="text-[#4EC9B0]">200 OK</span>
                <span>image/x-icon</span>
                <span>1.4 KB</span>
                <span className="text-[#888]">12 ms</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. EMULATION */}
        {activeTab === 'emulation' && (
          <div className="flex-1 p-4 overflow-y-auto font-sans text-[12px] text-[#CCCCCC]">
            <div className="font-semibold text-white text-[13px] mb-3">
              Document Mode & Browser Profile Emulation
            </div>
            <div className="grid grid-cols-2 gap-6 max-w-2xl">
              <div>
                <label className="block text-[#999999] mb-1 font-medium">Document mode:</label>
                <select
                  value={documentMode}
                  onChange={(e) => onChangeDocumentMode(e.target.value)}
                  className="w-full bg-[#2D2D2D] border border-[#444444] text-white px-2 py-1.5 rounded outline-none"
                >
                  <option value="edge">Edge / Chromium (Default)</option>
                  <option value="11">11 (Trident 7.0)</option>
                  <option value="10">10 (Trident 6.0)</option>
                  <option value="9">9 (Trident 5.0)</option>
                  <option value="8">8 (Trident 4.0)</option>
                  <option value="7">7 (Internet Explorer 7)</option>
                  <option value="5">5 (Quirks Mode)</option>
                </select>
                <p className="text-[11px] text-[#777777] mt-1.5">
                  Allows testing sites against legacy Internet Explorer rendering engines.
                </p>
              </div>

              <div>
                <label className="block text-[#999999] mb-1 font-medium">Browser profile:</label>
                <select className="w-full bg-[#2D2D2D] border border-[#444444] text-white px-2 py-1.5 rounded outline-none">
                  <option>Desktop</option>
                  <option>Windows Phone</option>
                  <option>Tablet</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
