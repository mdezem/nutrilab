import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface IFormulaVolume {
  rate: number;
  volume: number;
  duration: number;
}

@Component({
  selector: 'app-formula-volume-form',
  templateUrl: './formula-volume-form.component.html',
  styleUrls: ['./formula-volume-form.component.scss']
})
export class FormulaVolumeFormComponent implements OnInit {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = this.createForm(fb);
  }

  createForm(fb: FormBuilder) {
    const form = fb.group({
      rate: [null, [Validators.required]],
      duration: [24, [Validators.required]],
      volume: [null, Validators.required]
    });

    let changing = false;

    function beginChange() {
      if (changing) {
        return false;
      }
      changing = true;
      return true;
    }

    function endChange() {
      changing = false;
    }

    form.controls['volume'].valueChanges.subscribe(volume => {
      if (!beginChange()) {
        return;
      }
      form.patchValue({
        rate: Math.ceil(volume / form.value.duration)
      });
      endChange();
    });

    form.controls['rate'].valueChanges.subscribe(rate => {
      if (!beginChange()) {
        return;
      }

      form.patchValue({
        volume: Math.floor(rate * form.value.duration)
      });

      endChange();
    });

    form.controls['duration'].valueChanges.subscribe(duration => {
      const rate = form.value.rate;
      if (!rate) {
        return;
      }
      if (!beginChange()) {
        return;
      }
      form.patchValue({
        volume: Math.ceil(rate * duration)
      });
      endChange();
    });

    return form;
  }

  get value() {
    return <IFormulaVolume>this.form.value;
  }

  get isValid() {
    return this.form.valid;
  }

  ngOnInit() {}
}
