package recipes.recipes.api.domain.model;

public enum Unit {
    LITER,
    DECILITER,
    MILLILITER,
    TABLESPOON,
    TEASPOON,
    PINCH,
    GRAM,
    KILOGRAM,
    MILLIGRAM,
    PIECES,
    NONE;

    public static Unit of(String string) {
        return string == null ? Unit.NONE : Unit.valueOf(string);
    }
}
