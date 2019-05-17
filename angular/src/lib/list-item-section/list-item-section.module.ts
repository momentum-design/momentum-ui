import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemSectionComponent } from './list-item-section.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ListItemSectionComponent],
  exports: [ListItemSectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListItemSectionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ListItemSectionModule,
      providers: [],
    };
  }
}
