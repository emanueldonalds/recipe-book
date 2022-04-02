package recipes.recipes.api.infrastructure;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;
import recipes.recipes.api.domain.model.*;
import recipes.recipes.api.domain.model.dto.IngredientDTO;
import recipes.recipes.api.domain.model.dto.QuantityDTO;
import recipes.recipes.api.domain.model.dto.RecipeDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("local")
public class InMemoryRecipeRepository implements RecipeRepository {
    private final List<RecipeDTO> recipes;

    public InMemoryRecipeRepository() {
        recipes = new ArrayList<>();
        seed();
    }

    private void seed() {
        List<IngredientDTO> ingredients = new ArrayList<>();
        ingredients.add(new IngredientDTO("Apples", new QuantityDTO(1, Unit.PIECES)));
        ingredients.add(new IngredientDTO("Bananas", new QuantityDTO(1337, Unit.MILLIGRAM)));
        String instructions = """
                Do this:
                                
                Take the banana, splice it with a knife.
                                
                Eat the apple.
                                
                Dinner is served!
                """;
        recipes.add(new RecipeDTO(UUID.randomUUID(), "Banana thing", instructions, 4, ingredients));

        ingredients = new ArrayList<>();
        ingredients.add(new IngredientDTO("Beans", new QuantityDTO(1, Unit.PIECES)));
        ingredients.add(new IngredientDTO("Salad", new QuantityDTO(1337, Unit.MILLIGRAM)));
        ingredients.add(new IngredientDTO("Brownies", new QuantityDTO(1337, Unit.MILLIGRAM)));
        instructions = """
                This is very simple just follow this instruction:
                                
                Beans go in a bowl and the salad is served in a separate plate with a few brownies on the side. No one 
                dislikes this delicious meal not even kids.
                """;
        recipes.add(new RecipeDTO(UUID.randomUUID(), "Some bean food", instructions, 4, ingredients));
    }


    @Override
    public List<RecipeDTO> getRecipes() {
        return recipes;
    }

    @Override
    public Optional<RecipeDTO> findRecipe(UUID id) {
        return recipes.stream()
                .filter(r -> r.getId().equals(id))
                .findFirst();
    }

    @Override
    public RecipeDTO addRecipe(RecipeDTO recipe) {
        recipes.add(recipe);
        return recipe;
    }

    @Override
    public RecipeDTO updateRecipe(RecipeDTO recipe) {
        for (RecipeDTO r : recipes) {
            if (r.getId().equals(recipe.getId())) {
                recipes.set(recipes.indexOf(r), recipe);
            }
        }
        return recipe;
    }

    @Override
    public void deleteRecipe(RecipeDTO recipe) {
        recipes.stream().filter(r -> r.equals(recipe)).findFirst().ifPresent(recipes::remove);
    }
}
