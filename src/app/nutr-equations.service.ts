import { Injectable } from '@angular/core';

export interface EnergyEquationSection {
  name: string;
  items: EnergyEquationItem[];
}

export interface EnergyEquationItem {
  name: string;
  value: number;
  comment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NutrEquationsService {
  constructor() {}

  bmi(weight_kg: number, height_cm: number) {
    const h = height_cm / 100;
    return Math.round((weight_kg * 10) / (h * h)) / 10;
  }

  mifflin_stjeor(
    gender: string,
    weight_kg: number,
    height_cm: number,
    age_yrs: number
  ) {
    const c = gender === 'M' ? 5 : -161;
    return 10 * weight_kg + 6.25 * height_cm - 5 * age_yrs + c;
  }

  penn_state_1998(
    gender: string,
    weight_kg: number,
    height_cm: number,
    age_yrs: number,
    minute_ventilation_lmin: number,
    tmax_c: number
  ) {
    const hbe = this.harris_benedict(gender, weight_kg, height_cm, age_yrs);
    return 1.1 * hbe + 140 * tmax_c + 32 * minute_ventilation_lmin - 5340;
  }

  penn_state_2003(
    gender: string,
    weight_kg: number,
    height_cm: number,
    age_yrs: number,
    minute_ventilation_lmin: number,
    tmax_c: number
  ): number {
    const msj = this.mifflin_stjeor(gender, weight_kg, height_cm, age_yrs);
    return 0.96 * msj + 167 * tmax_c + 31 * minute_ventilation_lmin - 6212;
  }

  penn_state_2010(
    gender: string,
    weight_kg: number,
    height_cm: number,
    age_yrs: number,
    minute_ventilation_lmin: number,
    tmax_c: number
  ): number {
    const msj = this.mifflin_stjeor(gender, weight_kg, height_cm, age_yrs);
    return 0.71 * msj + 85 * tmax_c + 64 * minute_ventilation_lmin - 3085;
  }

  faisy_fagon(
    weight_kg: number,
    height_cm: number,
    minute_ventilation_lmin: number,
    tmax_c: number
  ) {
    return (
      8 * weight_kg +
      14 * height_cm +
      32 * minute_ventilation_lmin +
      94 * tmax_c -
      4834
    );
  }

  // Devine Formula
  idealBodyWeight(gender: string, height_cm: number) {
    const BASE_HEIGHT = 152.4; // (60in)
    const MEN_BASE_WEIGHT = 48.0808; // (106lb)
    const MEN_HEIGHT_FACTOR = 2.72155; // (6lb)
    const WOMEN_BASE_WEIGHT = 45.3292; // (100lb)
    const WOMEN_HEIGHT_FACTOR = 2.26792; // (5lb)
    const ONE_INCH = 2.54;

    let base_weight = 0;
    let height_factor = 0;

    switch (gender) {
      case 'M':
        base_weight = MEN_BASE_WEIGHT;
        height_factor = MEN_HEIGHT_FACTOR;
        break;

      case 'F':
        base_weight = WOMEN_BASE_WEIGHT;
        height_factor = WOMEN_HEIGHT_FACTOR;
        break;

      default:
        throw new Error('Invalid Gender');
    }

    const result =
      base_weight + ((height_cm - BASE_HEIGHT) / ONE_INCH) * height_factor;
    return result;
  }

  harris_benedict(
    gender: string,
    weight_kg: number,
    height_cm: number,
    age_yrs: number
  ) {
    let adjusted_weight = weight_kg;
    const ideal_weight = this.idealBodyWeight(gender, height_cm);
    if (weight_kg > ideal_weight * 1.25) {
      adjusted_weight = ideal_weight + 0.25 * (weight_kg - ideal_weight);
    }

    let result = 0;
    switch (gender) {
      case 'M':
        result = 13.75 * height_cm + 5 * adjusted_weight - 6.8 * age_yrs + 66;
        break;

      case 'F':
        result = 1.8 * height_cm + 9.6 * adjusted_weight - 4.7 * age_yrs + 655;
        break;

      default:
        throw new Error('Invalid Gender');
    }
    return result;
  }

  calcEnergyEquations(
    gender: string,
    weight_kg: number,
    height_cm: number,
    age_yrs: any,
    minute_ventilation_lmin: any,
    tmax_c: any
  ): EnergyEquationSection[] {

    const svc = this;
    const result: EnergyEquationSection[] = [];
    let result_section;

    function add_section(name: string) {
      result_section = { name: name, items: [] };
      result.push(result_section);
    }

    function add_res(name: string, value: number, comment?: string) {
      result_section.items.push({ name, value, comment });
    }

    const bmi = svc.bmi(weight_kg, height_cm);

    function addVentilatedEquations() {
      // ventilated patients
      add_section('Ventilated Patients');
      if (bmi < 30 || age_yrs < 60) {
        add_res(
          'Penn State (2003)',
          Math.floor(
            svc.penn_state_2003(
              gender,
              weight_kg,
              height_cm,
              age_yrs,
              minute_ventilation_lmin,
              tmax_c
            )
          )
        );
      } else {
        add_res(
          'Penn State (2010, obese patients)',
          Math.floor(
            svc.penn_state_2010(
              gender,
              weight_kg,
              height_cm,
              age_yrs,
              minute_ventilation_lmin,
              tmax_c
            )
          )
        );
      }

      add_res(
        'Penn State (1998)',
        Math.floor(
          svc.penn_state_1998(
            gender,
            weight_kg,
            height_cm,
            age_yrs,
            minute_ventilation_lmin,
            tmax_c
          )
        )
      );

      add_res(
        'Faisy-Fagon',
        Math.floor(
          svc.faisy_fagon(
            weight_kg,
            height_cm,
            minute_ventilation_lmin,
            tmax_c
          )
        )
      );
    }

    function addGeneralEquationsSection() {
      add_section('General Equations');

      add_res(
        'Mifflin-St.Jeor',
        Math.floor(svc.mifflin_stjeor(gender, weight_kg, height_cm, age_yrs))
      );

      add_res(
        'Harris Benedict',
        Math.floor(svc.harris_benedict(gender, weight_kg, height_cm, age_yrs))
      );
    }

    if (minute_ventilation_lmin > 0 && tmax_c > 0) {
      addVentilatedEquations();
    }

    addGeneralEquationsSection();

    return result;
  }
}
