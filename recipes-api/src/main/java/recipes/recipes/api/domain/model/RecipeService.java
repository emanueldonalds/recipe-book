package recipes.recipes.api.domain.model;

import recipes.recipes.api.domain.model.exception.RecipeNotFoundException;

import java.util.List;
import java.util.UUID;

public interface RecipeService {
    List<Recipe> getRecipes();
    Recipe getRecipe(UUID id) throws RecipeNotFoundException;
    Recipe addRecipe(Recipe recipe);
    Recipe updateRecipe(Recipe recipe) throws RecipeNotFoundException;
    void deleteRecipe(UUID id) throws RecipeNotFoundException;
}
