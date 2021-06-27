import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  FormulaInfoFormComponent,
  IFormulaInfo
} from '../formula-info-form/formula-info-form.component';
import {
  FormulaVolumeFormComponent,
  IFormulaVolume
} from '../formula-volume-form/formula-volume-form.component';
import {
  PatientInfoFormComponent,
  IPatientInfo
} from '../patient-info-form/patient-info-form.component';
import {
  NutrEquationsService,
  CaloricDensity,
  IAnthropometrics
} from '../nutr-equations.service';
import {
  IColumnDef,
  INutritionalTableData,
  ICellData
} from '../nutritional-table/nutritional-table.component';

interface IMacroNutrientValues {
  carbs_g: number;
  carbs_kcal: number;
  carbs_kcal_ratio: number;
  carbs_kcal_kg?: number;
  protein_g: number;
  protein_kcal: number;
  protein_kcal_ratio: number;
  protein_kcal_kg?: number;
  lipids_g: number;
  lipids_kcal: number;
  lipids_kcal_ratio: number;
  lipids_kcal_kg?: number;
}

interface IRouteComponent extends IMacroNutrientValues {
  route: string;
  kcal: number;
  ratio: number;
  kcal_kg: number;
}

interface IEnteralExtra {
  freeWater: number;
  freeWaterUnit: number;
  protein: number;
}

@Component({
  selector: 'app-enteral-parenteral-summary',
  templateUrl: './enteral-parenteral-summary.component.html',
  styleUrls: ['./enteral-parenteral-summary.component.scss']
})
export class EnteralParenteralSummaryComponent implements OnInit {
  enteralForm: FormGroup;
  hasResults = false;

  @ViewChild('patientForm') patientFormCmp: PatientInfoFormComponent;

  @ViewChild('enteralFormula') enteralFormulaCmp: FormulaInfoFormComponent;

  @ViewChild('enteralVolume') enteralVolumeCmp: FormulaVolumeFormComponent;

  @ViewChild('parenteralFormula')
  parenteralFormulaCmp: FormulaInfoFormComponent;

  @ViewChild('parenteralVolume')
  parenteralVolumeCmp: FormulaVolumeFormComponent;

  routeComponents: IRouteComponent[] = [];

  macroRouteGraphData: { data: number[]; labels: string[] } = {
    data: [],
    labels: []
  };

  routeTableData: INutritionalTableData = [];
  routeTableColumns: IColumnDef[] = [
    { name: 'route', label: 'Route' },
    { name: 'kcal', label: 'Calories' },
    { name: 'fluid', label: 'Fluid' }
  ];

  macroDistGraphData: { data: number[]; labels: string[] } = {
    data: [],
    labels: []
  };

  macroTableData: INutritionalTableData = [];
  macroTableColumns: IColumnDef[] = [
    { name: 'nutrient', label: 'Nutrient' },
    { name: 'enteral', label: 'Enteral' },
    { name: 'parenteral', label: 'Parenteral' },
    { name: 'propofol', label: 'Propofol' }
  ];

  private emptyMacroValues: IMacroNutrientValues = {
    carbs_g: 0,
    carbs_kcal_kg: 0,
    carbs_kcal: 0,
    carbs_kcal_ratio: 0,
    protein_g: 0,
    protein_kcal: 0,
    protein_kcal_kg: 0,
    protein_kcal_ratio: 0,
    lipids_g: 0,
    lipids_kcal: 0,
    lipids_kcal_kg: 0,
    lipids_kcal_ratio: 0
  };

  anthropometrics: IAnthropometrics;

  constructor(fb: FormBuilder, private equationsSvc: NutrEquationsService) {
    this.enteralForm = fb.group({
      freeWater: [null],
      freeWaterUnit: [1],
      protein: [null]
    });
  }

  reset() {
    this.enteralForm.reset();
    this.patientFormCmp.form.reset();
    this.enteralFormulaCmp.form.reset();
    this.enteralVolumeCmp.form.reset();
    this.parenteralFormulaCmp.form.reset();
    this.parenteralVolumeCmp.form.reset();
  }

  modify() {
    this.hasResults = false;
  }

  restart() {
    this.hasResults = false;
    setTimeout(() => this.reset(), 100);
  }

  calcTotalVolume(
    formula: IFormulaInfo,
    totalVolume: number,
    patientWeight_kg: number
  ) {
    function calcItem(percentage) {
      if (percentage === null || percentage === undefined) {
        return null;
      }
      return Math.round((percentage * totalVolume) / 100);
    }

    const kcalTotal = formula.kcal * totalVolume;
    const result = {
      formula: formula,
      kcal: kcalTotal,
      kcal_kg: Math.round(kcalTotal / patientWeight_kg),
      carbs_g: calcItem(formula.carbs),
      protein_g: calcItem(formula.protein),
      lipids_g: calcItem(formula.lipids),
      freeWater_ml: calcItem(formula.freeWater)
    };
    return result;
  }

