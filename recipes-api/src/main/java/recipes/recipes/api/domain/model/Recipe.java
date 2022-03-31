package recipes.recipes.api.domain.model;

import lombok.Data;

import java.util.List;
import java.util.UUID;

/**
 * Recipe model - aggregate root.
 */
@Data
public class Recipe {
    private final UUID id;
    private final String name;
    private final String instructions;
    private final long servings;
    private final List<Ingredient> ingredients;
}
