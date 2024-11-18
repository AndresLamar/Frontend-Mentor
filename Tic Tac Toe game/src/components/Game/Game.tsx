import "./Game.css";
import { IconLogo, IconO, IconRestart, IconX } from "../Icons/Icons";
import { Square } from "./Square";
import { useGame } from "../../hooks/useGame";
import { PlayerSymbol } from "../../utils/types/types";
import { Modal } from "./Modal";
import { useScoreTracker } from "../../hooks/useScoreTracker";
import { useEffect } from "react";

// interface GameProps {
//   initialTurn: PlayerSymbol;
//   playerChoice: PlayerSymbol;
// }

export const Game = () => {
    const {board, currentTurn, updateBoard, resetGame, winner, isGameOver } = useGame();
    const { scores, updateScore } = useScoreTracker();

    useEffect(() => {
        if (winner !== null || isGameOver) {
          if (winner) {
            updateScore(winner);
            // if (winner === 'X') setFlashX(true);
            // if (winner === 'O') setFlashO(true);
    
            setTimeout(() => {
              // openDialog(`Player ${winner === playerChoice ? '1' : '2'} Wins!`, 'Next Round', 'Quit', winner);
              // setFlashX(false);
              // setFlashO(false);
            }, 1000);
          } else {
            updateScore(null);
            // setFlashTies(true);
    
            setTimeout(() => {
              // openDialog('Round Tied', 'Next Round', 'Quit', null);
              // setFlashTies(false);
            }, 1000);
          }
        }
      }, [winner, isGameOver, updateScore]);

//   const [board, setBoard] = useState(() => {
//     const storedBoard = window.localStorage.getItem("board");
//     return storedBoard ? JSON.parse(storedBoard) : Array(9).fill(null);
//   });
//   const [turn, setTurn] = useState(() => {
//     const storedTurn = window.localStorage.getItem("turn");
//     return storedTurn ? JSON.parse(storedTurn) : "x";
//   });
//   const [winner, setWinner] = useState<string | null | false>(null);

//   const checkWinner = (boardToCheck: string[]) => {
//     for (const combo of WINNER_COMBOS) {
//       const [a, b, c] = combo;
//       if (
//         boardToCheck[a] &&
//         boardToCheck[a] === boardToCheck[b] &&
//         boardToCheck[a] === boardToCheck[c]
//       ) {
//         return boardToCheck[a];
//       }
//     }

//     return null;
//   };

//   const checkEndGame = (newBoard: string[]) => {
//     return newBoard.every((square) => square !== null);
//   };

//   const updateBoard = (index: number) => {
//     if (board[index] || winner) return;

//     const newBoard = [...board];
//     newBoard[index] = turn;
//     setBoard(newBoard);

//     const newTurn = turn === "x" ? "o" : "x";
//     setTurn(newTurn);

//     window.localStorage.setItem("board", JSON.stringify(newBoard));
//     window.localStorage.setItem("turn", JSON.stringify(turn));

//     const newWinner = checkWinner(newBoard);
//     if (newWinner) {
//       setWinner(newWinner);
//     } else if (checkEndGame(newBoard)) {
//       setWinner(false);
//     }
//   };

//   const resetGame = () => {
//     setBoard(Array(9).fill(null));
//     setTurn("x");
//     setWinner(null);
//     window.localStorage.removeItem("board");
//     window.localStorage.removeItem("turn");
//   };

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

        <button onClick={resetGame} className="restart__button">
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

      <Modal winner={winner} resetGame={resetGame} />
    </div>
  );
};
