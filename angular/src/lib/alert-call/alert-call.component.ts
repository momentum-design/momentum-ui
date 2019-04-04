import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import { AlertCaller } from './alert-call-config';
import { AlertCallDevice } from './device-list-call.component';

// Used internally by the alert call service.
@Component({
  selector: 'cui-alert-call',
  template: `
    <div class="cui-alert__title">{{ title }}</div>
    <div class="cui-alert__caller">
      <ng-container *ngIf="avatar; else callerTemplate" [ngTemplateOutlet]="avatar"></ng-container>
      <div class="cui-alert__caller-title">{{ caller.title }}</div>
      <div class="cui-alert__caller-subtitle">{{ caller.alt }}</div>
    </div>
    <cui-device-list-call
      *ngIf="devices.length > 0"
      cuiRemoveHost
      [devices]="devices"
      [defaultSelected]="defaultSelectedDevice"
      [header]="deviceListHeader"
      (select)="onDeviceSelect($event)"
      ></cui-device-list-call>
    <div class="cui-alert--call--buttons">
      <button
        cui-button
        [attr.aria-label]="videoAriaLabel"
        [circle]="true"
        color="green"
        size="44"
        tabindex="0"
        (click)="onAnswerVideo()"
      >
        <cui-icon name="camera_24"></cui-icon>
      </button>
      <button
        *ngIf="answerVoiceButtonVisible"
        cui-button
        [attr.aria-label]="voiceAriaLabel"
        [circle]="true"
        color="green"
        size="44"
        tabindex="0"
        (click)="onAnswerVoice()"
      >
        <cui-icon name="handset_24"></cui-icon>
      </button>
      <button
        cui-button
        [attr.aria-label]="rejectAriaLabel"
        [circle]="true"
        color="red"
        size="44"
        tabindex="0"
        (click)="onReject()"
      >
        <cui-icon name="cancel_24"></cui-icon>
      </button>
    </div>

    <ng-template #callerTemplate>
      <ng-container [ngSwitch]="caller.type">
        <cui-avatar *ngSwitchCase="'number'" title="#" [alt]="caller.title" size="xlarge"></cui-avatar>
        <cui-avatar *ngSwitchCase="'device'" icon="spark-board_32" [alt]="caller.title" size="xlarge"></cui-avatar>
        <cui-avatar *ngSwitchDefault [title]="caller.title" [alt]="caller.title" size="xlarge"></cui-avatar>
      </ng-container>
    </ng-template>
  `,
  host: {
    'class': 'cui-alert cui-alert--call',
  }
})
export class AlertCallComponent {
  @Input() private key: string;
  @Input() answerVoiceButtonVisible: boolean;
  @Input() avatar: TemplateRef<any>;
  @Input() caller: AlertCaller;
  @Input() defaultSelectedDevice: number | string = 0;
  @Input() deviceListHeader: string = 'Device selection';
  @Input() devices: AlertCallDevice[] = [];
  @Input() rejectAriaLabel: string = 'reject call';
  @Input() title: string = '';
  @Input() videoAriaLabel: string = 'answer call with voice and video';
  @Input() voiceAriaLabel: string = 'answer call with voice only';

  @Output() readonly answerVideo: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly answerVoice: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly deviceSelect: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly reject: EventEmitter<string> = new EventEmitter<string>();

  onDeviceSelect(device: any): void {
    this.deviceSelect.emit(this.key);
  }

  onAnswerVideo(): void {
    this.answerVideo.emit(this.key);
  }

  onAnswerVoice(): void {
    this.answerVoice.emit(this.key);
  }

  onReject(): void {
    this.reject.emit(this.key);
  }
}
