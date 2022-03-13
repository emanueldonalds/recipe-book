import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ingredient } from 'src/app/models/ingredient';
import { Quantity } from 'src/app/models/quantity';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {
  units = [{ value: 'MILLILITER', display: 'ml' }, { value: 'DECILITER', display: 'dl' }]

  form = new FormGroup({ name: new FormControl(), quantity: new FormControl(), unit: new FormControl() });

  editMode: boolean;

  ingredientToEdit: Ingredient | undefined;

  constructor(public dialogRef: MatDialogRef<IngredientDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.ingredientToEdit = data?.ingredient;
      if (this.ingredientToEdit) {
        this.editMode = true;
        this.form.controls.name.setValue(this.ingredientToEdit.name);
        this.form.controls.quantity.setValue(this.ingredientToEdit.quantity.value);
        this.form.controls.unit.setValue(this.ingredientToEdit.quantity.unit);
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
    this.dialogRef.close(ingredient);
  }

  edit() {
    if (this.ingredientToEdit) {
      this.ingredientToEdit.name = this.form.controls.name.value;
      this.ingredientToEdit.quantity.value = this.form.controls.quantity.value;
      this.ingredientToEdit.quantity.unit = this.form.controls.unit.value;
    }
    this.dialogRef.close();
  }
}
