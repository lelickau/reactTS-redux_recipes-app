import CreateIngredientItem from 'components/createIngredientItem/CreateIngredientItem';
import ButtonElem from 'components/UI/button/ButtonElem';
import ButtonAdd from 'components/UI/buttonAdd/ButtonAdd';
import InputElem from 'components/UI/input/InputElem';
import TextareaElem from 'components/UI/textareaElem.tsx/TextareaElem';
import { IInpytHook } from 'models/IInputHook';
import { IForm, IMyIngr, IMySteps } from 'models/IMyRecipe';
import React, { ChangeEvent, FC, FocusEvent, MouseEvent } from 'react';

import './createForm.scss'

interface CreateFormProps {
    titleForm: string;
    changeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    form: IForm;
    addIngredient: (e: MouseEvent<HTMLButtonElement>) => void;
    ingredientFormData: IMyIngr[];
    changeHandlerIngredients: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    deleteIngr: (e: MouseEvent<HTMLDivElement>) => void;
    addStep: (e: MouseEvent<HTMLButtonElement>) => void;
    stepsFormData: IMySteps[];
    changeHandlerSteps: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    deleteStep: (e: MouseEvent<HTMLDivElement>) => void;
    saveMyRecipe: (e: MouseEvent<HTMLButtonElement>) => void;
    btnTitle: string;
    status: string | null;
    validStatus: string | boolean;
    label: IInpytHook;
    onChangeLabel: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlurLabel: (e: FocusEvent<HTMLInputElement>) => void;
}

const CreateForm: FC<CreateFormProps> = ({
        titleForm,
        changeHandler,
        form,
        addIngredient,
        ingredientFormData,
        changeHandlerIngredients,
        deleteIngr,
        addStep,
        stepsFormData,
        changeHandlerSteps,
        deleteStep,
        saveMyRecipe,
        btnTitle,
        status,
        validStatus,
        label,
        onChangeLabel,
        onBlurLabel
    }) => {
    return (
        <form className="create__form">
            <h1 className="create__form-title">{titleForm}</h1>
            <label className={`create__name ${
                ((label.isDirty && label.isEmpty) || (validStatus === 'error-label')) && 'valid-error'
                }`}>
                Name of the dish
                <span className="create__form-required">
                    *{(label.isDirty && label.isEmpty) && 'Please enter a name of the recipe.'}
                </span>
                <InputElem
                    placeholder="pizza"
                    name="label"
                    type="text"
                    onChange={onChangeLabel}
                    onBlur={onBlurLabel}
                    value={label.value}
                />
            </label>
            <div className="create__ingredients">
                <div className="create__add-btn">
                    <ButtonAdd onClick={addIngredient}/>
                </div>
                <div className="create__ingredients-items">
                    {
                        ingredientFormData.map(item =>
                        <CreateIngredientItem
                            ingr={item.id}
                            key={item.id}
                            onChange={changeHandlerIngredients}
                            deleteElem={deleteIngr}
                            ingrData={item}
                            lengthData={ingredientFormData.length}
                        />)
                    }
                </div>
            </div>
            <div className="create__instructions">
                <h3 className="create__instructions-title">Instructions</h3>
                <div className="create__instructions-content">
                    <div className="create__add-btn">
                        <ButtonAdd onClick={addStep}/>
                    </div>
                    <div className="create__instructions-items">
                        {
                            stepsFormData.map((item, idx) =>
                                <div className="create__instructions-item" key={idx}>
                                    <TextareaElem
                                        placeholderText={item.placeholder}
                                        name='step'
                                        id={item.id}
                                        onChange={changeHandlerSteps}
                                        instrData={stepsFormData[idx]}
                                    />
                                    {
                                        stepsFormData.length > 1 ?
                                        <div
                                            className="create__delete-btn"
                                            onClick={deleteStep}
                                            data-id={item.id}
                                        >
                                        </div> :
                                        ''
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="create__info">
                <label className="create__info-item">
                    Ready in (minutes)
                    <InputElem
                        placeholder="60"
                        name="time"
                        type="number"
                        onChange={changeHandler}
                        value={form.time}
                    />
                </label>
                <label className="create__info-item">
                    Servings
                    <InputElem
                        placeholder="4"
                        name="servings"
                        type="number"
                        onChange={changeHandler}
                        value={form.servings}
                    />
                </label>
            </div>
            <div className="create__info">
                <label className="create__info-notes">
                    Chef's Notes
                    <TextareaElem
                        placeholderText='notes about the recipe '
                        name='notes'
                        id='notes'
                        onChange={changeHandler}
                        value={form.notes}
                    />
                </label>
            </div>
                <ButtonElem onClick={saveMyRecipe} status={status}>{btnTitle}</ButtonElem>
        </form>
    );
};

export default CreateForm;