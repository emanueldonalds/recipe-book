import { Ingredient } from "./ingredient";

export interface Recipe {
    id: number | undefined;
    name: string;
    //author: string;
    instructions: string,
    ingredients: Ingredient[];
}