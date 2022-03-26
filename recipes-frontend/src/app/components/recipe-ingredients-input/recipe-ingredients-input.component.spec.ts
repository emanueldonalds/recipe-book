import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIngredientsInputComponent } from './recipe-ingredients-input.component';

describe('RecipeIngredientsInputComponent', () => {
  let component: RecipeIngredientsInputComponent;
  let fixture: ComponentFixture<RecipeIngredientsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeIngredientsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeIngredientsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
