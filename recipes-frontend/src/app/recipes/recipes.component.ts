import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = []
  search: string = "";
  isLoggedIn: boolean = false;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private keycloakService: KeycloakService) { 
  }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    this.route.queryParams
      .subscribe(params => {
        if (params.search) {
          this.search = params.search;
          this.filterRecipes();        }
        else {
          this.filteredRecipes = this.recipes;
        }
      });

    this.recipeService.getRecipes().subscribe(
      (response) => {
        this.recipes = response;
        this.filterRecipes();
      },
      (error) => { console.log(error); });
  }

  filterRecipes() {
    this.filteredRecipes = this.recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(this.search.toLocaleLowerCase()));
  }

}
