import { Component } from '@angular/core';
import { AlertService } from '@collab-ui/angular';

@Component({
  selector: 'example-alert-error',
  template: `
    <button cui-button (click)="onClick()" aria-label='Click to Open'>
      Error
    </button>
    `,
})
export class ExampleAlertErrorComponent {
  constructor(private alertService: AlertService) {}

  onClick() {
    this.alertService.error('Error', 'Who\'s awesome?  You are!', {
      ariaLabel: 'Close Alert',
      orderNewest: false,
      onHide: () => console.log('onHide info'),
    });
  }
}
