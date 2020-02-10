import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleStepperKitchenSinkComponent } from './stepper-default.component';
import { StepperModule, InputModule, CheckboxGroupModule, CheckboxModule, RadioGroupModule, RadioModule, ToggleSwitchModule, SliderModule } from '@momentum-ui/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExampleStepperKitchenSinkComponent],
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
  exports: [ExampleStepperKitchenSinkComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StepperExamplesModule { }
