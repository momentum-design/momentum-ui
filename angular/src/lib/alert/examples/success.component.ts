import { Component } from '@angular/core';
import { AlertService } from '@collab-ui/angular';

@Component({
  selector: 'example-alert-success',
  template: `
    <button cui-button (click)="onClick()" aria-label='Click to Open'>
      Success
    </button>
    `,
})
export class ExampleAlertSuccessComponent {
  constructor(private alertService: AlertService) {}

  onClick() {
    this.alertService.success('Success', 'Who\'s awesome?  You are!', {
      ariaLabel: 'Close Alert',
      orderNewest: false,
      onHide: () => console.log('onHide info'),
    });
  }
}
