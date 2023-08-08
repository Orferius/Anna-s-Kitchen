import { createSlice } from "@reduxjs/toolkit";

const dishesSlice = createSlice({
    name: 'dishes',
    initialState: {
        dishes: [],
    },
    reducers: {
        setDishes(state, action) {
            state.dishes = action.payload;
        }
    }
})

export default dishesSlice.reducer;
export const {setDishes} = dishesSlice.actions;