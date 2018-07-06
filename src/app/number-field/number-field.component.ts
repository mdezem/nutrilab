import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent implements OnInit {
  @Input() units: string;
  @Input() field: string;
  @Input() form: FormGroup;
  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }

}
