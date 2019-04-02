import { Component } from '@angular/core';
import { TimePickerComponent } from '../time-picker.component';

@Component({
  selector: 'example-time-picker-default',
  template: `
    <div class='marginLeft timePicker-container'>
      <cui-time-picker [militaryTime]='true'></cui-time-picker>
      <hr>
      <cui-time-picker></cui-time-picker>
    </div>
  `,
  styles: [
    '.marginLeft{margin-left:300px;}'
  ]
})
export class ExampleTimePickerDefaultComponent {

  constructor() {

  }


}
