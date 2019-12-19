import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperDefaultComponent } from './stepper-default.component';
import { StepperModule, InputModule, CheckboxGroupModule, CheckboxModule, RadioGroupModule, RadioModule, ToggleSwitchModule, SliderModule } from '@momentum-ui/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StepperDefaultComponent],
  imports: [
    CommonModule,
    StepperModule,
    ReactiveFormsModule,
    FormsModule,
    InputModule,
    CheckboxGroupModule,
    CheckboxModule,
    RadioGroupModule,
    RadioModule,
    ToggleSwitchModule,
    SliderModule
  ],
  exports: [StepperDefaultComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepperExamplesModule { }
