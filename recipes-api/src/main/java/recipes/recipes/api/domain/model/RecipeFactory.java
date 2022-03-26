package recipes.recipes.api.domain.model;

import recipes.recipes.api.domain.model.dto.IngredientDTO;
import recipes.recipes.api.domain.model.dto.QuantityDTO;
import recipes.recipes.api.domain.model.dto.RecipeDTO;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public final class RecipeFactory {
    public static Recipe create(RecipeDTO recipeDTO) {
        return create("".equals(recipeDTO.getId()) || recipeDTO.getId() == null
                ? UUID.randomUUID()
                : UUID.fromString(recipeDTO.getId()), recipeDTO);
    }

    public static Recipe create(UUID id, RecipeDTO recipeDTO) {
        final List<Ingredient> ingredients = mapIngredients(recipeDTO.getIngredients());
        return new Recipe(
                id,
                recipeDTO.getName(),
                recipeDTO.getInstructions(),
                ingredients);
    }

    private static List<Ingredient> mapIngredients(List<IngredientDTO> ingredientDTOs) {
        return ingredientDTOs.stream()
                .map(i -> new Ingredient(i.getName(), mapQuantity(i.getQuantity())))
                .collect(Collectors.toList());
    }

    private static Quantity mapQuantity(QuantityDTO quantityDTO) {
        return new Quantity(quantityDTO.getValue(), Unit.of(quantityDTO.getUnit()));
    }
}
