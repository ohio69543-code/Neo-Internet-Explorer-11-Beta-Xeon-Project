import React, { useState, useEffect } from 'react';

export const Acid3Page: React.FC = () => {
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current += 2;
      if (current >= 100) {
        current = 100;
        setScore(100);
        setIsFinished(true);
        clearInterval(timer);
      } else {
        setScore(current);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#FFFFFF] overflow-y-auto p-10 font-serif text-[#111111] select-none flex flex-col items-center justify-center">
      <div className="max-w-2xl text-center">
        <h1 className="text-[28px] font-bold mb-4 font-sans tracking-tight">The Acid3 Test</h1>
        <p className="text-[13px] text-[#555] mb-8 font-sans">
          Testing web standards compliance in DOM, CSS3, ECMAScript, SVG, and Data URIs.
        </p>

        {/* The Iconic Acid3 score counter and color bars */}
        <div className="border-4 border-[#000000] p-8 inline-block bg-[#F8F9FA] shadow-md">
          <div className="text-[72px] font-extrabold font-mono text-[#111111] leading-none mb-6">
            {score}/100
          </div>

          {/* Test boxes */}
          <div className="grid grid-cols-6 gap-1.5 w-64 mx-auto mb-4">
            <div className="h-6 bg-[#E81123]" />
            <div className="h-6 bg-[#FFB900]" />
            <div className="h-6 bg-[#107C41]" />
            <div className="h-6 bg-[#0078D7]" />
            <div className="h-6 bg-[#5C2D91]" />
            <div className="h-6 bg-[#008272]" />
          </div>

          {isFinished ? (
            <div className="text-[16px] font-bold text-[#107C41] font-sans animate-bounce">
              YOU SHOULD SEE A MATCHING COLOURED RECTANGLE ABOVE: TEST PASSED!
            </div>
          ) : (
            <div className="text-[13px] text-[#888] font-sans">Running automated test harness...</div>
          )}
        </div>

        <div className="mt-8 text-[12px] text-[#777] font-sans">
          Ultramarine Explorer 11.0 (Chromium Core / Blink Rendering Engine)
        </div>
      </div>
    </div>
  );
};
