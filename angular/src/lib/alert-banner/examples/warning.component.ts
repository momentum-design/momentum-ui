import { Component } from '@angular/core';

@Component({
  selector: 'example-alert-banner-warning',
  template: `
    <md-alert-banner
      *ngIf="show"
      type="warning"
      (hide)="show = false"
      [closable]="true"
    >
      Warning Alert Banner
    </md-alert-banner>
    <button md-button (click)="onClick()" aria-label="Warning Alert Banner">
      Toggle Warning Alert Banner
    </button>
  `,
})
export class ExampleAlertBannerWarningComponent {
  show: boolean = false;

  constructor() {}

  onClick() {
    this.show = !this.show;
  }
}
