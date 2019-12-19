import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper.component';

@NgModule({
  declarations: [StepperComponent],
  imports: [
    CommonModule
  ],
  exports: [StepperComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class StepperModule { }
