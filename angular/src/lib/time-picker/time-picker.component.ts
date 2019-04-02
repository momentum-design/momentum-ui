import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { TimePickerService, MinuteIntervalType } from './time-picker.service';
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  HorizontalConnectionPos,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'cui-time-picker',
  template: `
    <div class='cui-input-group  read-only' #connectToInput>
      <input class="cui-input read-only dirty"
      tabindex="0"
      type="text"
      name="cui-timepicker__input-407"
      readonly=""
      (focus) = 'onFocus()'
      [value]="value">
    </div>
    <ng-template #timePickerCon>
      <cui-time-picker-dropdown>
        <cui-time-selector unit='h'></cui-time-selector>:
        <cui-time-selector unit='m'></cui-time-selector>
        <cui-time-selector unit='pre' *ngIf='!militaryTime'></cui-time-selector>
      </cui-time-picker-dropdown>
    </ng-template>
  `,
  host: {
    class: 'cui-timepicker-container'
  },
  providers: [TimePickerService]
})
export class TimePickerComponent implements OnInit {

  private overlayRef: OverlayRef;
  private tp: TemplatePortal;

  /** @prop Set the value of the Input element | '' */
  @Input() value: string = '';
  /** @prop Optional css class string | '' */
  @Input() set className(value: string) {
    this.elementRef.nativeElement.classList.add(value);
  }
  /** @prop Choose to use military time | false */
  @Input() militaryTime: boolean = false;
  /** @prop Determine the minute interval | 1 */
  @Input() minuteInterval: MinuteIntervalType = 1;
  /** @prop Set the initial selected time | null */
  @Input() selectedTime: any;
  /** @prop Optional overlay positioin | '' */
  @Input() public originX: HorizontalConnectionPos = 'start';
  /** @prop Optional overlay positioin | '' */
  @Input() public originY: VerticalConnectionPos = 'bottom';
  /** @prop Optional overlay positioin | '' */
  @Input() public overlayX: HorizontalConnectionPos = 'start';
  /** @prop Optional overlay positioin | '' */
  @Input() public overlayY: VerticalConnectionPos = 'top';
  /** @prop Callback function invoked when user makes a change | null */
  @Output() whenChange = new EventEmitter();

  @ViewChild('timePickerCon') timePickerCon: TemplateRef<any>;
  @ViewChild('connectToInput') connectToInput: ElementRef;

  constructor(
    public timePickerService: TimePickerService,
    private overlay: Overlay,
    private elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef) {

  }

  ngOnInit() {
    const ts = this.timePickerService;
    ts.setMilitary(this.militaryTime);
    ts.setMinuteInterval(this.minuteInterval);
    ts.selected$.subscribe(v => {
      this.value = ts.getTimeString();
      this.whenChange.emit(v);
    });
    ts.initTime(this.selectedTime);

    const strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.connectToInput)
      .withPositions([
        {
          originX: this.originX,
          originY: this.originY,
          overlayX: this.overlayX, overlayY: this.overlayY
        }
      ]);
    const config = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['cui-datepicker-container', 'cui-timepicker-container'],
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: strategy
    });
    this.overlayRef = this.overlay.create(config);
    this.tp = new TemplatePortal(this.timePickerCon, this.viewContainerRef);

    this.timePickerService.isShow$.subscribe(isOpen => {
      if (isOpen) {
        this.showContent();
      } else {
        this.dismissContent();
      }
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.dismiss();
    });

    this.dismiss();

  }

  public onFocus = () => {
    this.show();
  }

  public show = () => {
    this.timePickerService.show(true);
  }

  public dismiss = () => {
    this.timePickerService.show(false);
  }

  private showContent = () => {
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.tp);
    }
  }

  private dismissContent = () => {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayRef.backdropElement.remove();
    }
  }

}

/**
 * @component time-picker
 * @section className
 * @angular
 *
    <cui-date-picker #datepicker
      className='High'
      [backdropClickExit]='true'
      (whenChange)='whenChange($event)'
      (whenMonthChange)='whenMonthChange($event)'
      (whenSelect)='whenSelect($event)'
    >
      <button (click)='switchDatePicker()'>Select</button>
    </cui-date-picker>
 */
