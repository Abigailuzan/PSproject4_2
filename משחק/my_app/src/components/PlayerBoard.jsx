import React from 'react';
import '../styles/PlayerBoard.css';

function PlayerBoard({ player, isActive, onAction }) {
    const handleAction = (action) => {
        onAction(player.name, action);
    };

    return (
        <div className='player_option_bord' style={{ border: isActive ? '2px solid green' : '1px' +' solid' +' black', margin: '10px', padding: '10px' }}>
            <h3 id='player_name'>{player.name}</h3>
            <p id= 'player_score'>Score: {player.score}</p>
            <p className='player_moves'>Moves: {player.moves}</p>
            {isActive && (
                <div className='player_torn'>
                    <button className='option_game' onClick={() => handleAction('increment')}>+1</button>
                    <button className='option_game' onClick={() => handleAction('decrement')}>-1</button>
                    <button className='option_game' onClick={() => handleAction('multiply')}>*2</button>
                    <button className='option_game' onClick={() => handleAction('divide')}>/2</button>
                </div>
            )}
        </div>
    );
}

export default PlayerBoard;
