import { MouseEvent } from "react"

export const deleteFormElem = (
    e: MouseEvent<HTMLDivElement>,
    formStateData: any[]
) => {
    if (formStateData.length < 2) return
    let elemId = (e.currentTarget as HTMLDivElement).getAttribute('data-id')
    const updateFormStateData = formStateData.filter((item: any) => item.id !== elemId)
    return updateFormStateData
}

