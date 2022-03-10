import { Ingredient } from "./ingredient";

export interface Recipe {
    id: number;
    name: string;
    //author: string;
    instructions: string,
    ingredients: Ingredient[];
}