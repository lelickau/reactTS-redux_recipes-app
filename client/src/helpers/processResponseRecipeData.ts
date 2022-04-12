import { IRecipeFetch } from "models/IRecipe"

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

const createRecipeId = (link: string) => {
    if (link) {
        const idx = link.indexOf('_')
        return link.substring(idx+1, link.length)
    }
    return null
}

const findRecipeInFavsArray = (arrayFavs: any[], labelRecipes: string) => {
    return arrayFavs.find((recipe: IRecipeFetch) => recipe.label === labelRecipes)
}

export const processResponseRecipeData = (arrayRecipes: any[], arrayFavs: any[]): any[]  => {
    return arrayRecipes.map((item: {recipe: IRecipeFetch}) => {

        const ingredients = item.recipe.ingredients?.map((i) => {
            return {
                food: i.food,
                foodId: i.foodId,
                weight: i.weight.toFixed(0),
            }
        })

        const totalNutrients = createTotalData(item.recipe.totalNutrients)

        const isFavotite = findRecipeInFavsArray(arrayFavs, item.recipe.label)
        let id = null
        if (isFavotite) {
            id = isFavotite.id
        }

        const recipeId = createRecipeId(item.recipe.uri)

        return {
            label: item.recipe.label,
            calories: item.recipe.calories.toFixed(0),
            cuisineType: item.recipe.cuisineType,
            dishType: item.recipe.dishType,
            healthLabels: item.recipe.healthLabels,
            ingredients: ingredients,
            mealType: item.recipe.mealType,
            source: item.recipe.source,
            url: item.recipe.url,
            image: item.recipe.image,
            totalNutrients: totalNutrients,
            totalWeight: item.recipe.totalWeight.toFixed(0),
            favorite: !!isFavotite,
            recipeId,
            id,
        }
    })

}