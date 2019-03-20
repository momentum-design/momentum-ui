import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon';
import { InputModule } from '../input';
import { LabelModule } from '../label'

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
  exports: [SearchInputComponent]
})
export class SearchInputModule { }
