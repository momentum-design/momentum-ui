import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ModalBodyModule,
  ModalFooterModule,
  ModalHeaderModule,
  ModalModule
} from '@momentum-ui/angular';
import { ExampleModalDefaultComponent } from './index';


@NgModule({
  declarations: [ExampleModalDefaultComponent],
  exports: [ExampleModalDefaultComponent],
  imports: [
    ModalBodyModule,
    ModalFooterModule,
    ModalHeaderModule,
    ModalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalExamplesModule { }
