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
  MatStepperModule
} from '@angular/material';

import { NutrEquationsService } from './nutr-equations.service';
import { FormulasService } from './formulas.service';
import { BMIPageComponent } from './bmipage/bmipage.component';
import { PageComponent } from './page/page.component';
import { PageElementsDirective } from './page/elements.directive';
import { NrsComponent } from './nrs/nrs.component';
import { EnergyEquationsComponent } from './energy-equations/energy-equations.component';
import { FormulasComponent } from './formulas/formulas.component';
import { EnteralCalcComponent } from './enteral-calc/enteral-calc.component';
import { EnteralParenteralSummaryComponent } from './enteral-parenteral-summary/enteral-parenteral-summary.component';
import { PatientInfoFormComponent } from './patient-info-form/patient-info-form.component';
import { SectionCardComponent } from './section-card/section-card.component';
import { NumberFieldComponent } from './number-field/number-field.component';
import { FormulaInfoFormComponent } from './formula-info-form/formula-info-form.component';

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
  MatStepperModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BMIPageComponent,
    PageComponent,
    PageElementsDirective,
    NrsComponent,
    EnergyEquationsComponent,
    FormulasComponent,
    EnteralCalcComponent,
    EnteralParenteralSummaryComponent,
    PatientInfoFormComponent,
    SectionCardComponent,
    NumberFieldComponent,
    FormulaInfoFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ...matModules
  ],
  providers: [FormulasService, NutrEquationsService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
