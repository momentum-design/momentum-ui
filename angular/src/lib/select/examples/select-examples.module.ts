import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule, ListItemModule } from '@collab-ui/angular';
import { ExampleSelectDefaultComponent, ExampleSelectMultiComponent  } from './index';


@NgModule({
  declarations: [
    ExampleSelectDefaultComponent,
    ExampleSelectMultiComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    ListItemModule
  ],
  exports: [
    ExampleSelectDefaultComponent,
    ExampleSelectMultiComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectExamplesModule { }
