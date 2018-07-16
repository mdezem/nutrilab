import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BMIPageComponent } from './bmipage/bmipage.component';
import { NrsComponent } from './nrs/nrs.component';
import { EnergyEquationsComponent } from './energy-equations/energy-equations.component';
import { FormulasComponent } from './formulas/formulas.component';
import { EnteralParenteralSummaryComponent } from './enteral-parenteral-summary/enteral-parenteral-summary.component';
import { AnthropometricsPageComponent } from './anthropometrics-page/anthropometrics-page.component';
import { FormulaEditFormComponent } from './formulas/edit-form/edit-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'bmi',
    component: BMIPageComponent
  },
  {
    path: 'anthropometrics',
    component: AnthropometricsPageComponent
  },
  {
    path: 'nrs',
    component: NrsComponent
  },
  {
    path: 'energy-equations',
    component: EnergyEquationsComponent
  },
  {
    path: 'formulas/:type',
    component: FormulasComponent
  },
  {
    path: 'formula/edit',
    component: FormulaEditFormComponent
  },
  {
    path: 'ep-nutrition-summary',
    component: EnteralParenteralSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
