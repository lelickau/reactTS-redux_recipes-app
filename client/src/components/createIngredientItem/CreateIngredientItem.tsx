import React from 'react';
import InputElem from '../UI/input/InputElem';

import './createIngredientItem.scss';

const CreateIngredientItem = () => {
    return (
        <div className="create-ingredient">
            <label className="create-ingredient__item">
            Ingredient <span className="create-ingredient__required">*</span>
                <InputElem
                    placeholder="pizza"
                    name="food"
                    type="text"
                />
            </label>
            <label className="create-ingredient__item">
            Quantity <span className="create-ingredient__required">*</span>
                <InputElem
                    placeholder="0.5"
                    name="quantity"
                    type="number"
                />
            </label>
            <div className="create-ingredient__item">
                <h3 className="create-ingredient__item-title">Measure <span className="create-ingredient__required">*</span></h3>
                <select name='measure' className="create-ingredient__item-select">
                    <option value="grams" className="create-ingredient__measure">grams</option>
                    <option value="teaspoon" className="create-ingredient__measure">teaspoon</option>
                    <option value="cups" className="create-ingredient__measure">cups</option>
                    <option value="ounce" className="create-ingredient__measure">ounce</option>
                    <option value="pinch" className="create-ingredient__measure">pinch</option>
                    <option value="tablespoon" className="create-ingredient__measure">tablespoon</option>
                </select>
            </div>
        </div>
    );
};

export default CreateIngredientItem;