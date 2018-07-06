import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-enteral-parenteral-summary',
  templateUrl: './enteral-parenteral-summary.component.html',
  styleUrls: ['./enteral-parenteral-summary.component.scss']
})
export class EnteralParenteralSummaryComponent implements OnInit {
  enteralForm: FormGroup;
  parenteralForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.enteralForm = fb.group({
      rate: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      freeWater: [null],
      freeWaterUnit: [null],
      protein: [null],
    });

    this.parenteralForm = fb.group({
      totalVolume: [null, [Validators.required]],
      rate: [null, [Validators.required]],
      duration: [null, [Validators.required]]
    });

  }

  ngOnInit() {
  }

}
