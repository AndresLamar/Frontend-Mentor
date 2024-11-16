import { useState } from 'react';
import { IconLogo, IconO, IconX } from '../Icons/Icons'
import './StartMenu.css'

export type PlayerSymbol = "X" | "O";

export const StartMenu = () => {    
    const [selectedSymbols, setSelectedSymbols] = useState<PlayerSymbol>("X");

    const handleSymbolClick = (newSymbol: PlayerSymbol): void => {
        setSelectedSymbols(newSymbol);
    };

    return (
        <div className='start-menu'>
            <div className="logo">
                <IconLogo />
            </div>

            <div className="card">
                <h1 className='card__title'>Pick player 1´s mark </h1>
                <div className="card__options">
                    <button aria-checked={selectedSymbols === "X"} 
                    onClick={() => handleSymbolClick("X")} className='card__option x-option'>
                        <IconX/>
                    </button>
                    <button aria-checked={selectedSymbols === "O"} onClick={() => handleSymbolClick("O")} className='card__option o-option'>
                        <IconO/>
                    </button>
                </div>
                <p className='card__remember'>Remember: x goes first</p>
            </div>

            <div className="start-game__buttons">
                <button className='new-game__button button-cpu'>new game (vs cpu)</button>
                <button className='new-game__button button-player'>new game (vs player)</button>
            </div>
        </div>
    )
}