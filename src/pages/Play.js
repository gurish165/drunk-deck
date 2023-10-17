import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import PlayersContext from '../contexts/PlayersContext';
import '../css/Play.css';

function Play() {
    const { players, questions } = useContext(PlayersContext);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState('#29bf00');
    const [prevBackgroundColor, setPrevBackgroundColor] = useState('');  // New state for previous color
    const history = useNavigate();
    const colors = ['#fa0000', '#faa300', '#faa300', '#29bf00', '#0285f7', '#2802fa', '#af03ff', '#ed05b7'];
    

    // Function to get a random color from the colors list
    const getRandomColor = () => {
        let randomColor;
        do {
            const randomIndex = Math.floor(Math.random() * colors.length);
            randomColor = colors[randomIndex];
        } while (randomColor === prevBackgroundColor);  // Ensure it's not the same as previous color

        return randomColor;
    };

    const nextQuestion = () => {
        if (currentIndex < 24) {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 1;
                setCurrentQuestion(questions[nextIndex][0]);
                const newBackgroundColor = getRandomColor();
                setPrevBackgroundColor(backgroundColor);  // Update the previous color before setting a new one
                setBackgroundColor(newBackgroundColor);
                return nextIndex;
            });
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => {
                const previousIndex = prevIndex - 1;
                setCurrentQuestion(questions[previousIndex][0]);
                const newBackgroundColor = getRandomColor();
                setPrevBackgroundColor(backgroundColor);  // Update the previous color before setting a new one
                setBackgroundColor(newBackgroundColor);
                return previousIndex;
            });
        }
    };

    // Setting the initial question when the component mounts
    useEffect(() => {
        if (questions && questions.length > 0) {
            setCurrentQuestion(questions[currentIndex][0]);
        }
    }, [questions]);

    return (
        <div className="play-container" style={{ backgroundColor: backgroundColor }}>
            <div className='index-counter'>{currentIndex + 1}/25</div>
            <div className="question-wrapper">
                <Question question={currentQuestion} />
            </div>
            <div className='navigation'>
                {currentIndex !== 0 && <button className="nav-btn" onClick={prevQuestion}>Prev</button>}
                <div className='spacer-div'></div>
                {currentIndex !== 24 && <button className="nav-btn" onClick={nextQuestion}>Next</button>}
            </div>
            <button className="home-btn" onClick={() => history('/home')}>Home</button>
        </div>
    );
}

export default Play;
