import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import { RecipeFormService } from '../services/recipe-form.service';
import { RecipeService } from '../services/recipe.service';
import { DeleteRecipeDialog } from './delete-recipe-dialog/delete-recipe-dialog.component';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  form: FormGroup;
  ingredients: Ingredient[] = [];
  id!: string;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private recipeFormService: RecipeFormService,
    private dialog: MatDialog) {
      this.form = recipeFormService.getRecipeForm();
  }

  ngOnInit(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(this.id).subscribe(recipe => {
      this.form = this.recipeFormService.getRecipeFormPopulated(recipe.name, recipe.instructions);
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
      ingredients: this.ingredients
    }
    this.recipeService.updateRecipe(recipe).subscribe(() => {
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
