import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { getRecipeForm, getRecipeFormPopulated } from '../components/forms/recipe-form';
import { Ingredient } from '../models/ingredient';
import { copyOf, Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { DeleteRecipeDialog } from './delete-recipe-dialog/delete-recipe-dialog.component';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  form: FormGroup;
  ingredients: Ingredient[] = [];
  id!: string;
  isLoggedIn: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private keycloakService: KeycloakService) {
      this.form = getRecipeForm();
  }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(this.id).subscribe(recipe => {
      this.form = getRecipeFormPopulated(
        recipe.name, recipe.instructions, recipe.servings);
      recipe.ingredients.forEach(ingredient => {
        this.ingredients.push(ingredient);
      });
    });
  }

  onSubmit() {
    if (!this.form || !this.form.valid) {
        this.form.markAllAsTouched();
        return;
    }
    let recipe: Recipe = {
      id: this.id,
      name: this.form.value.name,
      instructions: this.form.value.instructions,
      ingredients: this.ingredients,
      servings: this.form.value.servings
    }
    this.recipeService.updateRecipe(copyOf(recipe)).subscribe(() => {
      this.router.navigate(['/', this.id]);
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteRecipeDialog, {
      autoFocus: false,
      data: {
        id: this.id,
        name: this.form.controls.name.value
      }
    });
  }
}
