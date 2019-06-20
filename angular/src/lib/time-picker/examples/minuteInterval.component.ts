import { Component, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { TimePickerComponent } from '@momentum-ui/angular';

@Component({
  selector: 'example-time-picker-minuteInterval',
  template: `
    <div class='marginLeft timePicker-container'>
      <md-time-picker #mypicker [minuteInterval]='30' (whenChange)='onChange($event)'></md-time-picker>
    </div>
  `,
  styles: [
    '.marginLeft{margin-left:300px;}'
  ]
})
export class ExampleTimePickerMinuteIntervalComponent {

  @ViewChild('mypicker') mypicker: TimePickerComponent;

  constructor() {

  }

  onChange = (e) => {
    // console.log(e);
  }


}
