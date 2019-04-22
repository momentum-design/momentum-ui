import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TimePickerService, UnitType } from './time-picker.service';

@Component({
  selector: 'md-time-selector',
  template: `
    <i class='icon icon-arrow-up_24 arrow' (click)='onUpClick()' role="button"></i>
    <input [type]='type'
    minLength=2
    maxLength=2
    tabIndex=0
    [value]='value'
    (change)='onChange($event)'
    (wheel)='onWheel($event)'
    (blur)='onBlur()'
    (keydown)='onKeydown($event)'
    #selectInput />
    <i class='icon icon-arrow-down_24 arrow' (click)='onDownClick()' role="button"></i>
  `,
  styles: [
    ':host{display: flex; flex-flow: column; padding-right: 0.4375rem; padding-left: 0.4375rem;}',
    ':host *{ width: 3rem !important; display: inline-block !important;}',
    '.arrow { line-height: 2.25rem !important; }'
  ]
})
export class TimeSelectorComponent implements OnInit {

  private regNumOnly = /^\d$/;

  /** @prop Set the type for the Input element | 'text' */
  @Input() type: string = 'text';
  /** @prop Set the unit of time | '' */
  @Input() unit: UnitType = 'm';
  /** @prop Set the value of the Input element | '' */
  @Input() value: string = '00';

  @ViewChild('selectInput') selectInput: ElementRef;

  constructor(
    private timePickerService: TimePickerService
  ) {
  }

  ngOnInit() {
    this.timePickerService.selected$.subscribe(v => {
      this.updateText();
    });
    this.updateText();
  }

  updateText = () => {
    this.value = this.timePickerService.getUnitText(this.unit);
  }

  updateValue = () => {
    const el = this.selectInput.nativeElement,
      s = this.timePickerService;
    let newValue = el.value;
    if (s.validTime(this.unit, newValue)) {
      const numValue = parseInt(newValue, 10);
      if (this.unit === 'h') {
        const maxHour = s.militaryTime ? 23 : 12;
        if (numValue > maxHour) {
          newValue = maxHour;
          el.value = newValue;
        } else {
          newValue = numValue;
        }
      } else if (this.unit === 'm') {
        if (numValue > 59) {
          newValue = 59;
          el.value = newValue;
        } else {
          newValue = numValue;
        }
      }
      s.setTimeByUnit(this.unit, newValue);
    } else if (s.validPre(this.unit, newValue)) {
      newValue = newValue.toUpperCase();
      s.setTimeByUnit(this.unit, newValue);
    } else {
      return false;
    }
    return true;
  }

  updatePre = (v) => {
    if (this.unit === 'pre') {
      this.timePickerService.setTimeByUnit(this.unit, v);
    }
  }

  onUpClick = () => {
    this.timePickerService.changeTimeByInterval(this.unit, 1);
  }

  onDownClick = () => {
    this.timePickerService.changeTimeByInterval(this.unit, -1);
  }

  onChange = (e) => {
    if (!this.updateValue()) {
      e.stopPropagation();
      return false;
    }
  }

  onWheel = (e) => {
    if (e.deltaY < 0) {
      this.timePickerService.changeTimeByInterval(this.unit, 1);
    } else if (e.deltaY > 0) {
      this.timePickerService.changeTimeByInterval(this.unit, -1);
    }
    e.preventDefault();
  }

  onBlur = () => {
    if (!this.updateValue()) {
      this.selectInput.nativeElement.value = this.value;
    }
  }

  onKeydown = (e) => {
    let stopFlag = false,
      preventFlay = !this.regNumOnly.test(e.key);

    switch (e.keyCode) {
      case 38:
        this.onUpClick();
        stopFlag = true;
        break;
      case 40:
        this.onDownClick();
        stopFlag = true;
        break;
      case 65:
        this.updatePre('AM');
        stopFlag = true;
        break;
      case 80:
        this.updatePre('PM');
        stopFlag = true;
        break;
      // detele
      case 8:
      case 46:
        this.selectInput.nativeElement.value = '';
        preventFlay = false;
        break;
      // tab enter
      case 9:
      case 108:
      case 13:
        preventFlay = false;
        break;
      default:
        break;
    }
    if (stopFlag) {
      e.stopPropagation();
    }
    if (preventFlay) {
      e.preventDefault();
    }
  }

}
