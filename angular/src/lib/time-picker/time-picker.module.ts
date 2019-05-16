import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePickerComponent } from './time-picker.component';
import { TimePickerDropdownModule } from './time-picker-dropdown.module';
import { TimeSelectorModule } from './time-selector.module';


@NgModule({
  declarations: [TimePickerComponent],
  imports: [
    CommonModule,
    TimePickerDropdownModule,
    TimeSelectorModule
  ],
  exports: [TimePickerComponent]
})
export class TimePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimePickerModule,
      providers: [],
    };
  }
}
