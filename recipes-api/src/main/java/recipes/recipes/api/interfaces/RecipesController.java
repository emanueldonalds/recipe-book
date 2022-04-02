package recipes.recipes.api.interfaces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.recipes.api.domain.model.RecipeService;
import recipes.recipes.api.domain.model.dto.RecipeDTO;
import recipes.recipes.api.domain.model.exception.RecipeNotFoundException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/recipes")
public class RecipesController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public ResponseEntity<List<RecipeDTO>> getRecipes() {
        return new ResponseEntity<>(recipeService.getRecipes(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDTO> getRecipe(@PathVariable("id") UUID id,
                                               @RequestParam(required = false) Float servings)
            throws RecipeNotFoundException {
        return new ResponseEntity<>(
                servings == null
                        ? recipeService.getRecipe(id)
                        : recipeService.getRecipe(id, servings.longValue()),
                HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RecipeDTO> createRecipe(@RequestBody final RecipeDTO recipeDTO) {
        return new ResponseEntity<>(recipeService.addRecipe(recipeDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeDTO> updateRecipe(@PathVariable final UUID id, @RequestBody final RecipeDTO recipeDTO)
            throws RecipeNotFoundException {
        return new ResponseEntity<>(recipeService.updateRecipe(recipeDTO.toBuilder().id(id).build()), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable("id") UUID id) throws RecipeNotFoundException {
        recipeService.deleteRecipe(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}