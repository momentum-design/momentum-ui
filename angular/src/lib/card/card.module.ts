import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardSectionComponent } from './card-section.component';


@NgModule({
  declarations: [CardComponent, CardSectionComponent ],
  imports: [
    CommonModule
  ],
  exports: [CardComponent, CardSectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CardModule,
      providers: [],
    };
  }
 }
