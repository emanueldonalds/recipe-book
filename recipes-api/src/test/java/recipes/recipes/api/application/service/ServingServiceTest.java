package recipes.recipes.api.application.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import recipes.recipes.api.domain.model.Unit;
import recipes.recipes.api.domain.model.dto.IngredientDTO;
import recipes.recipes.api.domain.model.dto.QuantityDTO;
import recipes.recipes.api.domain.model.dto.RecipeDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

class ServingServiceTest {

    @Test
    void doubleServings_returnsDoubleQuantity() {
        RecipeDTO recipe = recipe(100, 4);
        RecipeDTO calculatedRecipe = new ServingService().calculate(recipe, 8);
        Assertions.assertThat(calculatedRecipe.getIngredients().get(0).getQuantity().getValue()).isEqualTo(200);
    }

    @Test
    void unevenQuantity_isRoundedToPrecisionOfOne() {
        RecipeDTO recipe = recipe(6, 16);
        RecipeDTO calculatedRecipe = new ServingService().calculate(recipe, 17);
        Assertions.assertThat(calculatedRecipe.getIngredients().get(0).getQuantity().getValue()).isEqualTo(6.4f);
    }

    private RecipeDTO recipe(int quantityValue, long servings) {
        List<IngredientDTO> ingredients = new ArrayList<>();
        ingredients.add(new IngredientDTO("", new QuantityDTO(quantityValue, Unit.DECILITER)));
        return new RecipeDTO(UUID.randomUUID(), "", "", "", servings, ingredients);
    }
}
