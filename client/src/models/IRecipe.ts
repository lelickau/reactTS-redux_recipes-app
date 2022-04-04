export interface IDigest {
    daily: number;
    label: string;
    total: number;
    unit: string;
}
export interface IIngredients {
    food: string;
    foodId: string;
    weight: number;
}

export interface IRecipe {
    label: string;
    calories: number;
    cuisineType: string[];
    digest?: IDigest[];
    dishType: string[];
    healthLabels: string[];
    image: string;
    ingredients: IIngredients[];
    mealType: string[];
    source: string;
    url: string;
    totalDaily: {
        [key: string]: {
            label: string;
            quantity: number;
            unit: string;
        };
    };
    totalNutrients: {
        [key: string]: {
            label: string;
            quantity: number;
            unit: string;
        };
    };
    totalWeight: number;
    favorite?: boolean;
    userId?: string | null;
}
