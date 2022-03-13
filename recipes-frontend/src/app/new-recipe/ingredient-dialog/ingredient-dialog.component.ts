import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ingredient } from 'src/app/models/ingredient';
import { Quantity } from 'src/app/models/quantity';
import { IngredientDialogResponse } from '../ingredient-dialog-response';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {
  units = [{ value: 'MILLILITER', display: 'ml' }, { value: 'DECILITER', display: 'dl' }]

  form = new FormGroup({ 
    name: new FormControl(),
    quantity: new FormControl(), 
    unit: new FormControl() });

  editMode: boolean;

  ingredients: Ingredient[] | undefined;
  ingredientToEdit: Ingredient | undefined;

  constructor(public dialogRef: MatDialogRef<IngredientDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.ingredientToEdit = data?.ingredient;
      if (this.ingredientToEdit) {
        this.editMode = true;
        this.form.controls.name.setValue(this.ingredientToEdit.name);
        this.form.controls.quantity.setValue(this.ingredientToEdit.quantity.value);
        this.form.controls.unit.setValue(this.ingredientToEdit.quantity.unit);
        this.ingredients = data.ingredients;
      }
      else {
        this.editMode = false;
      }
  }

  ngOnInit(): void {
  }

  add() {
    let quantity: Quantity = {
      value: this.form.get('quantity')?.value,
      unit: this.form.get('unit')?.value
    }
    let ingredient: Ingredient = {
      name: this.form.get('name')?.value,
      quantity: quantity
    }
    console.log("Ingredient: " + ingredient.name)
    this.dialogRef.close(new IngredientDialogResponse(ingredient, false));
  }

  edit() {
    if (this.ingredientToEdit) {
      this.ingredientToEdit.name = this.form.controls.name.value;
      this.ingredientToEdit.quantity.value = this.form.controls.quantity.value;
      this.ingredientToEdit.quantity.unit = this.form.controls.unit.value;
    }
    this.dialogRef.close();
  }

  remove() {
    this.ingredients = this.ingredients?.filter(i => i !== this.ingredientToEdit);
    this.dialogRef.close(new IngredientDialogResponse(this.ingredientToEdit as Ingredient, true));
  }
}
