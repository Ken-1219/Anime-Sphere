import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchedAnimeData } from '../store/animeSlice';
import { actions } from '../store/currentPageSlice';
import '../css/searchBar.css';

function SearchBar() {
    const dispatch = useDispatch();
    const [animeName, setAnimeName] = useState('');
    const currSearchPage = useSelector((state) => state.page.searchPage);

    const handleSearch = () => {

        const isValidInput = /^[a-zA-Z0-9\s]+$/.test(animeName.trim());

        if (isValidInput) {
            console.log("Anime Name: ", animeName);
            dispatch(actions.searchResetPage());
            const searchQuery = {
                animeName: animeName,
                pageNumber: currSearchPage
            }
            console.log("Search Query from search bar: ", searchQuery);
            dispatch(fetchSearchedAnimeData(searchQuery));
        }
        // setAnimeName('');
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }

    return (

        <div className='contains_searchbar'>
            <div className="background">
                <div className="searchBar">
                    <input
                        type="text"
                        placeholder='Enter anime name'
                        className='searchInput'
                        onChange={(e) => setAnimeName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={animeName}
                    />
                    <div className="search-icon">
                        <ion-icon
                            name="search-sharp"
                            onClick={handleSearch}
                            id="searchIcon"
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SearchBar;
