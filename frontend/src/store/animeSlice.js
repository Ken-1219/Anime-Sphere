import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAnimeData = createAsyncThunk('anime/fetchAnimeData', async (pageNumber) => {
    try {
        const response = (await axios.get(`https://api.jikan.moe/v4/top/anime?page=${pageNumber}`)).data;
        return response;
    }
    catch (err) {
        return { error: err.message };
    }
});

export const fetchSearchedAnimeData = createAsyncThunk('animeSearch/fetchSearchedAnimeData', async (params) => {
    try {
        const { animeName, pageNumber } = params;
        
        const response = (await axios.get(`https://api.jikan.moe/v4/anime?q=${animeName}&page=${pageNumber}&sfw`)).data;
        return { response, animeName };
    }
    catch (err) {
        return { error: err.message };
    }
});

const newAnimeSlice = createSlice({
    name: "newAnimeSlice",
    initialState: {
        data: null,
        pagination: null,
        isLoading: true,
        error: null,
        title: '',
        animeName: ''
    },
    reducers: {
        resetAnimeName(state, action) { state.animeName = '' }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimeData.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(fetchAnimeData.fulfilled, (state, action) => {
                const dataObj = action.payload;
                state.data = dataObj.data;
                state.pagination = dataObj.pagination;
                state.isLoading = false;
                state.title = "Popular Anime";
                state.error = action.payload?.error;
            })

            .addCase(fetchAnimeData.rejected, (state, action) => {
                state.data = null;
                state.pagination = null;
                state.isLoading = false;
                state.error = action.payload.error;
            })


            .addCase(fetchSearchedAnimeData.pending, (state) => {
                state.isLoading = true;
            })



            .addCase(fetchSearchedAnimeData.fulfilled, (state, action) => {

                const dataObj = action.payload ? action.payload.response : null;
                const animeName = action.payload ? action.payload.animeName : '';

                state.data = dataObj ? dataObj.data : null;
                state.pagination = dataObj ? dataObj.pagination : null;
                state.isLoading = false;
                state.title = "Search Results...";
                state.animeName = animeName;
                state.error = action.payload?.error;
            })

            .addCase(fetchSearchedAnimeData.rejected, (state, action) => {
                state.data = null;
                state.pagination = null;
                state.isLoading = false;
                state.error = action.payload.error;
            });
    }
});
export const animeNameActions = newAnimeSlice.actions;

export default newAnimeSlice.reducer;
