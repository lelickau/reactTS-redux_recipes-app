import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { IRecipeInStore } from 'models/IRecipe';
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router';
import { deleteFavoriteRecipe } from 'store/slices/favoritesSlice';
import { changeFavs } from 'store/slices/recipesSlice';
import Dish from './Dish'

interface FullRecipeParams {
    id: string;
}

const SearchDish: FC = () => {
    const dispatch = useAppDispatch()
    const params = useParams<FullRecipeParams>()
    const {id} = useParams<FullRecipeParams>()
    const recipe:IRecipeInStore = useAppSelector(state => state.recipes.recipes[+id])
    const userId = useAppSelector(state => state.user.id)

    const history = useHistory()
    console.log(params)

    const addFavs = () => {
        dispatch(deleteFavoriteRecipe(id))
        dispatch(changeFavs(recipe.recipeId))
    }

    const backToSearch = () => {
        history.push('/search')
    }

    if (!recipe) {
        history.push('/search')
    }
    return (
        <Dish
            recipe={recipe}
            backToSearch={backToSearch}
            onClick={addFavs}
            userId={userId}
        />
    );
};

export default SearchDish;