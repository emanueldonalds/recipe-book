package recipes.recipes.api.infrastructure.dynamodb;

import com.amazonaws.AmazonClientException;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;
import recipes.recipes.api.domain.model.RecipeRepository;
import recipes.recipes.api.domain.model.dto.RecipeDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Profile("aws")
@Slf4j
public class AWSDynamoDBRecipeRepository implements RecipeRepository {

    private final DynamoDBMapper dynamoDBMapper;

    @Autowired
    public AWSDynamoDBRecipeRepository() {
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion(Regions.EU_NORTH_1).build();
        this.dynamoDBMapper = new DynamoDBMapper(client);
    }

    public List<RecipeDTO> getRecipes() {
        final List<RecipeDTO> recipes = new ArrayList<>();
        try {
            recipes.addAll(dynamoDBMapper.scan(RecipeDTO.class, new DynamoDBScanExpression()));
        } catch (AmazonClientException e) {
            log.error(e.getMessage(), e);
        }
        return recipes;
    }

    @Override
    public Optional<RecipeDTO> findRecipe(UUID id) {
        return Optional.ofNullable(dynamoDBMapper.load(RecipeDTO.class, id));
    }

    public RecipeDTO addRecipe(RecipeDTO recipe) {
        try {
            dynamoDBMapper.save(recipe);
        } catch (AmazonClientException e) {
            log.error(e.getMessage(), e);
        }
        return recipe;
    }

    @Override
    public RecipeDTO updateRecipe(RecipeDTO recipe) {
        try {
            dynamoDBMapper.save(recipe);
        } catch (AmazonClientException e) {
            log.error(e.getMessage(), e);
        }
        return recipe;
    }

    @Override
    public void deleteRecipe(RecipeDTO recipe) {
        try {
            dynamoDBMapper.delete(recipe);
        } catch (AmazonClientException e) {
            log.error(e.getMessage(), e);
        }
    }
}
