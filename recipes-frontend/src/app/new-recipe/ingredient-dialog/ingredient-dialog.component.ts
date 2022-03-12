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

  constructor(public dialogRef: MatDialogRef<IngredientDialogComponent>) { }

  ngOnInit(): void {
  }

  add() {
    console.log("Form: " + this.form.get('name')?.value);
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

}
