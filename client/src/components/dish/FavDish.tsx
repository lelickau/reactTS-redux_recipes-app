import Dish from './Dish';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { IRecipeInStore } from 'models/IRecipe';
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router';
import { addFavoriteRecipe, deleteFavoriteRecipe } from 'store/slices/favoritesSlice'

interface FavDishParams {
    id: string;
}

const FavDish: FC = () => {
    const dispatch = useAppDispatch()
    const params = useParams<FavDishParams>()
    const {id} = useParams<FavDishParams>()
    const recipe:IRecipeInStore = useAppSelector(state => state.favorites.favorites[+id])
    const userId = useAppSelector(state => state.user.id)

    const history = useHistory()
    console.log(params)

    const deleteFav = () => {
        dispatch(deleteFavoriteRecipe(recipe.id))
        history.push('/favs')
    }

    const backToSearch = () => {
        history.push('/favs')
    }

    if (!recipe) {
        history.push('/favs')
    }
    return (
        <Dish
            recipe={recipe}
            backToSearch={backToSearch}
            onClick={deleteFav}
            userId={userId}
        />
    );
};

export default FavDish;