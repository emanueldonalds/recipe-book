import { Component, OnInit } from '@angular/core';
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
  units = new Map([[ 'MILLILITER', 'ml'], ['DECILITER', 'dl']]);

  recipe: Recipe = {
    id: 0,
    name: '',
    instructions: '',
    ingredients: []
  }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '40rem',
    });

    dialogRef.afterClosed().subscribe(ingredient => {
      if (ingredient) {
        console.log("Ingredient name: " + ingredient.name);
        console.log("Ingredient q: " + ingredient.quantity.value);
        console.log("Ingredient q u : " + ingredient.quantity.unit);
        this.ingredients.push(ingredient);
      }
    });
  }

  toDisplayValue(unit: string) {
    return this.units.get(unit);
  }
}
