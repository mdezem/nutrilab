import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormulasService, IFormula } from '../formulas.service';
import { Observable, of } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

export interface IFormulaInfo {
  formula: string;
  kcal?: number;
  carbs?: number;
  lipids?: number;
  protein?: number;
  freeWater?: number;
}

@Component({
  selector: 'app-formula-info-form',
  templateUrl: './formula-info-form.component.html',
  styleUrls: ['./formula-info-form.component.scss']
})
export class FormulaInfoFormComponent implements OnInit {
  private _formulaType = 'Enteral';
  private _formulas: Observable<IFormula[]>;
  form: FormGroup;
  showFormulaDetails = false;

  @Input()
  set formulaType(type: string) {
    if (this._formulaType === type) {
      return;
    }
    type = this._formulasSvc.getTypeName(type);
    if (this._formulaType === type) {
      return;
    }
    this._formulaType = type;
    this._formulas = null;
  }
  get formulaType() {
    return this._formulaType;
  }

  @Output() formulaSelected = new EventEmitter<IFormulaInfo>();

  formula: IFormulaInfo;

  get formulas() {
    if (this._formulas == null) {
      console.log('get formulas: ' + this._formulaType);
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
          if (!value) {
            return of(null);
          }

          if (value === 'none') {
            this.showFormulaDetails = true;
            return of (this.form.value);
          }
          return this._formulasSvc.getFormulaByName(value);
        })
      )
      .subscribe(formula => {
        if (!formula) {
          this.form.reset({ formula: 'none' });
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

  get value() {
    return <IFormulaInfo>this.form.value;
  }

  get isValid() {
    return this.form.valid;
  }

  ngOnInit() {}
}
