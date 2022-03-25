import { Ingredient } from "../models/ingredient";

export class IngredientDialogResponse {
    ingredient: Ingredient;
    shouldBeDeleted: boolean = false;

    constructor(ingredient: Ingredient, shouldBeDeleted: boolean) {
        this.ingredient = ingredient;
        this.shouldBeDeleted = shouldBeDeleted;
    }
}