import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { FormComponent } from './form.component';
import { FormContentComponent } from './form-content.component';
import { FormInfoComponent } from './form-info.component';
import { FormSectionComponent } from './form-section.component';
import { FormSubSectionComponent } from './form-subsection.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FormComponent,
    FormContentComponent,
    FormInfoComponent,
    FormSectionComponent,
    FormSubSectionComponent,
  ],
  exports: [
    FormComponent,
    FormContentComponent,
    FormInfoComponent,
    FormSectionComponent,
    FormSubSectionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormModule,
      providers: [],
    };
  }
}
