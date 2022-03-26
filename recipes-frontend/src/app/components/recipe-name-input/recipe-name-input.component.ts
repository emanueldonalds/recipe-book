import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getInvalidCharactersErrorMessage, invalidCharactersValidator } from 'src/app/components/custom-validators';

@Component({
  selector: 'app-recipe-name-input',
  templateUrl: './recipe-name-input.component.html',
  styleUrls: ['./recipe-name-input.component.scss']
})
export class RecipeNameComponent implements OnInit {
  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  getNameErrorMessage() {
    if (this.form.controls.name.hasError('required')) {
      return "Name is required"
    }
    if (this.form.controls.name.hasError('maxlength')) {
      return "Max 64 characters"
    }
    if (this.form.controls.name.hasError('invalidCharacters')) {
      return getInvalidCharactersErrorMessage();
    }
    return "";
  }
}
