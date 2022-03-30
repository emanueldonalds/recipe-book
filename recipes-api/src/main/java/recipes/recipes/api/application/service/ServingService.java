package recipes.recipes.api.application.service;

import recipes.recipes.api.domain.model.Recipe;
import recipes.recipes.api.domain.model.RecipeFactory;
import recipes.recipes.api.domain.model.dto.RecipeDTO;

import java.util.List;

public class ServingService {
    public Recipe calculate(Recipe recipe, long servings) {
        long originalServings = recipe.getServings();
        List<Ingredient> ingredients = recipe.getIngredients();
        RecipeDTO recipeDTO = RecipeDTO.create(recipe);

    }
}
