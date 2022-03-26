import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { invalidCharactersValidator } from '../components/custom-validators';

@Injectable({
  providedIn: 'root'
})
export class RecipeFormService {

  constructor() { }

  getRecipeForm(): FormGroup {
    return this.getRecipeFormPopulated('', '');
  }

  getRecipeFormPopulated(nameValue: string, instructionsValue: string): FormGroup {
    return new FormGroup({
      name: new FormControl(nameValue, [
        Validators.required,
        Validators.maxLength(64),
        invalidCharactersValidator()
      ]),
      instructions: new FormControl(instructionsValue, [
        Validators.maxLength(10000),
        invalidCharactersValidator()
      ])
    });
  }
}
