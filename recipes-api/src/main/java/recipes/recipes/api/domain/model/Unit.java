package recipes.recipes.api.domain.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

public enum Unit {
    LITER,
    MILLILITER,
    DECILITER,
    GRAM,
    MILLIGRAM,
    KILOGRAM,
    PIECES,
    NONE;

    public static Unit of(String string) {
        return string == null ? Unit.NONE : Unit.valueOf(string);
    }
}
