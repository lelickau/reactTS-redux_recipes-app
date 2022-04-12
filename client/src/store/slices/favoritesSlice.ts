import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { db } from "firebase-config"
import { collection, getDocs, addDoc, query, where, doc, deleteDoc  } from "firebase/firestore"
import { IImageData, IRecipeInStore } from "models/IRecipe";

interface InitialStateFavorites {
    favorites: any[];
    status: string | null;
    error:  string | null | unknown;
}

export const getFavoritesRecipes = createAsyncThunk(
    'favorites/getFavoritesRecipes',
    async (id: string, {rejectWithValue, dispatch}) => {
        try {
            const q = query(collection(db, "favorites"), where("userId", "==", id))
            const querySnapshot = await getDocs(q)
            const allFav = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            //
            const favotitesIdData: string[] = []
            const nowDate = Date.now()
            const updateTime = localStorage.getItem('updateTime')
            if ((!updateTime && allFav.length) || (updateTime && allFav.length && +updateTime < nowDate)) {
                localStorage.setItem('updateTime', (nowDate + 3600000).toString())
                allFav.forEach((item: any) => favotitesIdData.push(item.recipeId))
                console.log(favotitesIdData)
                dispatch(getFavs(allFav))
                dispatch(getFavoritesImagesRecipes(favotitesIdData))
            } else {
                dispatch(getFavs(allFav))
            }
            //
            //return allFav
        } catch (e) {
            console.log("Error getting document: ", e)
            return rejectWithValue(e)
        }
    }
)


export const getFavoritesImagesRecipes = createAsyncThunk(
    'favorites/getFavoritesImagesRecipes',
    async (idArr: string[], {rejectWithValue, dispatch}) => {
        try {
            const imgData: IImageData[] = []
            idArr.forEach(async (id) => {
                const response = await axios.get(
                    `${process.env.REACT_APP_RECIPES_APP_URL}/${id}?type=public&app_id=${process.env.REACT_APP_RECIPES_APP_ID}&app_key=${process.env.REACT_APP_RECIPES_APP_KEY}&field=image`
                )
                imgData.push({
                    recipeId: id,
                    urlImg: response.data.recipe.image
                })
                console.log(response.data.recipe.image)
            })
            dispatch(updateImg(imgData))
            return imgData
        } catch (e) {
            console.log("Error getting document: ", e)
            return rejectWithValue(e)
        }
    }
)

export const addFavoriteRecipe = createAsyncThunk(
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
            return rejectWithValue(e)
        }
    }
)

export const deleteFavoriteRecipe = createAsyncThunk(
    'favorites/deleteFavoriteRecipe',
    async (id: string, {rejectWithValue}) => {
        try {
            await deleteDoc(doc(db, "favorites", id))
            return id
        } catch (e) {
            console.error("Error delete document: ", e)
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
        getFavs: (state, action) => {
            state.favorites = action.payload
            state.status = 'resolve'
            state.error = ''
        },
        updateImg: (state, action) => {
            action.payload.forEach((id:IImageData) => {
                state.favorites = state.favorites.map((fav: IRecipeInStore) => {
                    console.log(id.recipeId, ' ', fav.recipeId)
                    if (id.recipeId === fav.recipeId) {
                        return {...fav, [fav.image]: id.urlImg}
                    } else {
                        return {...fav}
                    }
                })
            })
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getFavoritesRecipes.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        // .addCase(getFavoritesRecipes.fulfilled, (state, action) => {
        //     state.favorites = action.payload
        //     state.status = 'resolve'
        //     state.error = ''
        // })
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
        .addCase(getFavoritesImagesRecipes.fulfilled, (state, action) => {
            action.payload.forEach(id => {
                state.favorites = state.favorites.map((fav: IRecipeInStore) => {
                    console.log(id.recipeId, ' ', fav.recipeId)
                    if (id.recipeId === fav.recipeId) {
                        return {...fav, [fav.image]: id.urlImg}
                    } else {
                        return {...fav}
                    }
                })
            })
        })
    }
})

export const {getFavs, updateImg} = favoritesSlice.actions
export default favoritesSlice.reducer