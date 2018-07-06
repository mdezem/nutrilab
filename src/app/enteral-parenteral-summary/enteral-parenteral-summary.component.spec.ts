import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteralParenteralSummaryComponent } from './enteral-parenteral-summary.component';

describe('EnteralParenteralSummaryComponent', () => {
  let component: EnteralParenteralSummaryComponent;
  let fixture: ComponentFixture<EnteralParenteralSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteralParenteralSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteralParenteralSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
