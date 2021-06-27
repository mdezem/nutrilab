import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface IPatientInfo {
  gender: string;
  weight: number;
  height: number;
  propofol: number;
}

@Component({
  selector: 'app-patient-info-form',
  templateUrl: './patient-info-form.component.html',
  styleUrls: ['./patient-info-form.component.scss']
})
export class PatientInfoFormComponent implements OnInit {
  form: FormGroup;

  @Input() showPropofol = false;

  @Output() valueChanges = new EventEmitter<IPatientInfo>();

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      gender: [null, [Validators.required]],
      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      propofol: [null]
    });

    this.form.valueChanges.subscribe(value => this.valueChanges.emit(value));
  }

  get value() {
    return <IPatientInfo>this.form.value;
  }

  get isValid() {
    return this.form.valid;
  }

  ngOnInit() {
  }
}
