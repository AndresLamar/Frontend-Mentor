import { WINNER_COMBOS } from "../constants/constants";

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

export const getRandomMove = (boardToCheck: Array<'X' | 'O' | null>): number | null => {
  const emptyCells = boardToCheck.map((cell, index) => (cell === null ? index : null)).filter((index) => index !== null);
  if (emptyCells.length === 0) {
    return null; // Return null if no empty cells are found
  } else {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)] as number; // Return random empty cell index
  }
};
