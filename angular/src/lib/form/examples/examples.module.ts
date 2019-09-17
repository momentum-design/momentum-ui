import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormModule,
  InputGroupModule,
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
    InputGroupModule,
    InputModule,
    ReactiveFormsModule,
  ],
  declarations: [ExampleFormSectionComponent, ExampleFormSubSectionComponent],
  exports: [ExampleFormSectionComponent, ExampleFormSubSectionComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class FormExamplesModule {}
