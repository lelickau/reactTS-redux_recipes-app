import React, { ChangeEvent, FC, FocusEvent, MouseEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { changeHandlerItems } from 'helpers/changeHandlerItems';
import { checkValidFormBeforeSending } from 'helpers/checkValidFormBeforeSending';
import { deleteFormElem } from 'helpers/deleteFormElem';
import { resetCreateForm } from 'helpers/resetCteateForm';
import { validateFormDataCreateRecipe } from 'helpers/validateFormDataCreateRecipe';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useInput } from 'hooks/useInput';
import { IForm, IMyRecipe } from 'models/IMyRecipe';
import { IParams } from 'models/IParams';
import { resetStatus, deleteRecipe, editRecipe } from 'store/slices/myRecipesSlice';
import CreateForm from 'components/createForm/CreateForm';
import MessageModal from 'components/messageModal/MessageModal';
import ButtonBack from 'components/UI/buttonBack/ButtonBack';
import Delete from 'components/UI/delete/Delete';

import './editMyRecipe.scss'


const EditMyRecipe: FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams<IParams>()
    const recipe:IMyRecipe = useAppSelector(state => state.myRecipe.myRecipes[+id])
    const {status} = useAppSelector(state => state.myRecipe)
    const userId = useAppSelector(state => state.user.id)

    const history = useHistory()

    const backToMyRecipes = () => {
        history.push('/home')
    }

    if (!recipe) {
        history.push('/home')
    }

    const [validStatus, setValidStatus] = useState<boolean | string>(true)

    const label = useInput(recipe.label, {isEmpty: false, minLength: 1})
    const onChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
        setValidStatus(true)
        label.onChange(e)
    }
    const onBlurLabel = (e: FocusEvent<HTMLInputElement>) => {
        setValidStatus(true)
        label.onChange(e)
    }

    useEffect(()=> {
        if (status === 'resolve') {
            resetCreateForm(setForm, setStepsFormData, setIngredientFormData, id)
            label.resetValue()
        }
        if (status === 'resolve' || status === 'rejected') {
            setTimeout(() => {
                dispatch(resetStatus())
                backToMyRecipes()
            }, 5000)
        }
    }, [status, dispatch, label, id])


    const [form, setForm] = useState<IForm>({
        userId: userId,
        time: recipe.time || '',
        servings: recipe.servings || '',
        notes: recipe.notes || '',
        id: recipe.id,
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    // ingr
    const setStartIngrStateItems = () => {
        return recipe.ingredients.map(ingr =>
            ({id: ingr.id, ingr: ingr.ingr, quant: ingr.quant, measure: ingr.measure, error: ingr.error})
        )
    }
    const startIngrItems = setStartIngrStateItems()
    const [ingredientFormData, setIngredientFormData] = useState([
        ...startIngrItems
    ])

    const changeHandlerIngredients = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        changeHandlerItems(e, ingredientFormData, setIngredientFormData)
    }

    const addIngredient = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let id = Date.now()
        setIngredientFormData([
            ...ingredientFormData,
            { id: `food${id}`, ingr: '', quant: '', measure: 'measure', error: false}
        ])
    }

    const deleteIngr = (e: MouseEvent<HTMLDivElement>) => {
        const updateIngredientsFormData = deleteFormElem(e, ingredientFormData)
        if (updateIngredientsFormData?.length) {
            setIngredientFormData(updateIngredientsFormData)
        }
    }

    // instruct
    const setStartStepsStateItems = () => {
        return recipe.instructions?.map((instr, idx) => (
            {placeholder: `step ${idx+1}`, id: instr.id, step: instr.step, error: instr.error})
        )
    }
    const startStepsStateData = setStartStepsStateItems()
    const [stepsFormData, setStepsFormData] = useState([
        ...startStepsStateData
    ])

    const addStep = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let idx = stepsFormData.length + 1
        const stepId = Date.now()
        setStepsFormData([...stepsFormData, {placeholder: `step ${idx}`, id: `step${stepId}`,  step: '', error: false}])
    }

    const changeHandlerSteps = (e: ChangeEvent<HTMLTextAreaElement>) => {
        changeHandlerItems(e, stepsFormData, setStepsFormData)

    }

    const deleteStep = (e: MouseEvent<HTMLDivElement>) => {
        const updateStepsForm = deleteFormElem(e, stepsFormData)
        if (updateStepsForm?.length) {
            updateStepsForm.map((item, idx) => ({...item, placeholder: `step ${idx+1}`}))
            setStepsFormData(updateStepsForm)
        }
    }

    // edit
    const editMyRecipe = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const validStatus = checkValidFormBeforeSending(ingredientFormData, label.value)

        if (validStatus === 'error-label') {
            setValidStatus('error-label')
        } else if (!validStatus) {
            const validateIngr = validateFormDataCreateRecipe(ingredientFormData)
            setIngredientFormData(validateIngr)
        } else {
            console.log({...form,label: label.value,ingredients: ingredientFormData,instructions: stepsFormData,})
            dispatch(editRecipe({
                ...form,
                label: label.value,
                ingredients: ingredientFormData,
                instructions: stepsFormData,
            }))
        }
    }

    const deleteRecipeItem = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(deleteRecipe(recipe.id))
        backToMyRecipes()
    }

    const setCloseModal = () => {
        dispatch(resetStatus())
        if (status === 'resolve') backToMyRecipes()
    }

    return (
        <article className="edit create">
            <div className="edit__header">
                <ButtonBack backTo={backToMyRecipes}/>
                <button className="edit__delete" onClick={deleteRecipeItem}>
                    <Delete color="#FF3B30"/>
                </button>
            </div>
            <MessageModal
                status={status}
                setCloseModal={setCloseModal}
                successMessage='The recipe updated successfully.'
                errorMessage='Something went wrong. Try again later.'
            />
            <CreateForm
                titleForm={'Editing the recipe'}
                onChangeLabel={onChangeLabel}
                onBlurLabel={onBlurLabel}
                label={label}
                form={form}
                changeHandler={changeHandler}
                addIngredient={addIngredient}
                ingredientFormData={ingredientFormData}
                changeHandlerIngredients={changeHandlerIngredients}
                deleteIngr={deleteIngr}
                addStep={addStep}
                stepsFormData={stepsFormData}
                changeHandlerSteps={changeHandlerSteps}
                deleteStep={deleteStep}
                validStatus={validStatus}
                saveMyRecipe={editMyRecipe}
                btnTitle={'Save'}
                status={status}
            />
        </article>
    );
};

export default EditMyRecipe;