import { configureStore } from "@reduxjs/toolkit"
import loaderSlice from "./slices/loaderSlice"
import recipesSlice from "./slices/recipesSlice"
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        loader: loaderSlice,
        recipes: recipesSlice,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
