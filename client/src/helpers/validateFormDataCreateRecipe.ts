export const validateFormDataCreateRecipe = (data: any[]) => {
    return  data.map((item: any) => {
        let error = false
        for (const key in item) {
            if (item[key] === '' || item[key] === 'measure') {
                error = true
                break
            }
        }
        return {
            ...item,
            error
        }
    })


}