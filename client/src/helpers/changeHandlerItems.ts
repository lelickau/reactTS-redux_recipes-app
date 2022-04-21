import { ChangeEvent } from "react"
import { validateFormDataCreateRecipe } from "./validateFormDataCreateRecipe"

export const changeHandlerItems = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>,
        formStateData: any[],
        setFormStateData: (value: React.SetStateAction<any[]>) => void
    ) => {

    const id = e.target.getAttribute('data-id')
    const elemIndex = formStateData.findIndex(item => item.id === id)
    if (elemIndex !== -1) {
        const formData = formStateData.map((item: any) => {

            if (item.id === id) {
                return {
                    ...item,
                    [e.target.name]: e.target.value,
                    error: false
                }
            }
            return {...item}
        })
        const validData = validateFormDataCreateRecipe(formData)
        setFormStateData(validData)
    } else {
        setFormStateData([
            ...formStateData,
            {[e.target.name]: e.target.value, id}
        ])
    }
}
