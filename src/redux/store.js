import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import restaurantsReducer from './restaurants/restaurantsSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurants: restaurantsReducer
    }
})

export default store;