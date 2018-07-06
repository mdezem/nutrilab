import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormulasService, IFormula } from '../formulas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.scss']
})
export class FormulasComponent implements OnInit {
  filter: string;
  typeName: string;
  formulas$: Observable<IFormula[]>;

  constructor(
    private _route: ActivatedRoute,
    private _formulasSvc: FormulasService
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.filter = params.get('type') || '';
      this.typeName = this._formulasSvc.getTypeName(this.filter);
      this.formulas$ = this._formulasSvc.getFormulas(this.filter);
    });
  }
}
