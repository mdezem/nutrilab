import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BMIPageComponent } from './bmipage.component';

describe('BMIPageComponent', () => {
  let component: BMIPageComponent;
  let fixture: ComponentFixture<BMIPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BMIPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BMIPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
