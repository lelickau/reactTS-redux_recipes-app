import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "firebase-config"
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { IMyRecipe } from "models/IMyRecipe"

export const getMyRecipes = createAsyncThunk(
    'myRecipes/getMyRecipes',
    async (id: string) => {
        const q = query(collection(db, "recipes"), where("userId", "==", id))
        const querySnapshot = await getDocs(q)
        const myRecipes = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        console.log(myRecipes)
        return myRecipes
    }
)

export const createRecipe = createAsyncThunk(
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
            return rejectWithValue(e)
        }
    }
)

export const deleteRecipe = createAsyncThunk(
    'myRecipes/deleteRecipe',
    async (id: string, {rejectWithValue}) => {
        try {
            await deleteDoc(doc(db, "recipes", id))
            return id
        } catch (e) {
            console.log("Error adding document: ", e)
            return rejectWithValue(e)
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
    reducers: {},
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
        .addCase(getMyRecipes.fulfilled, (state, action) => {
            state.myRecipes = action.payload
            state.status = 'resolve'
            state.error = ''
        })
        .addCase(getMyRecipes.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
        .addCase(deleteRecipe.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        .addCase(deleteRecipe.fulfilled, (state, action) => {
            state.myRecipes = state.myRecipes.filter(item => item.id !== action.payload)
            state.status = 'resolve'
            state.error = ''
        })
        .addCase(deleteRecipe.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        })
    }
})

export const {} = myRecipesSlice.actions
export default myRecipesSlice.reducer