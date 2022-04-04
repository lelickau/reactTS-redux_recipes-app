import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase-config"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { IRecipe } from "models/IRecipe";

interface InitialStateFavorites {
    favorites: any[];
    status: string | null;
    error:  string | null | unknown;
}

export const getFavoritesRecipes = createAsyncThunk(
    'favorites/getFavoritesRecipes',
    async () => {
        const recipesCollectionRef = collection(db, 'recipes')

        const data = await getDocs(recipesCollectionRef)
        const allFav = data.docs.map((doc) => ({...doc.data()}))
        console.log(allFav)
        return allFav
    }
)

export const addFavoriteRecipe = createAsyncThunk(
    'favorites/addFavoriteRecipe',
    async (query: IRecipe, {rejectWithValue}) => {
        try {
            const docRef = await addDoc(collection(db, "recipes"), query)
            console.log(docRef.id)
            if (docRef.id) {
                return query
            }
        } catch (e) {
            console.error("Error adding document: ", e)
            return rejectWithValue(e)
        }
    }
)

const initialState: InitialStateFavorites = {
    favorites: [],
    status: null,
    error:  null,
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getFavoritesRecipes.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        .addCase(getFavoritesRecipes.fulfilled, (state, action) => {
            state.favorites = action.payload
        })
        .addCase(getFavoritesRecipes.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
        .addCase(addFavoriteRecipe.fulfilled, (state, action) => {
            state.favorites.push(action.payload)
        })
    }
})

const {} = favoritesSlice.actions
export default favoritesSlice.reducer