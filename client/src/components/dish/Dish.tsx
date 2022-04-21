import RecipeDescription from 'components/recipeDescription/RecipeDescription';
import ButtonFavs from 'components/UI/buttonFavs/ButtonFavs';
import { IDigest, IIngredients, IRecipeInStore } from 'models/IRecipe';
import React, { FC } from 'react';
import Tag from 'components/UI/tag/Tag';
import ButtonBack from 'components/UI/buttonBack/ButtonBack';

import './dish.scss'

interface DishParams {
    recipe: IRecipeInStore;
    backToSearch: () => void;
    onClick: () => void;
    userId: string;
    imgLink?: string | null;
}

const Dish: FC<DishParams> = ({recipe, backToSearch, onClick, userId, imgLink}) => {

    return (
        <section className="dish">
            { recipe && <>
                <div className="dish__control">
                    <ButtonBack backTo={backToSearch}/>
                    { userId &&
                        <ButtonFavs active={recipe.favorite} addFavs={onClick}/>
                    }
                </div>
                <div className="dish__main">
                    <article className="dish__header">
                        <div className="dish__img-box">
                            <img className="dish__img" src={imgLink ? imgLink : recipe.image} alt={recipe.label} />
                        </div>
                        <div className="dish__descr">
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
                        </div>
                    </article>
                    <article className="dish__nutrients">
                        <ul className="dish__nutrients-list">
                        {
                            recipe.totalNutrients.map((nutr: IDigest) =>
                                <li
                                    className="dish__nutrients-item"
                                    key={nutr.label}
                                >
                                    <span className="dish__nutrients-label">
                                        {nutr.label}
                                    </span>
                                    <span className="dish__nutrients-quantity">
                                        {nutr.quantity}{nutr.unit}
                                    </span>
                                </li>)
                        }
                        </ul>
                    </article>
                    <article className="dish__ingredients">
                        <h1 className="dish__ingredients-title title">Ingredients:</h1>
                        <ul className="dish__ingredients-list">
                        {
                            recipe.ingredients?.map((ingr: IIngredients, idx) =>
                                <li
                                    className="dish__ingredient-item"
                                    key={ingr.foodId+idx}
                                >{ingr.food} {ingr.weight}g</li>)
                        }
                        </ul>
                    </article>
                    <article className="dish__health">
                        { recipe.healthLabels?.map((tag) => <Tag label={tag} key={tag}/>) }
                    </article>
                </div>
            </>
            }
            </section>
    );
};

export default Dish;