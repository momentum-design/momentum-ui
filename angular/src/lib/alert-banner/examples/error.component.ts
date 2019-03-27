import { Component } from '@angular/core';

@Component({
  selector: 'example-alert-banner-error',
  template: `
    <cui-alert-banner
      *ngIf="show"
      type="error"
      (hide)="show = false"
      [closable]="true"
    >
      Error Alert Banner
    </cui-alert-banner>
    <button cui-button (click)="onClick()" aria-label="Error Alert Banner">
      Toggle Error Alert Banner
    </button>
  `,
})
export class ExampleAlertBannerErrorComponent {
  show: boolean = false;

  constructor() {}

  onClick() {
    this.show = !this.show;
  }
}
