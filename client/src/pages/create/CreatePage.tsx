import { changeHandlerItems } from 'helpers/changeHandlerItems';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import React, { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { createRecipe } from 'store/slices/myRecipesSlice';
import CreateIngredientItem from '../../components/createIngredientItem/CreateIngredientItem';
import ButtonElem from '../../components/UI/button/ButtonElem';
import ButtonAdd from '../../components/UI/buttonAdd/ButtonAdd';
import InputElem from '../../components/UI/input/InputElem';
import TextareaElem from '../../components/UI/textareaElem.tsx/TextareaElem';

import './createPage.scss';

const CreatePage:FC = () => {
    const {id} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const [instructionItems, setInstructionItem] = useState([
        {placeholder: 'step 1', id: 'step1'},
    ])
    const addInstruction = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let idx = instructionItems.length + 1
        setInstructionItem([...instructionItems, {placeholder: `step ${idx}`, id: `step${idx}`}])
    }

    const [ingrItems, setIngrItem] = useState([{ingr: 'food1'}])
    const addIngredient = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let idx = ingrItems.length + 1
        setIngrItem([...ingrItems, {ingr: `food${idx}`}])
    }

    const [form, setForm] = useState({
        label: '',
        userId: id,
        time: 0,
        servings: 0,
        notes: '',
        id: '',
    })

    const createMyRecipe = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log({
            ...form,
            ingredients: ingredientFormItems,
            instructions: instructionsFormItems,
        })
        dispatch(createRecipe({
            ...form,
            ingredients: ingredientFormItems,
            instructions: instructionsFormItems,
        }))
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    // ingr
    const [ingredientFormItems, setIngredientFormItems] = useState<any[]>([])
    const changeHandlerIngredients = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        changeHandlerItems(ingredientFormItems, e, setIngredientFormItems)
    }

    // instruct
    const [instructionsFormItems, setInstructionsFormItems] = useState<any[]>([])
    const changeHandlerInstructions = (e: ChangeEvent<HTMLTextAreaElement>) => {
        changeHandlerItems(instructionsFormItems, e, setInstructionsFormItems)
    }

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
                        onChange={changeHandler}
                    />
                </label>
                <div className="create__ingredients">
                    <div className="create__add-btn">
                        <ButtonAdd onClick={addIngredient}/>
                    </div>
                    <div className="create__ingredients-items">
                        {
                            ingrItems.map(item =>
                                <CreateIngredientItem
                                    ingr={item.ingr}
                                    key={item.ingr}
                                    onChange={changeHandlerIngredients}
                            />)
                        }
                    </div>
                </div>
                <div className="create__instructions">
                    <h3 className="create__instructions-title">Instructions</h3>
                    <div className="create__instructions-content">
                        <div className="create__add-btn">
                            <ButtonAdd onClick={addInstruction}/>
                        </div>
                        <div className="create__instructions-items">
                            {
                                instructionItems.map(item =>
                                    <TextareaElem
                                        placeholderText={item.placeholder}
                                        name='step'
                                        key={item.id}
                                        id={item.id}
                                        onChange={changeHandlerInstructions}
                                />)
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
                        />
                    </label>
                    <label className="create__info-item">
                        Servings
                        <InputElem
                            placeholder="4"
                            name="servings"
                            type="number"
                            onChange={changeHandler}
                        />
                    </label>
                </div>
                <div className="create__info">
                    <label className="create__info-notes">
                        Chef's Notes
                        <TextareaElem
                            onChange={changeHandler}
                            placeholderText='notes about the recipe '
                            name='notes'
                            id='notes'
                        />
                    </label>
                </div>
                <ButtonElem onClick={createMyRecipe}>Create</ButtonElem>
            </form>
        </article>
    );
};

export default CreatePage;