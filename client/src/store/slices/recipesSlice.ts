import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { processResponseRecipeData } from "helpers/processResponseRecipeData";
import { IQuery } from "models/IQuery";

export const nextSearchRecipes = createAsyncThunk(
    'recipes/nextSearchRecipes',
    async (link: string) => {
        try {
            const response = await axios.get(link)
            console.log(response.data)
            if (response.data.count === 0) {
                return null
            }
            return {data: processResponseRecipeData(response.data.hits), next: response.data._links.next.href}

        } catch (e) {
            console.log(e)
        }
    }
)

export const searchRecipes = createAsyncThunk(
    'recipes/searchRecipes',
    async (query: IQuery) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_RECIPES_APP_URL}?type=public&q=${query.recipeName}&app_id=${process.env.REACT_APP_RECIPES_APP_ID}&app_key=${process.env.REACT_APP_RECIPES_APP_KEY}`
            )
            console.log(response.data)
            if (response.data.count === 0) {
                return null
            }

            return {data: processResponseRecipeData(response.data.hits), next: response.data._links.next.href}

        } catch (e) {
            console.log(e)
            return null
        }
    }
)

interface InitialStateRecipes {
    recipes: any[];
    status: string | null;
    error:  string | null;
    nextPage: string;
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
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(searchRecipes.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        .addCase(searchRecipes.fulfilled, (state, action) => {
            state.status = 'resolve'
            if (action.payload) {
                state.recipes = action.payload.data
                state.nextPage = action.payload.next
            } else {
                state.error = 'Not Found'
            }
        })
        .addCase(searchRecipes.rejected, (state) => {
            state.status = 'error'
            state.error = 'Not Found'
        })
        .addCase(nextSearchRecipes.fulfilled, (state, action) => {
            state.status = 'resolve'
            if (action.payload) {
                state.recipes = action.payload.data
                state.nextPage = action.payload.next
            } else {
                state.error = 'Not Found'
            }
        })
    }
})

export const {} = recipesSlice.actions
export default recipesSlice.reducer