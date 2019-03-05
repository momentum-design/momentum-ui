import { Component } from '@angular/core';
import { AlertService } from '@collab-ui/angular';

@Component({
  selector: 'example-alert-default',
  template: `
    <button cui-button (click)="onClick()" aria-label="Click to Open">Info/Default</button>
  `,
})
export class ExampleAlertDefaultComponent {
  constructor(private alertService: AlertService) {}

  onClick() {
    this.alertService.info('Alert', 'Who\'s awesome?  You are!', {
      ariaLabel: 'Close Alert',
      orderNewest: false,
      onHide: () => console.log('onHide info'),
    });
  }
}
