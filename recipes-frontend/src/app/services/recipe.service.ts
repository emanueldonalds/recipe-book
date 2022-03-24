import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipesUrl = "http://localhost:8080/recipes"; //TODO this must be configured based on environment

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipesUrl + "/" + id);
  }

  createRecipe(newRecipe: Recipe) {
    const headers = {'content-type': 'application/json'}  
    const body = JSON.stringify(newRecipe);
    console.log(body);
    
    return this.http.post(this.recipesUrl, body, {'headers': headers}).subscribe(data => {
      console.log(data);
      
    });
  }
}
