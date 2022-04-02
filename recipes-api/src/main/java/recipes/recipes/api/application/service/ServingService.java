package recipes.recipes.api.application.service;

import org.springframework.stereotype.Service;
import recipes.recipes.api.domain.model.dto.IngredientDTO;
import recipes.recipes.api.domain.model.dto.QuantityDTO;
import recipes.recipes.api.domain.model.dto.RecipeDTO;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServingService {
    public RecipeDTO calculate(RecipeDTO recipe, long servings) {
        long originalServings = recipe.getServings();
        List<IngredientDTO> ingredients = recipe.getIngredients();
        final List<IngredientDTO> adjustedIngredients = ingredients.stream()
                .map(ingredient -> adjust(ingredient, originalServings, servings))
                .collect(Collectors.toList());
        return recipe.toBuilder().servings(servings).ingredients(adjustedIngredients).build();
    }

    private IngredientDTO adjust(IngredientDTO ingredient, long originalServings, long newServings) {
        if (ingredient.getQuantity() == null || ingredient.getQuantity().getValue() <= 0) {
            return ingredient;
        }
        float newValue = ingredient.getQuantity().getValue() / originalServings * newServings;
        newValue = round(newValue, 1);
        return new IngredientDTO(
                ingredient.getName(),
                new QuantityDTO(newValue, ingredient.getQuantity().getUnit()));
    }

    private static float round(float value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = new BigDecimal(Double.toString(value));
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.floatValue();
    }
}
