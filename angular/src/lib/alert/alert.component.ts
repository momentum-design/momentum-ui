import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';

// Used internally by the alert service.
@Component({
  selector: 'cui-alert',
  template: `
    <div class="cui-alert__icon"></div>
    <div class="cui-alert__content">
      <div class="cui-alert__title">{{ title }}</div>
      <div class="cui-alert__message">{{ message }}</div>
    </div>
    <div class="cui-alert__button" *ngIf="closable">
      <button cui-button #closeButton [attr.aria-label]="ariaLabel" [circle]="true" size="44" (click)="dismiss()">
        <cui-icon name="cancel_16"></cui-icon>
      </button>
    </div>
  `,
})
export class AlertComponent {
  @Input() private key: string;
  @Input() private type: string;
  @Input() public ariaLabel: string;
  @Input() public closable: boolean;
  @Input() public message: string;
  @Input() public title: string;

  @HostBinding('class') get className(): string {
    return `cui-alert cui-alert--${this.type}`;
  }

  @Output() dismissed = new EventEmitter<string>();

  constructor() {}

  dismiss(): void {
    this.dismissed.emit(this.key);
  }
}
