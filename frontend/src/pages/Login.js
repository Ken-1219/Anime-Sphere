import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const checkError = (err) => {
        if (!email) {
            setEmailError(true);
            setError('Email is required.')
            return;
        }
        else {
            setEmailError(false);
        }


        if (!password) {
            setPasswordError(true);
            setError('Password is required.')
            return;
        }
        else {
            setPasswordError(false);
        }



        const errorCode = err.code;
        let errorMessage = err.message;
        console.log(err.message);

        switch (errorCode) {
            case 'auth/invalid-email':
                setEmailError(true);
                errorMessage = 'Invalid email address.';
                break;
            case 'auth/invalid-credential':
                setEmailError(true);
                setPasswordError(true);
                errorMessage = 'Incorrect Email or Password. Try Again!';
                break;
            default:
                errorMessage = 'An error occurred. Please try again.';
        }
        setError(errorMessage);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            if (user) {
                navigate('/');
            }
        }
        catch (err) {
            checkError(err);
        }
    }


    return (
        <div className="loginContainer">
            <div className="login">
                <h1>Login</h1>
                <form className='login-form' id='login-form' onSubmit={handleSubmit}>
                    <label>Email: </label>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        id={emailError ? 'emailError' : ''}
                    />
                    <label>Password: </label>
                    <input
                        type="password"
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id={passwordError ? 'passwordError' : ''}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button>Login</button>
                </form>
            </div>
            <p className='redirect-to-signup'>Didn't register? <Link to='/signup'>Signup here</Link></p>
        </div>
    )
}

export default Login;