import './StartMenu.css'
import { IconLogo, IconO, IconX } from '../Icons/Icons'
import { GameMode, PlayerSymbol } from '../../utils/types/types';
import { useGameContext } from '../../context/GameContext';
import { Dialog } from '../shared/Dialog';
import { useState } from 'react';

interface StartMenuProps{
    startGame: (mode: GameMode, choice: PlayerSymbol) => void;
}

export const StartMenu = ({ startGame } : StartMenuProps) => {    
    const [selectLevel, setSelectLevel] = useState(false)
    const { playerChoice, setPlayerChoice } = useGameContext();    

    const closeModal = () => {
        setSelectLevel(false)
    }

    const handleSymbolClick = (newSymbol: PlayerSymbol): void => {
        setPlayerChoice(newSymbol);
    };

    const handleNewCpuGame = () => {
        setSelectLevel(true);
        // startGame(GameMode.CPU, playerChoice);
    };

    return (
        <div className='start-menu'>
            <div className="logo">
                <IconLogo />
            </div>

            <div className="card">
                <h1 className='card__title'>Pick player 1´s mark </h1>
                <div className="card__options">
                    <button aria-checked={playerChoice === "X"} 
                    onClick={() => handleSymbolClick(PlayerSymbol.X)} className='card__option x-option'>
                        <IconX/>
                    </button>
                    <button aria-checked={playerChoice === "O"} onClick={() => handleSymbolClick(PlayerSymbol.O)} className='card__option o-option'>
                        <IconO/>
                    </button>
                </div>
                <p className='card__remember'>Remember: x goes first</p>
            </div>

            <div className="start-game__buttons">
                <button 
                    className='new-game__button button-cpu'
                    onClick={handleNewCpuGame}
                >
                    new game (vs cpu)
                </button>
                <button 
                    className='new-game__button button-player' 
                    onClick={() => startGame(GameMode.MULTIPLAYER, playerChoice)}
                >
                    new game (vs player)
                </button>
            </div>

            {selectLevel && (
                <Dialog closeModal={closeModal}>
                    <div className="wrapper">
                        <h2 className="level__title">Select cpu level</h2>
                        <div className="level__options">
                            <button className='level__button easy'>
                                Easy
                            </button>

                            <button className='level__button medium'>
                                Medium
                            </button>
                            
                            <button className='level__button dificult'>
                                Dificult
                            </button>
                        </div>
                    </div>    
                </Dialog>
            )}

        </div>
    )
}