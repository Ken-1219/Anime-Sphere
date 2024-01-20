import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchAnimeData = createAsyncThunk('anime/searchAnimeId', async (id)=>{
    try{
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
        const data = response.data.data;
        return data;
    }
    catch(err){
        console.log(err.message);
        return { error: err.message };
    }
})

export const searchAnimeDataSlice = createSlice({
    name: "searchData",
    initialState: {
        details : null,
        isLoading: true,
        error: null
    },
    reducers:{
        resetAnimeData(state, action) { state.details = null }
    },
    extraReducers: (builder)=>
        builder
        .addCase(searchAnimeData.pending, (state,action)=>{
            state.isLoading = true;
        })
        .addCase(searchAnimeData.fulfilled, (state,action)=>{
            state.details = action.payload;
            state.isLoading = false;
            state.error = action.payload?.error;
        })
        .addCase(searchAnimeData.rejected, (state,action)=>{
            state.error = action.payload;
            state.isLoading = false;
        })
})



export const detailActions = searchAnimeDataSlice.actions;

export default searchAnimeDataSlice.reducer;