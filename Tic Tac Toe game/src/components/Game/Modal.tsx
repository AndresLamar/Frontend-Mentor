import { IconX } from "../Icons/Icons"

interface ModalProps{
    winner: string | null | false;
}

export const Modal = ({ winner} : ModalProps) => {
    if(!winner) return;

    return(
        <section className="result__modal">
            <div className="result">
                <h2 className="result__text">You won!</h2>
                <p className="result__winner">
                    <span className="winner__icon"><IconX/></span> takes the round
                </p>

                <div className="result__options">
                    <button className="quit__button button">
                        quit
                    </button>
                    <button className="next__button button">
                        next round
                    </button>
                </div>
            </div>
        </section>
    )   
}