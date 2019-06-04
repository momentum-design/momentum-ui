import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { InputModule } from '../input/input.module';
import { LabelModule } from '../label/label.module';

@NgModule({
  declarations: [SearchInputComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IconModule,
    InputModule,
    LabelModule,
  ],
  exports: [SearchInputComponent],
})
export class SearchInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SearchInputModule,
      providers: [],
    };
  }
}
