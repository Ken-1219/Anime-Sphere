import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { searchAnimeData } from "../store/animeDetailsSlice";
import { detailActions } from "../store/animeDetailsSlice";
import toast, { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import Loader from './Loader';
import axios from "axios";
import '../css/animeDetails.css';

const AnimeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //using useLocation hook to use the state provided through the Link of the react-router-dom
  const location = useLocation();
  const dataObject = location.state;

  const id = dataObject.id;


  const [pageLoading, setPageLoading] = useState(true);
  onAuthStateChanged(auth, (user) => {
    setPageLoading(false);
  })



  useEffect(() => {
    dispatch(searchAnimeData(id));
    return () => {
      dispatch(detailActions.resetAnimeData());
    };
  }, [id, dispatch])


  const data = useSelector((state) => state.animeDetails.details);
  const loading = useSelector((state) => state.animeDetails.isLoading);
  const error = useSelector((state) => state.animeDetails.error);


  const handleClick = async () => {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setPageLoading(false);
        try {
          const apiUrl = process.env.REACT_APP_BACKEND_API + '/findAnime';
          // console.log(apiUrl);
          const exist = await axios.get(apiUrl, {
            params: {
              id: data.mal_id,
              uid: user.uid
            }
          });

          //if anime already exists in the list, return
          if (exist.status === 200) {
            toast('Anime already added', {
              icon: '❗'
            });
            return;
          }


          //If anime doesn't exist, add it to the list of my anime
          const anime = {
            title: data?.title_english || data?.title,
            image: data?.images?.jpg?.large_image_url || ' ',
            score: data?.score || '',
            mal_id: data?.mal_id,
            uid: user.uid
          };

          const addAnimeURL_API = process.env.REACT_APP_BACKEND_API + `/anime/${anime.mal_id}`

          const response = await axios.post(addAnimeURL_API, anime,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          if (response.status === 200) {
            toast('Added to favourites', {
              icon: '✔️',
            });
          }

        }
        catch (err) {
          toast('Something went wrong...', {
            icon: '🚫'
          });
        }
      }

      else {
        navigate('/login');
      }
    });
  }




  return (
    <>
      {loading && <Loader />}
      {error && <p className='error'>Something went wrong...</p>}
      {!loading && !pageLoading && !error && (
        <div className="detailsWrapper">
          <h1 className="title">{data?.title_english || data?.title}</h1>

          <div className="animeDetail">

            <div className="cover-wrapper">
              <img
                src={data?.images?.jpg?.large_image_url}
                alt="animeCoverImage"
                className="cover"
              />
              <button
                className="addBtn"
                onClick={handleClick}>
                Add To Favourites
              </button>
            </div>

            <div className="basic-info">

              <h4> <span> Name: </span> {data?.title_english || data?.title}</h4>
              <h4> <span> Episodes: </span> {data?.episodes || '_'}</h4>
              <h4> <span> Duration: </span> {data?.duration || '_'}</h4>
              <h4> <span> Rating: </span> {data?.rating || '_'}</h4>
              <h4> <span> Mal Score: </span> {data?.score || '_'}  <span className="reviews"> by {data?.scored_by || '_'} reviews</span></h4>
              <h4> <span> Airing: </span> {data?.status || '_'}</h4>
              <h4> <span> Premiered: </span> {data?.season || '_'} {data?.year || '_'}</h4>
              <h4> <span> Aired: </span> {data?.aired.string || '_'}</h4>
              <h4> <span> Genres: </span> {data?.genres.map((genre) => genre.name).join(', ') || '_'}</h4>

            </div>

            <div className="trailer">
              {data?.trailer?.embed_url && (
                <>
                  <h3 className="trailer_heading">Watch Trailer</h3>
                  <iframe src={data?.trailer?.embed_url}
                    allow='encrypted-media'
                    allowFullScreen={true}
                    title='video'
                  />
                </>
              )}
            </div>
          </div>

          <div className="synopsisWrapper">
            <div className="details">
              <h2 className="synopsisHeading">Synopsis </h2>
              <p className="synopsis">{data?.synopsis || 'No data availble!!!'}</p>
            </div>
          </div>

        </div >
      )}
      <Toaster
        toastOptions={{
          duration: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          }
        }} />
    </>
  )
}

export default AnimeDetails; 