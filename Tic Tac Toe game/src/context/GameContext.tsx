import { createContext, useContext } from "react";
import { GameMode, PlayerSymbol } from "../utils/types/types";
import useLocalStorage from "../hooks/useLocalStorage";
  
interface GameContextProps {
  isGameStarted: boolean;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  removeGameStartedFromStorage: () => void;
  gameMode: GameMode;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
  removeGameModeFromStorage: () => void;
  playerChoice: PlayerSymbol;
  setPlayerChoice: React.Dispatch<React.SetStateAction<PlayerSymbol>>;
  removePlayerChoiceFromStorage: () => void;
  initialTurn: PlayerSymbol;
  setInitialTurn: React.Dispatch<React.SetStateAction<PlayerSymbol>>;
  removeInitialPlayer: () => void;
}

export const GameContext = createContext<GameContextProps>({
  isGameStarted: false,
  setIsGameStarted: () => {},
  removeGameStartedFromStorage: () => {},
  gameMode: GameMode.MULTIPLAYER,
  setGameMode: () => {},
  removeGameModeFromStorage: () => {},
  playerChoice: PlayerSymbol.X,
  setPlayerChoice: () => {},
  removePlayerChoiceFromStorage: () => {},
  initialTurn: PlayerSymbol.X,
  setInitialTurn: () => {},
  removeInitialPlayer: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [isGameStarted, setIsGameStarted, removeGameStartedFromStorage] = useLocalStorage('gameStarted', false);
  const [gameMode, setGameMode, removeGameModeFromStorage] = useLocalStorage<GameMode>('gameModep', GameMode.MULTIPLAYER);
  const [playerChoice, setPlayerChoice, removePlayerChoiceFromStorage] = useLocalStorage<PlayerSymbol>('playerChoice', PlayerSymbol.X);
  const [initialTurn, setInitialTurn, removeInitialPlayer] = useLocalStorage<PlayerSymbol>('initialTurn', PlayerSymbol.X);

  return (
      <GameContext.Provider value={{ isGameStarted, gameMode, setIsGameStarted, removeGameStartedFromStorage, setGameMode, removeGameModeFromStorage,  playerChoice, setPlayerChoice, removePlayerChoiceFromStorage, initialTurn, setInitialTurn, removeInitialPlayer }}>
          {children}
      </GameContext.Provider>
)}

export function useGameContext() {
  return useContext(GameContext);
}
  
  