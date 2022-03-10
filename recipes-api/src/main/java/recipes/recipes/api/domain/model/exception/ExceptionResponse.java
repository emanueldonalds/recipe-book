package recipes.recipes.api.domain.model.exception;

public record ExceptionResponse(
        ErrorCode code,
        String message
) {}
