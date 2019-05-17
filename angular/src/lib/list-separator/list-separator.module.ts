import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSeparatorComponent } from './list-separator.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ListSeparatorComponent],
  exports: [ListSeparatorComponent],
})
export class ListSeparatorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ListSeparatorModule,
      providers: [],
    };
  }
}
