import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {
  recipe: Recipe = {
    id: 0,
    name: '',
    instructions: '',
    ingredients: []
  }

  units = [{value: 'MILLILITER', display: 'ml'},{value: 'DECILITER', display: 'dl'}]

  constructor() { 

  }

  ngOnInit(): void {
  }

}