  // frequency = 1 is the same as "ml/h"
  calcFreeWater(amount_mlh: number, frequency: number, duration: number) {
    if (!frequency) {
      return 0;
    }
    const timeScalar = Math.floor(duration / frequency);
    return Math.ceil(timeScalar * amount_mlh);
  }

  calcKcal(o: IMacroNutrientValues, patientWeight: number) {
    o.carbs_kcal = o.carbs_g * CaloricDensity.dextrose;
    o.carbs_kcal_kg = o.carbs_kcal / patientWeight;
    o.protein_kcal = o.protein_g * CaloricDensity.protein;
    o.protein_kcal_kg = o.protein_kcal / patientWeight;
    o.lipids_kcal = o.lipids_g * CaloricDensity.lipid;
    o.lipids_kcal_kg = o.lipids_kcal / patientWeight;

    this.calcKcalRatios(o);
  }

  calcKcalRatios(o: IMacroNutrientValues) {
    const totalKcal = o.carbs_kcal + o.protein_kcal + o.lipids_kcal;

    o.carbs_kcal_ratio = Math.round((o.carbs_kcal / totalKcal) * 100);
    o.protein_kcal_ratio = Math.round((o.protein_kcal / totalKcal) * 100);
    o.lipids_kcal_ratio = Math.round((o.lipids_kcal / totalKcal) * 100);
  }

  calcEnteral(
    enteralFormula: IFormulaInfo,
    volume_ml: number,
    patientWeight_kg: number,
    duration_hr: number,
    freeWater_ml: number,
    freeWater_unit,
    extraProtein_g_day: number
  ) {
    const enteralFormulaTotal = {
      ...this.emptyMacroValues,
      formula: { ...enteralFormula },
      ...this.calcTotalVolume(enteralFormula, volume_ml, patientWeight_kg)
    };

    const enteralFreeWater = this.calcFreeWater(
      freeWater_ml,
      freeWater_unit,
      duration_hr
    );

    const enteralExtraProtein = {
      kcal: CaloricDensity.protein * extraProtein_g_day,
      total_g: Math.round((extraProtein_g_day / 24) * duration_hr * 10) / 10,
      total_g_day: extraProtein_g_day
    };

    const enteralKcalTotal =
      enteralFormulaTotal.kcal + enteralExtraProtein.kcal;

    const enteralTotal = {
      ...enteralFormulaTotal,
      kcal: enteralKcalTotal,
      kcal_kg: Math.floor(enteralKcalTotal / patientWeight_kg),
      protein_g: enteralFormulaTotal.protein_g + enteralExtraProtein.total_g,
      freeWater_ml: enteralFormulaTotal.freeWater_ml + enteralFreeWater,
      freeWater: enteralFreeWater,
      extraProtein: enteralExtraProtein
    };

    this.calcKcal(enteralTotal, patientWeight_kg);

    return enteralTotal;
  }

  calcParenteral(
    formulaInfo: IFormulaInfo,
    volume_ml: number,
    patientWeight_kg: number
  ) {
    const parenteralTotal = {
      ...this.emptyMacroValues,
      formula: formulaInfo,
      ...this.calcTotalVolume(formulaInfo, volume_ml, patientWeight_kg)
    };

    this.calcKcal(parenteralTotal, patientWeight_kg);

    return parenteralTotal;
  }

  calcSummary(
    patientInfo: IPatientInfo,
    enteralFormula: IFormulaInfo,
    enteralVolume: IFormulaVolume,
    enteralExtra: any,
    parenteralFormula: IFormulaInfo,
    parenteralVolume: IFormulaVolume
  ) {
    const parenteral = this.calcParenteral(
      parenteralFormula,
      parenteralVolume.volume,
      patientInfo.weight
    );

    const propofol = this.equationsSvc.calcPropofol(
      patientInfo.propofol,
      patientInfo.weight,
      enteralVolume.duration
    );

    const enteral = this.calcEnteral(
      enteralFormula,
      enteralVolume.volume,
      patientInfo.weight,
      enteralVolume.duration,
      enteralExtra.freeWater,
      enteralExtra.freeWaterUnit,
      enteralExtra.protein
    );

    const totalKcal = enteral.kcal + parenteral.kcal + propofol.kcal;

    const total = {
      ...this.emptyMacroValues,
      kcal: totalKcal,
      kcal_kg: Math.floor(totalKcal / patientInfo.weight),
      carbs_g: enteral.carbs_g + parenteral.carbs_g,
      protein_g: enteral.protein_g + parenteral.protein_g,
      lipids_g: enteral.lipids_g + parenteral.lipids_g + propofol.lipids_g,
      fluid_ml:
        enteral.freeWater_ml + parenteral.freeWater_ml + propofol.volume_ml,
      enteralRatio: 0,
      parenteralRatio: 0,
      propofolRatio: 0
    };

    // make final calculations on the total object

    this.calcKcal(total, patientInfo.weight);

    // because propofol caloric density can be diferent the lipids kcal and kcal/kg must
    // be recalculated again those values
    total.lipids_kcal =
      enteral.lipids_kcal + parenteral.lipids_kcal + propofol.kcal;
    total.lipids_kcal_kg = Math.round(total.lipids_kcal / patientInfo.weight);

    this.calcKcalRatios(total);

    // ratios
    total.enteralRatio = Math.round((enteral.kcal / totalKcal) * 100);
    total.parenteralRatio = Math.round((parenteral.kcal / totalKcal) * 100);
    total.propofolRatio = Math.round((propofol.kcal / totalKcal) * 100);

    // athropometrics

    const anthropometrics = this.equationsSvc.calcAnthropometrics(
      patientInfo.gender,
      patientInfo.weight,
      patientInfo.height
    );

    const result = {
      anthropometrics,
      enteral,
      parenteral,
      propofol,
      total
    };

    return result;
  }

