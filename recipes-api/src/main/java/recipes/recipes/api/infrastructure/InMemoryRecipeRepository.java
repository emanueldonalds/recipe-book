package recipes.recipes.api.infrastructure;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;
import recipes.recipes.api.domain.model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("local")
public class InMemoryRecipeRepository implements RecipeRepository {
    private final List<Recipe> recipes;

    public InMemoryRecipeRepository() {
        recipes = new ArrayList<>();
        seed();
    }

    private void seed() {
        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(new Ingredient("Apples", new Quantity(1, Unit.PIECES)));
        ingredients.add(new Ingredient("Bananas", new Quantity(1337, Unit.MILLIGRAM)));
        String instructions = """
                Do this:
                                
                Take the banana, splice it with a knife.
                                
                Eat the apple.
                                
                Dinner is served!
                """;
        recipes.add(new Recipe(UUID.randomUUID(), "Banana thing", instructions, 4, ingredients));

        ingredients = new ArrayList<>();
        ingredients.add(new Ingredient("Beans", new Quantity(1, Unit.PIECES)));
        ingredients.add(new Ingredient("Salad", new Quantity(1337, Unit.MILLIGRAM)));
        ingredients.add(new Ingredient("Brownies", new Quantity(1337, Unit.MILLIGRAM)));
        instructions = """
                This is very simple just follow this instruction:
                                
                Beans go in a bowl and the salad is served in a separate plate with a few brownies on the side. No one 
                dislikes this delicious meal not even kids.
                """;
        recipes.add(new Recipe(UUID.randomUUID(), "Some bean food", instructions, 4, ingredients));
    }


    @Override
    public List<Recipe> getRecipes() {
        return recipes;
    }

    @Override
    public Optional<Recipe> findRecipe(UUID id) {
        return recipes.stream()
                .filter(r -> r.getId().equals(id))
                .findFirst();
    }

    @Override
    public Recipe addRecipe(Recipe recipe) {
        recipes.add(recipe);
        return recipe;
    }

    @Override
    public Recipe updateRecipe(Recipe recipe) {
        for (Recipe r : recipes) {
            if (r.getId().equals(recipe.getId())) {
                recipes.set(recipes.indexOf(r), recipe);
            }
        }
        return recipe;
    }

    @Override
    public void deleteRecipe(Recipe recipe) {
        recipes.stream().filter(r -> r.equals(recipe)).findFirst().ifPresent(recipes::remove);
    }
}
