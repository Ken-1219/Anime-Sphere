import AnimeCard from "./AnimeCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedAnimeData } from "../store/animeSlice";
import { actions } from "../store/currentPageSlice";
import Loader from "./Loader";
import '../css/animeList.css';

function AnimeList({ title, data, loading, pagination, error, animeName }) {

    const dispatch = useDispatch();
    const currPage = useSelector((state) => state.page.currentPage);
    const currSearchPage = useSelector((state) => state.page.searchPage);
    const isValidInput = /^[a-zA-Z0-9\s]+$/.test(animeName.trim());


    useEffect(() => {
        const fetchData = () => {
            if (isValidInput) {
                const searchQuery = {
                    animeName: animeName,
                    pageNumber: currSearchPage
                }

                dispatch(fetchSearchedAnimeData(searchQuery));
            }
        };
        fetchData();
    }, [animeName, currSearchPage, dispatch, isValidInput]);




    const handlePreviousPage = () => {
        if (currPage === 1) {
            return;
        }
        dispatch(actions.decrement());
    };

    const handleNextPage = () => {
        if (!pagination?.has_next_page) {
            return;
        }
        dispatch(actions.increment());
        return;
    };

    const handleSearchPreviousPage = () => {
        if (currSearchPage === 1) {
            return;
        }
        dispatch(actions.searchDecrement());

    }
    const handleSearchNextPage = () => {
        if (!pagination?.has_next_page) {
            return;
        }
        dispatch(actions.searchIncrement());
    }

    const renderAnimeCard = (anime) => (
        <AnimeCard
            key={anime.mal_id}
            image={anime.images.jpg.large_image_url}
            title={anime.title_english || anime.title}
            score={anime.score}
            mal_id={anime.mal_id}
        />
    );

    return (
        <>
            {error && <p className="error">Failed to load data...</p>}
            {loading && <Loader />}
            {!loading && !error && (
                <>
                    <div className='headingDiv'>
                        <h1 className="heading">{title}</h1>

                    </div>
                    <div className="home">
                        {!loading && data?.map(renderAnimeCard)}
                    </div>
                    <div className="pageBtn">
                        <ion-icon
                            name="chevron-back-outline"
                            className="prevPage"
                            id={(isValidInput && currSearchPage === 1) || (!isValidInput && currPage === 1) ? 'disabled' : ''}
                            onClick={() => {
                                if (isValidInput) {
                                    handleSearchPreviousPage();
                                }
                                else {
                                    handlePreviousPage();
                                }
                            }}
                        />
                        <ion-icon
                            name="chevron-forward-outline"
                            className="nextPage"
                            id={(isValidInput && !pagination?.has_next_page) || (!isValidInput && !pagination?.has_next_page) ? 'disabled' : ''}
                            onClick={() => {
                                if (isValidInput) {
                                    handleSearchNextPage();
                                }
                                else {
                                    console.log("Going to next page")
                                    handleNextPage();
                                }
                            }}
                        />
                    </div>
                </>
            )}
        </>
    )
};

export default AnimeList;
