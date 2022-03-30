import { Ingredient } from "./ingredient";

export interface Recipe {
    id: string | undefined;
    name: string;
    instructions: string,
    ingredients: Ingredient[];
    servings: number;
}

export function copyOf(other: Recipe): Recipe {
    let copy: Recipe = {
        id: other.id,
        name: other.name,
        instructions: other.instructions,
        ingredients: [],
        servings: other.servings
    }
    other.ingredients.forEach(ingredient => {
        copy.ingredients.push({
            name: ingredient.name, 
            quantity: {
                value: ingredient.quantity.value,
                unit: ingredient.quantity.unit
            }});
    });
    return copy;
}