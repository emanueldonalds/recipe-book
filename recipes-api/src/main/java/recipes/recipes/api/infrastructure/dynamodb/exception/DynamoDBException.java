package recipes.recipes.api.infrastructure.dynamodb.exception;

import lombok.AllArgsConstructor;
import recipes.recipes.api.domain.model.exception.InternalException;

public class DynamoDBException extends InternalException {
    public DynamoDBException(String message, Exception source) {
        super(message, source);
    }
}
