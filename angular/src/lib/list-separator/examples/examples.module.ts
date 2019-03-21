import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSeparatorModule } from '@collab-ui/angular';
import {
  ExampleListSeparatorDefaultComponent,
} from './index';

@NgModule({
  imports: [
    CommonModule,
    ListSeparatorModule,
  ],
  declarations: [ExampleListSeparatorDefaultComponent],
  exports: [ExampleListSeparatorDefaultComponent],
})
export class ListSeparatorExamplesModule { }
