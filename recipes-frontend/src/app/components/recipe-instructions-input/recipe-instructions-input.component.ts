import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getInvalidCharactersErrorMessage } from 'src/app/components/custom-validators';

@Component({
  selector: 'app-recipe-instructions-input',
  templateUrl: './recipe-instructions-input.component.html',
  styleUrls: ['./recipe-instructions-input.component.scss']
})
export class RecipeInstructionsInputComponent implements OnInit {
  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  getInstructionsErrorMessage() {
    if (this.form.controls.instructions.hasError('maxlength')) {
      return "Max 10000 characters"
    }
    if (this.form.controls.instructions.hasError('invalidCharacters')) {
      return getInvalidCharactersErrorMessage();
    }
    return "";
  }
  
}
