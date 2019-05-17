import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent, AccordionTabComponent } from '../accordion/accordion.component';
import { AccordionService } from './accordion.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AccordionComponent, AccordionTabComponent],
  exports: [AccordionComponent, AccordionTabComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [AccordionService],
})
export class AccordionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AccordionModule,
      providers: [],
    };
  }
}
