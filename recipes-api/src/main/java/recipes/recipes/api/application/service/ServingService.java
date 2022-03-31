package recipes.recipes.api.application.service;

import recipes.recipes.api.domain.model.Ingredient;
import recipes.recipes.api.domain.model.Quantity;
import recipes.recipes.api.domain.model.Recipe;
import recipes.recipes.api.domain.model.RecipeFactory;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

public class ServingService {
    public Recipe calculate(Recipe recipe, long servings) {
        long originalServings = recipe.getServings();
        List<Ingredient> ingredients = recipe.getIngredients();
        final List<Ingredient> adjustedIngredients = ingredients.stream()
                .map(ingredient -> adjust(ingredient, originalServings, servings))
                .collect(Collectors.toList());
        return RecipeFactory.create(recipe, servings, adjustedIngredients);
    }

    private Ingredient adjust(Ingredient ingredient, long originalServings, long newServings) {
        if (ingredient.quantity() == null || ingredient.quantity().value() <= 0) {
            return ingredient;
        }
        float newValue = ingredient.quantity().value() / originalServings * newServings;
        newValue = round(newValue, 1);
        return new Ingredient(
                ingredient.name(),
                new Quantity(newValue, ingredient.quantity().unit()));
    }

    private static float round(float value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = new BigDecimal(Double.toString(value));
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.floatValue();
    }
}
