import React, { FC } from 'react';
import IngredientItem from '../../components/ingredientItem/IngredientItem';
import ButtonElem from '../../components/UI/button/ButtonElem';
import ButtonAdd from '../../components/UI/buttonAdd/ButtonAdd';
import InputElem from '../../components/UI/input/InputElem';
import TextareaElem from '../../components/UI/textareaElem.tsx/TextareaElem';

import './createPage.scss';

const CreatePage:FC = () => {
    return (
        <article className="create">
            <form className="create__form">
                <h1 className="create__form-title">Adding a recipe</h1>
                <label className="create__name">
                    Name of the dish <span className="create__form-required">*</span>
                    <InputElem
                        placeholder="pizza"
                        name="label"
                        type="text"
                    />
                </label>
                <div className="create__ingredients">
                    <div className="create__add-btn">
                        <ButtonAdd/>
                    </div>
                    <div className="create__ingredients-items">
                        <IngredientItem/>
                        <IngredientItem/>
                        <IngredientItem/>
                    </div>
                </div>
                <div className="create__instructions">
                    <h3 className="create__instructions-title">Instructions</h3>
                    <div className="create__instructions-content">
                        <div className="create__add-btn">
                            <ButtonAdd/>
                        </div>
                        <div className="create__instructions-items">
                            <TextareaElem placeholderText='step 1' name="step1"/>
                            <TextareaElem placeholderText='step 2' name="step2"/>
                            <TextareaElem placeholderText='step 3' name="step3"/>
                        </div>
                    </div>
                </div>
                <div className="create__info">
                    <label className="create__info-item">
                        Ready in (minutes)
                        <InputElem
                            placeholder="60"
                            name="ready"
                            type="number"
                        />
                    </label>
                    <label className="create__info-item">
                        Servings
                        <InputElem
                            placeholder="4"
                            name="servings"
                            type="number"
                        />
                    </label>
                </div>
                <div className="create__info">
                    <label className="create__info-notes">
                        Chef's Notes
                        <TextareaElem placeholderText='notes about the recipe ' name='notes'/>
                    </label>
                </div>
                <ButtonElem>Create</ButtonElem>
            </form>
        </article>
    );
};

export default CreatePage;