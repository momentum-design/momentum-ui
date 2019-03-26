import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'cui-time-picker-dropdown',
  template: `
    <div class='cui-timepicker__dropdown'>
      <div class="inline-flex">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: []
})
export class TimePickerDropdownComponent implements OnInit {

  @HostBinding('class') classes = 'cui-timepicker__dropdown-container';

  constructor() { }

  ngOnInit() {
  }

}
