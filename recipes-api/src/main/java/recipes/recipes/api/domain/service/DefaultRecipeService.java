package recipes.recipes.api.domain.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.recipes.api.application.service.ServingService;
import recipes.recipes.api.domain.model.RecipeRepository;
import recipes.recipes.api.domain.model.RecipeService;
import recipes.recipes.api.domain.model.dto.RecipeDTO;
import recipes.recipes.api.domain.model.exception.RecipeNotFoundException;

import java.util.List;
import java.util.UUID;

@Service
public class DefaultRecipeService implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final ServingService servingService;

    @Autowired
    public DefaultRecipeService(RecipeRepository recipeRepository, ServingService servingService) {
        this.recipeRepository = recipeRepository;
        this.servingService = servingService;
    }

    @Override
    public List<RecipeDTO> getRecipes() {
        return recipeRepository.getRecipes();
    }

    @Override
    public RecipeDTO getRecipe(UUID id) throws RecipeNotFoundException {
        return recipeRepository.findRecipe(id).orElseThrow(() ->
                new RecipeNotFoundException("Could not find recipe with ID " + id));
    }

    @Override
    public RecipeDTO getRecipe(UUID id, long servings) throws RecipeNotFoundException {
        return recipeRepository.findRecipe(id)
                .map(recipe -> servingService.calculate(recipe, servings))
                .orElseThrow(() ->
                        new RecipeNotFoundException("Could not find recipe with ID " + id));
    }

    @Override
    public RecipeDTO addRecipe(RecipeDTO recipe) {
        return recipeRepository.addRecipe(recipe.toBuilder().id(UUID.randomUUID()).build());
    }

    @Override
    public RecipeDTO updateRecipe(RecipeDTO updatedRecipe) throws RecipeNotFoundException {
        final RecipeDTO currentRecipe = getRecipe(updatedRecipe.getId());
        updatedRecipe.setAuthor(currentRecipe.getAuthor());
        if (currentRecipe.equals(updatedRecipe)) {
            return currentRecipe;
        }
        return recipeRepository.updateRecipe(updatedRecipe);
    }

    @Override
    public void deleteRecipe(UUID id) throws RecipeNotFoundException {
        final RecipeDTO recipeToDelete = getRecipe(id);
        recipeRepository.deleteRecipe(recipeToDelete);
    }
}
