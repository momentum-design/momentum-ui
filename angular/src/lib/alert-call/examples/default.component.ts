import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AlertCallService } from '@collab-ui/angular';

@Component({
  selector: 'example-alert-call-default',
  template: `
    <button cui-button (click)="onClick()" aria-label="Click to Open">Default</button>

    <ng-template #avatarTemplate>
      <cui-avatar title="Tom Smith" src="http://react.collab-ui.com/barbara.png" size="xlarge"></cui-avatar>
    </ng-template>
  `,
})
export class ExampleAlertCallDefaultComponent {
  @ViewChild('avatarTemplate') avatarTemplate: TemplateRef<any>;

  constructor(private alertCallService: AlertCallService) {}

  onClick() {
    this.alertCallService.show({
      title: 'Important Call',
      avatar: this.avatarTemplate,
      caller: {title: 'SJC21-Babelfish', alt: '+ 1 408-555-1212', type: 'device'},
      devices: [
        {name: 'SJC21-Babelfish', value: '1010101', type: 'device'},
        {name: 'Use my computer', value: '2020202'}
      ],
      onAnswerVideo: () => alert('onAnswerVideo'),
      onAnswerVoice: () => alert('onAnswerVoice'),
      onReject: () => alert('onReject'),
    });
  }
}
