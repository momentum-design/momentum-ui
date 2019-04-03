import { Component } from '@angular/core';
import { AlertMeetingService } from '@collab-ui/angular';

@Component({
  selector: 'example-alert-meeting-multiple',
  template: `
    <button cui-button (click)="onClick()" aria-label="Click to Open">Multiple</button>
  `,
})
export class ExampleAlertMeetingMultipleComponent {
  constructor(private alertMeetingService: AlertMeetingService) {}

  onClick() {
    this.alertMeetingService.show({
      title: 'Important Meeting',
      message: 'This is important',
      status: 'In 5 mins.',
      attendees: [{title: 'J $'}, {title: 'Jefe Guadelupe'}],
      onClick: () => {},
      onHide: () => {},
      onSnooze: () => {},
    });
  }
}
