import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeInstructionsInputComponent } from './recipe-instructions-input.component';

describe('RecipeInstructionsInputComponent', () => {
  let component: RecipeInstructionsInputComponent;
  let fixture: ComponentFixture<RecipeInstructionsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeInstructionsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeInstructionsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
