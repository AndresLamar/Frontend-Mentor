import './App.css'
import { Game, StartMenu } from './components'
import { useGameContext } from './context/GameContext'
import { useGame } from './hooks/useGame';
import { GameMode, PlayerSymbol } from './utils/types/types';

function App() {
  const { setGameMode, isGameStarted, setIsGameStarted, setPlayerChoice, setInitialTurn } = useGameContext();
  const {} = useGame()

  const startGame = (mode: GameMode, choice: PlayerSymbol) => {
    setGameMode(mode);
    setIsGameStarted(true);
    setPlayerChoice(choice);
    // setGameMode(mode);
    setInitialTurn(PlayerSymbol.X);
  };


  return (
    <>
    <main>
      {
        isGameStarted ? (
          <Game />
        ) : (
          <StartMenu startGame={startGame} /> 
        )
      }
    </main>
    </>
  )
}

export default App
