import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const severity_list = [
  {
    value: 0,
    label: 'Absent',
    text: ['Normal nutritional requirements']
  },
  {
    value: 1,
    label: 'Mild',
    text: [
      'A patient with chronic disease, admitted to hospital due to complications.',
      'The patient is weak out of bed regularly. Protein requirement is increased, ' +
        'but can be covered by oral diet or supplements in most cases.'
    ]
  },
  {
    value: 2,
    label: 'Moderate',
    text: [
      'A patient confined to bed due to illnes, e.g. following major abdominal surgery.',
      'Protein requirement is substantially increased, but can be covered, although artificial feeding is required in many cases.'
    ]
  },
  {
    value: 3,
    label: 'Severe',
    text: [
      'A patient in intensive care with assisted ventilation etc.',
      'Protein requirement is increased and cannot be covered even by artificial feeding.',
      'Protein breakdown and nitrogen loss can be significantly attenuated.'
    ]
  }
];

const nutr_status_list = [
  {
    value: 0,
    label: 'Absent',
    text: ['Normal nutritional status']
  },
  {
    value: 1,
    label: 'Mild',
    text: [
      'Weight loss >5% in 3 months or',
      'Food intake below 50-75% of normal requirement in preceding week'
    ]
  },
  {
    value: 2,
    label: 'Moderate',
    text: [
      'Weight loss >5% in 2 months or',
      'BMI 18.5 - 20.5 and impaired general condition or',
      'Food intake 25-60% of normal requirement in preceding week.'
    ]
  },
  {
    value: 3,
    label: 'Severe',
    text: [
      'Weight loss >5% in 1 month (>15% in 3 months) or',
      'BMI <18.5 and impaired general condition or',
      'food intake 0-25% of normal requirement in preceding week.'
    ]
  }
];

const info = `NRS-2002 is based on an interpretation of available randomized clinical trials. A nutritional care plan is indicated in all
patients who a requirement is increased, but can be covered by oral diet or supplements inmost cases. Nutritional risk is
defined by the present nutritional status and risk of impairment of present status, due to increased requirements caused
by stress metabolism of the clinical condition. (1) severely undernourished (score=3) or (2) severely ill (score=3) or (3)
moderately undernourished + mildly ill (score 2+1) or (4) mildly undernourished + moderately ill (score 1+2).`;

@Component({
  selector: 'app-nrs',
  templateUrl: './nrs.component.html',
  styleUrls: ['./nrs.component.scss']
})
export class NrsComponent implements OnInit {
  form: FormGroup;
  score = -1;

  get nutrStatusList() {
    return nutr_status_list;
  }
  get severityList() {
    return severity_list;
  }

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      preScreening: [false, [Validators.required]],
      olderThan70: [false, [Validators.required]],
      nutritionalStatus: [null, [Validators.required]],
      diseaseSeverity: [null, [Validators.required]]
    });
  }

  ngOnInit() {}

  reset() {
    this.form.reset({
      preScreening: false,
      olderThan70: false,
      nutritionalStatus: null,
      diseaseSeverity: null
    });
    this.score = -1;
  }

  calc() {
    if (!this.form.valid) {
      this.score = -1;
      return;
    }
    const values = this.form.value;
    this.score =
      values.nutritionalStatus +
      values.diseaseSeverity +
      (values.preScreening ? 1 : 0) +
      (values.olderThan70 ? 1 : 0);
  }
}
