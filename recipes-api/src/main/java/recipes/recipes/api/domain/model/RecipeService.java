package recipes.recipes.api.domain.model;

import recipes.recipes.api.domain.model.dto.RecipeDTO;
import recipes.recipes.api.domain.model.exception.RecipeNotFoundException;

import java.util.List;
import java.util.UUID;

public interface RecipeService {
    List<RecipeDTO> getRecipes();
    RecipeDTO getRecipe(UUID id) throws RecipeNotFoundException;
    RecipeDTO getRecipe(UUID id, long servings) throws RecipeNotFoundException;
    RecipeDTO addRecipe(RecipeDTO recipe);
    RecipeDTO updateRecipe(RecipeDTO recipe) throws RecipeNotFoundException;
    void deleteRecipe(UUID id) throws RecipeNotFoundException;
}
