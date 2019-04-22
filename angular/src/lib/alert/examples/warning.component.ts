import { Component } from '@angular/core';
import { AlertService } from '@collab-ui/angular';

@Component({
  selector: 'example-alert-warning',
  template: `
    <button md-button (click)="onClick()" aria-label="Click to Open">
      Warning
    </button>
  `,
})
export class ExampleAlertWarningComponent {
  constructor(private alertService: AlertService) {}

  onClick() {
    this.alertService.warning('Warning', 'Who\'s awesome?  You are!', {
      ariaLabel: 'Close Alert',
      orderNewest: false,
      onHide: () => console.info('onHide info'),
    });
  }
}
