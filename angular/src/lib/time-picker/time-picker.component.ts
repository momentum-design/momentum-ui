import { Component, OnInit, HostBinding, Input, Output, EventEmitter, ViewContainerRef, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { TimePickerService, MinuteIntervalType } from './time-picker.service';
import {
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
export declare type HorizontalConnectionPos = 'start' | 'center' | 'end';
export declare type VerticalConnectionPos = 'top' | 'center' | 'bottom';

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
  styles: [],
  providers:[TimePickerService]
})
export class TimePickerComponent implements OnInit {

  private overlayRef: OverlayRef;
  private tp: TemplatePortal;

  /** @prop Set the value of the Input element | '' */
  @Input() value:string = '';
  /** @prop Optional CSS class name | '' */
  @Input() className:string = '';
  /** @prop Set Input element ID | '' */
  @Input() inputId:string ='';
  /** @prop Choose to use military time | false */
  @Input() militaryTime:boolean = false;
  /** @prop Determine the minute interval | 1 */
  @Input() minuteInterval:MinuteIntervalType =1;
  /** @prop Set the initial selected time | null */
  @Input() selectedTime:any;
  /** @prop Optional overlay positioin | '' */
  @Input() public originX: HorizontalConnectionPos = 'start';
  /** @prop Optional overlay positioin | '' */
  @Input() public originY: VerticalConnectionPos = 'bottom';
  /** @prop Optional overlay positioin | '' */
  @Input() public overlayX: HorizontalConnectionPos ='start';
  /** @prop Optional overlay positioin | '' */
  @Input() public overlayY: VerticalConnectionPos = 'top';
  /** @prop Callback function invoked when user makes a change | null */
  @Output() whenChange = new EventEmitter();

  @HostBinding('class') classes = 'cui-timepicker-container';

  @ViewChild('timePickerCon') timePickerCon: TemplateRef<any>;
  @ViewChild('connectToInput') connectToInput: ElementRef;

  constructor(
    public timePickerService:TimePickerService,
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef) { 
    
  }

  ngOnInit() {
    let ts = this.timePickerService;
    ts.setMilitary(this.militaryTime);
    ts.setMinuteInterval(this.minuteInterval);
    ts.selected$.subscribe( v => {
      this.value = ts.getTimeString();
      this.whenChange.emit(v);
    });
    ts.initTime(this.selectedTime);

    const strategy = this.overlay
    .position()
    .connectedTo(
      this.connectToInput, 
      { originX: this.originX, originY: this.originY }, 
      { overlayX: this.overlayX, overlayY: this.overlayY }
    );
    const config = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['cui-datepicker-container','cui-timepicker-container'],
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
