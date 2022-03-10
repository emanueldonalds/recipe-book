package recipes.recipes.api.domain.model.exception;

public class InternalException extends Exception {
    final String message;
    final Exception source;

    public InternalException(String message, Exception source) {
        this.message = message;
        this.source = source;
    }
}
