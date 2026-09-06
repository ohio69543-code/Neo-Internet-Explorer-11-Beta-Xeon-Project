import React, { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Trophy } from 'lucide-react';

interface Cell {
  r: number;
  c: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const ROWS = 9;
const COLS = 9;
const MINES = 10;

export const MinesweeperApp: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [mineCount, setMineCount] = useState(MINES);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Initialize board
  const initBoard = () => {
    const newBoard: Cell[][] = [];
    for (let r = 0; r < ROWS; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < COLS; c++) {
        row.push({
          r,
          c,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        });
      }
      newBoard.push(row);
    }

    // Place mines
    let placed = 0;
    while (placed < MINES) {
      const rr = Math.floor(Math.random() * ROWS);
      const cc = Math.floor(Math.random() * COLS);
      if (!newBoard[rr][cc].isMine) {
        newBoard[rr][cc].isMine = true;
        placed++;
      }
    }

    // Calculate neighbors
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newBoard[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newBoard[nr][nc].isMine) {
                count++;
              }
            }
          }
          newBoard[r][c].neighborMines = count;
        }
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setGameWon(false);
    setMineCount(MINES);
    setTimer(0);
    setTimerActive(false);
  };

  useEffect(() => {
    initBoard();
  }, []);

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && !gameOver && !gameWon) {
      interval = setInterval(() => {
        setTimer((t) => Math.min(999, t + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameOver, gameWon]);

  const revealCell = (r: number, c: number) => {
    if (gameOver || gameWon) return;
    if (!timerActive) setTimerActive(true);

    const cell = board[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    const newBoard = board.map((row) => row.map((item) => ({ ...item })));

    if (cell.isMine) {
      // Game Over - reveal all mines
      newBoard.forEach((row) =>
        row.forEach((cl) => {
          if (cl.isMine) cl.isRevealed = true;
        })
      );
      setBoard(newBoard);
      setGameOver(true);
      setTimerActive(false);
      return;
    }

    // Flood fill
    const flood = (cr: number, cc: number) => {
      if (cr < 0 || cr >= ROWS || cc < 0 || cc >= COLS) return;
      const target = newBoard[cr][cc];
      if (target.isRevealed || target.isFlagged || target.isMine) return;

      target.isRevealed = true;

      if (target.neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr !== 0 || dc !== 0) {
              flood(cr + dr, cc + dc);
            }
          }
        }
      }
    };

    flood(r, c);
    setBoard(newBoard);

    // Check Win
    let unrevealedSafe = 0;
    newBoard.forEach((row) =>
      row.forEach((cl) => {
        if (!cl.isMine && !cl.isRevealed) unrevealedSafe++;
      })
    );
    if (unrevealedSafe === 0) {
      setGameWon(true);
      setTimerActive(false);
    }
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || gameWon) return;
    const cell = board[r][c];
    if (cell.isRevealed) return;

    const newBoard = board.map((row) => row.map((item) => ({ ...item })));
    const target = newBoard[r][c];
    target.isFlagged = !target.isFlagged;
    setBoard(newBoard);
    setMineCount((mc) => (target.isFlagged ? mc - 1 : mc + 1));
  };

  const numberColors = ['', '#0000FF', '#008000', '#FF0000', '#000080', '#800000', '#008080', '#000000', '#808080'];

  return (
    <div className="w-full h-full bg-[#C0C0C0] flex items-center justify-center p-4 font-['Tahoma',_sans-serif] select-none">
      {/* Classic 3D Beveled Box */}
      <div className="bg-[#C0C0C0] border-4 border-t-white border-l-white border-b-[#808080] border-r-[#808080] p-2 flex flex-col items-center shadow-2xl">
        {/* Top Header: LCD Mine Counter, Smiley, LCD Timer */}
        <div className="w-full bg-[#C0C0C0] border-3 border-t-[#808080] border-l-[#808080] border-b-white border-r-white p-2 mb-2 flex items-center justify-between">
          {/* Mine count LCD */}
          <div className="bg-black text-[#FF0000] font-mono text-[22px] font-bold px-2 py-0.5 border border-[#808080] tracking-widest">
            {String(Math.max(-99, Math.min(999, mineCount))).padStart(3, '0')}
          </div>

          {/* Smiley Reset Button */}
          <button
            onClick={initBoard}
            className="w-9 h-9 bg-[#C0C0C0] border-3 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white flex items-center justify-center"
          >
            {gameWon ? (
              <span className="text-[20px]">😎</span>
            ) : gameOver ? (
              <span className="text-[20px]">😵</span>
            ) : (
              <span className="text-[20px]">🙂</span>
            )}
          </button>

          {/* Timer LCD */}
          <div className="bg-black text-[#FF0000] font-mono text-[22px] font-bold px-2 py-0.5 border border-[#808080] tracking-widest">
            {String(timer).padStart(3, '0')}
          </div>
        </div>

        {/* Minesweeper Grid */}
        <div className="border-3 border-t-[#808080] border-l-[#808080] border-b-white border-r-white p-1 bg-[#C0C0C0]">
          <div className="grid grid-cols-9 gap-[1px]">
            {board.map((row, r) =>
              row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  onClick={() => revealCell(r, c)}
                  onContextMenu={(e) => toggleFlag(e, r, c)}
                  className={`w-7 h-7 flex items-center justify-center font-bold text-[14px] ${
                    cell.isRevealed
                      ? 'bg-[#C0C0C0] border border-[#808080]'
                      : 'bg-[#C0C0C0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-[#808080]'
                  }`}
                >
                  {cell.isRevealed ? (
                    cell.isMine ? (
                      '💣'
                    ) : cell.neighborMines > 0 ? (
                      <span style={{ color: numberColors[cell.neighborMines] }}>
                        {cell.neighborMines}
                      </span>
                    ) : (
                      ''
                    )
                  ) : cell.isFlagged ? (
                    '🚩'
                  ) : (
                    ''
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-[10px] text-[#444444] mt-2 flex items-center justify-between w-full px-1">
          <span>Neo-IE Classic Games</span>
          <span>Left-click: Reveal | Right-click: Flag</span>
        </div>
      </div>
    </div>
  );
};
