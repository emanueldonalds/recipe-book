import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Recipe } from '../models/recipe';
import { UnitService } from './unit.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipesUrl = environment.apiUri + "/recipes"; //TODO this must be configured based on environment

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

  getRecipeForServings(id: string, servings: number): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipesUrl + "/" + id + "?servings=" + servings).pipe(map(response => {
      return this.mapRecipe(response);
    }));
  }

  createRecipe(newRecipe: Recipe): Observable<any> {
    newRecipe.ingredients.forEach(ingredient => {
      if (ingredient.quantity && ingredient.quantity.unit) {
        ingredient.quantity.unit = this.unitService.toUnitKey(ingredient.quantity.unit);
      }
    })
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(newRecipe);
    return this.http.post(this.recipesUrl, body, { 'headers': headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateRecipe(recipeToUpdate: Recipe): Observable<any> {
    recipeToUpdate.ingredients.forEach(ingredient => {
      if (ingredient.quantity && ingredient.quantity.unit) {
        ingredient.quantity.unit = this.unitService.toUnitKey(ingredient.quantity.unit);
      }
    })
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(recipeToUpdate);
    return this.http.put(this.recipesUrl + '/' + recipeToUpdate.id, body, { 'headers': headers })
      .pipe(
        catchError(this.handleError)
      );;
  }

  deleteRecipe(id: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.delete(this.recipesUrl + '/' + id, { 'headers': headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  mapRecipe(recipe: Recipe): Recipe {
    recipe.ingredients?.forEach(i => {
      if (i.quantity && i.quantity.unit) {
        i.quantity.unit = this.unitService.toUnitValue(i.quantity.unit);

      }
    })
    return recipe;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    if (error.status === 401) {
      return throwError(() => new Error('Unauthorized'));
    }
    if (error.status === 403) {
      return throwError(() => new Error('You lack the privileges required to perform this action'));
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
