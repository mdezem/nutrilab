import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IAnthropometrics } from '../nutr-equations.service';

@Component({
  selector: 'app-anthropometrics-info-view',
  templateUrl: './anthropometrics-info-view.component.html',
  styleUrls: ['./anthropometrics-info-view.component.scss']
})
export class AnthropometricsInfoViewComponent implements OnChanges {
  @Input() source: IAnthropometrics;

  items: {
    label: string;
    text?: string;
    value?: number;
    unit?: string;
  }[];

  constructor() {}

  ngOnChanges() {
    const s = this.source;
    this.items = [
      { label: 'Actual Body Weight', value: s.actualBodyWeight, unit: 'kg' },
      { label: 'Ideal Body Weight', value: s.idealBodyWeight, unit: 'kg' },
      { label: 'Nutritional Body Weight', value: s.nutritionalBodyWeight, unit: 'kg' },
      { label: 'Bmi', value: s.bmi },
      { label: 'Bmi Classification', text: s.bmiClassification }
    ];
  }
}
