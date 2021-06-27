import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NutrEquationsService } from '../nutr-equations.service';

@Component({
  selector: 'app-bmipage',
  templateUrl: './bmipage.component.html',
  styleUrls: ['./bmipage.component.scss']
})
export class BMIPageComponent implements OnInit {
  form: FormGroup;
  bmi = 0;

  constructor(
    private _nutriEquationsSvc: NutrEquationsService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      weight: '',
      height: ''
    });
  }

  calc() {
    const values = this.form.value;
    this.bmi = this._nutriEquationsSvc.bmi(values.weight, values.height);
  }

  ngOnInit() {}
}
