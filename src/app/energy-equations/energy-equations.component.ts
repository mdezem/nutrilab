import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NutrEquationsService } from '../nutr-equations.service';

export interface IPatientInfo {
  gender: string | 'M' | 'F';
  age_yrs: number;
  height_cm: number;
  weight_kg: number;
  ventilation_lmin: number;
  tmax_c: number;
}

@Component({
  selector: 'app-energy-equations',
  templateUrl: './energy-equations.component.html',
  styleUrls: ['./energy-equations.component.scss']
})
export class EnergyEquationsComponent implements OnInit {
  form: FormGroup;
  results = [];

  constructor(
    fb: FormBuilder,
    private _nutrEquationsSvc: NutrEquationsService
  ) {
    this.form = fb.group({
      gender: 'M',
      age_yrs: 45,
      height_cm: 179,
      weight_kg: 85,
      ventilation_lmin: '',
      tmax_c: ''
    });
  }

  ngOnInit() {}

  calc() {
    const values = <IPatientInfo>this.form.value;
    this.results = this._nutrEquationsSvc.calcEnergyEquations(
      values.gender,
      values.weight_kg || 0,
      values.height_cm || 0,
      values.age_yrs || 0,
      values.ventilation_lmin || 0,
      values.tmax_c || 0
    );
  }

  reset() {
    this.form.reset();
  }

  restart(reset: boolean) {
    this.results = [];
    if (reset) {
      this.reset();
    }
  }

  get hasResults() {
    return this.results && this.results.length;
  }
}
