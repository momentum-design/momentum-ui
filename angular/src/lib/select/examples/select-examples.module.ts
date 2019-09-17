import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemModule, CheckboxModule } from '@momentum-ui/angular';
import { SelectDefaultComponent } from './select-default.component';
import { SelectMultiComponent } from './select-multi.component';
import { SelectFilterComponent } from './select-filter.component';
import { SelectMultiFilterComponent } from './select-multi-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '../select.module';
import { SelectFormComponent } from './select-forms.component';

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    ListItemModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SelectDefaultComponent,
    SelectMultiComponent,
    SelectFilterComponent,
    SelectFilterComponent,
    SelectMultiFilterComponent,
    SelectFormComponent
  ],
  exports: [
    SelectDefaultComponent,
    SelectMultiComponent,
    SelectFilterComponent,
    SelectFilterComponent,
    SelectMultiFilterComponent,
    SelectFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectExamplesModule { }
