package recipes.recipes.api.infrastructure;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;
import recipes.recipes.api.domain.model.*;
import recipes.recipes.api.domain.model.dto.IngredientDTO;
import recipes.recipes.api.domain.model.dto.QuantityDTO;
import recipes.recipes.api.domain.model.dto.RecipeDTO;

import java.util.*;

@Repository
@Profile("local")
public class InMemoryRecipeRepository implements RecipeRepository {
    private final List<RecipeDTO> recipes;

    public InMemoryRecipeRepository() {
        recipes = new ArrayList<>();
        seed();
    }

    private void seed() {
        String instructions = """
                Sätt ugnen på 150°C.
                
                Skala vitlöksklyftorna och hacka grovt. Plocka örterna och hacka grovt. Blanda vitlöken med örterna, 2 tsk flingsalt och ½ tsk peppar (för 4-6 port).
               
                Ta bort nätet från lammsteken och vik ut steken. Massera in ört- och kryddblandningen på lammstekens insida och vik ihop den. Bind ihop med steksnöre.
                Krydda utsidan av steken med ½ tsk salt och 2 krm peppar (för 4-6 port) runt om. Bryn steken i rapsolja i en stekpanna tills den får fin färg runt om. Lägg steken på ett ugnsgaller med en plåt under. Ställ in i mitten av ugnen ca 1 timme eller tills innertemperaturen är 63°C.
                
                Ta ut steken och täck med folie och låt vila ca 10 minuter. Ta bort snöret och skiva upp. Lägg på ett fat och ringla över olivolja och strö över flingsalt.
                
                Koka upp skyn som blir över och pressa ner 1–2 msk citronjuice (för 4-6 port). Servera till lammsteken.
                """;

        List<IngredientDTO> ingredients = new ArrayList<>();
        ingredients.add(new IngredientDTO("Kött", new QuantityDTO(1, Unit.PIECES)));
        ingredients.add(new IngredientDTO("Sallad", new QuantityDTO(700, Unit.MILLIGRAM)));
        ingredients.add(new IngredientDTO("Salt", new QuantityDTO(0, Unit.NONE)));
        ingredients.add(new IngredientDTO("Kryddor", new QuantityDTO(1, Unit.NONE)));
        ingredients.add(new IngredientDTO("Bananer", new QuantityDTO(6, Unit.MILLIGRAM)));
        ingredients.add(new IngredientDTO("Korv", new QuantityDTO(32, Unit.LITER)));
        ingredients.add(new IngredientDTO("Potatis", new QuantityDTO(1.5f, Unit.PIECES)));
        ingredients.add(new IngredientDTO("Tomat", new QuantityDTO(50, Unit.MILLIGRAM)));
        ingredients.add(new IngredientDTO("Gurka", new QuantityDTO(0, Unit.NONE)));
        ingredients.add(new IngredientDTO("Choklad", new QuantityDTO(1, Unit.NONE)));
        ingredients.add(new IngredientDTO("Uranium-235", new QuantityDTO(5, Unit.MILLIGRAM)));
        ingredients.add(new IngredientDTO("Kyckling", new QuantityDTO(23.3f, Unit.LITER)));

        Random rnd = new Random();
        for (int i = 0; i < 100; i++) {
            recipes.add(RecipeDTO.builder()
                    .id(UUID.randomUUID())
                            .instructions(instructions)
                            .name("Recept " + (char)('A' + rnd.nextInt(26)) + " " + i)
                            .servings(4)
                            .ingredients(ingredients)
                    .build());
        }

        Collections.shuffle(recipes);

    }


    @Override
    public List<RecipeDTO> getRecipes() {
        return recipes;
    }

    @Override
    public Optional<RecipeDTO> findRecipe(UUID id) {
        return recipes.stream()
                .filter(r -> r.getId().equals(id))
                .findFirst();
    }

    @Override
    public RecipeDTO addRecipe(RecipeDTO recipe) {
        recipes.add(recipe);
        return recipe;
    }

    @Override
    public RecipeDTO updateRecipe(RecipeDTO recipe) {
        for (RecipeDTO r : recipes) {
            if (r.getId().equals(recipe.getId())) {
                recipes.set(recipes.indexOf(r), recipe);
            }
        }
        return recipe;
    }

    @Override
    public void deleteRecipe(RecipeDTO recipe) {
        recipes.stream().filter(r -> r.equals(recipe)).findFirst().ifPresent(recipes::remove);
    }
}
