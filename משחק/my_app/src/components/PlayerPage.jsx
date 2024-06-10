import React, {useState} from 'react';
import '../styles/PlayerPage.css';
function PlayerPage(){
    const getPlayerNameFromURL= JSON.parse(localStorage.getItem('playerName'|| null));
    const [players, setPlayers] = useState(() => {
        return JSON.parse(localStorage.getItem('players')) || [];
    });

    if (getPlayerNameFromURL===null) {
        return <div id='error'>Player not found</div>;
    }
    const player = players.find(play =>play.name === getPlayerNameFromURL );
    return (
        <div className='player_history'>
            <h1 className='history_header'>{player.name}'s Game History</h1>
            <ul className='hostory_list'>
                {player.results.map((result, index) => (
                    <li key={index}>Game {index + 1}: {result} moves</li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerPage;
