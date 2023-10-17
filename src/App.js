import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Play from './pages/Play';
import PlayersContext from './contexts/PlayersContext';



function App() {
    const [questions, setQuestions] = useState([]);
    const [players, setPlayers] = useState([]);

    return (
        <PlayersContext.Provider value={{ players, setPlayers, questions, setQuestions }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home setQuestions={setQuestions} />} />
                    <Route path="/play" element={<Play questions={questions} setQuestions={setQuestions} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </PlayersContext.Provider>
    );
}

export default App;
