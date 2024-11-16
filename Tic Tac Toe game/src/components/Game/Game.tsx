import React, { useState } from 'react';
import './Game.css'

interface SquareProps{
    children: React.ReactNode;
    updateBoard: (index: number) => void;
    index: number;
}

const Square = ({children, updateBoard, index} : SquareProps) => {
    const handleClick = () => {
        updateBoard(index)
    } 
    
    return(
        <div onClick={handleClick} className="square" key={index}>
            {children}
        </div>
    )
}

const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

export const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn ] = useState('x')
    const [winner, setWinner] = useState<string | null>(null)

    const checkWinner = (boardToCheck : string[]) => {
        for(const combo of WINNER_COMBOS){
            const [a, b, c] = combo
            if(
                boardToCheck[a] &&
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[a] === boardToCheck[c]
            ){
                return boardToCheck[a]
            }
        }

        return null 
    }


    const updateBoard = (index : number) => {
        if(board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        const newTurn = turn === 'x' ? 'o' : 'x'
        setTurn(newTurn)

        const newWinner = checkWinner(newBoard)
        if(newWinner){
            setWinner(newWinner)
        }
    }

    return (
        <div className="board">
            <section className="turn">
                <p>{turn} turn</p>
            </section>

            <section className="game">
                {
                    board.map(( _, index) => {
                        return (
                            <Square 
                                key={index} 
                                updateBoard={updateBoard} 
                                index={index}
                            >
                                {board[index]}
                            </Square>
                        )
                    })
                }
            </section>
        </div>
    )
}