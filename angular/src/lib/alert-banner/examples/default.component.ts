import { Component } from '@angular/core';

@Component({
  selector: 'example-alert-banner-default',
  template: `
    <md-alert-banner *ngIf="show" (hide)="show = false" [closable]="true">
      Default Alert Banner
    </md-alert-banner>
    <button md-button (click)="onClick()" aria-label="Default Alert Banner">
      Toggle Default Alert Banner
    </button>
  `,
})
export class ExampleAlertBannerDefaultComponent {
  show: boolean = false;

  constructor() {}

  onClick() {
    this.show = !this.show;
  }
}
