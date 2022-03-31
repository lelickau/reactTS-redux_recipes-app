import ButtonElem from 'components/UI/button/ButtonElem';
import { IRecipe } from 'models/IRecipe';
import React, { FC } from 'react';

import favBtn from 'resources/ico/favs-btn.svg'
import './recipeItem.scss'

interface RecipesProps {
    recipe: IRecipe
}

const RecipeItem:FC<RecipesProps> = ({recipe}) => {
    console.log(recipe);
    return (
        <aside className="recipe">
            <h2 className="recipe__title title">{recipe.label}</h2>
            <div className="recipe__descr">
                <div className="recipe__item">
                    <div className="recipe__img-box">
                        <img className="recipe__img" src={recipe.image} alt={recipe.label} />
                    </div>
                    <a className="recipe__source" href={recipe.url}>Source: "{recipe.source}"</a>
                    <div className="recipe__tags">
                        {
                            recipe.cuisineType.map(tag => <span className="recipe__tag-item" key={tag}>{tag}</span>)
                        }
                        {
                            recipe.mealType.map(tag => <span className="recipe__tag-item" key={tag}>{tag}</span>)
                        }
                    </div>
                </div>
                <div className="recipe__item recipe__item-total">
                    <div className="recipe__total-box">
                        <div className="recipe__total">
                            <span className="recipe__total-title">Weight</span>
                            <span className="recipe__total-count">{recipe.totalWeight}g</span>
                        </div>
                        <div className="recipe__total">
                            <span className="recipe__total-title">Calories</span>
                            <span className="recipe__total-count">{recipe.calories}Cal</span>
                        </div>
                    </div>
                    <div className="recipe__btns">
                        <button className="recipe__favorite-btn">
                            <img className="recipe__favorite-img" src={favBtn} alt="fav" />
                        </button>
                        <ButtonElem>More</ButtonElem>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default RecipeItem;