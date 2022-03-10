package recipes.recipes.api.interfaces;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import recipes.recipes.api.domain.model.exception.ExceptionResponse;
import recipes.recipes.api.domain.model.exception.RecipeNotFoundException;

@ControllerAdvice
public class RecipeExceptionHandler {
        @ExceptionHandler(RecipeNotFoundException.class)
        public ResponseEntity<ExceptionResponse> handleRecipeNotFoundException(final RecipeNotFoundException e) {
            return new ResponseEntity<>(new ExceptionResponse(e.getCode(), e.getMessage()), HttpStatus.NOT_FOUND);
        }
}
