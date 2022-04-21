import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { IParams } from 'models/IParams';
import { IRecipeInStore } from 'models/IRecipe';
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router';
import { deleteFavoriteRecipe } from 'store/slices/favoritesSlice';
import { changeFavs } from 'store/slices/recipesSlice';
import Dish from './Dish'

const SearchDish: FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams<IParams>()
    const recipe:IRecipeInStore = useAppSelector(state => state.recipes.recipes[+id])
    const userId = useAppSelector(state => state.user.id)

    const history = useHistory()

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