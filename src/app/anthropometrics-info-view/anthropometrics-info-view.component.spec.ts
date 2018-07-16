import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthropometricsInfoViewComponent } from './anthropometrics-info-view.component';

describe('AnthropometricsInfoViewComponent', () => {
  let component: AnthropometricsInfoViewComponent;
  let fixture: ComponentFixture<AnthropometricsInfoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnthropometricsInfoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnthropometricsInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
