import React, { useState } from 'react';
import { Save, FileText, Download, Copy, Check } from 'lucide-react';

export const NotepadApp: React.FC = () => {
  const [text, setText] = useState<string>(
    'Neo-Internet Explorer 11 - Notepad\n\nWelcome to the integrated Windows Notepad for Neo-Internet Explorer 11.\nYou can use this in-app notepad to type scratch notes, code snippets, or draft documents while browsing!\n\nFeatures:\n- Word Wrap Toggle\n- Status bar with line & column counter\n- Download note as .txt file\n- Full clipboard copy\n\nEnjoy browsing with Neo-Internet Explorer 11!'
  );
  const [wordWrap, setWordWrap] = useState(true);
  const [copied, setCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    updateCursor(e.target);
  };

  const updateCursor = (textarea: HTMLTextAreaElement) => {
    const textUpToCursor = textarea.value.slice(0, textarea.selectionStart);
    const lines = textUpToCursor.split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1,
    });
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NeoIE_Note.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#FFFFFF] flex flex-col font-['Lucida_Console',_'Courier_New',_monospace] select-text">
      {/* Authentic Classic Notepad Menu Bar */}
      <div className="bg-[#F0F0F0] border-b border-[#D8D8D8] px-2 py-1 flex items-center justify-between text-[12px] font-['Segoe_UI',_Tahoma,_sans-serif] text-[#222222] select-none shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setText('')}
            className="hover:bg-[#E5F1FB] hover:text-[#0078D7] px-2 py-0.5 rounded-[2px]"
          >
            New
          </button>
          <button
            onClick={handleDownload}
            className="hover:bg-[#E5F1FB] hover:text-[#0078D7] px-2 py-0.5 rounded-[2px] flex items-center gap-1"
          >
            <Save size={12} />
            <span>Save (.txt)</span>
          </button>
          <button
            onClick={() => setWordWrap(!wordWrap)}
            className={`px-2 py-0.5 rounded-[2px] ${
              wordWrap ? 'bg-[#CCE8FF] text-[#0060A8] font-semibold' : 'hover:bg-[#E5F1FB]'
            }`}
          >
            Word Wrap: {wordWrap ? 'On' : 'Off'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] bg-white border border-[#CCCCCC] hover:border-[#0078D7] px-2 py-0.5 rounded-[2px]"
          >
            {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
            <span>{copied ? 'Copied' : 'Copy All'}</span>
          </button>
        </div>
      </div>

      {/* Notepad Text Editor Canvas */}
      <textarea
        value={text}
        onChange={handleTextChange}
        onKeyUp={(e) => updateCursor(e.currentTarget)}
        onClick={(e) => updateCursor(e.currentTarget)}
        className={`flex-1 w-full p-4 outline-none resize-none text-[14px] leading-relaxed bg-white text-[#111111] font-mono ${
          wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto'
        }`}
        spellCheck={false}
      />

      {/* Notepad Status Bar */}
      <div className="bg-[#F0F0F0] border-t border-[#D8D8D8] px-4 py-1 flex items-center justify-between text-[11px] font-['Segoe_UI',_Tahoma,_sans-serif] text-[#555555] shrink-0 select-none">
        <div>Ready</div>
        <div className="flex items-center gap-6">
          <span>
            Ln {cursorPos.line}, Col {cursorPos.col}
          </span>
          <span>100%</span>
          <span>Windows (CRLF)</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
};
