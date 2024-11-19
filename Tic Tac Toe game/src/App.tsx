import './App.css'
import { Game, StartMenu } from './components'
import { useGameContext } from './context/GameContext'
import { useGame } from './hooks/useGame';
import { useScoreTracker } from './hooks/useScoreTracker';
import { GameMode, PlayerSymbol } from './utils/types/types';

function App() {
  const { setGameMode, removeGameModeFromStorage, isGameStarted, setIsGameStarted, removeGameStartedFromStorage, setPlayerChoice, setInitialTurn, removeInitialPlayer, removePlayerChoiceFromStorage } = useGameContext();
  const { removeCurrentPlayerFromStorage, removeBoardFromStorage } = useGame();
  const { removeScoresFromStorage } = useScoreTracker();


  const startGame = (mode: GameMode, choice: PlayerSymbol) => {
    setGameMode(mode);
    setIsGameStarted(true);
    setPlayerChoice(choice);
    setInitialTurn(PlayerSymbol.X);
  };

  const restartGame = () => {
    setIsGameStarted(false);
    removeInitialPlayer();
    removeGameStartedFromStorage();
    removeGameModeFromStorage();
    removePlayerChoiceFromStorage();
    removeCurrentPlayerFromStorage();
    removeScoresFromStorage();
    removeBoardFromStorage();
  };


  return (
    <>
    <main>
      {
        isGameStarted ? (
          <Game restartGame={restartGame}/>
        ) : (
          <StartMenu startGame={startGame} /> 
        )
      }
    </main>
    </>
  )
}

export default App
