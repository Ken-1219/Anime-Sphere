import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import { Link, useNavigate } from "react-router-dom";
import '../css/signup.css';

function Signup() {
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

        switch (errorCode) {
            case 'auth/invalid-email':
                setEmailError(true);
                errorMessage = 'Invalid email address.';
                break;
            case 'auth/email-already-in-use':
                setEmailError(true);
                errorMessage = 'Email address is already in use.';
                break;
            case 'auth/weak-password':
                setPasswordError(true);
                errorMessage = 'Weak password. Choose a stronger one.';
                break;
            default:
                errorMessage = 'An error occurred. Please try again.';
        }
        setError(errorMessage);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
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
        <div className="signupContainer">
            <div className="signup">
                <h1>SignUp</h1>
                <form className='signup-form' id="signup-form" onSubmit={handleSubmit} noValidate>
                    <label>Email: </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        id={emailError ? 'emailError' : ''}
                    />
                    <label>Password: </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id={passwordError ? 'passwordError' : ''}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button>Signup</button>
                </form>
            </div>
            <p className='redirect-to-login'>Already have an account? <Link to='/login'>Login here</Link></p>
        </div>
    )
}

export default Signup;