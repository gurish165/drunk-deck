import { useState } from 'react';

function PlayerList({ players, addPlayer, removePlayer }) {
    const [input, setInput] = useState('');

    return (
        <div className="player-list">
            <div className='player-input'>
                <input className="name-input" type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Pookie Name" />
                <button className="add-name-button" onClick={() => {
                    if (input !== '') {addPlayer(input)};
                    setInput('');
                }}>+</button>
            </div>
            <div className="names-container">
                {players.map((player, index) => (
                    <div className="player" key={index}>
                        <span>{player}</span>
                        <button className="remove-player-button" onClick={() => removePlayer(index)}>x</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlayerList;
