import React, { useState } from 'react';
import { Search, BookOpen, ExternalLink } from 'lucide-react';

interface WikipediaPageProps {
  onNavigate: (url: string) => void;
}

export const WikipediaPage: React.FC<WikipediaPageProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');

  const articles = [
    {
      id: 'ie11',
      title: 'Internet Explorer 11',
      extract:
        'Internet Explorer 11 (IE11) is the eleventh and final version of the Internet Explorer web browser by Microsoft. It was officially released on October 17, 2013 for Windows 8.1 and on November 7, 2013 for Windows 7. Key features included an integrated OneBox address bar with tabs alongside, SPDY/HTTP2 support, WebGL 3D canvas acceleration, Enhanced Protected Mode, and completely redesigned F12 Developer Tools.',
      link: 'https://en.wikipedia.org/wiki/Internet_Explorer_11',
    },
    {
      id: 'chromium',
      title: 'Chromium (web browser)',
      extract:
        'Chromium is a free and open-source web browser project, primarily developed and maintained by Google. It provides the vast majority of code for Google Chrome, Microsoft Edge, Opera, and Ultramarine Explorer. Chromium uses the Blink layout engine and V8 JavaScript virtual machine.',
      link: 'https://en.wikipedia.org/wiki/Chromium_(web_browser)',
    },
    {
      id: 'blink',
      title: 'Blink (browser engine)',
      extract:
        'Blink is a browser engine developed as part of the Chromium project with contributions from Google, Microsoft, Meta, Adobe, Intel, and others. It was first announced in April 2013 as a fork of the WebCore component of WebKit.',
      link: 'https://en.wikipedia.org/wiki/Blink_(browser_engine)',
    },
  ];

  return (
    <div className="w-full h-full bg-[#FFFFFF] overflow-y-auto font-serif text-[#202122] select-text p-8">
      <div className="max-w-4xl mx-auto">
        {/* Wikipedia Header */}
        <div className="flex items-center justify-between border-b border-[#A2A9B1] pb-4 mb-6 font-sans">
          <div className="flex items-center gap-3">
            <BookOpen size={36} className="text-[#333333]" />
            <div>
              <h1 className="text-[26px] font-serif font-normal text-[#000000]">WIKIPEDIA</h1>
              <p className="text-[12px] text-[#54595D]">The Free Encyclopedia</p>
            </div>
          </div>

          <div className="flex items-center border border-[#72777D] rounded-[2px] px-2 py-1 bg-white">
            <Search size={14} className="text-[#54595D] mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Wikipedia"
              className="bg-transparent outline-none text-[13px] font-sans"
            />
          </div>
        </div>

        {/* Featured Encyclopedia Articles */}
        <div className="flex flex-col gap-8">
          {articles.map((art) => (
            <article key={art.id} className="border-b border-[#EAECF0] pb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[22px] font-serif font-normal text-[#000000] hover:underline cursor-pointer">
                  {art.title}
                </h2>
                <button
                  onClick={() => onNavigate(art.link)}
                  className="text-[12px] text-[#3366CC] hover:underline flex items-center gap-1 font-sans"
                >
                  <span>Open live page</span>
                  <ExternalLink size={12} />
                </button>
              </div>
              <p className="text-[15px] leading-relaxed text-[#202122]">{art.extract}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
