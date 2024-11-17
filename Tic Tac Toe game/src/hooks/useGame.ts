import { useCallback, useState } from "react"
import { PlayerSymbol } from "../utils/types/types"
import useLocalStorage from "./useLocalStorage"
import { checkWinner } from "../utils/logic/logic";

export const useGame  = () => {
    const [board, setBoard] = useLocalStorage<Array<'X' | 'O' | null>>('board', Array(9).fill(null));
    const [initialTurn, setInitialTurn] = useLocalStorage<PlayerSymbol>('initialTurn', PlayerSymbol.X);
    const [currentTurn, setCurrentTurn] = useLocalStorage<PlayerSymbol>('currentTurn', initialTurn);
    const [winner, setWinner] = useState<PlayerSymbol | null | false>(null);
    const [isGameOver, setIsGameOver] = useState(false);
    
    const checkEndGame = (newBoard: Array<'X' | 'O' | null>) => {
      return newBoard.every((square) => square !== null);
    };

    const updateBoard = useCallback((index: number) => {
        if (board[index] || isGameOver) return;

        const newBoard = [...board];
        newBoard[index] = currentTurn;
        setBoard(newBoard);

        const newTurn = currentTurn === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X;
        setCurrentTurn(newTurn);

        const { winner } = checkWinner(newBoard);
        if (winner) {
            setWinner(winner as PlayerSymbol);
            setInitialTurn((prevTurn) => (prevTurn === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X))
            setIsGameOver(true);
        } else if (checkEndGame(newBoard)) {
            setWinner(false);
            setIsGameOver(true);
        }
    }, [board, currentTurn, isGameOver, setCurrentTurn, setInitialTurn]);

    const resetGame = useCallback(() => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setInitialTurn(PlayerSymbol.X);
        setCurrentTurn(PlayerSymbol.X);
        setIsGameOver(false);
    }, []);

    return {
        currentTurn,
        setCurrentTurn,
        board,
        winner,
        updateBoard,
        resetGame,
        initialTurn,
        isGameOver
      };
}