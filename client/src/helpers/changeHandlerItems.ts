import { ChangeEvent } from "react"

export const changeHandlerItems = (
        dataState: any[],
        e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>,
        changeStateFun: (value: React.SetStateAction<any[]>
    ) => void) => {

    const id = e.target.getAttribute('data-id')
    const elem = dataState.find(item => item.id === id)
    if (elem) {
        const ingr = dataState.map((item: any) => {
                if (item.id === id) {
                    return {
                        ...item,
                        [e.target.name]: e.target.value
                    }
                }
                return {...item}
            })
            changeStateFun(ingr)
    } else {
        changeStateFun([
            ...dataState,
            {[e.target.name]: e.target.value, id: id}
        ])
    }
}