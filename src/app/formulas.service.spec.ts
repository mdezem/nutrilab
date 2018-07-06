import { TestBed, inject } from '@angular/core/testing';

import { FormulasService } from './formulas.service';

describe('FormulasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormulasService]
    });
  });

  it('should be created', inject([FormulasService], (service: FormulasService) => {
    expect(service).toBeTruthy();
  }));
});
