import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule, ListItemModule } from '@collab-ui/angular';
import { ExampleSelectDefaultComponent } from './select-default.component';
import { ExampleSelectMultiComponent } from './select-multi.component';
import { ExampleSelectNgModelComponent } from './select-ngModel.component';
import { ExampleSelectNgModelMultiComponent } from './select-ngModel-multi.component';

@NgModule({
  declarations: [
    ExampleSelectDefaultComponent,
    ExampleSelectMultiComponent,
    ExampleSelectNgModelComponent,
    ExampleSelectNgModelMultiComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    ListItemModule
  ],
  exports: [
    ExampleSelectDefaultComponent,
    ExampleSelectMultiComponent,
    ExampleSelectNgModelComponent,
    ExampleSelectNgModelMultiComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectExamplesModule { }
