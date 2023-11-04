import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../css/Login.css';

const PASSWORD_HASH = 'f189221a0412157d53c503d8dfaa95ef8829cbc0e50422f07d0cf0b0cc034537';
const PASSWORD_HASH_2 = 'd6dbbbecaba142470c010f4b2153c1f50c35a34e1c4ecbc685541116bef93bce';

function Login() {
    const [input, setInput] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false); // State to check for wrong password
    const history = useNavigate();

    const handleLogin = () => {
        const inputHash = SHA256(input).toString();

        if (inputHash === PASSWORD_HASH || inputHash === PASSWORD_HASH_2) {
            history('/home');
        } else {
            setWrongPassword(true);
            setTimeout(() => setWrongPassword(false), 1000); // Reset after 1 second
        }

        setInput('');
    };

    return (
        <div className="login-container">
            <h2 className="game-name">Pookie Play !</h2>
            <input 
                type="password" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                placeholder='Password'
                className={wrongPassword ? 'shake-input' : ''} // Add class for shake effect
            />
            <button class="login-enter-btn" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
