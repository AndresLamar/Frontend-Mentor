import { useState } from 'react';
import { IconLogo, IconO, IconX } from '../Icons/Icons'
import './StartMenu.css'
import { GameMode, PlayerSymbol } from '../../utils/types/types';

interface StartMenuProps{
    startGame: (mode: GameMode, choice: PlayerSymbol) => void;
}

export const StartMenu = ({ startGame } : StartMenuProps) => {    
    const [selectedSymbol, setSelectedSymbol] = useState<PlayerSymbol>(PlayerSymbol.X);

    const handleSymbolClick = (newSymbol: PlayerSymbol): void => {
        setSelectedSymbol(newSymbol);
    };

    return (
        <div className='start-menu'>
            <div className="logo">
                <IconLogo />
            </div>

            <div className="card">
                <h1 className='card__title'>Pick player 1´s mark </h1>
                <div className="card__options">
                    <button aria-checked={selectedSymbol === "X"} 
                    onClick={() => handleSymbolClick(PlayerSymbol.X)} className='card__option x-option'>
                        <IconX/>
                    </button>
                    <button aria-checked={selectedSymbol === "O"} onClick={() => handleSymbolClick(PlayerSymbol.O)} className='card__option o-option'>
                        <IconO/>
                    </button>
                </div>
                <p className='card__remember'>Remember: x goes first</p>
            </div>

            <div className="start-game__buttons">
                <button 
                    className='new-game__button button-cpu'
                    onClick={() => startGame(GameMode.CPU, selectedSymbol)}
                >
                    new game (vs cpu)
                </button>
                <button 
                    className='new-game__button button-player' 
                    onClick={() => startGame(GameMode.MULTIPLAYER, selectedSymbol)}
                >
                    new game (vs player)
                </button>
            </div>
        </div>
    )
}