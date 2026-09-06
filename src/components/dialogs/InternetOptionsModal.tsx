import React, { useState } from 'react';
import { BrowserSettings } from '../../types';
import { X, Globe, Shield, Lock, Sliders, Check } from 'lucide-react';
import { UltramarineLogo } from '../UltramarineLogo';

interface InternetOptionsModalProps {
  isOpen: boolean;
  settings: BrowserSettings;
  currentUrl: string;
  onClose: () => void;
  onSaveSettings: (newSettings: Partial<BrowserSettings>) => void;
  onClearHistory: () => void;
}

export const InternetOptionsModal: React.FC<InternetOptionsModalProps> = ({
  isOpen,
  settings,
  currentUrl,
  onClose,
  onSaveSettings,
  onClearHistory,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'privacy' | 'content' | 'connections' | 'programs' | 'advanced'>('general');
  const [homePageInput, setHomePageInput] = useState(settings.homePage);
  const [protectedMode, setProtectedMode] = useState(settings.enableProtectedMode);
  const [smartScreen, setSmartScreen] = useState(settings.enableSmartScreen);
  const [searchEngine, setSearchEngine] = useState(settings.searchEngine);
  const [securityLevel, setSecurityLevel] = useState<'medium' | 'medium-high' | 'high'>('medium-high');
  const [historyDeletedFeedback, setHistoryDeletedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleApply = () => {
    onSaveSettings({
      homePage: homePageInput,
      enableProtectedMode: protectedMode,
      enableSmartScreen: smartScreen,
      searchEngine: searchEngine,
    });
  };

  const handleOk = () => {
    handleApply();
    onClose();
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'content', label: 'Content' },
    { id: 'connections', label: 'Connections' },
    { id: 'programs', label: 'Programs' },
    { id: 'advanced', label: 'Advanced' },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 select-none font-['Segoe_UI',_Tahoma,_sans-serif]">
      <div className="w-[500px] bg-[#FFFFFF] border border-[#707070] shadow-2xl rounded-[2px] overflow-hidden text-[12px] text-[#222222]">
        {/* Title bar */}
        <div className="bg-[#FFFFFF] border-b border-[#E5E5E5] h-7 px-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-normal text-[12px] text-[#333333]">
            <UltramarineLogo size={14} />
            <span>Internet Options</span>
          </div>
          <button
            onClick={onClose}
            className="h-full px-3 -mr-3 hover:bg-[#E81123] hover:text-white transition-colors text-[#333333] flex items-center justify-center"
          >
            <X size={13} />
          </button>
        </div>

        {/* Tab Headers */}
        <div className="bg-[#F0F0F0] px-2 pt-1 border-b border-[#DCDCDC] flex items-end gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 text-[11.5px] border-t border-l border-r rounded-t-[3px] transition-colors -mb-[1px] ${
                activeTab === tab.id
                  ? 'bg-[#FFFFFF] border-[#ABABAB] font-semibold text-[#111111]'
                  : 'bg-[#E1E1E1] border-transparent text-[#555555] hover:bg-[#EAEAEA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 min-h-[360px] max-h-[420px] overflow-y-auto bg-white text-[11.5px]">
          {/* GENERAL TAB */}
          {activeTab === 'general' && (
            <div className="flex flex-col gap-4">
              {/* Home page section */}
              <fieldset className="border border-[#D9D9D9] p-3 rounded-[2px]">
                <legend className="px-1 text-[#0072C6] font-semibold">Home page</legend>
                <div className="text-[#555555] mb-2">
                  To create home page tabs, type each address on its own line.
                </div>
                <textarea
                  rows={2}
                  value={homePageInput}
                  onChange={(e) => setHomePageInput(e.target.value)}
                  className="w-full border border-[#ABABAB] p-1 text-[12px] outline-none font-mono"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setHomePageInput(currentUrl || 'about:tabs')}
                    className="px-3 py-1 bg-[#E1E1E1] hover:bg-[#E5F1FB] border border-[#ADADAD] rounded-[2px]"
                  >
                    Use current
                  </button>
                  <button
                    onClick={() => setHomePageInput('about:tabs')}
                    className="px-3 py-1 bg-[#E1E1E1] hover:bg-[#E5F1FB] border border-[#ADADAD] rounded-[2px]"
                  >
                    Use default
                  </button>
                  <button
                    onClick={() => setHomePageInput('about:blank')}
                    className="px-3 py-1 bg-[#E1E1E1] hover:bg-[#E5F1FB] border border-[#ADADAD] rounded-[2px]"
                  >
                    Use new tab
                  </button>
                </div>
              </fieldset>

              {/* Startup section */}
              <fieldset className="border border-[#D9D9D9] p-3 rounded-[2px]">
                <legend className="px-1 text-[#0072C6] font-semibold">Startup</legend>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="startup" defaultChecked className="accent-[#0072C6]" />
                  <span>Start with tabs from the last session</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input type="radio" name="startup" className="accent-[#0072C6]" />
                  <span>Start with home page</span>
                </label>
              </fieldset>

              {/* Browsing history section */}
              <fieldset className="border border-[#D9D9D9] p-3 rounded-[2px]">
                <legend className="px-1 text-[#0072C6] font-semibold">Browsing history</legend>
                <div className="flex items-center justify-between">
                  <span className="text-[#555555]">
                    Delete temporary files, history, cookies, saved passwords, and web form info.
                  </span>
                  <button
                    onClick={() => {
                      onClearHistory();
                      setHistoryDeletedFeedback(true);
                      setTimeout(() => setHistoryDeletedFeedback(false), 2000);
                    }}
                    className="px-4 py-1 bg-[#E1E1E1] hover:bg-[#E5F1FB] hover:border-[#0078D7] border border-[#ADADAD] rounded-[2px] shrink-0 ml-3"
                  >
                    {historyDeletedFeedback ? 'Deleted!' : 'Delete...'}
                  </button>
                </div>
              </fieldset>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="flex flex-col gap-4">
              <div className="text-[#555555]">
                Select a zone to view or change security settings.
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 border border-[#0078D7] bg-[#E5F1FB] rounded flex flex-col items-center">
                  <Globe size={20} className="text-[#0072C6] mb-1" />
                  <span className="font-semibold">Internet</span>
                </div>
                <div className="p-2 border border-[#D9D9D9] hover:bg-[#F9F9F9] rounded flex flex-col items-center">
                  <Shield size={20} className="text-[#107C41] mb-1" />
                  <span>Local intranet</span>
                </div>
                <div className="p-2 border border-[#D9D9D9] hover:bg-[#F9F9F9] rounded flex flex-col items-center">
                  <Check size={20} className="text-[#008272] mb-1" />
                  <span>Trusted sites</span>
                </div>
                <div className="p-2 border border-[#D9D9D9] hover:bg-[#F9F9F9] rounded flex flex-col items-center">
                  <Lock size={20} className="text-[#D83B01] mb-1" />
                  <span>Restricted</span>
                </div>
              </div>

              <fieldset className="border border-[#D9D9D9] p-3 rounded-[2px]">
                <legend className="px-1 text-[#0072C6] font-semibold">Security level for this zone</legend>
                <div className="flex items-center gap-3 mb-2">
                  <Sliders size={18} className="text-[#666666]" />
                  <div className="font-semibold uppercase tracking-wider text-[#0072C6]">
                    {securityLevel === 'medium-high' ? 'Medium-high (Default)' : securityLevel}
                  </div>
                </div>
                <p className="text-[#555555] leading-relaxed">
                  Appropriate for most Internet sites. Prompts before downloading potentially unsafe content.
                  ActiveX controls not marked safe for scripting will not be executed.
                </p>

                <div className="mt-3 pt-3 border-t border-[#EEEEEE]">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-[#222222]">
                    <input
                      type="checkbox"
                      checked={protectedMode}
                      onChange={(e) => setProtectedMode(e.target.checked)}
                      className="w-4 h-4 accent-[#0072C6]"
                    />
                    <span>Enable Protected Mode (requires restarting Ultramarine Explorer)</span>
                  </label>
                </div>
              </fieldset>
            </div>
          )}

          {/* PRIVACY TAB */}
          {activeTab === 'privacy' && (
            <div className="flex flex-col gap-4">
              <fieldset className="border border-[#D9D9D9] p-3 rounded-[2px]">
                <legend className="px-1 text-[#0072C6] font-semibold">Windows Defender SmartScreen</legend>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={smartScreen}
                    onChange={(e) => setSmartScreen(e.target.checked)}
                    className="w-4 h-4 accent-[#0072C6]"
                  />
                  <span>Turn on SmartScreen Filter to check malicious web sites and downloads</span>
                </label>
              </fieldset>

              <fieldset className="border border-[#D9D9D9] p-3 rounded-[2px]">
                <legend className="px-1 text-[#0072C6] font-semibold">Pop-up Blocker</legend>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0072C6]" />
                  <span>Turn on Pop-up Blocker</span>
                </label>
              </fieldset>

              <fieldset className="border border-[#D9D9D9] p-3 rounded-[2px]">
                <legend className="px-1 text-[#0072C6] font-semibold">InPrivate</legend>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0072C6]" />
                  <span>Disable toolbars and extensions when InPrivate Browsing starts</span>
                </label>
              </fieldset>
            </div>
          )}

          {/* ADVANCED TAB */}
          {activeTab === 'advanced' && (
            <div className="flex flex-col gap-2">
              <div className="text-[#555555] mb-1">
                Chromium & IE11 Hybrid Runtime Configuration:
              </div>
              <div className="border border-[#ABABAB] p-2 bg-[#FBFBFB] h-60 overflow-y-auto font-sans text-[11px] flex flex-col gap-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#0072C6]" />
                  <span>Accelerated graphics: Use GPU software rendering fallback</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#0072C6]" />
                  <span>Browsing: Enable Sub-pixel font smoothing</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#0072C6]" />
                  <span>Browsing: Use smooth scrolling</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#0072C6]" />
                  <span>Security: Use TLS 1.2, TLS 1.3, and QUIC protocols</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#0072C6]" />
                  <span>Security: Enable 64-bit processes for Enhanced Protected Mode</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#0072C6]" />
                  <span>Chromium: V8 TurboFan Just-In-Time execution</span>
                </label>
              </div>
            </div>
          )}

          {/* OTHER TABS (CONTENT, CONNECTIONS, PROGRAMS) */}
          {(activeTab === 'content' || activeTab === 'connections' || activeTab === 'programs') && (
            <div className="p-4 text-center text-[#666666]">
              <div className="font-semibold text-[13px] text-[#222222] mb-1">
                {activeTab.toUpperCase()} Settings
              </div>
              <div>System settings are managed automatically by the Ultramarine Chromium subsystem.</div>
            </div>
          )}
        </div>

        {/* Dialog Footer: [ OK ] [ Cancel ] [ Apply ] */}
        <div className="bg-[#F0F0F0] border-t border-[#DCDCDC] px-4 py-2.5 flex justify-end gap-2 text-[11.5px]">
          <button
            onClick={handleOk}
            className="px-5 py-1 bg-[#E1E1E1] hover:bg-[#E5F1FB] hover:border-[#0078D7] border border-[#ADADAD] rounded-[2px] font-medium"
          >
            OK
          </button>
          <button
            onClick={onClose}
            className="px-5 py-1 bg-[#E1E1E1] hover:bg-[#E5F1FB] hover:border-[#0078D7] border border-[#ADADAD] rounded-[2px]"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-1 bg-[#E1E1E1] hover:bg-[#E5F1FB] hover:border-[#0078D7] border border-[#ADADAD] rounded-[2px]"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
