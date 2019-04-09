import { Component } from '@angular/core';
import { AlertCallService } from '@momentum-ui/angular';

@Component({
  selector: 'example-alert-call-number',
  template: `
    <button md-button (click)="onClick()" aria-label="Click to Open">Number</button>
  `,
})
export class ExampleAlertCallNumberComponent {
  constructor(private alertCallService: AlertCallService) {}

  onClick() {
    this.alertCallService.show({
      title: 'Incoming Call',
      caller: {title: '+ 1 408-555-1212', type: 'number'},
      onAnswerVideo: (data) => {},
      onAnswerVoice: (data) => {},
      onReject: (data) => {},
    });
  }
}
