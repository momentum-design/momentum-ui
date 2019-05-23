import { Component, ViewChild, ElementRef } from '@angular/core';
import { DateRangePickerComponent } from '@momentum-ui/angular';

@Component({
  selector: 'example-date-range-picker-default',
  template: `
    <p class='marginLeft' #dateTitle>Date</p>
    <md-date-range-picker #datepicker
      [ngClass]="{'custom': true}"
      className='High'
      [backdropClickExit]='true'
      (whenFocusChange)='whenFocusChange($event)'
      (whenMonthChange)='whenMonthChange($event)'
      (whenSelectChange)='whenSelectChange($event)'
    >
      <button class='marginLeft' (click)='switchDatePicker()'>Select</button>
    </md-date-range-picker>
  `,
  styles: [
    '.marginLeft{margin-left:300px;}'
  ]
})
export class DateRangePickerDefaultComponent {

  @ViewChild('datepicker') dateRange: DateRangePickerComponent;
  @ViewChild('dateTitle') dateTitle: ElementRef;

  constructor() {

  }

  public switchDatePicker() {
    this.dateRange.show();
  }

  public whenFocusChange = (e) => {
    // console.info('whenChange', e);
  }
  public whenMonthChange = (e) => {
    // console.info('whenMonthChange', e);
  }
  public whenSelectChange = (e) => {
    this.dateTitle.nativeElement.innerHTML = e.str;
    // console.info('whenSelect', e);
  }

}
