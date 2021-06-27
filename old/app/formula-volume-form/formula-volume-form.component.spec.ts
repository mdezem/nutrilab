import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaVolumeFormComponent } from './formula-volume-form.component';

describe('FormulaVolumeFormComponent', () => {
  let component: FormulaVolumeFormComponent;
  let fixture: ComponentFixture<FormulaVolumeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaVolumeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaVolumeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
