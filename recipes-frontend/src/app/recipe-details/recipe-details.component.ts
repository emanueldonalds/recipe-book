import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe'
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = {
    id: '',
    name: '',
    instructions: '',
    ingredients: [],
    servings: 0
  };

  servingOptions = Array.from(Array(10).keys()).map(x => x + 1);

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(id).subscribe(recipe => {
      this.recipe = recipe;
    },
     error => {
       console.log("Recipe not found");
     });
  }

  onServingsChange() {
    console.log("Servings: " + this.recipe.servings)
    this.recipeService.getRecipeForServings(
      this.recipe.id as string, this.recipe.servings).subscribe(recipe => {
        this.recipe = recipe;
      });
  }
}
