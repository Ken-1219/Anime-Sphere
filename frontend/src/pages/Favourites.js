import axios from 'axios';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchFromDB } from "../store/myFavSlice";
import { favActions } from '../store/myFavSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import AnimeCard from "../components/AnimeCard";
import Loader from "../components/Loader";
import toast, { Toaster } from 'react-hot-toast';
import '../css/favourites.css'

function Favourites() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector((state) => state.myFav.data);
    const loading = useSelector((state) => state.myFav.isLoading);
    const error = useSelector((state) => state.myFav.error);

    //logic for showing user anime
    useEffect(() => {
        try {
            onAuthStateChanged(auth, async (user) => {
                //if the user exists --> that is login session is active, fetch the data for that particular user
                if (user) {
                    dispatch(fetchFromDB(user?.uid));
                }
                //if no active login session,  just redirect the user to the homepage
                else {
                    navigate('/');
                }
            })
        }
        catch (err) {
            toast("Something went wrong...", {
                icon: '🚫'
            })
        }

    }, [dispatch, navigate]);



    //Logic for deleting anime
    const handleClick = (mal_id) => {
        try {
            //if the user exists -->  delete the data for that particular user 
            onAuthStateChanged(auth, async (user) => {
                try {
                    const response = await axios.delete(`http://localhost:4000/api/animeRoutes/myAnime/${mal_id}`, {
                        params: {
                            uid: user.uid
                        }
                    })
                    if (response.status === 200) {
                        dispatch(favActions.removeAnime(mal_id));
                        toast("Anime deleted successfully", {
                            icon: '❌'

                        });
                    }
                }
                catch(err){
                    console.log("Error occured");
                    toast('Something went wrong...', {
                        icon: '🚫'
                    });
                }
            })
        }
        catch (err) {
            toast("Error deleting anime", {
                icon: '🚫'
            });
        }
    }


    const renderAnimeCard = (anime) => (
        <div className="cardWrapper" key={anime?.mal_id}>
            <ion-icon
                name="remove-circle-outline"
                id="delete-icon"
                onClick={() => handleClick(anime?.mal_id)}
            />
            <AnimeCard
                key={anime?.mal_id}
                image={anime?.image}
                title={anime?.title}
                score={anime?.score}
                mal_id={anime?.mal_id}
            />
        </div>
    );


    return (
        <>
            <div className="FavouritesWrapper">
                {loading && <Loader />}
                {error && <p className="error">Something went wrong...</p>}
                {!loading && !error && (
                    <div className="favContainer">
                        <h1 className="favHeading">My Anime</h1>
                        {data.length >= 1 && (
                            <div className="myFav">
                                {data?.map(renderAnimeCard)}
                            </div>
                        )}
                        {data.length < 1 && (<p className='no-fav'>No favourites added.</p>)}
                    </div>
                )}
            </div>

            <Toaster
                toastOptions={{
                    duration: 1000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
        </>
    )
}

export default Favourites;