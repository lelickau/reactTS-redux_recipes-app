import React, { ChangeEvent, FC, MouseEvent } from 'react';
import { IMyIngr } from 'models/IMyRecipe';
import InputElem from '../UI/input/InputElem';

import './createIngredientItem.scss';

interface CreateIngredientItemProps {
    ingr: string;
    ingrData?: IMyIngr | any;
    onChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => any;
    deleteElem?: (e: MouseEvent<HTMLDivElement>) => any;
    lengthData: number;
}

const CreateIngredientItem: FC <CreateIngredientItemProps> = ({ingr, onChange, ingrData, deleteElem, lengthData}) => {
    return (
        <div className="create-ingredient">
            <label className={`create-ingredient__item ${(!ingrData.ingr && ingrData.error) ? 'valid-error' : ''}`}>
            Ingredient <span className="create-ingredient__required">*</span>
                <InputElem
                    placeholder="pizza"
                    data-id={ingr}
                    name="ingr"
                    type="text"
                    onChange={onChange}
                    value={ingrData.ingr}
                />
            </label>
            <label className={`create-ingredient__item ${(!ingrData.quant && ingrData.error) ? 'valid-error' : ''}`}>
            Quantity <span className="create-ingredient__required">*</span>
                <InputElem
                    placeholder="0.5"
                    data-id={ingr}
                    name="quant"
                    type="number"
                    onChange={onChange}
                    value={ingrData.quant}

                />
            </label>
            <div className="create-ingredient__item">
                <h3 className="create-ingredient__item-title">Measure <span className="create-ingredient__required">*</span></h3>
                <select
                    name="measure"
                    data-id={ingr}
                    onChange={onChange}
                    value={ingrData.measure}
                    className={`create-ingredient__item-select ${(ingrData.measure === 'measure' && ingrData.error) ? 'valid-error' : ''}`}
                >
                    <option value="measure" className="create-ingredient__measure">measure</option>
                    <option value="grams" className="create-ingredient__measure">grams</option>
                    <option value="teaspoon" className="create-ingredient__measure">teaspoon</option>
                    <option value="cups" className="create-ingredient__measure">cups</option>
                    <option value="ounce" className="create-ingredient__measure">ounce</option>
                    <option value="pinch" className="create-ingredient__measure">pinch</option>
                    <option value="tablespoon" className="create-ingredient__measure">tablespoon</option>
                </select>
            </div>
            {
                lengthData > 1 ?
                <div
                    className="create__delete-btn"
                    onClick={deleteElem}
                    data-id={ingr}
                >
                </div>
                :
                ''
            }
        </div>
    );
};

export default CreateIngredientItem;