import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeNameComponent } from './recipe-name-input.component';

describe('RecipeNameComponent', () => {
  let component: RecipeNameComponent;
  let fixture: ComponentFixture<RecipeNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
