import { Component } from '@angular/core';
import { AlertCallService } from '@momentum-ui/angular';

@Component({
  selector: 'example-alert-call-devicelist',
  template: `
    <button md-button (click)="onClick()" aria-label="Click to Open">DeviceList</button>
  `,
})
export class ExampleAlertCallDeviceListComponent {
  constructor(private alertCallService: AlertCallService) {}

  onClick() {
    this.alertCallService.show({
      title: 'Incoming Call',
      caller: {title: 'SJC21-Babelfish', alt: '+ 1 408-555-1212', type: 'device'},
      devices: [
        {name: 'SJC21-Babelfish', value: '1010101', type: 'device'},
        {name: 'Use my computer', value: '2020202'}
      ],
      defaultSelectedDevice: '1010101',
      onAnswerVideo: (data) => {},
      onAnswerVoice: (data) => {},
      onReject: (data) => {},
      onDeviceSelect: (device) => {},
    });
  }
}
