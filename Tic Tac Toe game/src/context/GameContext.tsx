import { createContext, useContext } from "react";
import { CpuDificulty, GameMode, PlayerSymbol } from "../utils/types/types";
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
  cpuLevel: CpuDificulty;
  setCpuLevel: React.Dispatch<React.SetStateAction<CpuDificulty>>;
  removeCpuLevelFromStorage: () => void;
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
  cpuLevel: CpuDificulty.EASY,
  setCpuLevel: () => {},
  removeCpuLevelFromStorage: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [isGameStarted, setIsGameStarted, removeGameStartedFromStorage] = useLocalStorage('gameStarted', false);
  const [gameMode, setGameMode, removeGameModeFromStorage] = useLocalStorage<GameMode>('gameModep', GameMode.MULTIPLAYER);
  const [playerChoice, setPlayerChoice, removePlayerChoiceFromStorage] = useLocalStorage<PlayerSymbol>('playerChoice', PlayerSymbol.X);
  const [initialTurn, setInitialTurn, removeInitialPlayer] = useLocalStorage<PlayerSymbol>('initialTurn', PlayerSymbol.X);
  const [cpuLevel, setCpuLevel, removeCpuLevelFromStorage] = useLocalStorage<CpuDificulty>('cpuLevel', CpuDificulty.EASY);

  return (
      <GameContext.Provider value={{ isGameStarted, gameMode, setIsGameStarted, removeGameStartedFromStorage, setGameMode, removeGameModeFromStorage,  playerChoice, setPlayerChoice, removePlayerChoiceFromStorage, initialTurn, setInitialTurn, removeInitialPlayer, cpuLevel, setCpuLevel, removeCpuLevelFromStorage }}>
          {children}
      </GameContext.Provider>
)}

export function useGameContext() {
  return useContext(GameContext);
}
  
  