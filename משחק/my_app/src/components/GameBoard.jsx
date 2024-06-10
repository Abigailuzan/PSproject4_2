import React, { useState } from 'react';
import PlayerBoard from './PlayerBoard';
import '../styles/GameBoard.css';

function GameBoard({ players, onEndGame }) {
    const [gamePlayers, setGamePlayers] = useState(players);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [winner, setWinner] = useState(null);

    const handleAction = (playerName, action) => {
        setGamePlayers(prevPlayers =>
            prevPlayers.map(player => {
                if (player.name === playerName) {
                    let newScore = player.score;
                    switch (action) {
                        case 'increment':
                            newScore += 1;
                            break;
                        case 'decrement':
                            newScore -= 1;
                            break;
                        case 'multiply':
                            newScore *= 2;
                            break;
                        case 'divide':
                            newScore = Math.floor(newScore / 2);
                            break;
                        default:
                            break;
                    }
                    if (newScore === 100) {
                        setWinner(player.name);
                        onEndGame(player.name, player.moves + 1);
                    }
                    return { ...player, score: newScore, moves: player.moves + 1 };
                }
                return player;
            })
        );
        setActivePlayerIndex((prevIndex) => (prevIndex + 1) % gamePlayers.length);
    };

    const continueGame = (playerName) => {
        setWinner(null);
        setGamePlayers(prevPlayers =>
            prevPlayers.map(player => {
                if (player.name === playerName) {
                    player.score = Math.floor(Math.random() * 100);
                    player.moves = 0;
                }
                return player;
            })
        );
    };

    const leaveGame = (playerName) => {
        const updatedPlayers = gamePlayers.filter(player => player.name !== playerName);
        setGamePlayers(updatedPlayers);
        /*localStorage.setItem('players', JSON.stringify(updatedPlayers));*/
        if (playerName === winner) {
            setWinner(null);  // Reset the winner state if the winner leaves
        }
        if (updatedPlayers.length <= 1) {
            window.location.href = '/'; // Navigate to home page if less than or equal to 1 player
        }
    };


    if (winner) {
        return (
            <div className='winnerPage'>
                <h2>{winner} reached 100!</h2>
                <button className='continue' onClick={() => continueGame(winner)}>Continue Playing</button>
                <button className='leave_game' onClick={() => leaveGame(winner)}>Leave Game</button>
            </div>
        );
    }

    return (
        <div>
            {gamePlayers.map((player, index) => (
                <PlayerBoard
                    key={player.name}
                    player={player}
                    isActive={index === activePlayerIndex}
                    onAction={handleAction}
                    onLeaveGame={() => leaveGame(player.name)}
                />
            ))}
        </div>
    );
}

export default GameBoard;
