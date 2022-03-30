import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { invalidCharactersValidator } from '../components/custom-validators';

@Injectable({
  providedIn: 'root'
})
export class RecipeFormService {

  constructor() { }

  getRecipeForm(): FormGroup {
    return this.getRecipeFormPopulated('', '', 4);
  }

  getRecipeFormPopulated(
    nameValue: string, instructionsValue: string, servingsValue: number): FormGroup {
    return new FormGroup({
      name: new FormControl(nameValue, [
        Validators.required,
        Validators.maxLength(64),
        invalidCharactersValidator()
      ]),
      instructions: new FormControl(instructionsValue, [
        Validators.maxLength(10000),
        invalidCharactersValidator()
      ]),
      servings: new FormControl(servingsValue, [
        Validators.min(1),
        Validators.max(100),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])
    });
  }
}
