import { Component, ViewChild , ElementRef, HostBinding } from '@angular/core';
import { DatePickerComponent } from '../date-picker.component';

@Component({
  selector: 'example-date-picker-default',
  template: `
    <p class='marginLeft' #dateTitle>Date</p>
    <cui-date-picker #datepicker [backdropClickExit]='true' (whenChange)='whenChange($event)' (whenMonthChange)='whenMonthChange($event)' (whenSelect)='whenSelect($event)'>
      <button class='marginLeft' (click)='switchDatePicker()'>Select</button>
    </cui-date-picker>
  `,
  styles:[
    '.marginLeft{margin-left:300px;}'
  ]
})
export class ExampleDatePickerDefaultComponent {

  @ViewChild('datepicker') datePickerComponent:DatePickerComponent;
  @ViewChild('dateTitle') dateTitle:ElementRef;

  constructor(){

  }

  private isShow = true;

  public switchDatePicker(e){
    this.datePickerComponent.show();
  }

  public whenChange = (e)=>{
    console.log('whenChange',e);
  }
  public whenMonthChange = (e)=>{
    console.log('whenMonthChange',e);
  }
  public whenSelect = (e)=>{
    this.dateTitle.nativeElement.innerHTML= e;
    console.log('whenSelect',e);
  }

}
