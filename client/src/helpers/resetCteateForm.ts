import { IForm, IMyIngr, IMySteps } from "models/IMyRecipe"
import { SetStateAction } from "react"

export const resetCreateForm = (
    setForm: (value: SetStateAction<IForm>) => any,
    setSteps: (value: SetStateAction<IMySteps[]>) => any,
    setIngr: (value: SetStateAction<IMyIngr[]>) => any,
    id: string
    ) => {

    setForm({
        userId: id,
        time: '',
        servings: '',
        notes: '',
        id: '',
    })
    setSteps([{placeholder: 'step 1', id: 'step1', step: '', error: false}])
    setIngr([{id: 'food1', ingr: '', quant: '', measure: 'measure', error: false}])
}