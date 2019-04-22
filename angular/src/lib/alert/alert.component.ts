import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

// Used internally by the alert service.
@Component({
  selector: 'md-alert',
  template: `
    <div class="md-alert__icon"></div>
    <div class="md-alert__content">
      <div class="md-alert__title">{{ title }}</div>
      <div class="md-alert__message">{{ message }}</div>
    </div>
    <div class="md-alert__button" *ngIf="closable">
      <button
        md-button
        #closeButton
        [attr.aria-label]="ariaLabel"
        [circle]="true"
        size="44"
        (click)="dismiss()"
      >
        <md-icon name="cancel_16"></md-icon>
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
    return `md-alert md-alert--${this.type}`;
  }

  @Output() dismissed = new EventEmitter<string>();

  constructor() {}

  dismiss(): void {
    this.dismissed.emit(this.key);
  }
}
