import "./Game.css";
import { IconLogo, IconO, IconRestart, IconX } from "../Icons/Icons";
import { Square } from "./Square";
import { useGame } from "../../hooks/useGame";
import { PlayerSymbol } from "../../utils/types/types";
import { Modal } from "./Modal";
import { useScoreTracker } from "../../hooks/useScoreTracker";
import { useEffect } from "react";
import { useDialog } from "../../hooks/useDialog";
import { useGameContext } from "../../context/GameContext";

interface GameProps {
  restartGame: () => void;
}

export const Game = ({ restartGame }: GameProps) => {
    const { board, currentTurn, updateBoard, resetBoard, winner, isGameOver, setCurrentTurn } = useGame();
    const { playerChoice, initialTurn  } = useGameContext()
    const { scores, updateScore } = useScoreTracker();
    const { isDialogOpen, dialogMessage, openDialog, closeDialog } = useDialog();

    const handleNextRound = () => {
      resetBoard();
      closeDialog();
      setCurrentTurn(initialTurn);
    };

    useEffect(() => {
        if (winner !== null || isGameOver) {
          if (winner) {
            updateScore(winner);
            // if (winner === 'X') setFlashX(true);
            // if (winner === 'O') setFlashO(true);
    
            setTimeout(() => {
              openDialog(`Player ${winner === playerChoice ? '1' : '2'} Wins!`, 'Next Round', 'Quit', winner);
              // setFlashX(false);
              // setFlashO(false);
            }, 500);
          } else {
            updateScore(null);
            // setFlashTies(true);
    
            setTimeout(() => {
              openDialog('Round Tied', 'Next Round', 'Quit', null);
              // setFlashTies(false);
            }, 500);
          }
        }
      }, [winner, isGameOver, updateScore]);

  return (
    <div className="board">
      <header className="board__header">
        <div className="game__logo">
          <IconLogo />
        </div>
        {currentTurn == PlayerSymbol.X ? (
          <span className="turn__text">
            <IconX /> turn
          </span>
        ) : (
          <span className="turn__text">
            <IconO /> turn
          </span>
        )}

        <button onClick={resetBoard} className="restart__button">
          <IconRestart />
        </button>
      </header>

      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} updateBoard={updateBoard} index={index} className={`${_ ? 'ocuppied' : `${currentTurn === PlayerSymbol.X ? 'x-hover' : 'o-hover'}`}`} >
              {board[index] == PlayerSymbol.X ?
                <div className="icon-x icon">
                    <IconX />
                </div>
                : board[index] == PlayerSymbol.O ?
                <div className="icon-o icon">
                  <IconO />
                </div>
                  : ''
              }
            </Square>
          );
        })}
      </section>

      <footer className="results__footer">
        <div className="score x-score">
          <span>x (you)</span>
          <span className="number">{scores.X}</span>
        </div>
        <div className="score ties-score">
          <span>ties</span>
          <span className="number">{scores.ties}</span>
        </div>
        <div className="score o-score">
          <span>o (you)</span>
          <span className="number">{scores.O}</span>
        </div>
      </footer>

      <Modal isDialogOpen={isDialogOpen} winner={winner} resetGame={restartGame} message={dialogMessage} handleNextRound={handleNextRound} />
    </div>
  );
};
