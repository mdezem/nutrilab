import { TestBed, inject } from '@angular/core/testing';

import { NutrEquationsService } from './nutr-equations.service';

describe('NutrEquationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NutrEquationsService]
    });
  });

  it('should be created', inject([NutrEquationsService], (service: NutrEquationsService) => {
    expect(service).toBeTruthy();
  }));
});
