import { useGame } from "../../hooks/useGame";
import { PlayerSymbol } from "../../utils/types/types"
import { IconLogo, IconO, IconRestart, IconX } from "../Icons/Icons"

interface Props {
    resetBoard: () => void
}

export const BoardHeader = ({ resetBoard }: Props) => {
    const { currentTurn } = useGame();

    return (
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
    )
}