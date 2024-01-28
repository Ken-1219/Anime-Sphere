import { createSlice } from "@reduxjs/toolkit";

export const currentPageSlice = createSlice({
    name: 'page',
    initialState: {
        currentPage: 1,
        searchPage: 1
    },
    reducers: {
        increment(state) {
            state.currentPage += 1;
        },
        decrement(state) {
            state.currentPage -= 1;
        },
        resetPage(state) {
            state.currentPage = 1;
            state.searchPage = 1;
        },

        searchIncrement(state) {
            state.searchPage += 1;
        },
        searchDecrement(state) {
            state.searchPage -= 1;
        },
        searchResetPage(state) {
            state.searchPage = 1;
            state.currentPage = 1;
        }
    }
});

export const actions = currentPageSlice.actions;
export default currentPageSlice.reducer;
