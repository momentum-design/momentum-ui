import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import * as moment_ from 'moment';
import { DatePickerService } from './date-picker.service';
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  HorizontalConnectionPos,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
const moment = moment_;

@Component({
  selector: 'cui-date-picker',
  template: `
    <div #connectToButton>
      <ng-content></ng-content>
    </div>
    <ng-template #tempDatepicker>
      <div class='cui-event-overlay'>
        <div class='cui-event-overlay__children'>
          <cui-date-picker-calendar></cui-date-picker-calendar>
        </div>
      </div>
    </ng-template>
  `,
  host: {
    class: 'cui-datepicker-container'
  },
  providers: [DatePickerService]
})
export class DatePickerComponent implements OnInit {

  /** @prop Optional css class string | '' */
  @Input() set className(value: string) {
    this.elementRef.nativeElement.classList.add(value);
  }
  /** @prop Set the direction in which the DatePicker opens | 'bottom-center' */
  @Input() public direction: string = 'bottom-center';
  /** @prop Sets the language of the DatePicker | 'en' */
  @Input() public locale: string = 'en';
  /** @prop Sets the last date in which the DatePicker does not disable | null */
  @Input() public maxDate: any;
  /** @prop Sets the first date in which the DatePicker does not disable | null */
  @Input() public minDate: any;
  /** @prop Function to filter Dates | null */
  @Input() public filterDate: Function;
  /** @prop Sets the format of the month | 'MMMM YYYY' */
  @Input() public monthFormat: string = 'MMMM YYYY';
  /** @prop Text to display for blindness accessibility features | 'next' */
  @Input() public nextArialLabel: string = 'next';
  /** @prop Text to display for blindness accessibility features | 'previous' */
  @Input() public previousArialLabel: string = 'previous';
  /** @prop Initial Selected Date for DatePicker | moment().toDate()  */
  @Input() public selectedDate: any = moment();
  /** @prop Determines if the DatePicker should close when a date is selected | true */
  @Input() public shouldCloseOnSelect: boolean = true;
  /** @prop Determines if the DatePicker should show the open/close arrow | false */
  @Input() public showArrow: boolean = false;
  /** @prop To enable/disable clicking on underlay to exit modal | false */
  @Input() public backdropClickExit: boolean = false;

  /** @prop Optional overlay positioin | '' */
  @Input() public originX: HorizontalConnectionPos = 'end';
  /** @prop Optional overlay positioin | '' */
  @Input() public originY: VerticalConnectionPos = 'top';
  /** @prop Optional overlay positioin | '' */
  @Input() public overlayX: HorizontalConnectionPos = 'start';
  /** @prop Optional overlay positioin | '' */
  @Input() public overlayY: VerticalConnectionPos = 'bottom';

  /** @prop Handler invoked when user makes a change within the DatePicker | null */
  @Output() public whenChange = new EventEmitter();
  /** @prop Handler invoked when user makes a change to the selected month within DatePicker | null */
  @Output() public whenMonthChange = new EventEmitter();
  /** @prop Handler invoked when user selects a date within DatePicker | null */
  @Output() public whenSelect = new EventEmitter();

  @ViewChild('tempDatepicker') tempDatepicker: TemplateRef<any>;
  @ViewChild('connectToButton') connectToButton: any;

  private overlayRef: OverlayRef;
  private tp: TemplatePortal;

  constructor(
    private datePickerService: DatePickerService,
    private overlay: Overlay,
    private elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef
  ) {
    const s = this.datePickerService;
    s.initConfig({
      locale: this.locale,
      maxDate: this.maxDate,
      minDate: this.minDate,
      monthFormat: this.monthFormat,
      nextArialLabel: this.nextArialLabel,
      previousArialLabel: this.previousArialLabel,
      filterDate: this.filterDate
    });

    s.selected$.subscribe(date => {
      this.selectedDate = date;
      this.whenSelect.emit(date);
    });

    s.viewMonthChange$.subscribe(date => {
      this.whenMonthChange.emit(date);
    });

    s.focused$.subscribe(date => {
      this.whenChange.emit(date);
    });

  }

  ngOnInit() {

    const strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.connectToButton)
      .withPositions([
        { originX: this.originX,
          originY: this.originY,
          overlayX: this.overlayX, overlayY: this.overlayY
        }
      ]);

    const config = new OverlayConfig({
      hasBackdrop: true,
      panelClass: 'cui-datepicker-container',
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: strategy
    });
    this.overlayRef = this.overlay.create(config);
    this.tp = new TemplatePortal(this.tempDatepicker, this.viewContainerRef);

    this.overlayRef.keydownEvents().subscribe((e) => {
      this.onPress(e);
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.dismiss();
    });

    this.datePickerService.isShowDatepicker$.subscribe(isOpen => {
      if (isOpen) {
        this.showContent();
      } else {
        this.dismissContent();
      }
    });
  }

  public show = () => {
    this.datePickerService.setOpenStatus(true);
  }

  public dismiss = () => {
    this.datePickerService.setOpenStatus(false);
  }

  private showContent = () => {
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.tp);
      this.datePickerService.select(this.selectedDate);
    }
  }

  private dismissContent = () => {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayRef.backdropElement.remove();
    }
  }

  public onPress = (e) => {
    const key = e.keyCode,
      s = this.datePickerService;
    let flag = false;
    switch (key) {
      case 32:
      case 13:
        s.select(s.focusedDate);
        this.dismiss();
        flag = true;
        break;
      // up
      case 38:
        s.focus(s.focusedDate, -7);
        flag = true;
        break;
      // left
      case 37:
        s.focus(s.focusedDate, -1);
        flag = true;
        break;
      // right
      case 39:
        s.focus(s.focusedDate, 1);
        flag = true;
        break;
      // bottom
      case 40:
        s.focus(s.focusedDate, 7);
        flag = true;
        break;
      default:
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  }

}

/**
 * @component cui-date-picker
 * @section backdropClickExit
 * @angular
 *
<cui-date-picker #datepicker [backdropClickExit]='true' (whenSelect)='whenSelect($event)'>
  <button class='marginLeft' (click)='switchDatePicker()'>Select</button>
</cui-date-picker>
 */
