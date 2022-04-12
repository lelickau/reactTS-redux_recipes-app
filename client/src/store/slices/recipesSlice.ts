import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { processResponseRecipeData } from "helpers/processResponseRecipeData";
import { IQuery } from "models/IQuery";
import { IRecipeFetch, IRecipeInStore } from "models/IRecipe";
import { AppDispatch, RootState } from "store";

interface InitialStateRecipes {
    recipes: any[];
    status: string | null;
    error:  string | null | unknown;
    nextPage: string;
}

// 'next page'
export const nextSearchRecipes = createAsyncThunk<string, string, {state: RootState, dispatch: AppDispatch}>(
    'recipes/nextSearchRecipes',
    async (link, {rejectWithValue, dispatch, getState}) => {
        try {
            const response = await axios.get(link)
            if (response.data.count === 0) {
                return null
            }

            const {favorites} = getState().favorites
            dispatch(addNextPageRecipes(processResponseRecipeData(response.data.hits, favorites)))
            return response.data._links.next.href

        } catch (e) {
            console.log(e)
            return rejectWithValue('Error')
        }
    }
)

// get recipes from the server
export const searchRecipes = createAsyncThunk<IRecipeFetch[] | null, IQuery, {state: RootState, dispatch: AppDispatch}>(
    'recipes/searchRecipes',
    async (query, {rejectWithValue, dispatch, getState}) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_RECIPES_APP_URL}?type=public&q=${query.recipeName}&app_id=${process.env.REACT_APP_RECIPES_APP_ID}&app_key=${process.env.REACT_APP_RECIPES_APP_KEY}${query.numOfIngr}${query.filters}`
            )
            console.log(response.data.hits)
            if (response.data.count === 0) {
                return null
            }
            dispatch(addLinkNextPage(response.data._links.next.href))

            const {favorites} = getState().favorites

            return processResponseRecipeData(response.data.hits, favorites)

        } catch (e) {
            console.log(e)
            return rejectWithValue('Error')
        }
    }
)

const setLoading = (state: InitialStateRecipes) => {
    state.status = 'loading'
    state.error = ''
}

const setError = (state: InitialStateRecipes, action: any) => {
    state.status = 'rejected'
    state.error = action.payload
}

const initialState: InitialStateRecipes = {
    recipes: [],
    status: null,
    error:  null,
    nextPage: '',
}

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        addNextPageRecipes(state, action) {
            action.payload.forEach((item:{}) => {
                state.recipes.push(item)
            })
        },
        addLinkNextPage(state, action) {
            state.nextPage = action.payload
        },
        changeFavs(state, action) {
            state.recipes.map((item: IRecipeInStore) => {
                if (item.recipeId === action.payload) {
                    item.favorite = !item.favorite
                }
            })
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(searchRecipes.pending, setLoading)
        .addCase(searchRecipes.fulfilled, (state, action) => {
            state.status = 'resolve'
            if (action.payload) {
                state.recipes = action.payload
            } else {
                state.error = 'Not Found'
            }
        })
        .addCase(searchRecipes.rejected, setError)
        .addCase(nextSearchRecipes.pending, setLoading)
        .addCase(nextSearchRecipes.fulfilled, (state, action) => {
            state.status = 'resolve'
            state.error = ''
            state.nextPage = action.payload
        })
        .addCase(nextSearchRecipes.rejected, setError)
    }
})

export const { addNextPageRecipes, addLinkNextPage, changeFavs} = recipesSlice.actions
export default recipesSlice.reducer