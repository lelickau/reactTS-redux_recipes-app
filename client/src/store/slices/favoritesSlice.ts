import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { db } from "firebase-config"
import { collection, getDocs, addDoc, query, where, doc, deleteDoc  } from "firebase/firestore"
import { IRecipeInStore } from "models/IRecipe";

interface InitialStateFavorites {
    favorites: any[];
    imgLink: string | null;
    status: string | null;
    error:  string | null | undefined;
}

export const getFavoritesRecipes = createAsyncThunk<any[], string, {rejectValue: string}>(
    'favorites/getFavoritesRecipes',
    async (id: string, {rejectWithValue}) => {
        try {
            const q = query(collection(db, "favorites"), where("userId", "==", id))
            const querySnapshot = await getDocs(q)
            const allFav = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            //
            return allFav
        } catch (e) {
            console.log("Error getting document: ", e)
            return rejectWithValue('Error getting document')
        }
    }
)


export const getFavoritesImageRecipe = createAsyncThunk<string, string, {rejectValue: string}>(
    'favorites/getFavoritesImageRecipe',
    async (recipeId: string, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_RECIPES_APP_URL}/${recipeId}?type=public&app_id=${process.env.REACT_APP_RECIPES_APP_ID}&app_key=${process.env.REACT_APP_RECIPES_APP_KEY}&field=image`
            )
            return response.data.recipe.image

        } catch (e) {
            console.log("Error getting document: ", e)
            return rejectWithValue('Error getting document')
        }
    }
)

export const addFavoriteRecipe = createAsyncThunk<any, IRecipeInStore, {rejectValue: string}>(
    'favorites/addFavoriteRecipe',
    async (query: IRecipeInStore, {rejectWithValue}) => {
        try {
            const updateRecipe = {
                ...query,
                favorite: true,
            }
            const docRef = await addDoc(collection(db, "favorites"), updateRecipe)
            if (docRef.id) {
                return {
                    ...updateRecipe,
                    id: docRef.id,
                }
            }
        } catch (e) {
            console.error("Error adding document: ", e)
            return rejectWithValue('Error adding document')
        }
    }
)

export const deleteFavoriteRecipe = createAsyncThunk<string, string, {rejectValue: string}>(
    'favorites/deleteFavoriteRecipe',
    async (id: string, {rejectWithValue}) => {
        try {
            await deleteDoc(doc(db, "favorites", id))
            return id
        } catch (e) {
            console.error("Error delete document: ", e)
            return rejectWithValue('Error delete document')
        }
    }
)

const initialState: InitialStateFavorites = {
    favorites: [],
    imgLink: null,
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
            state.status = 'resolve'
            state.error = ''
        })
        .addCase(getFavoritesRecipes.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
        .addCase(addFavoriteRecipe.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        .addCase(addFavoriteRecipe.fulfilled, (state, action) => {
            state.favorites.push(action.payload)
            state.status = 'resolve'
            state.error = ''
        })
        .addCase(addFavoriteRecipe.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
        .addCase(deleteFavoriteRecipe.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        .addCase(deleteFavoriteRecipe.fulfilled, (state, action) => {
            state.favorites = state.favorites.filter(item => item.id !== action.payload)
            state.status = 'resolve'
            state.error = ''
        })
        .addCase(deleteFavoriteRecipe.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
        .addCase(getFavoritesImageRecipe.fulfilled, (state, action) => {
            state.imgLink = action.payload
        })
    }
})

export const {} = favoritesSlice.actions
export default favoritesSlice.reducer