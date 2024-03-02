import AnimeList from "../components/AnimeList";
import SearchBar from "../components/SearchBar";
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnimeData } from "../store/animeSlice";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import '../css/home.css';


const Home = () => {

    const dispatch = useDispatch();

    const currPage = useSelector((state) => state.page.currentPage);
    const data = useSelector((state) => state.anime.data);
    const pagination = useSelector((state) => state.anime.pagination);
    const loading = useSelector((state) => state.anime.isLoading);
    const error = useSelector((state) => state.anime.error);
    const title = useSelector((state) => state.anime.title);
    const animeName = useSelector((state) => state.anime.animeName);

    const [pageLoading, setPageLoading] = useState(true);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setPageLoading(false);
        })
        dispatch(fetchAnimeData(currPage));
    }, [currPage, dispatch]);


    return (
        <div className="main-container">
            <div className="content-wrapper">
                {pageLoading && <Loader />}
                {!pageLoading && (
                    <div className="home-wrapper">
                        <SearchBar />
                        <AnimeList
                            title={title}
                            data={data}
                            loading={loading}
                            pagination={pagination}
                            error={error}
                            animeName={animeName}
                        />
                        <Footer />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;