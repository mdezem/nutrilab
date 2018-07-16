import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FormulasService, IFormula } from '../../formulas.service';
import { switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formula-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class FormulaEditFormComponent implements OnInit {
  subscription: any;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formulasSvc: FormulasService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      name: [null, [Validators.required]],
      kcal: [null, [Validators.required]],
      carbs: [null, [Validators.required]],
      protein: [null, [Validators.required]],
      lipids: [null, [Validators.required]],
      freeWater: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.subscription = this.route.queryParamMap
      .pipe(
        switchMap(params =>
          this.formulasSvc.getFormulaByName(params.get('name'))
        ),
        tap(formula => this.setFormula(formula))
      )
      .subscribe();
  }

  setFormula(formula: IFormula) {
    this.form.patchValue(formula);
  }

  save() {
    if (this.form.valid) {
      const formula: IFormula = { ...this.form.value };
      this.formulasSvc.update(formula);
    }
  }
}
