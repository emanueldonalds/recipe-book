import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe'
import { RecipeService } from '../services/recipe.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  isLoggedIn: boolean = false;
  recipe: Recipe = {
    id: '',
    name: '',
    instructions: '',
    ingredients: [],
    servings: 0
  };

  servingOptions = Array.from(Array(10).keys()).map(x => x + 1);

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private keycloakService: KeycloakService) {
  }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    const id = String(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(id).subscribe(recipe => {
      this.recipe = recipe;
    },
     error => {
       console.log("Recipe not found");
     });
  }

  onServingsChange() {
    this.recipeService.getRecipeForServings(
      this.recipe.id as string, this.recipe.servings).subscribe(recipe => {
        this.recipe = recipe;
      });
  }
}
