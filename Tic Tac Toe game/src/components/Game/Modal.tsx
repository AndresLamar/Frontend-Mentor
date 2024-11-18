import { useGameContext } from "../../context/GameContext";
import { PlayerSymbol } from "../../utils/types/types";
import { IconO, IconX } from "../Icons/Icons"

interface ModalProps{
    winner: PlayerSymbol | null | false;
    resetGame: () => void;
}

export const Modal = ({ winner, resetGame } : ModalProps) => {    
    const { setIsGameStarted } = useGameContext()

    if(!winner) return;

    const handleQuitGame = () => {
        resetGame();
        setTimeout(() => setIsGameStarted(false), 0);
    }

    return(
        <section className="result__modal">
            <div className="result">
                <h2 className="result__text">You won!</h2>
                <p className={`result__winner ${winner === PlayerSymbol.X ? 'x-winner' : 'o-winner'}`}>
                    <span className="winner__icon">
                        {winner === PlayerSymbol.X ? <IconX/> : <IconO />}
                    </span> takes the round 
                </p>

                <div className="result__options">
                    <button className="quit__button button" onClick={handleQuitGame} >
                        quit
                    </button>
                    <button className="next__button button" onClick={resetGame}>
                        next round
                    </button>
                </div>
            </div>
        </section>
    )   
}