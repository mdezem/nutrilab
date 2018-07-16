import { TestBed, inject } from '@angular/core/testing';

import { NutrEquationsService } from './nutr-equations.service';

describe('NutrEquationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NutrEquationsService]
    });
  });

  it('should be create', inject(
    [NutrEquationsService],
    (service: NutrEquationsService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should classify the bmi correctly', inject(
    [NutrEquationsService],
    (service: NutrEquationsService) => {
      // normal
      const normalBmi = service.bmi(71, 181);
      const normalClass = service.bmiClassification(normalBmi, false);
      expect(normalClass).toBe('Normal');

      // thin
      const thinBmi = service.bmi(60, 181);
      const thinClass = service.bmiClassification(thinBmi, false);
      const thinClassDetails = service.bmiClassification(thinBmi, true);
      expect(thinClass).toBe('Underweight');
      expect(thinClassDetails).toBe('Underweight: MildThinness');
    }
  ));

  it('should calculate anthropometrics correctly', inject(
    [NutrEquationsService],
    (service: NutrEquationsService) => {
      const a = service.calcAnthropometrics('M', 71, 181);

      expect(a.bmi).toBeCloseTo(21.6, 1);
      expect(a.bmiClassification).toBe('Normal');
      expect(a.idealBodyWeight).toBeCloseTo(75, 1);
      expect(a.nutritionalBodyWeight).toBeCloseTo(75, 1);
    }
  ));
});
