import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerList from '../components/PlayerList';
import Banner from '../components/Banner';
import PlayersContext from '../contexts/PlayersContext';
import '../css/Home.css';

function Home() {
    const { players, setPlayers, questions, setQuestions } = useContext(PlayersContext);
    const history = useNavigate();
    
    useEffect(() => {
        // Load questions only once when the Home component mounts
        fetch(process.env.PUBLIC_URL + '/questions_v1.json')
            .then(response => response.json())
            .then(data => setQuestions(data));
    }, []);

    const generateQuestions = () => {
        const newQuestionsList = [...questions];
        const randomizedQuestions = [];
    
        while (randomizedQuestions.length < 25 && newQuestionsList.length > 0) {
            const randomIndex = Math.floor(Math.random() * newQuestionsList.length);
            let selectedQuestion = newQuestionsList[randomIndex][0];
    
            // Replace [*] with player names
            let playerNames = [...players];
            selectedQuestion = selectedQuestion.replace(/\[\*\]/g, () => {
                const randomNameIndex = Math.floor(Math.random() * playerNames.length);
                const name = playerNames[randomNameIndex];
                playerNames.splice(randomNameIndex, 1);
                return name; 
            });
    
            randomizedQuestions.push([selectedQuestion]);
            newQuestionsList.splice(randomIndex, 1);
        }
    
        return randomizedQuestions;
    };

    const addPlayer = (player) => {
        if (players.length < 20) {
            setPlayers(prevPlayers => {
                const updatedPlayers = [...prevPlayers, player];
                return updatedPlayers;
            });
        }
    };
    

    const removePlayer = (index) => {
        const newPlayers = [...players];
        newPlayers.splice(index, 1);
        setPlayers(newPlayers);
    };

    const startGame = () => {
        if (players.length >= 3) {
            const newQuestions = generateQuestions();
            setQuestions(newQuestions);
            history('/play'); 
        }
    };
    return (
        <div className="home-container">
            <Banner bottom={false}/>
            <div className='home-header'>
                Drunk Deck !
            </div>
            <div className='home-description'>
                Add at least 3 players!
            </div>
            <div className='team-container'>
                <PlayerList players={players} addPlayer={addPlayer} removePlayer={removePlayer} />
                <button className="start-btn" onClick={startGame}>Start</button>
            </div>
            <Banner bottom={true}/>
        </div>
    );
    
}

export default Home;
