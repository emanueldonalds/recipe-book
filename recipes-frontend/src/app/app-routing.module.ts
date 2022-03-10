import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';

const routes: Routes = [
  { path: '', component: RecipesComponent }, 
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  { path: 'new-recipe', component: NewRecipeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }