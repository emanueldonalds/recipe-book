package recipes.recipes.api.domain.model;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RecipeRepository {
    List<Recipe> getRecipes();
    Optional<Recipe> findRecipe(UUID id);
    Recipe addRecipe(Recipe recipe);
    Recipe updateRecipe(Recipe recipe);
    void deleteRecipe(Recipe recipe);
}
