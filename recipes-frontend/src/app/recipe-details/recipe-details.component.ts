import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe'
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = {
    id: 0,
    name: '',
    instructions: '',
    ingredients: []
  };
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe() {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.recipeService.getRecipe(id).subscribe(recipe => {this.recipe = recipe;console.log(JSON.stringify(recipe));
    });

    
    
  }

}
