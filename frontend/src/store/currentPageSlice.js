import { createSlice } from "@reduxjs/toolkit";

export const currentPageSlice = createSlice({
    name: 'page',
    initialState: {
        currentPage: 1,
        searchPage: 1
    },
    reducers: {
        increment(state, action) { state.currentPage += 1 },
        decrement(state, action) { state.currentPage -= 1 },
        resetPage(state, action) { state.currentPage = 1 },

        searchIncrement(state, action) { state.searchPage += 1; },
        searchDecrement(state, action) { state.searchPage -= 1 },
        searchResetPage(state, action) { state.searchPage = 1 }
    }
})


export const actions = currentPageSlice.actions;
export default currentPageSlice.reducer;