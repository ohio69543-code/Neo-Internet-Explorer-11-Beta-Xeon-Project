import React, { useState } from 'react';
import { Delete, RotateCcw } from 'lucide-react';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);
  const [memory, setMemory] = useState<number>(0);

  const handleDigit = (digit: string) => {
    if (display === '0' || resetNext) {
      setDisplay(digit);
      setResetNext(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDecimal = () => {
    if (resetNext) {
      setDisplay('0.');
      setResetNext(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOp = (op: string) => {
    const current = parseFloat(display);
    if (prevValue !== null && operation && !resetNext) {
      const res = calculate(prevValue, current, operation);
      setDisplay(String(res));
      setPrevValue(res);
    } else {
      setPrevValue(current);
    }
    setOperation(op);
    setResetNext(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b === 0 ? 0 : a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (prevValue === null || !operation) return;
    const current = parseFloat(display);
    const res = calculate(prevValue, current, operation);
    setDisplay(String(res));
    setPrevValue(null);
    setOperation(null);
    setResetNext(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setResetNext(false);
  };

  const handleBackspace = () => {
    if (display.length <= 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleSqrt = () => {
    const current = parseFloat(display);
    if (current >= 0) {
      setDisplay(String(Math.sqrt(current)));
      setResetNext(true);
    }
  };

  const handlePercent = () => {
    const current = parseFloat(display);
    setDisplay(String(current / 100));
    setResetNext(true);
  };

  const handleNegate = () => {
    const current = parseFloat(display);
    setDisplay(String(-current));
  };

  return (
    <div className="w-full h-full bg-[#E5ECF4] flex items-center justify-center p-4 font-['Segoe_UI',_Tahoma,_sans-serif] select-none">
      {/* Authentic Windows 7 / 8 / 10 Calculator Box */}
      <div className="w-72 bg-[#F0F0F0] border-2 border-[#A0A0A0] rounded-sm shadow-xl flex flex-col p-2.5">
        {/* Title bar inside app */}
        <div className="flex items-center justify-between pb-2 border-b border-[#D0D0D0] mb-2 text-[12px] text-[#333333]">
          <span className="font-semibold">Windows Calculator (Standard)</span>
          <span className="text-[10px] text-[#777777]">Neo-IE App</span>
        </div>

        {/* Display Screen */}
        <div className="w-full bg-white border border-[#ABADB3] rounded-[2px] p-2 text-right mb-3 shadow-inner flex flex-col justify-center h-14">
          <div className="text-[11px] text-[#888888] h-3">
            {prevValue !== null && operation ? `${prevValue} ${operation}` : ''}
          </div>
          <div className="text-[24px] font-mono font-bold text-[#111111] overflow-hidden truncate">
            {display}
          </div>
        </div>

        {/* Memory Strip */}
        <div className="grid grid-cols-5 gap-1 mb-2">
          <button
            onClick={() => setMemory(0)}
            className="py-1 bg-[#E1E1E1] hover:bg-[#D5D5D5] border border-[#ADADAD] rounded-[2px] text-[10px] font-semibold text-[#444444]"
          >
            MC
          </button>
          <button
            onClick={() => {
              setDisplay(String(memory));
              setResetNext(true);
            }}
            className="py-1 bg-[#E1E1E1] hover:bg-[#D5D5D5] border border-[#ADADAD] rounded-[2px] text-[10px] font-semibold text-[#444444]"
          >
            MR
          </button>
          <button
            onClick={() => setMemory(parseFloat(display))}
            className="py-1 bg-[#E1E1E1] hover:bg-[#D5D5D5] border border-[#ADADAD] rounded-[2px] text-[10px] font-semibold text-[#444444]"
          >
            MS
          </button>
          <button
            onClick={() => setMemory(memory + parseFloat(display))}
            className="py-1 bg-[#E1E1E1] hover:bg-[#D5D5D5] border border-[#ADADAD] rounded-[2px] text-[10px] font-semibold text-[#444444]"
          >
            M+
          </button>
          <button
            onClick={() => setMemory(memory - parseFloat(display))}
            className="py-1 bg-[#E1E1E1] hover:bg-[#D5D5D5] border border-[#ADADAD] rounded-[2px] text-[10px] font-semibold text-[#444444]"
          >
            M-
          </button>
        </div>

        {/* Calculator Keypad Grid */}
        <div className="grid grid-cols-4 gap-1.5 text-[13px] font-medium">
          <button
            onClick={handleBackspace}
            className="py-2 bg-[#E1E1E1] hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px]"
          >
            ←
          </button>
          <button
            onClick={() => setDisplay('0')}
            className="py-2 bg-[#E1E1E1] hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px]"
          >
            CE
          </button>
          <button
            onClick={handleClear}
            className="py-2 bg-[#E1E1E1] hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px]"
          >
            C
          </button>
          <button
            onClick={handleNegate}
            className="py-2 bg-[#E1E1E1] hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px]"
          >
            ±
          </button>

          <button
            onClick={() => handleDigit('7')}
            className="py-2 bg-white hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px] font-bold text-[14px]"
          >
            7
          </button>
          <button
            onClick={() => handleDigit('8')}
            className="py-2 bg-white hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px] font-bold text-[14px]"
          >
            8
          </button>
          <button
            onClick={() => handleDigit('9')}
            className="py-2 bg-white hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px] font-bold text-[14px]"
          >
            9
          </button>
          <button
            onClick={() => handleOp('÷')}
            className="py-2 bg-[#E1E1E1] hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px]"
          >
            ÷
          </button>

          <button
            onClick={() => handleDigit('4')}
            className="py-2 bg-white hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px] font-bold text-[14px]"
          >
            4
          </button>
          <button
            onClick={() => handleDigit('5')}
            className="py-2 bg-white hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px] font-bold text-[14px]"
          >
            5
          </button>
          <button
            onClick={() => handleDigit('6')}
            className="py-2 bg-white hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px] font-bold text-[14px]"
          >
            6
          </button>
          <button
            onClick={() => handleOp('×')}
            className="py-2 bg-[#E1E1E1] hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px]"
          >
            ×
          </button>

          <button
            onClick={() => handleDigit('1')}
            className="py-2 bg-white hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px] font-bold text-[14px]"
          >
            1
          </button>
          <button
            onClick={() => handleDigit('2')}
            className="py-2 bg-white hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px] font-bold text-[14px]"
          >
            2
          </button>
          <button
            onClick={() => handleDigit('3')}
            className="py-2 bg-white hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px] font-bold text-[14px]"
          >
            3
          </button>
          <button
            onClick={() => handleOp('-')}
            className="py-2 bg-[#E1E1E1] hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px]"
          >
            -
          </button>

          <button
            onClick={() => handleDigit('0')}
            className="col-span-2 py-2 bg-white hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px] font-bold text-[14px]"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="py-2 bg-white hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px] font-bold text-[14px]"
          >
            .
          </button>
          <button
            onClick={() => handleOp('+')}
            className="py-2 bg-[#E1E1E1] hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px]"
          >
            +
          </button>

          <button
            onClick={handleSqrt}
            className="py-2 bg-[#E1E1E1] hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px]"
          >
            √
          </button>
          <button
            onClick={handlePercent}
            className="py-2 bg-[#E1E1E1] hover:bg-[#BEE6FD] border border-[#ADADAD] hover:border-[#3C7FB1] rounded-[2px]"
          >
            %
          </button>
          <button
            onClick={handleEquals}
            className="col-span-2 py-2 bg-[#0078D7] text-white hover:bg-[#005A9E] border border-[#005A9E] rounded-[2px] font-bold text-[15px]"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};
