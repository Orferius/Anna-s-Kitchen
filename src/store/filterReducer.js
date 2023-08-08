import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filter: "9",
    },
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload;
        }
    }
})

export default filterSlice.reducer;
export const {setFilter} = filterSlice.actions;