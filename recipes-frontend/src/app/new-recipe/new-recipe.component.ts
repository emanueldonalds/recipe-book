import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { getRecipeForm } from '../components/forms/recipe-form';
import { Ingredient } from '../models/ingredient';
import { copyOf, Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {
  form: FormGroup;
  author: string = "";
  ingredients: Ingredient[] = [];
  loading: boolean = false;
  errorMessage: string = "";

  constructor(private recipeService: RecipeService, private router: Router, kcService: KeycloakService) {
    this.form = getRecipeForm();
    this.author = kcService.getUsername();
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
      author: this.author,
      instructions: this.form.value.instructions,
      ingredients: this.ingredients,
      servings: this.form.value.servings
    }
    this.recipeService.createRecipe(copyOf(recipe)).subscribe(createdRecipe => {
      this.router.navigate(['/', createdRecipe.id]);
    }, error => {
      this.errorMessage = error();
      this.loading = false;
    });
  }
}
