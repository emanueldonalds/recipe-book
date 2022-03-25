import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '../models/recipe';
import { UnitService } from './unit.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipesUrl = "http://localhost:8080/recipes"; //TODO this must be configured based on environment

  constructor(private http: HttpClient, private unitService: UnitService) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(map(response => {
      response.forEach(recipe => {
        recipe = this.mapRecipe(recipe);
      })
      return response;
    }));
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipesUrl + "/" + id).pipe(map(response => {
      return this.mapRecipe(response);
    }));
  }

  createRecipe(newRecipe: Recipe): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    newRecipe.ingredients.forEach(ingredient => {
      if (ingredient.quantity && ingredient.quantity.unit) {
        ingredient.quantity.unit = this.unitService.toUnitKey(ingredient.quantity.unit);
      }
    })
    const body = JSON.stringify(newRecipe);
    return this.http.post(this.recipesUrl, body, { 'headers': headers });
  }

  mapRecipe(recipe: Recipe): Recipe {
    recipe.ingredients?.forEach(i => {
      if (i.quantity && i.quantity.unit) {
        i.quantity.unit = this.unitService.toUnitValue(i.quantity.unit);

      }
    })
    return recipe;
  }
}
