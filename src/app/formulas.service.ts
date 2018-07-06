import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IFormula {
  name: string;
  kcal?: number;
  protein?: number;
  carbs?: number;
  lipids?: number;
  freeWater?: number;
  type?: 'Enteral' | 'Parenteral';
}

@Injectable({
  providedIn: 'root'
})
export class FormulasService {
  formulas: IFormula[];

  constructor() {
    this.formulas = _builtin_formulas();
    this._sort_formulas();
  }

  getTypeName(type?: string) {
    if (type) {
      type = type.substr(0, 1).toUpperCase();
      if (type === 'E') {
        type = 'Enteral';
      }
      if (type === 'P') {
        type = 'Parenteral';
      }
    }
    this._validate_type(type);
    return type;
  }

  getFormulas(type?: string): Observable<IFormula[]> {
    // TODO permanent storage
    if (!type) {
      return of(this.formulas);
    }
    type = this.getTypeName(type);
    return of(this.formulas.filter(f => f.type === type));
  }

  getFormulaByName(name: string): Observable<IFormula> {
    const formula = this.formulas.find(
      f => f.name.toLowerCase() === name.toLocaleLowerCase()
    );
    return of(formula);
  }

  add(formula: IFormula) {
    // TODO validade
    this._validate_type(formula.type);
    this.formulas.unshift(formula);
    this._sort_formulas();
  }

  update(formula: IFormula) {
    const index = this.formulas.findIndex(f => f.name === formula.name);
    if (index >= 0) {
      this.formulas[index] = formula;
    }
  }

  private _sort_formulas() {
    this.formulas.sort((a, b) => a.name.localeCompare(b.name));
  }

  private _validate_type(type: string) {
    if (!type || !type.length) {
      throw new Error('Null argument: type');
    }
    if (type !== 'Enteral' && type !== 'Parenteral') {
      throw new Error(`Invalid formula type: ${type}`);
    }
    return;
  }
}

// TODO move the formulas to a json file.
export function _builtin_formulas(): IFormula[] {
  return [
    {
      name: 'Nepro HP',
      kcal: 1.8,
      protein: 8.1,
      carbs: 14.74,
      lipids: 9.6,
      type: 'Enteral'
    },
    {
      name: 'Renilon 7.5',
      kcal: 2,
      protein: 7.5,
      carbs: 20,
      lipids: 10,
      type: 'Enteral'
    },
    {
      name: 'Nutrison Standard',
      kcal: 1.0,
      protein: 4.0,
      carbs: 12.3,
      lipids: 3.9,
      type: 'Enteral'
    },
    {
      name: 'Nutrison Energy',
      kcal: 1.5,
      protein: 6.0,
      carbs: 18.3,
      lipids: 5.8,
      type: 'Enteral'
    },
    {
      name: 'Glucerna',
      kcal: 1.0,
      protein: 4.18,
      carbs: 8.14,
      lipids: 5.44,
      type: 'Enteral'
    },
    {
      name: 'Isosource Standard',
      kcal: 1.0,
      protein: 3.9,
      carbs: 13.5,
      lipids: 3.4,
      type: 'Enteral'
    },
    {
      name: 'Isosource Energy',
      kcal: 1.57,
      protein: 6.1,
      carbs: 19.3,
      lipids: 6.2,
      type: 'Enteral'
    },
    {
      name: 'GI Control',
      kcal: 1.1,
      protein: 4.1,
      carbs: 14.5,
      lipids: 3.5,
      type: 'Enteral'
    },
    {
      name: 'GI Forte',
      kcal: 1.55,
      protein: 6.0,
      carbs: 18.3,
      lipids: 5.9,
      type: 'Enteral'
    },
    {
      name: 'Peptamen',
      kcal: 1.0,
      protein: 4.0,
      carbs: 12.7,
      lipids: 3.7,
      type: 'Enteral'
    },
    {
      name: 'GI Control',
      kcal: 1.1,
      protein: 4.1,
      carbs: 14.5,
      lipids: 3.5,
      type: 'Enteral'
    },
    {
      name: 'Jevity Plus',
      kcal: 1.2,
      protein: 5.55,
      carbs: 15.07,
      lipids: 3.93,
      type: 'Enteral'
    },
    {
      name: 'Nepro LP',
      kcal: 1.8,
      protein: 4.5,
      carbs: 18.53,
      lipids: 9.7,
      type: 'Enteral'
    },
    {
      name: 'Nutrispecial Lipid',
      kcal: 1.18,
      protein: 5.6,
      carbs: 14.4,
      lipids: 4.0,
      type: 'Parenteral'
    },
    {
      name: 'Nutriplus Lipid',
      kcal: 1.01,
      protein: 3.8,
      carbs: 12.0,
      lipids: 4.0,
      type: 'Parenteral'
    },
    {
      name: 'Oliclinomel N7',
      kcal: 1.2,
      protein: 4.0,
      carbs: 16.0,
      lipids: 4.0,
      type: 'Parenteral'
    },
    {
      name: 'Oliclinomel N4',
      kcal: 0.61,
      protein: 2.2,
      carbs: 8.0,
      lipids: 2.0,
      type: 'Parenteral'
    },
    {
      name: 'Smofkabiven',
      kcal: 1.1,
      protein: 5.0,
      carbs: 12.5,
      lipids: 3.8,
      type: 'Parenteral'
    },
    {
      name: 'Plusflex',
      kcal: 0.79,
      protein: 4.8,
      carbs: 15.0,
      lipids: 0,
      type: 'Parenteral'
    },
    {
      name: 'Synthamin 10%',
      kcal: 0.4,
      protein: 10,
      carbs: 0,
      lipids: 0,
      type: 'Parenteral'
    }
  ];
}
