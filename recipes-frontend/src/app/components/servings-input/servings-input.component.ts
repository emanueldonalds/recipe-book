import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-servings-input',
  templateUrl: './servings-input.component.html',
  styleUrls: ['./servings-input.component.scss']
})
export class ServingsInputComponent implements OnInit {
  @Input() form!: FormGroup;

  servingOptions = Array.from(Array(10).keys()).map(x => x + 1);

  constructor() { }

  ngOnInit(): void {
  }
  
  getservingsErrorMessage() {
    if (this.form.controls.servings.hasError('min')) {
      return "Must be 1 or more"
    }
    if (this.form.controls.servings.hasError('max')) {
      return "Max 100"
    }
    if (this.form.controls.servings.hasError('pattern')) {
      return "Must be a number"
    }
    return "";
  }
}
