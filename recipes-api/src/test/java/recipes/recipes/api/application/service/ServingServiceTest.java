package recipes.recipes.api.application.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import recipes.recipes.api.domain.model.Ingredient;
import recipes.recipes.api.domain.model.Quantity;
import recipes.recipes.api.domain.model.Recipe;
import recipes.recipes.api.domain.model.Unit;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

class ServingServiceTest {

    @Test
    void doubleServings_returnsDoubleQuantity() {
        Recipe recipe = recipe(100, 4);
        Recipe calculatedRecipe = new ServingService().calculate(recipe, 8);
        Assertions.assertThat(calculatedRecipe.getIngredients().get(0).quantity().value()).isEqualTo(200);
    }

    @Test
    void unevenQuantity_isRoundedToPrecisionOfOne() {
        Recipe recipe = recipe(6, 16);
        Recipe calculatedRecipe = new ServingService().calculate(recipe, 17);
        Assertions.assertThat(calculatedRecipe.getIngredients().get(0).quantity().value()).isEqualTo(6.4f);
    }

    private Recipe recipe(int quantityValue, long servings) {
        List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(new Ingredient("", new Quantity(quantityValue, Unit.DECILITER)));
        return new Recipe(UUID.randomUUID(), "", "", servings, ingredients);
    }
}