import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient } from 'src/app/models/ingredient';
import { Quantity } from 'src/app/models/quantity';
import { IngredientDialogResponse } from 'src/app/components/recipe-ingredients-input/ingredient-dialog/ingredient-dialog-response';
import { IngredientDialogComponent } from 'src/app/components/recipe-ingredients-input/ingredient-dialog/ingredient-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recipe-ingredients-input',
  templateUrl: './recipe-ingredients-input.component.html',
  styleUrls: ['./recipe-ingredients-input.component.scss']
})
export class RecipeIngredientsInputComponent implements OnInit {
  @Input()  ingredients!: Ingredient[];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openEditDialog(ingredientToEdit: Ingredient): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '40rem',
      data: {
        ingredient: ingredientToEdit,
        ingredients: this.ingredients
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        let dialogResponse = response as IngredientDialogResponse;
        if (dialogResponse.shouldBeDeleted) {
          this.ingredients.forEach((element, index) => {
            if (element === dialogResponse.ingredient) {
              this.ingredients.splice(index, 1);
            }
          });
        }
        else {
          this.ingredients.push(dialogResponse.ingredient);
        }
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '40rem',
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        let dialogResponse = response as IngredientDialogResponse;
        this.ingredients.push(dialogResponse.ingredient);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ingredients, event.previousIndex, event.currentIndex);
  }
}
