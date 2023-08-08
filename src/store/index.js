import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesReducer";
import dishesReducer from "./dishesReducer";
import favsReducer from "./favsReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
    categories: categoriesReducer,
    dishes: dishesReducer,
    favs: favsReducer,
    filter: filterReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
