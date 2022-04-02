package recipes.recipes.api.domain.model.dto;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConvertedEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import recipes.recipes.api.domain.model.Unit;

@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamoDBDocument
public final class QuantityDTO {
    private float value;

    @DynamoDBTypeConvertedEnum
    private Unit unit;
}
