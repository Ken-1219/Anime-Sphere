import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/currentPageSlice";
import { fetchAnimeData } from "../store/animeSlice";
import { animeNameActions } from "../store/animeSlice";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import logo from '../assets/logo.png';
import '../css/navBar.css';

const Navbar = () => {

    const currPage = useSelector((state) => state.page.currentPage);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState('');

    const obtainUser = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
                setCurrentUser(user);
            }
            else {
                setLoading(false);
                setCurrentUser('');
            }
        })
    }


    useEffect(() => {
        obtainUser();
    }, [])


    const handleClick = () => {
        // reset the animeName so that the useEffect doesn't get executed
        dispatch(animeNameActions.resetAnimeName());

        //reset the pages for popular anime list as well as searched animeList
        dispatch(actions.resetPage());
        dispatch(actions.searchResetPage());

        //finally dispatch the fetchAnimeData() function ---> To obtain new data
        dispatch(fetchAnimeData(currPage));
    };



    const handleLogout = () => {
        auth.signOut();
        navigate('/');
    }

    return (
        <header>
            {loading && <Loader />}
            {!loading && (
                <div className="header">
                    <Link to="/" onClick={handleClick}>
                        <img src={logo} alt="logo" className="logo" />
                    </Link>
                    <nav className="navbar">
                        <div>
                            {currentUser && (
                                <>
                                    <Link to='/my-anime' className="favourites-link"> My Anime </Link>
                                    <Link to='/' className="logout" onClick={handleLogout}>Logout</Link>
                                </>
                            )}
                            {!currentUser && (
                                <>
                                    <Link to="/login" className="login-link">Login</Link>
                                    <Link to="/signup" className="signup-link">Signup</Link>
                                </>
                            )}

                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar;