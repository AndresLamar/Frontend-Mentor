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