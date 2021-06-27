import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquationsComponent } from './energy-equations.component';

describe('EnergyEquationsComponent', () => {
  let component: EnergyEquationsComponent;
  let fixture: ComponentFixture<EnergyEquationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyEquationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyEquationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
