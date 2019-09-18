import { BACKSPACE, DELETE, ENTER, SPACE, } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePickerService } from '../date-picker/date-picker.service';

@Component({
  selector: 'md-date-range-input',
  template: `
    <label class="md-label" for="dateRangeInput">{{labelValue}}</label>
    <div class="md-input__icon-container">
      <input type="text"
        #dateRangeInput
        class="md-input dirty"
        tabIndex="0"
        [value]="getValue()"
        id="dateRangeInput"
        name="dateRangeInput"
        [placeholder]="placeholder"
        (focus)='handleFocus($event)'
        (blur)='handleBlur($event)'
        (keydown)='onInputPress($event)'
        (mouseover)='handleMouseover()'
        (mouseout)='handleMouseout($event)'
        readonly />
      <button #closeBtn
        type="button"
        (focus)='stop($event)'
        (click)='clear($event)'
        style="display:none;"
        class="md-button md-button--36 md-button--icon"
        alt="clear input"
        type="button"
        tabIndex="-1">
        <span #closeSpan class="md-button__children">
          <i #closeI class="icon icon-clear-active_16"></i>
        </span>
      </button>
    </div>
  `,
  host: {
    class: 'md-input-container small-5 columns'
  }
})
export class DateRangeInputComponent implements OnInit {
  /** @prop the value of the label */
  @Input() public labelValue: string = '';
  /** @prop the select date */
  @Input() public selectDate?: any;
  /** @prop the value of the placeholder */
  @Input() public placeholder: string = '';
  /** @prop Handler invoked when clear the date | null */
  @Output() public whenClear = new EventEmitter();
  /** @prop Handler invoked when select the component | null */
  @Output() public whenSelect = new EventEmitter();
  /** @prop is used for start date or end date | 'start' */
  @Output() public ObserverPrefix: string = 'start';

  @ViewChild('dateRangeInput') dateRangeInput: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeSpan') closeSpan: ElementRef;
  @ViewChild('closeI') closeI: ElementRef;

  private isShowCloseBtn = false;

  constructor(private datePickerService: DatePickerService) {

  }

  ngOnInit() {
    this.datePickerService[this.ObserverPrefix + 'Date$'].subscribe(o => {
      if (!o) {
        this.hideCloseBtn();
      }
    });
  }

  public stop = (event) => {
    event.stopPropagation();
  }

  private isInnerDom = (dom) => {
    return dom === this.closeBtn.nativeElement || dom === this.closeSpan.nativeElement || dom === this.closeI.nativeElement;
  }

  public showCloseBtn = () => {
    if (!this.isShowCloseBtn && this.dateRangeInput.nativeElement.value !== '') {
      this.closeBtn.nativeElement.style.display = '';
      this.isShowCloseBtn = true;
    }
  }

  public hideCloseBtn = () => {
    if (this.isShowCloseBtn) {
      this.closeBtn.nativeElement.style.display = 'none';
      this.isShowCloseBtn = false;
    }
  }

  public handleMouseover = () => {
    this.showCloseBtn();
  }

  public handleMouseout = (event) => {
    if (!this.isInnerDom(event.relatedTarget)) {
      this.hideCloseBtn();
    }
  }

  public handleFocus = (event) => {
    this.whenSelect.emit();
    this.showCloseBtn();
    event.stopPropagation();
  }

  public handleBlur = (event) => {
    if (this.isInnerDom(event.relatedTarget)) {
      return;
    }
    this.hideCloseBtn();
    event.stopPropagation();
  }

  public clear = (event) => {
    this.whenClear.emit();
    this.dateRangeInput.nativeElement.value = '';
    event.stopPropagation();
  }

  public getValue = () => {
    return (this.selectDate && this.selectDate.format) ? this.selectDate.format('MMMM Do') : '';
  }

  public onInputPress = (e) => {
    const key = e.keyCode;
    switch (key) {
      case ENTER:
      case SPACE:
        this.handleFocus(e);
        break;
      case BACKSPACE:
      case DELETE:
        this.clear(e);
        break;
      default:
        break;
    }
  }

}
