import { useCallback, useEffect, useState } from "react"
import { CpuDificulty, GameMode, PlayerSymbol } from "../utils/types/types"
import useLocalStorage from "./useLocalStorage"
import { checkWinner, getRandomMove } from "../utils/logic/logic";
import { useGameContext } from "../context/GameContext";

export const useGame  = () => {
    const [board, setBoard, removeBoardFromStorage] = useLocalStorage<Array<'X' | 'O' | null>>('board', Array(9).fill(null));
    const [initialTurn, setInitialTurn] = useLocalStorage<PlayerSymbol>('initialTurn', PlayerSymbol.X);
    const [currentTurn, setCurrentTurn, removeCurrentPlayerFromStorage] = useLocalStorage<PlayerSymbol>('currentTurn', initialTurn);
    const [winner, setWinner] = useState<PlayerSymbol | null | false>(null);
    const [isGameOver, setIsGameOver] = useState(false);

    const { cpuLevel, playerChoice, gameMode,  } = useGameContext();
    
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

    const resetBoard = useCallback(() => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setInitialTurn(PlayerSymbol.X);
        setCurrentTurn(PlayerSymbol.X);
        setIsGameOver(false);
    }, []);

    useEffect(() => {
        const cpuPlayer = playerChoice === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X;
    
        // If in CPU mode and it's CPU's turn
        if (gameMode === GameMode.CPU && currentTurn === cpuPlayer && !isGameOver && !winner) {
        //   const bestMove = getRandomMove([...board], cpuPlayer, playerChoice);
          if (cpuLevel == CpuDificulty.EASY) {
            const move = getRandomMove(board); // Obtenemos un movimiento aleatorio
            if (move !== null) { // Verificamos que no sea `null`
                setTimeout(() => updateBoard(move), 500);
            }
          }
        }
      }, [board, currentTurn, gameMode, winner, isGameOver, initialTurn, updateBoard, playerChoice]);

    return {
        currentTurn,
        setCurrentTurn,
        removeCurrentPlayerFromStorage,
        board,
        winner,
        updateBoard,
        removeBoardFromStorage,
        resetBoard,
        initialTurn,
        isGameOver,
    };
}