import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServingsInputComponent } from './servings-input.component';

describe('ServingsInputComponent', () => {
  let component: ServingsInputComponent;
  let fixture: ComponentFixture<ServingsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServingsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServingsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
