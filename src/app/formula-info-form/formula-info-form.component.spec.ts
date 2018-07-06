import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaInfoFormComponent } from './formula-info-form.component';

describe('FormulaInfoFormComponent', () => {
  let component: FormulaInfoFormComponent;
  let fixture: ComponentFixture<FormulaInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
