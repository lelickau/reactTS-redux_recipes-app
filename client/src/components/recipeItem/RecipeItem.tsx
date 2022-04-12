import RecipeDescription from 'components/recipeDescription/RecipeDescription';
import ButtonElem from 'components/UI/button/ButtonElem';
import ButtonFavs from 'components/UI/buttonFavs/ButtonFavs';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { IRecipeInStore } from 'models/IRecipe';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { changeFavs } from 'store/slices/recipesSlice';
import { addFavoriteRecipe, deleteFavoriteRecipe } from 'store/slices/favoritesSlice';
import './recipeItem.scss'

interface RecipesProps {
    recipe: IRecipeInStore;
    idRecipe: number;
}

const RecipeItem:FC<RecipesProps> = ({recipe, idRecipe}) => {
    const dispatch = useAppDispatch()
    const {id} = useAppSelector(state => state.user)

    const changeFavorite = () => {
        const recipeId = recipe.recipeId
        if (recipe.favorite) {
            dispatch(changeFavs(recipeId))
            const favId = recipe.id
            dispatch(deleteFavoriteRecipe(favId))
        } else {
            dispatch(addFavoriteRecipe({
                ...recipe,
                userId: id
            }))
            dispatch(changeFavs(recipeId))
        }
    }

    return (
        <article className="recipe">
            <div className="recipe__img-box">
                <img className="recipe__img" src={recipe.image} alt={recipe.label}  />
            </div>
            <div className="recipe__descr">
                <RecipeDescription
                    label={recipe.label}
                    totalWeight={recipe.totalWeight}
                    calories={recipe.calories}
                    url={recipe.url}
                    source={recipe.source}
                    cuisineType={recipe.cuisineType}
                    dishType={recipe.dishType}
                    mealType={recipe.mealType}
                />
                <div className="recipe__btns">
                    { id && <ButtonFavs active={recipe.favorite} addFavs={changeFavorite}/> }
                    <NavLink to={`/search/${idRecipe}`}><ButtonElem>More</ButtonElem></NavLink>
                </div>
            </div>
        </article>
    );
};

export default RecipeItem;