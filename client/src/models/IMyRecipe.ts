export interface IMyIngr {
    id: string;
    ingr: string;
    quant: number | string;
    measure: string;
    error: boolean;
}

export interface IMySteps {
    id: string;
    step: string;
    placeholder: string;
    error: boolean;
}

export interface IForm {
    userId: string;
    time: string | number;
    servings: string | number;
    notes: string;
    id: string;
}

export interface IMyRecipe {
    id: string;
    userId: string;
    label: string;
    ingredients: IMyIngr[];
    instructions: IMySteps[];
    time?: number | string;
    servings?: number | string;
    notes?: string;
}