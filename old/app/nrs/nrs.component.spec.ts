import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrsComponent } from './nrs.component';

describe('NrsComponent', () => {
  let component: NrsComponent;
  let fixture: ComponentFixture<NrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
