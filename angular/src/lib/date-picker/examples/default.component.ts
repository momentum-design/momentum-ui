import { Component, ViewChild, ElementRef } from '@angular/core';
import { DatePickerComponent } from '../date-picker.component';

@Component({
  selector: 'example-date-picker-default',
  template: `
    <p class='marginLeft' #dateTitle>Date</p>
    <md-date-picker #datepicker
      [ngClass]="{'custom': true}"
      className='High'
      [backdropClickExit]='true'
      (whenChange)='whenChange($event)'
      (whenMonthChange)='whenMonthChange($event)'
      (whenSelect)='whenSelect($event)'
    >
      <button class='marginLeft' (click)='switchDatePicker()'>Select</button>
    </md-date-picker>
  `,
  styles: [
    '.marginLeft{margin-left:300px;}'
  ]
})
export class ExampleDatePickerDefaultComponent {

  @ViewChild('datepicker') datePickerComponent: DatePickerComponent;
  @ViewChild('dateTitle') dateTitle: ElementRef;

  constructor() {

  }

  private isShow = true;

  public switchDatePicker(e) {
    this.datePickerComponent.show();
  }

  public whenChange = (e) => {
    // console.log('whenChange', e);
  }
  public whenMonthChange = (e) => {
    // console.log('whenMonthChange', e);
  }
  public whenSelect = (e) => {
    this.dateTitle.nativeElement.innerHTML = e;
    // console.log('whenSelect', e);
  }

}
