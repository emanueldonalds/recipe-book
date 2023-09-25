import { Component, OnInit } from '@angular/core';
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
  writeRights : boolean = false;
  recipe: Recipe = {
    id: '',
    name: '',
    author: '',
    instructions: '',
    ingredients: [],
    servings: 0
  };

  servingOptions = Array.from(Array(10).keys()).map(x => x + 1);

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private keycloakService: KeycloakService) {
  }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    if (this.isLoggedIn) {
      this.keycloakService.loadUserProfile().then(() => {
        this.writeRights = this.keycloakService.getUserRoles().includes('editor');
      });
    }

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
