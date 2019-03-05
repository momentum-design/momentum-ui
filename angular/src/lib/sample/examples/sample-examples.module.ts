import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleDefaultComponent } from './sample-default.component';

@NgModule({
  declarations: [SampleDefaultComponent],
  imports: [
    CommonModule
  ],
  exports: [SampleDefaultComponent]
})
export class SampleExamplesModule { }