  calc() {
    const patientInfo = this.patientFormCmp.value;
    const enteralFormula = this.enteralFormulaCmp.value;
    const enteralVolume = this.enteralVolumeCmp.value;
    const parenteralFormula = this.parenteralFormulaCmp.value;
    const parenteralVolume = this.parenteralVolumeCmp.value;
    const enteralExtra: IEnteralExtra = this.enteralForm.value;

    const summary = this.calcSummary(
      patientInfo,
      enteralFormula,
      enteralVolume,
      enteralExtra,
      parenteralFormula,
      parenteralVolume
    );

    this.hasResults = true;

    console.log(summary);
    const enteral = summary.enteral;
    const parenteral = summary.parenteral;
    const propofol = summary.propofol;
    const total = summary.total;

    this.macroRouteGraphData = {
      data: [
        summary.enteral.kcal,
        summary.parenteral.kcal,
        summary.propofol.kcal
      ],
      labels: ['Enteral', 'Parenteral', 'Propofol']
    };

    function kcalCell(o: any, ratio: number): ICellData {
      return {
        value: o.kcal,
        unit: 'kcal',
        kcalKg: o.kcal_kg,
        ratio
      };
    }

    this.routeTableData = [
      [
        {
          text: 'Enteral'
        },
        kcalCell(enteral, total.enteralRatio),
        {
          value: enteral.freeWater_ml,
          unit: 'mL'
        }
      ],
      [
        {
          text: 'Parenteral'
        },
        kcalCell(parenteral, total.parenteralRatio),
        {
          value: parenteral.freeWater_ml,
          unit: 'mL'
        }
      ],
      [
        {
          text: 'Propofol'
        },
        kcalCell(propofol, total.propofolRatio),
        {
          value: propofol.volume_ml,
          unit: 'mL'
        }
      ],
      [
        {
          text: 'Total'
        },

        {
          value: total.kcal,
          kcalKg: total.kcal_kg
        },
        {
          value: total.fluid_ml,
          unit: 'mL'
        }
      ]
    ];

    this.macroDistGraphData = {
      data: [total.carbs_kcal, total.protein_kcal, total.lipids_kcal],
      labels: ['Dextrose', 'Protein', 'Lipids']
    };

    // macro nutrient table data
    this.macroTableData = [
      [
        {
          text: 'Dextrose'
        },
        {
          value: enteral.carbs_g,
          kcal: enteral.carbs_kcal,
          kcalKg: enteral.carbs_kcal_kg
        },
        {
          value: parenteral.carbs_g,
          kcal: parenteral.carbs_kcal,
          kcalKg: parenteral.carbs_kcal_kg
        }
      ],
      [
        {
          text: 'Protein'
        },
        {
          value: enteral.protein_g,
          kcal: enteral.protein_kcal,
          kcalKg: enteral.protein_kcal_kg
        },
        {
          value: parenteral.protein_g,
          kcal: parenteral.protein_kcal,
          kcalKg: parenteral.protein_kcal
        }
      ],
      [
        {
          text: 'Lipids'
        },
        {
          value: enteral.lipids_g,
          kcal: enteral.lipids_kcal,
          kcalKg: enteral.lipids_kcal_kg
        },
        {
          value: parenteral.lipids_g,
          kcal: parenteral.lipids_kcal,
          kcalKg: parenteral.lipids_kcal_kg
        },
        {
          value: propofol.lipids_g,
          kcal: propofol.kcal,
          kcalKg: propofol.kcal_kg
        }
      ]
    ];

    this.anthropometrics = summary.anthropometrics;
  }

  ngOnInit() {}
}
