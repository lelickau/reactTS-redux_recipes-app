import React from 'react';
import InputElem from '../UI/input/InputElem';

import './ingredientItem.scss';

const IngredientItem = () => {
    return (
        <div className="ingredient">
            <label className="ingredient__item">
            Ingredient <span className="ingredient__required">*</span>
                <InputElem
                    placeholder="pizza"
                    name=""
                    type="text"
                />
            </label>
            <label className="ingredient__item">
            Quantity <span className="ingredient__required">*</span>
                <InputElem
                    placeholder="0.5"
                    name=""
                    type="number"
                />
            </label>
            <div className="ingredient__item">
                <h3 className="ingredient__item-title">Measure <span className="ingredient__required">*</span></h3>
                <select className="ingredient__item-select">
                    <option value="grams" className="ingredient__measure">grams</option>
                    <option value="teaspoon" className="ingredient__measure">teaspoon</option>
                    <option value="cups" className="ingredient__measure">cups</option>
                    <option value="ounce" className="ingredient__measure">ounce</option>
                    <option value="pinch" className="ingredient__measure">pinch</option>
                    <option value="tablespoon" className="ingredient__measure">tablespoon</option>
                </select>
            </div>
        </div>
    );
};

export default IngredientItem;