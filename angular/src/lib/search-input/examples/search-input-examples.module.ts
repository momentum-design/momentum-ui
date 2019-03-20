import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputDefaultComponent } from './search-input-default.component';
import { SearchInputPillComponent } from './search-input-pill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchInputModule } from '../search-input.module';

@NgModule({
  imports: [
    CommonModule,
    SearchInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchInputDefaultComponent,
    SearchInputPillComponent
  ],
  exports: [
    SearchInputDefaultComponent,
    SearchInputPillComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SearchInputExamplesModule { }
