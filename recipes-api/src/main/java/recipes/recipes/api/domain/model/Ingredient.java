package recipes.recipes.api.domain.model;

import lombok.Data;

@Data
public class Ingredient {
    private final String name;
    private final Quantity quantity;
}
