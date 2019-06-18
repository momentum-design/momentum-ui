import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormModule, InputModule } from '@momentum-ui/angular';
import { ExampleFormSectionComponent, ExampleFormSubSectionComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    InputModule,
  ],
  declarations: [ExampleFormSectionComponent, ExampleFormSubSectionComponent],
  exports: [ExampleFormSectionComponent, ExampleFormSubSectionComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormExamplesModule {}
