package recipes.recipes.api.interfaces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.recipes.api.domain.model.RecipeFactory;
import recipes.recipes.api.domain.model.RecipeService;
import recipes.recipes.api.domain.model.dto.RecipeDTO;
import recipes.recipes.api.domain.model.exception.RecipeNotFoundException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recipes")
public class RecipesController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public ResponseEntity<List<RecipeDTO>> getRecipes() {
        return new ResponseEntity<>(
                recipeService.getRecipes().stream()
                        .map(RecipeDTO::create)
                        .collect(Collectors.toList()),
                HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDTO> getRecipe(@PathVariable("id") final UUID id) throws RecipeNotFoundException {
        return new ResponseEntity<>(
                RecipeDTO.create(recipeService.getRecipe(id)),
                HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RecipeDTO> createRecipe(@RequestBody final RecipeDTO recipeDTO) {
        return new ResponseEntity<>(
                RecipeDTO.create(recipeService.addRecipe(RecipeFactory.create(recipeDTO))),
                HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeDTO> updateRecipe(@PathVariable final UUID id, @RequestBody final RecipeDTO recipeDTO)
            throws RecipeNotFoundException {
        return new ResponseEntity<>(
                RecipeDTO.create(recipeService.updateRecipe(RecipeFactory.create(id, recipeDTO))),
                HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable("id") UUID id) throws RecipeNotFoundException {
        recipeService.deleteRecipe(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}