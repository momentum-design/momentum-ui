import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from '@momentum-ui/angular';
import {
  AccordionDefaultComponent,
  AccordionMultiOpenComponent,
  AccordionPreSelectedOpenComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
  ],
  declarations: [
    AccordionDefaultComponent,
    AccordionMultiOpenComponent,
    AccordionPreSelectedOpenComponent
  ],
  exports: [
    AccordionDefaultComponent,
    AccordionMultiOpenComponent,
    AccordionPreSelectedOpenComponent
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AccordionExamplesModule { }
