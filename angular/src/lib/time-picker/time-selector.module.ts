import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSelectorComponent } from './time-selector.component';

@NgModule({
  declarations: [TimeSelectorComponent],
  imports: [
    CommonModule
  ],
  exports: [TimeSelectorComponent]
})
export class TimeSelectorModule { }
