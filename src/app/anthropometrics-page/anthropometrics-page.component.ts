import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientInfoFormComponent } from '../patient-info-form/patient-info-form.component';
import { NutrEquationsService, IAnthropometrics } from '../nutr-equations.service';

@Component({
  selector: 'app-anthropometrics-page',
  templateUrl: './anthropometrics-page.component.html',
  styleUrls: ['./anthropometrics-page.component.scss']
})
export class AnthropometricsPageComponent implements OnInit {
  get hasResults() { return !!this.result; }
  isValid = false;
  result: IAnthropometrics;

  @ViewChild('patientInfo') patientInfoCmp: PatientInfoFormComponent;

  constructor(private equationsSvc: NutrEquationsService) {}

  ngOnInit() {

  }

  calc() {
    const patientInfo = this.patientInfoCmp.value;
    this.result = this.equationsSvc.calcAnthropometrics(
      patientInfo.gender,
      patientInfo.weight,
      patientInfo.height
    );
  }

  reset() {
    if (this.patientInfoCmp) {
      this.patientInfoCmp.form.reset();
    }
    this.result = null;
  }

  checkValidity() {
    this.isValid = this.patientInfoCmp.isValid;
  }
}
