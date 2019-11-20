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
  selector: 'md-alert-banner',
  template: `
    <div [ngClass]="['md-alert-banner', 'md-alert-banner--' + type]">
      <div class="md-alert-banner__text">
        <ng-content></ng-content>
      </div>
      <div
        *ngIf="closable"
        class="md-alert-banner__close"
        (click)="onClick()"
        (keydown)="handleKeydown($event)"
        tabindex="0"
        role="button"
      >
        <md-icon name="cancel_16"></md-icon>
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
    event: KeyboardEvent
  ) {
    if (event.key !== 'Tab') {
      this.hide.emit();
    }
  }

  constructor() {}

  ngOnInit() {
    if (!this.hide.observers.length && this.closable) {
      throw new Error('Observer for "hide" is required');
    }
  }

  onClick(): void {
    this.hide.emit();
  }
}
