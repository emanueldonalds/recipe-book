import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-delete-recipe-dialog',
  templateUrl: './delete-recipe-dialog.component.html',
  styleUrls: ['./delete-recipe-dialog.component.scss']
})
export class DeleteRecipeDialog implements OnInit {
  id: string;
  name: string;

  constructor(public dialogRef: MatDialogRef<DeleteRecipeDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private recipeService: RecipeService, private router: Router) {
    this.id = data.id;
    this.name = data.name;
   }

  ngOnInit(): void {
  }

  delete() {
    this.recipeService.deleteRecipe(this.id).subscribe(() => {
      this.dialogRef.close();  
      this.router.navigate(['/']);
    })
  }

}
