import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
    },
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        }
    }
})

export default categoriesSlice.reducer;
export const {setCategories} = categoriesSlice.actions;