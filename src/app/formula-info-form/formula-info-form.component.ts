import { Component, OnInit, Input } from '@angular/core';
import { FormulasService, IFormula } from '../formulas.service';
import { Observable, of } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-formula-info-form',
  templateUrl: './formula-info-form.component.html',
  styleUrls: ['./formula-info-form.component.scss']
})
export class FormulaInfoFormComponent implements OnInit {
  private _formulaType = 'Enteral';
  private _formulas: Observable<IFormula[]>;
  form: FormGroup;

  @Input()
  set formulaType(type: string) {
    if (this._formulaType === type) {
      return;
    }
    type = this._formulasSvc.getTypeName(type);
    if (this._formulaType === type) {
      return;
    }
    this._formulas = null;
  }
  get formulaType() {
    return this._formulaType;
  }

  get formulas() {
    if (this._formulas == null) {
      this._formulas = this._formulasSvc.getFormulas(this._formulaType);
    }
    return this._formulas;
  }

  constructor(private _formulasSvc: FormulasService, fb: FormBuilder) {
    this.form = fb.group({
      formula: [null],
      kcal: [null, [Validators.required]],
      carbs: [null, [Validators.required]],
      protein: [null, [Validators.required]],
      lipids: [null, [Validators.required]],
      freeWater: [null, [Validators.required]]
    });

    this.form.controls['formula'].valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(value => {
          if (!value || value === 'none') {
            return of(null);
          }
          return this._formulasSvc.getFormulaByName(value);
        })
      )
      .subscribe(formula => {
        if (!formula) {
          this.form.reset();
          return;
        }
        this.form.patchValue({
          kcal: formula.kcal,
          carbs: formula.carbs,
          protein: formula.protein,
          lipids: formula.lipids,
          freeWater: formula.freeWater
        });
      });
  }

  ngOnInit() {}
}
