export interface IImageData {
    recipeId: string;
    urlImg: string;
}

export interface IDigest {
    quantity: number;
    label: string;
    unit: string;
}
export interface IIngredients {
    food: string;
    foodId: string;
    weight: number;
}

export interface ITotalNutrients {
    totalNutrients: IDigest[]
};

export interface IRecipeFetch {
    uri: string;
    label: string;
    calories: number;
    cuisineType: string[];
    dishType: string[];
    healthLabels: string[];
    image: string;
    ingredients: IIngredients[];
    mealType: string[];
    source: string;
    url: string;
    totalNutrients: {
        [key: string]: {
            label: string;
            quantity: number;
            unit: string;
        };
    };
    totalWeight: number;
}

export interface IRecipeInStore {
    label: string;
    calories: number;
    cuisineType: string[];
    dishType: string[];
    healthLabels: string[];
    image: string;
    ingredients: IIngredients[];
    mealType: string[];
    source: string;
    url: string;
    totalNutrients: IDigest[];
    totalWeight: number;
    favorite: boolean;
    userId: string;
    id: string;
    recipeId: string;
}
