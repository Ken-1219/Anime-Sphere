import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchFromDB = createAsyncThunk('anime/fetchFromDB', async (uid) => {
    try {
        const apiUrl = process.env.REACT_APP_BACKEND_API + '/getAnime';
        console.log(apiUrl);
        const response = await axios.get(apiUrl, {
            params: {
                    uid
                }
        });
        const json = await response.data;

        if (response.status === 200) {
            return json;
        }
        else {
            console.log("Error fetching data");
        }
    }
    catch (err) {
        throw err;
    }
});

const myFavSlice = createSlice({
    name: 'myFavAnimeSlice',
    initialState: {
        data: [],
        isLoading: true,
        error: null
    },
    reducers: {
        removeAnime(state, action) {
            state.data = state.data.filter(item => item.mal_id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFromDB.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchFromDB.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchFromDB.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            })
    }


})

export const favActions = myFavSlice.actions;

export default myFavSlice.reducer;