import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { processResponseRecipeData } from "helpers/processResponseRecipeData";
import { IQuery } from "models/IQuery";

interface InitialStateRecipes {
    recipes: any[];
    status: string | null;
    error:  string | null | unknown;
    nextPage: string;
}

// 'next page'
export const nextSearchRecipes = createAsyncThunk(
    'recipes/nextSearchRecipes',
    async (link: string, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.get(link)
            console.log(response.data)
            if (response.data.count === 0) {
                return null
            }
            dispatch(addNextPageRecipes(processResponseRecipeData(response.data.hits)))
            return response.data._links.next.href

        } catch (e) {
            console.log(e)
            return rejectWithValue('Error')
        }
    }
)

// get recipes from the server
export const searchRecipes = createAsyncThunk(
    'recipes/searchRecipes',
    async (query: IQuery, {rejectWithValue}) => {
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
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(searchRecipes.pending, setLoading)
        .addCase(searchRecipes.fulfilled, (state, action) => {
            state.status = 'resolve'
            if (action.payload) {
                state.recipes = action.payload.data
                state.nextPage = action.payload.next
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

const {addNextPageRecipes} = recipesSlice.actions
export default recipesSlice.reducer