import React, { FC } from 'react';
import { IIngredients } from 'models/IRecipe'

import './ingredientItem.scss';
interface IngredientItemProps {
    ingredient: IIngredients
}

const IngredientItem: FC<IngredientItemProps> = ({ingredient}) => {
    return (
        <div className="ingredient">
            {ingredient.food} ({ingredient.weight}g)
        </div>
    );
};

export default IngredientItem;