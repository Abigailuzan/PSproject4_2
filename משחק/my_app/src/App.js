import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import PlayerPage from './components/PlayerPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/player/:name" element={<PlayerPage />} />
            </Routes>
        </div>
    );
}

export default App;
