import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export type AlertBannerType = 'info' | 'warning' | 'error';

@Component({
  selector: 'cui-alert-banner',
  template: `
    <div [ngClass]="['cui-alert-banner', 'cui-alert-banner--' + type]">
      <div class="cui-alert-banner__text">
        <ng-content></ng-content>
      </div>
      <div
        *ngIf="closable"
        class="cui-alert-banner__close"
        (click)="onClick()"
        (keydown)="handleKeydown($event)"
        tabindex="0"
        role="button"
      >
        <cui-icon name="cancel_16"></cui-icon>
      </div>
    </div>
  `,
})
export class AlertBannerComponent implements OnInit {
  /** Sets the visibility of AlertBanner's close button | false */
  @Input() public closable: boolean = false;

  /** Sets the AlertBanner type | 'info' */
  @HostBinding('attr.type') @Input() public type: AlertBannerType = 'info';

  /** Event emitted when the user presses on the AlertBanner's close button or hits the esc key */
  @Output() hide: EventEmitter<any> = new EventEmitter();

  @HostListener('document:keydown.escape', ['$event']) handleKeydown(
    _: KeyboardEvent
  ) {
    this.hide.emit();
  }

  constructor() {}

  ngOnInit() {
    if (!this.hide.observers.length) {
      throw new Error('Observer for "hide" is required');
    }
  }

  onClick(): void {
    this.hide.emit();
  }
}
