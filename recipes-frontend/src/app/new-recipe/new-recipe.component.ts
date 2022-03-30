import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient } from '../models/ingredient';
import { Quantity } from '../models/quantity';
import { copyOf, Recipe } from '../models/recipe';
import { RecipeFormService } from '../services/recipe-form.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {
  form: FormGroup;
  ingredients: Ingredient[] = [];
  loading: boolean = false;

  constructor(private recipeService: RecipeService,
     private router: Router, 
     private recipeFormService: RecipeFormService) {
    this.form = recipeFormService.getRecipeForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    let recipe: Recipe = {
      id: undefined,
      name: this.form.value.name,
      instructions: this.form.value.instructions,
      ingredients: this.ingredients,
      servings: this.form.value.servings
    }
    this.recipeService.createRecipe(copyOf(recipe)).subscribe(createdRecipe => {
      this.router.navigate(['/', createdRecipe.id]);
    });
  }

  getservingsErrorMessage() {
    if (this.form.controls.servings.hasError('min')) {
      return "Must be 1 or more"
    }
    if (this.form.controls.servings.hasError('max')) {
      return "Max 100"
    }
    if (this.form.controls.servings.hasError('pattern')) {
      return "Must be a number"
    }
    return "";
  }
}
