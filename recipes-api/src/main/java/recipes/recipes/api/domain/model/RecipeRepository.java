package recipes.recipes.api.domain.model;

import recipes.recipes.api.domain.model.dto.RecipeDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RecipeRepository {
    List<RecipeDTO> getRecipes();
    Optional<RecipeDTO> findRecipe(UUID id);
    RecipeDTO addRecipe(RecipeDTO recipe);
    RecipeDTO updateRecipe(RecipeDTO recipe);
    void deleteRecipe(RecipeDTO recipe);
}
