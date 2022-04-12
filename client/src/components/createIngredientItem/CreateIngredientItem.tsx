import React, { ChangeEvent, FC, FormEvent } from 'react';
import InputElem from '../UI/input/InputElem';

import './createIngredientItem.scss';

interface CreateIngredientItemProps {
    ingr: string;
    onChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => any;
}

const CreateIngredientItem: FC <CreateIngredientItemProps> = ({ingr, onChange}) => {
    return (
        <div className="create-ingredient">
            <label className="create-ingredient__item">
            Ingredient <span className="create-ingredient__required">*</span>
                <InputElem
                    placeholder="pizza"
                    data-id={ingr}
                    name="ingr"
                    type="text"
                    onChange={onChange}
                />
            </label>
            <label className="create-ingredient__item">
            Quantity <span className="create-ingredient__required">*</span>
                <InputElem
                    placeholder="0.5"
                    data-id={ingr}
                    name="quant"
                    type="number"
                    onChange={onChange}
                />
            </label>
            <div className="create-ingredient__item">
                <h3 className="create-ingredient__item-title">Measure <span className="create-ingredient__required">*</span></h3>
                <select name="measure" data-id={ingr} onChange={onChange} className="create-ingredient__item-select">
                    <option value="grams" className="create-ingredient__measure">measure</option>
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