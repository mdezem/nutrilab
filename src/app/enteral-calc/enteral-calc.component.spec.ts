import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteralCalcComponent } from './enteral-calc.component';

describe('EnteralCalcComponent', () => {
  let component: EnteralCalcComponent;
  let fixture: ComponentFixture<EnteralCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteralCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteralCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
