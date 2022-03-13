import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient } from '../models/ingredient';
import { Quantity } from '../models/quantity';
import { Recipe } from '../models/recipe';
import { IngredientDialogComponent } from './ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {
  units = new Map([['MILLILITER', 'ml'], ['DECILITER', 'dl']]);
  recipeForm = new FormGroup({ name: new FormControl(), instructions: new FormControl() })

  ingredients: Ingredient[] = [];

  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    let quantity: Quantity = {
      value: 2,
      unit: "MILLILITER"
    }
    let ingredient: Ingredient = {
      name: "Meat",
      quantity: quantity
    }
    this.ingredients.push(ingredient);
  }

  openEditDialog(ingredient1: Ingredient): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '40rem',
      data: { ingredient: ingredient1 }
    });

    dialogRef.afterClosed().subscribe(ingredient => {
      if (ingredient) {
        this.ingredients.push(ingredient);
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '40rem',
    });

    dialogRef.afterClosed().subscribe(ingredient => {
      if (ingredient) {
        this.ingredients.push(ingredient);
      }
    });
  }

  toDisplayValue(unit: string) {
    return this.units.get(unit);
  }
}
