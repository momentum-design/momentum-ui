import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-time-picker-dropdown',
  template: `
    <div class='cui-timepicker__dropdown'>
      <div class="inline-flex">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  host: {
    class: 'cui-timepicker__dropdown-container'
  }
})
export class TimePickerDropdownComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
