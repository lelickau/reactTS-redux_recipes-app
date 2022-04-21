import CreateForm from 'components/createForm/CreateForm';
import MessageModal from 'components/messageModal/MessageModal';
import { changeHandlerItems } from 'helpers/changeHandlerItems';
import { checkValidFormBeforeSending } from 'helpers/checkValidFormBeforeSending';
import { deleteFormElem } from 'helpers/deleteFormElem';
import { resetCreateForm } from 'helpers/resetCteateForm';
import { validateFormDataCreateRecipe } from 'helpers/validateFormDataCreateRecipe';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useInput } from 'hooks/useInput';
import { IForm, IMyIngr, IMySteps } from 'models/IMyRecipe';
import React, { ChangeEvent, FC, FocusEvent, MouseEvent, useEffect, useState } from 'react';
import { createRecipe, resetStatus } from 'store/slices/myRecipesSlice';

import './createPage.scss';

const CreatePage:FC = () => {
    const {status} = useAppSelector(state => state.myRecipe)
    const {id} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const [validStatus, setValidStatus] = useState<boolean | string>(true)

    const label = useInput('', {isEmpty: true, minLength: 1})
    const onChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
        setValidStatus(true)
        label.onChange(e)
    }
    const onBlurLabel = (e: FocusEvent<HTMLInputElement>) => {
        setValidStatus(true)
        label.onChange(e)
    }

    const createMyRecipe = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const validStatus = checkValidFormBeforeSending(ingredientFormData, label.value)

        if (validStatus === 'error-label') {
            setValidStatus('error-label')
        } else if (!validStatus) {
            const validateIngr = validateFormDataCreateRecipe(ingredientFormData)
            setIngredientFormData(validateIngr)
        } else {
            console.log({...form,label: label.value,ingredients: ingredientFormData,instructions: stepsFormData,})
            dispatch(createRecipe({
                ...form,
                label: label.value,
                ingredients: ingredientFormData,
                instructions: stepsFormData,
            }))
        }
    }

    useEffect(()=> {
        if (status === 'resolve') {
            resetCreateForm(setForm, setStepsFormData, setIngredientFormData, id)
            label.resetValue()
        }
        if (status === 'resolve' || status === 'rejected') {
            setTimeout(() => {
                dispatch(resetStatus())
            }, 5000)
        }
    }, [status, label, dispatch, id])

    const [form, setForm] = useState<IForm>({
        userId: id,
        time: '',
        servings: '',
        notes: '',
        id: '',
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    // ingr
    const addIngredient = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIngredientFormData([...ingredientFormData, {id: `food${Date.now()}`, ingr: '', quant: '', measure: 'measure', error: false}])
    }
    const [ingredientFormData, setIngredientFormData] = useState<IMyIngr[]>([
        {id: 'food1', ingr: '', quant: '', measure: 'measure', error: false}
    ])
    const changeHandlerIngredients = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        changeHandlerItems(e, ingredientFormData, setIngredientFormData)
    }

    const deleteIngr = (e: MouseEvent<HTMLDivElement>) => {
        const updateIngredientsFormData = deleteFormElem(e, ingredientFormData)
        if (updateIngredientsFormData?.length) {
            setIngredientFormData(updateIngredientsFormData)
        }
    }

    // instruct
    const [stepsFormData, setStepsFormData] = useState<IMySteps[]>([
        {placeholder: 'step 1', id: 'step1', step: '', error: false},
    ])

    const addStep = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let idx = stepsFormData.length + 1
        const stepId = Date.now()
        setStepsFormData([...stepsFormData, {placeholder: `step ${idx}`, id: `step${stepId}`, step: '', error: false}])
    }

    const changeHandlerSteps = (e: ChangeEvent<HTMLTextAreaElement>) => {
        changeHandlerItems(e, stepsFormData, setStepsFormData)
    }

    const deleteStep = (e: MouseEvent<HTMLDivElement>) => {
        const updateStepsForm = deleteFormElem(e, stepsFormData)
        if (updateStepsForm?.length) {
            const updataPlaceholder = updateStepsForm.map((item, idx) => ({...item, placeholder: `step ${idx+1}`}))
            setStepsFormData(updataPlaceholder)
        }
    }

    const setCloseModal = () => {
        dispatch(resetStatus())
    }

    return (
        <article className="create">
            <MessageModal
                status={status}
                setCloseModal={setCloseModal}
                successMessage='The recipe created successfully.'
                errorMessage='Something went wrong. Try again later.'
            />
            <CreateForm
                label={label}
                onChangeLabel={onChangeLabel}
                onBlurLabel={onBlurLabel}
                titleForm={'Creating the recipe'}
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

                saveMyRecipe={createMyRecipe}
                validStatus={validStatus}
                btnTitle={'Create'}
                status={status}
            />
        </article>
    );
};

export default CreatePage;