import { configureStore } from "@reduxjs/toolkit"
import favoritesSlice from "./slices/favoritesSlice"
import myRecipesSlice from "./slices/myRecipesSlice"
import recipesSlice from "./slices/recipesSlice"
import userReducer from './slices/userSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        recipes: recipesSlice,
        favorites: favoritesSlice,
        myRecipe: myRecipesSlice,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
