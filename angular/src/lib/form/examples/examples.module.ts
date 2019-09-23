import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormModule,
  InputContainerModule,
  InputModule,
} from '@momentum-ui/angular';
import {
  ExampleFormSectionComponent,
  ExampleFormSubSectionComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    FormsModule,
    InputContainerModule,
    InputModule,
    ReactiveFormsModule,
  ],
  declarations: [ExampleFormSectionComponent, ExampleFormSubSectionComponent],
  exports: [ExampleFormSectionComponent, ExampleFormSubSectionComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class FormExamplesModule {}
