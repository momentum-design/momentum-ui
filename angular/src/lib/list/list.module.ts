import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ListComponent],
  exports: [ListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ListModule,
      providers: [],
    };
  }
}
