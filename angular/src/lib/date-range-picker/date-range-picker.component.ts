import { Component, OnInit, Input, ElementRef, ViewContainerRef, ViewChild, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DateRangeInputComponent } from './date-range-input.component';
import { DatePickerService } from '../date-picker/date-picker.service';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW, } from '@angular/cdk/keycodes';
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  HorizontalConnectionPos,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
let moment = require('moment');
if ('default' in moment) {
  moment = moment['default'];
}
@Component({
  selector: 'md-date-range-picker',
  template: `
    <div #connectToButton>
      <ng-content></ng-content>
    </div>
    <ng-template #tempDatepicker>
      <div class='md-event-overlay'>
        <div class='md-event-overlay__children  md-date-picker md-date-range-picker'>
          <md-date-picker-calendar></md-date-picker-calendar>
          <div class='md-data-range-picker-button-group'>
          <md-date-range-input #inputStartDate
            labelValue='Start Date'
            placeholder ='Start Date'
            [selectDate]='startDate'
            (whenSelect)='targetChange(true)'
            (whenClear) = 'clearStartDate()'
          ></md-date-range-input>
          <md-date-range-input #inputEndDate
            labelValue='End Date'
            placeholder ='End Date'
            ObserverPrefix = 'end'
            [selectDate]='endDate'
            (whenSelect)='targetChange(false)'
            (whenClear) = 'clearEndDate()'
          ></md-date-range-input>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  host: {
    class: 'md-datepicker-container'
  },
  providers: [DatePickerService]
})
export class DateRangePickerComponent implements OnInit {

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
  /** @prop Initial start Date for DatePicker | moment().toDate()  */
  @Input() public startDate?: any;
  /** @prop Initial end Date for DatePicker | moment().toDate()  */
  @Input() public endDate?: any;
  /** @prop Determines if the DatePicker should close when a date is selected | true */
  @Input() public shouldCloseOnSelect: boolean = true;
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
  /** @prop To the format of the date | 'MMMM Do' */
  @Input() public dateFormat: string = 'MMMM Do';

  /** @prop Handler invoked when user makes a change within the DatePicker | null */
  @Output() public whenFocusChange = new EventEmitter();
  /** @prop Handler invoked when user makes a change to the selected month within DatePicker | null */
  @Output() public whenMonthChange = new EventEmitter();
  /** @prop Handler invoked when user selects a date within DateRangePicker | null */
  @Output() public whenSelectChange = new EventEmitter();

  @ViewChild('tempDatepicker') tempDatepicker: TemplateRef<any>;
  @ViewChild('connectToButton') connectToButton: any;
  @ViewChild('inputStartDate') inputStartDate: DateRangeInputComponent;
  @ViewChild('inputEndDate') inputEndDate: DateRangeInputComponent;

  private overlayRef: OverlayRef;
  private tp: TemplatePortal;

  constructor(
    private datePickerService: DatePickerService,
    private overlay: Overlay,
    private elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.initService();
    this.initOverLay();
  }

  private initService = () => {
    const s = this.datePickerService;
    s.initConfig({
      locale: this.locale,
      maxDate: this.maxDate,
      minDate: this.minDate,
      monthFormat: this.monthFormat,
      nextArialLabel: this.nextArialLabel,
      previousArialLabel: this.previousArialLabel,
      filterDate: this.filterDate,
      isRange: true
    });
    this.datePickerService.changeStartDate(this.startDate);
    this.datePickerService.changeEndDate(this.endDate);

    s.viewMonthChange$.subscribe(date => {
      this.whenMonthChange.emit(date);
    });

    s.focused$.subscribe(date => {
      this.whenFocusChange.emit(date);
    });

    s.startDate$.subscribe(date => {
      this.startDate = date;
      this.inputStartDate.selectDate = date;
      this.handleStartOrEndChange(date, true);
    });

    s.endDate$.subscribe(date => {
      this.endDate = date;
      this.inputEndDate.selectDate = date;
      this.handleStartOrEndChange(date, false);
    });
  }

  private initOverLay = () => {
    const strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.connectToButton)
      .withPositions([
        {
          originX: this.originX,
          originY: this.originY,
          overlayX: this.overlayX,
          overlayY: this.overlayY
        }
      ]);


    const config = new OverlayConfig({
      hasBackdrop: true,
      panelClass: 'md-datepicker-container',
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

  public targetChange = (ifStart) => {
    const s = this.datePickerService;
    s.changeTarget(ifStart);
    if (ifStart) {
      s.view(s.start || s.end || s.nowDate);
    } else {
      s.view(s.end || s.start || s.nowDate);
    }
  }

  public handleStartOrEndChange = (date, ifStart) => {
    if (date) {
      const s = this.datePickerService;
      if (this.shouldCloseOnSelect && s.hasFinishRange()) {
        this.dismiss();
        // select another
      } else {
        this.targetChange(!ifStart);
      }
      // date === undefined
    } else {
      this.targetChange(ifStart);
    }
    this.whenSelectChange.emit(this.getDateInfo());
  }

  public getDateInfo() {
    const s = this.datePickerService;
    const strStart = s.start ? s.start.format(this.dateFormat) : '',
      strEnd = s.end ? s.end.format(this.dateFormat) : '',
      str = (strEnd !== '' || strStart !== '') ? strStart + '-' + strEnd : '';

    return {
      startDate: s.start,
      endDate: s.end,
      startDateStr: strStart,
      strEndStr: strEnd,
      str: str
    };
  }

  public clearStartDate = () => {
    this.datePickerService.changeStartDate(undefined);
  }

  public clearEndDate = () => {
    this.datePickerService.changeEndDate(undefined);
  }

  public show = () => {
    this.datePickerService.setOpenStatus(true);
  }

  public dismiss = () => {
    this.datePickerService.setOpenStatus(false);
  }

  private showContent = () => {
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      const s = this.datePickerService;
      this.overlayRef.attach(this.tp);
      s.view(s.start || s.end || s.nowDate);
    }
  }

  private dismissContent = () => {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      if (this.overlayRef.backdropElement) {
        this.overlayRef.backdropElement.remove();
      }
    }
  }

  public onPressMove = (offset) => {
    const s = this.datePickerService,
      nextDay = s.getNewDayByOffset(s.focusedDate, offset);
    s.focus(nextDay);
    if (!s.isDayDisabled(nextDay)) {
      s.hover(nextDay);
    } else {
      s.hover(undefined);
    }
  }

  public onPress = (e) => {
    const key = e.keyCode,
      s = this.datePickerService;
    let flag = false;
    switch (key) {
      case SPACE:
      case ENTER:
        if (!s.hasFinishRange() && !s.isDayDisabled(s.focusedDate)) {
          s.select(s.focusedDate);
        }
        flag = true;
        break;
      // up
      case UP_ARROW:
        this.onPressMove(-7);
        flag = true;
        break;
      // left
      case LEFT_ARROW:
        this.onPressMove(-1);
        flag = true;
        break;
      // right
      case RIGHT_ARROW:
        this.onPressMove(1);
        flag = true;
        break;
      // bottom
      case DOWN_ARROW:
        this.onPressMove(7);
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
