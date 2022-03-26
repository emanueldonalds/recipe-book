import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecipeDialog } from './delete-recipe-dialog.component';

describe('DeleteRecipeDialog', () => {
  let component: DeleteRecipeDialog;
  let fixture: ComponentFixture<DeleteRecipeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRecipeDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecipeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
