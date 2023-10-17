import { createContext } from 'react';

const PlayersContext = createContext({
    players: [],
    setPlayers: () => {},
    questions: [],
    setQuestions: () => {}
});

export default PlayersContext;
