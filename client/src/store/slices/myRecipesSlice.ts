import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase-config"
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { IMyRecipe } from "models/IMyRecipe"

export const getMyRecipes = createAsyncThunk(
    'myRecipes/getMyRecipes',
    async (id: string) => {
        const q = query(collection(db, "recipes"), where("userId", "==", id))
        const querySnapshot = await getDocs(q)
        const myRecipes = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        return myRecipes
    }
)

export const createRecipe = createAsyncThunk<IMyRecipe | undefined, IMyRecipe, {rejectValue: string}>(
    'myRecipes/createRecipe',
    async (query: IMyRecipe, {rejectWithValue}) => {
        try {
            const docRef = await addDoc(collection(db, "recipes"), query)
            if (docRef.id) {
                return {
                    ...query,
                    id: docRef.id,
                }
            }
        } catch (e) {
            console.log("Error adding document: ", e)
            return rejectWithValue('Error adding document')
        }
    }
)

export const editRecipe = createAsyncThunk<IMyRecipe, any, {rejectValue: string}>(
    'myRecipes/editRecipe',
    async (query: any, {rejectWithValue}) => {
        try {
            const recipeDoc = doc(db, "recipes", query.id)
            await updateDoc(recipeDoc, query)
            return query
        } catch (e) {
            console.log('Error editing document: ', e)
            return rejectWithValue('Error editing document')
        }
    }
)

export const deleteRecipe = createAsyncThunk<string, string, {rejectValue: string}>(
    'myRecipes/deleteRecipe',
    async (id: string, {rejectWithValue}) => {
        try {
            await deleteDoc(doc(db, "recipes", id))
            return id
        } catch (e) {
            console.log("Error deleting document: ", e)
            return rejectWithValue('Error deleting document')
        }
    }
)

interface InitialStateMyRecipes {
    myRecipes: any[];
    status: null | string;
    error: null | string | unknown;
}

const initialState: InitialStateMyRecipes = {
    myRecipes: [],
    status: null,
    error: null,
}

export const myRecipesSlice = createSlice({
    name: 'myRecipesSlice',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createRecipe.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        .addCase(createRecipe.fulfilled, (state, action) => {
            state.myRecipes.push(action.payload)
            state.status = 'resolve'
            state.error = ''
        })
        .addCase(createRecipe.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
        .addCase(editRecipe.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        .addCase(editRecipe.fulfilled, (state, action) => {
            state.myRecipes = state.myRecipes.map(recipe => {
                if (recipe.id === action.payload.id) {
                    return {
                        ...recipe,
                        ...action.payload
                    }
                } else {
                    return {...recipe}
                }
            })
            state.status = 'resolve'
            state.error = ''
        })
        .addCase(editRecipe.rejected, (state, action) => {
            state.status = 'rejected'
            console.log(action.payload)
            state.error = action.payload
        })
        .addCase(getMyRecipes.fulfilled, (state, action) => {
            state.myRecipes = action.payload
            state.status = ''
            state.error = ''
        })
        .addCase(getMyRecipes.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
        .addCase(getMyRecipes.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        .addCase(deleteRecipe.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        .addCase(deleteRecipe.fulfilled, (state, action) => {
            state.myRecipes = state.myRecipes.filter(item => item.id !== action.payload)
            state.status = ''
            state.error = ''
        })
        .addCase(deleteRecipe.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
    }
})

export const {resetStatus} = myRecipesSlice.actions
export default myRecipesSlice.reducer