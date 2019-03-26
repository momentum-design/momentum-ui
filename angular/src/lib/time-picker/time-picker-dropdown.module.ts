import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePickerDropdownComponent } from './time-picker-dropdown.component';

@NgModule({
  declarations: [TimePickerDropdownComponent],
  imports: [
    CommonModule
  ],
  exports: [TimePickerDropdownComponent]
})
export class TimePickerDropdownModule { }
