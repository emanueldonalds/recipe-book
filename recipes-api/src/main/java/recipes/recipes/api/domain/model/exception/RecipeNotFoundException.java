package recipes.recipes.api.domain.model.exception;

import org.springframework.http.HttpStatus;

public class RecipeNotFoundException extends Exception {

    final HttpStatus status;
    private final ErrorCode code;

    public RecipeNotFoundException(String message) {
        super(message);
        status = HttpStatus.NOT_FOUND;
        this.code = ErrorCode.RECIPE_NOT_FOUND;
    }

    public ErrorCode getCode() {
        return this.code;
    }
}
