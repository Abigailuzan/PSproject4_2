import React, { useState } from 'react';
import GameBoard from './GameBoard';
import '../styles/GamePage.css';
function GamePage() {
    const initialPlayers = JSON.parse(localStorage.getItem('players')) || [];
    const [gamePlayers, setGamePlayers] = useState(initialPlayers);

    if (gamePlayers.length === 0) {
        window.location.href = '/'; // Navigate to home page if no players
    }
    const endGame = (playerName, moves) => {
        const updatedPlayers = gamePlayers.map(player => {
            if (player.name === playerName) {
                player.results.push(moves);
            }
            return player;
        });
        setGamePlayers(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };


    return (
        <div className='game-page'>
            <h1 className='game_header'>Game On!</h1>
            <GameBoard players={gamePlayers} onEndGame={endGame} />
        </div>
    );
}

export default GamePage;
