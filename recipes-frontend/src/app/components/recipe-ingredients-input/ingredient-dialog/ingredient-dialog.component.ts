import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ingredient } from 'src/app/models/ingredient';
import { Quantity } from 'src/app/models/quantity';
import { UnitService } from 'src/app/services/unit.service';
import { getInvalidCharactersErrorMessage, invalidCharactersValidator } from '../../custom-validators';
import { IngredientDialogResponse } from './ingredient-dialog-response';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {
  units: string[]

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(34),
      invalidCharactersValidator()
    ]),
    quantity: new FormControl('', [
      Validators.pattern('^[+-]?([0-9]*[.])?[0-9]+$'),
      Validators.maxLength(5)
    ]),
    unit: new FormControl()
  });

  editMode: boolean;

  ingredients: Ingredient[] | undefined;
  ingredientToEdit: Ingredient | undefined;

  constructor(public dialogRef: MatDialogRef<IngredientDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private unitService: UnitService) {
    dialogRef.disableClose = true;
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
    this.units = [];
  }

  ngOnInit(): void {
    this.unitService.getUnits().subscribe(units => { this.units = units });

  }

  add() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    let quantity: Quantity = {
      value: this.form.get('quantity')?.value,
      unit: this.form.get('unit')?.value
    }
    let ingredient: Ingredient = {
      name: this.form.get('name')?.value,
      quantity: quantity
    }
    this.dialogRef.close(new IngredientDialogResponse(ingredient, false));
  }

  edit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
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

  getNameErrorMessage() {
    if (this.form.controls.name.hasError('required')) {
      return "Name is required"
    }
    if (this.form.controls.name.hasError('maxlength')) {
      return "Max 34 characters"
    }
    if (this.form.controls.name.hasError('invalidCharacters')) {
      return getInvalidCharactersErrorMessage();
    }
    return "";
  }

  getQuantityErrorMessage() {
    if (this.form.controls.quantity.hasError('regexp')) {
      return "Must be a number";
    }
    if (this.form.controls.quantity.hasError('maxlength')) {
      return "Max 5 characters";
    }
    return "";  
  }

}
