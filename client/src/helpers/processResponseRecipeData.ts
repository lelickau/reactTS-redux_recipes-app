import { IRecipe } from "models/IRecipe"

const createTotalData = (objectData: {}) => {
    if (objectData) {
        return Object.values(objectData).map((data: any) => {
            return {
                label: data.label || null,
                quantity: data.quantity.toFixed(0) || null,
                unit: data.unit || null,
            }
        })
    }
    return null
}

export const processResponseRecipeData = (array: any[]): any[]  => {
    return array.map((item: {recipe: IRecipe}) => {

        const digest = item.recipe.digest?.map((d) => {
            return {
                daily: d.daily.toFixed(0),
                label: d.label,
                total: d.total.toFixed(0),
                unit: d.unit,
            }
        })

        const ingredients = item.recipe.ingredients?.map((i) => {
            return {
                food: i.food,
                foodId: i.foodId,
                weight: i.weight.toFixed(0),
            }
        })

        const totalDaily = createTotalData(item.recipe.totalDaily)
        const totalNutrients = createTotalData(item.recipe.totalNutrients)

        return {
            label: item.recipe.label,
            calories: item.recipe.calories.toFixed(0),
            cuisineType: item.recipe.cuisineType,
            digest: digest,
            dishType: item.recipe.dishType,
            healthLabels: item.recipe.healthLabels,
            ingredients: ingredients,
            mealType: item.recipe.mealType,
            source: item.recipe.source,
            url: item.recipe.url,
            image: item.recipe.image,
            totalDaily: totalDaily,
            totalNutrients: totalNutrients,
            totalWeight: item.recipe.totalWeight.toFixed(0)
        }
    })

}