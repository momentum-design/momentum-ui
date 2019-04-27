import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AlertCallService } from '@momentum-ui/angular';

@Component({
  selector: 'example-alert-call-default',
  template: `
    <button md-button (click)="onClick()" aria-label="Click to Open">Default</button>

    <ng-template #avatarTemplate>
      <md-avatar title="Tom Smith" src="http://react.collab-ui.com/barbara.png" size="xlarge"></md-avatar>
    </ng-template>
  `,
})
export class ExampleAlertCallDefaultComponent {
  @ViewChild('avatarTemplate') avatarTemplate: TemplateRef<any>;

  constructor(private alertCallService: AlertCallService) {}

  onClick() {
    this.alertCallService.show({
      title: 'Incoming Call',
      avatar: this.avatarTemplate,
      caller: {title: 'Barbara German', alt: '+ 1 972-555-1212'},
      onAnswerVideo: (data) => {},
      onAnswerVoice: (data) => {},
      onReject: (data) => {},
    });
  }
}
