import { Ingredient } from "./ingredient";

export interface Recipe {
    id: string | undefined;
    name: string;
    //author: string;
    instructions: string,
    ingredients: Ingredient[];
}