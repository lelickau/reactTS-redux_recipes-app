export interface IMyIngr {
    id: string;
    ingr: string;
    quant: number;
    measure: string;
}

interface IMyInstruction {
    id: string;
    step: string;
}

export interface IMyRecipe {
    id: string;
    userId: string;
    label: string;
    ingredients: IMyIngr[];
    instructions?: IMyInstruction[];
    time?: number;
    servings?: number;
    notes?: string;
}