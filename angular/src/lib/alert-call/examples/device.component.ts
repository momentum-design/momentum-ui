import { Component } from '@angular/core';
import { AlertCallService } from '@momentum-ui/angular';

@Component({
  selector: 'example-alert-call-device',
  template: `
    <button md-button (click)="onClick()" aria-label="Click to Open">Device</button>
  `,
})
export class ExampleAlertCallDeviceComponent {
  constructor(private alertCallService: AlertCallService) {}

  onClick() {
    this.alertCallService.show({
      title: 'Incoming Call',
      caller: {title: 'SJC21-Babelfish', alt: '+ 1 408-555-1212', type: 'device'},
      onAnswerShare: (data) => {},
      onAnswerVoice: (data) => {},
      onReject: (data) => {},
    });
  }
}
