import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AlertMeetingService } from '@collab-ui/angular';

@Component({
  selector: 'example-alert-meeting-avatar',
  template: `
    <button md-button (click)="onClick()" aria-label="Click to Open">Avatar</button>

    <ng-template #avatarTemplate>
      <md-avatar title="Tom Smith" src="http://react.collab-ui.com/barbara.png"></md-avatar>
    </ng-template>
  `,
})
export class ExampleAlertMeetingAvatarComponent {
  @ViewChild('avatarTemplate') avatarTemplate: TemplateRef<any>;

  constructor(private alertMeetingService: AlertMeetingService) {}

  onClick() {
    this.alertMeetingService.show({
      title: 'Important Meeting',
      message: 'This is important',
      status: 'In 5 mins.',
      avatar: this.avatarTemplate,
    });
  }
}
