import React, { useState } from 'react';
import '../styles/PlayerRegistration.css';

function PlayerRegistration({ setPlayers, players }) {
    const [playerName, setPlayerName] = useState("");

    const handleRegister = () => {
        if (players.find(p=>p.name===playerName))
            alert("name already exist");
        else if (playerName.trim() !== "") {
            const newPlayer = { name: playerName, score: Math.floor(Math.random() * 100), moves: 0, results: [] };
            /*לכל שחקן נשמר השם הערך המוגרל המהלכים שההוא עשה וההיסטוריית משחקים שלו*/
            setPlayers([...players, newPlayer]);
            /*משנה את המצב למצב חדש הכולל את השחקן החדש שנרשם*/
            setPlayerName("");
            /*מאפס את השדה שבו המשתמש מזין את שם השחקן לאחר שהשחקן נרשם בהצלחה*/
            localStorage.setItem('players', JSON.stringify([...players, newPlayer]));
            /*שומר את הרשימת שחקנים החדשה בלוקל סטורג' הכוללת את השחקן החדש שנרשם*/
        }
    };

    return (
        <div className='register_bord'>
            <h2 className='register_header'>Register Player</h2>
            <input className='register_input'
                type="text"
                value={playerName}/*מאותחל ל ""*/
                onChange={(e) => setPlayerName(e.target.value)}
                /*כדי שיהיה אפשר לראות את השינוי עם כל אות שנרשמת*/
                placeholder="Enter player name"
            />
            <button className='register_button' onClick={handleRegister}>Register</button>
        </div>
    );
}

export default PlayerRegistration;
