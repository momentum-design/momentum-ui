import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from '@momentum-ui/angular';
import {
  AccordionDefaultComponent,
  AccordionMultiOpenComponent,
  AccordionPreSelectedComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
  ],
  declarations: [
    AccordionDefaultComponent,
    AccordionMultiOpenComponent,
    AccordionPreSelectedComponent
  ],
  exports: [
    AccordionDefaultComponent,
    AccordionMultiOpenComponent,
    AccordionPreSelectedComponent
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AccordionExamplesModule { }
