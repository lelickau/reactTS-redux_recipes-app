import Dish from './Dish';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { deleteFavoriteRecipe, getFavoritesImageRecipe } from 'store/slices/favoritesSlice'
import { IParams } from 'models/IParams';
import { changeFavs } from 'store/slices/recipesSlice';

const FavDish: FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams<IParams>()
    const {imgLink, favorites} = useAppSelector(state => state.favorites)
    const userId = useAppSelector(state => state.user.id)

    const history = useHistory()

    const deleteFav = () => {
        dispatch(deleteFavoriteRecipe(favorites[+id].id))
        dispatch(changeFavs(favorites[+id].recipeId))
        history.push('/favs')
    }

    const backToSearch = () => {
        history.push('/favs')
    }

    if (!favorites[+id]) {
        history.push('/favs')
    }

    useEffect(() => {
        if (favorites[+id].recipeId) {
            dispatch(getFavoritesImageRecipe(favorites[+id].recipeId))
        }
    }, [id, dispatch, favorites])

    return (
        <Dish
            recipe={favorites[+id]}
            backToSearch={backToSearch}
            onClick={deleteFav}
            userId={userId}
            imgLink={imgLink}
        />
    );
};

export default FavDish;