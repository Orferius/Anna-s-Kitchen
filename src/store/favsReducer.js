import { createSlice } from "@reduxjs/toolkit";

const favsSlice = createSlice({
    name: 'favs',
    initialState: {
        favs: [],
    },
    reducers: {
        setFavs(state, action) {
            state.favs = action.payload;
        }
    }
})

export default favsSlice.reducer;
export const {setFavs} = favsSlice.actions;