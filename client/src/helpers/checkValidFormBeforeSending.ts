export const checkValidFormBeforeSending = (formData: any[], label: string) => {
    let validStatus = true
    if (!label) return 'error-label'
    formData.forEach(item => {
        for (const key in item) {
            if (item[key] === '') {
                validStatus = false
                break
            }
        }
    })
    return validStatus
}