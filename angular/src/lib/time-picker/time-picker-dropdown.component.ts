import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'md-time-picker-dropdown',
  template: `
    <div class='md-timepicker__dropdown'>
      <div class="inline-flex">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  host: {
    class: 'md-timepicker__dropdown-container'
  }
})
export class TimePickerDropdownComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
