import { useGameContext } from "../../context/GameContext";
import { GameMode, PlayerSymbol } from "../../utils/types/types";
import { IconO, IconX } from "../Icons/Icons"

interface ModalProps{
    winner: PlayerSymbol | null | false;
    resetGame: () => void;
    isDialogOpen: boolean;
    message: string;
    handleNextRound: () => void;
}

export const Modal = ({ winner, resetGame, isDialogOpen, message, handleNextRound } : ModalProps) => {    
    const { setIsGameStarted, playerChoice, gameMode } = useGameContext()

    if(!isDialogOpen) return;

    const handleQuitGame = () => {
        resetGame();
        setTimeout(() => setIsGameStarted(false), 0);
    }

    const winningPlayer = winner === playerChoice ? '1' : '2';

    return(
        <section className="result__modal">
            <div className="result">
                {winner && (
                    <>
                    {gameMode === GameMode.MULTIPLAYER ? (
                        <h2 className="result__text">
                            Player {winningPlayer} wins!
                        </h2>
                    ) : (
                        <h2 className="result__text">
                            {winner === playerChoice ? 'You won!' : 'Oh no, you lost...'}
                        </h2>
                    )}
                    </>
                )}
                {winner && (
                    <p className={`result__winner ${winner === PlayerSymbol.X ? 'x-winner' : 'o-winner'}`}>
                        <span className="winner__icon">
                        {winner === PlayerSymbol.X ? <IconX/> : <IconO />}
                        </span> takes the round 
                    </p>
                )}
                {!winner && (
                    <p className="result__text tied">
                        {message}
                    </p>
                )}

                <div className="result__options">
                    <button className="quit__button button" onClick={handleQuitGame} >
                        quit
                    </button>
                    <button className="next__button button" onClick={handleNextRound}>
                        next round
                    </button>
                </div>
            </div>
        </section>
    )   
}