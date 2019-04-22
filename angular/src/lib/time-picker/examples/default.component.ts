import { Component } from '@angular/core';
import { TimePickerComponent } from '../time-picker.component';

@Component({
  selector: 'example-time-picker-default',
  template: `
    <div class='marginLeft timePicker-container'>
      <md-time-picker [militaryTime]='true'></md-time-picker>
      <hr>
      <md-time-picker></md-time-picker>
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
