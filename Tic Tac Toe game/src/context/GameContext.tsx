import { createContext, useContext, useState } from "react";
import { GameMode, PlayerSymbol } from "../utils/types/types";
import useLocalStorage from "../hooks/useLocalStorage";
  
interface GameContextProps {
  isGameStarted: boolean;
  gameMode: GameMode;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
  playerChoice: PlayerSymbol;
  setPlayerChoice: React.Dispatch<React.SetStateAction<PlayerSymbol>>;
  removePlayerChoiceFromStorage: () => void;
  initialTurn: PlayerSymbol;
  setInitialTurn: React.Dispatch<React.SetStateAction<PlayerSymbol>>;
}

export const GameContext = createContext<GameContextProps>({
  isGameStarted: false,
  gameMode: GameMode.MULTIPLAYER,
  setIsGameStarted: () => {},
  setGameMode: () => {},
  playerChoice: PlayerSymbol.X,
  setPlayerChoice: () => {},
  removePlayerChoiceFromStorage: () => {},
  initialTurn: PlayerSymbol.X,
  setInitialTurn: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.MULTIPLAYER);
  const [playerChoice, setPlayerChoice, removePlayerChoiceFromStorage] = useLocalStorage<PlayerSymbol>('playerChoice', PlayerSymbol.X);
  const [initialTurn, setInitialTurn] = useLocalStorage<PlayerSymbol>('initialTurn', PlayerSymbol.X);

  return (
      <GameContext.Provider value={{ isGameStarted, gameMode, setIsGameStarted, setGameMode, playerChoice, setPlayerChoice, removePlayerChoiceFromStorage, initialTurn, setInitialTurn }}>
          {children}
      </GameContext.Provider>
)}

export function useGameContext() {
  return useContext(GameContext);
}
  
  // Uso en un componente:
//   const GameControlPanel: React.FC = () => {
//     const { isGameStarted, setIsGameStarted, gameMode, setGameMode } =
//       useContext(GameContext);
  
//     return (
//       <div>
//         <button onClick={() => setIsGameStarted(!isGameStarted)}>
//           {isGameStarted ? "Stop Game" : "Start Game"}
//         </button>
//         <button onClick={() => setGameMode(GameMode.MULTIPLAYER)}>
//           Switch to Multiplayer
//         </button>
//         <p>Game Started: {isGameStarted ? "Yes" : "No"}</p>
//         <p>Game Mode: {gameMode}</p>
//       </div>
//     );
//   };
  