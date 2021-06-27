import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthropometricsPageComponent } from './anthropometrics-page.component';

describe('AnthropometricsPageComponent', () => {
  let component: AnthropometricsPageComponent;
  let fixture: ComponentFixture<AnthropometricsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnthropometricsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnthropometricsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
