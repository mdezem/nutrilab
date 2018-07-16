import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatStepperModule,
  MatExpansionModule,
  MatTableModule
} from '@angular/material';

import { NutrEquationsService } from './nutr-equations.service';
import { FormulasService } from './formulas.service';
import { BMIPageComponent } from './bmipage/bmipage.component';
import { PageComponent } from './page/page.component';
import { NrsComponent } from './nrs/nrs.component';
import { EnergyEquationsComponent } from './energy-equations/energy-equations.component';
import { FormulasComponent } from './formulas/formulas.component';
import { EnteralCalcComponent } from './enteral-calc/enteral-calc.component';
import { EnteralParenteralSummaryComponent } from './enteral-parenteral-summary/enteral-parenteral-summary.component';
import { PatientInfoFormComponent } from './patient-info-form/patient-info-form.component';
import { SectionCardComponent } from './section-card/section-card.component';
import { NumberFieldComponent } from './number-field/number-field.component';
import { FormulaInfoFormComponent } from './formula-info-form/formula-info-form.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormulaVolumeFormComponent } from './formula-volume-form/formula-volume-form.component';

import { ChartsModule } from 'ng2-charts';
import { NutritionalTableComponent } from './nutritional-table/nutritional-table.component';
import { AnthropometricsInfoViewComponent } from './anthropometrics-info-view/anthropometrics-info-view.component';
import { AnthropometricsPageComponent } from './anthropometrics-page/anthropometrics-page.component';
import { FormulaEditFormComponent } from './formulas/edit-form/edit-form.component';


const matModules = [
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatStepperModule,
  MatExpansionModule,
  MatTableModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BMIPageComponent,
    PageComponent,
    NrsComponent,
    EnergyEquationsComponent,
    FormulasComponent,
    EnteralCalcComponent,
    EnteralParenteralSummaryComponent,
    PatientInfoFormComponent,
    SectionCardComponent,
    NumberFieldComponent,
    FormulaInfoFormComponent,
    FormulaVolumeFormComponent,
    NutritionalTableComponent,
    AnthropometricsInfoViewComponent,
    AnthropometricsPageComponent,
    FormulaEditFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    ...matModules,
    ServiceWorkerModule.register('/nutrilab/ngsw-worker.js', {
      enabled: environment.production,
      scope: '/nutrilab/'
    })
  ],
  providers: [FormulasService, NutrEquationsService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
