package recipes.recipes.api.domain.model;

import lombok.Data;

@Data
public class Quantity {
    private final float value;
    private final Unit unit;
}
