import { Ingredient } from "./ingredient";

export interface Recipe {
    id: string | undefined;
    name: string;
    instructions: string,
    ingredients: Ingredient[];
}

export function copyOf(recipe: Recipe): Recipe {
    let copy: Recipe = {
        id: recipe.id,
        name: recipe.name,
        instructions: recipe.instructions,
        ingredients: []
    }
    recipe.ingredients.forEach(ingredient => {
        copy.ingredients.push({
            name: ingredient.name, 
            quantity: {
                value: ingredient.quantity.value,
                unit: ingredient.quantity.unit
            }});
    });
    return copy;
}