import { configureStore } from "@reduxjs/toolkit";
import anime from './animeSlice';
import currentPage from './currentPageSlice'
import animeDetails from './animeDetailsSlice';
import myFavSlice from "./myFavSlice";

const store = configureStore({
    reducer:{
        anime: anime,
        page: currentPage,
        animeDetails: animeDetails,
        myFav: myFavSlice
    }
});

export default store;