import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AppRoutingModule } from './app-routing.module';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { IngredientDialogComponent } from './components/recipe-ingredients-input/ingredient-dialog/ingredient-dialog.component'
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeNameComponent } from './components/recipe-name-input/recipe-name-input.component';
import { RecipeIngredientsInputComponent } from './components/recipe-ingredients-input/recipe-ingredients-input.component';
import { RecipeInstructionsInputComponent } from './components/recipe-instructions-input/recipe-instructions-input.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DeleteRecipeDialog } from './edit-recipe/delete-recipe-dialog/delete-recipe-dialog.component';
import { ServingsInputComponent } from './components/servings-input/servings-input.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { OrderByPipe } from './components/pipes/order-by-pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { initializeKeycloak } from './authentication/keycloak-init.factory';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ConfigInitService } from './init/config-init.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProfileComponent } from './profile/profile.component'; 

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeDetailsComponent,
    NewRecipeComponent,
    IngredientDialogComponent,
    EditRecipeComponent,
    RecipeNameComponent,
    RecipeIngredientsInputComponent,
    RecipeInstructionsInputComponent,
    SpinnerComponent,
    DeleteRecipeDialog,
    ServingsInputComponent,
    SearchBarComponent,
    OrderByPipe,
    NotFoundComponent,
    NavbarComponent,
    ProfileComponent,
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    DragDropModule,
    KeycloakAngularModule,
    ],
  providers: [
    ConfigInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, ConfigInitService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
