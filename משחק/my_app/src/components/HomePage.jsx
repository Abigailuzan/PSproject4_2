import React, { useState } from 'react';
import PlayerRegistration from './PlayerRegistration';
import '../styles/HomePage.css';
function HomePage() {
    const [players, setPlayers] = useState(() => {
        return JSON.parse(localStorage.getItem('players')) || [];
    });

    const startGame = () => {
        if (players.length > 1) { // at least 2 players must be registered
            localStorage.setItem('players', JSON.stringify(players));
            window.location.href = '/game'; // navigate to the game page
        } else {
            alert("Please register at least two players.");
        }
    };

    const getTopPlayers = () => {
        return players
            .filter(player => player.results.length > 0) // Filter out players with no game results
            .map(player => ({
                name: player.name,
                avgMoves: player.results.reduce((a, b) => a + b, 0) / player.results.length
            }))
            .sort((a, b) => a.avgMoves - b.avgMoves)
            .slice(0, 3);
    };

    const handleChangeToPrivate = (name) => {
        localStorage.setItem('playerName',JSON.stringify(name));
        window.location.href= `/player/${name}`;
    };

    return (
        <div className='homepage'>
            <h1 className='homepage_header'>Get to 100 Game</h1>
            <PlayerRegistration setPlayers={setPlayers} players={players} />
            <button className='startGame' onClick={startGame}>Start Game</button>
            <h2 className='Registered_header'>Registered Players:</h2>
            <ul className='Registered_list'>
                {players.map((player, index) => (
                    <li key={index}>
                        {player.name} - <a id='player_personal_area' href="#" onClick={() => handleChangeToPrivate(player.name)}>View History</a>
                    </li>
                ))}
            </ul>
            <h2 className='top_players'>Top Players:</h2>
            <ul className='top_players_list'>
                {getTopPlayers().map((player, index) => (
                    <li key={index}>{player.name} - Average Moves: {player.avgMoves.toFixed(2)}</li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
