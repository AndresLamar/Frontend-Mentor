import { WINNER_COMBOS } from "../constants/constants";
import { PlayerSymbol } from "../types/types";

export const checkWinner = (boardToCheck: Array<'X' | 'O' | null>): { winner: 'X' | 'O' | null;} => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return {winner: boardToCheck[a]};
      }
    }

    return {winner: null};
};

export const checkEndGame = (newBoard: Array<'X' | 'O' | null>) => {
    return newBoard.every((square) => square !== null);
};

export const getRandomMove = (boardToCheck: Array<'X' | 'O' | null>): number | null => {
  const emptyCells = boardToCheck.map((cell, index) => (cell === null ? index : null)).filter((index) => index !== null);
  if (emptyCells.length === 0) {
    return null; // Return null if no empty cells are found
  } else {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)] as number; // Return random empty cell index
  }
};


export const getBlockingMove = (board: Array<'X' | 'O' | null>, playerSymbol: string): number | null => {
  for (let combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    const line = [board[a], board[b], board[c]];

    if (line.filter((cell) => cell === playerSymbol).length === 2 && line.includes(null)) {
      return combo[line.indexOf(null)];
    }
  }

  return null;
};

export const getBestMove = (board: Array<'X' | 'O' | null>, playerSymbol: string, cpuSymbol: string): number | null=> {
  // Intentar ganar
  const winningMove = getBlockingMove(board, cpuSymbol);
  if (winningMove !== null) return winningMove;

  // Intentar bloquear
  const blockingMove = getBlockingMove(board, playerSymbol);
  if (blockingMove !== null) return blockingMove;

  // Movimiento aleatorio
  const randomMove = getRandomMove(board);
  if(randomMove !== null) return randomMove

  return null
};

const minimax = (board: Array<'X' | 'O' | null>, depth: number, isMaximizing: boolean, playerSymbol: PlayerSymbol, cpuSymbol: PlayerSymbol): number => {
  const result  = checkWinner(board);
  if (result?.winner === cpuSymbol) return 10 - depth;
  if (result?.winner === playerSymbol) return depth - 10;
  if (checkEndGame(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = cpuSymbol;
        const score = minimax(board, depth + 1, false, playerSymbol, cpuSymbol);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = playerSymbol;
        const score = minimax(board, depth + 1, true, playerSymbol, cpuSymbol);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

export const getMinimaxMove = (board: Array<'X' | 'O' | null>, playerSymbol: PlayerSymbol, cpuSymbol: PlayerSymbol): number => {
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = cpuSymbol;
      const score = minimax(board, 0, false, playerSymbol, cpuSymbol);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

