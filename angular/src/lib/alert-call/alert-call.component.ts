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
  selector: 'md-alert-call',
  template: `
    <div class="md-alert__title">{{ title }}</div>
    <div class="md-alert__caller">
      <ng-container *ngIf="avatar; else callerTemplate" [ngTemplateOutlet]="avatar"></ng-container>
      <div class="md-alert__caller-title">{{ caller.title }}</div>
      <div class="md-alert__caller-subtitle">{{ caller.alt }}</div>
    </div>
    <md-device-list-call
      *ngIf="devices.length > 0"
      mdRemoveHost
      [devices]="devices"
      [selectedDevice]="defaultSelectedDevice"
      [header]="deviceListHeader"
      (select)="onDeviceSelect($event)"
      ></md-device-list-call>
    <div class="md-alert--call--buttons">
      <button
        *ngIf="answerShareButtonVisible"
        md-button
        [attr.aria-label]="shareAriaLabel"
        [circle]="true"
        color="blue"
        size="44"
        tabindex="0"
        (click)="onAnswerShare()"
      >
        <md-icon name="share-screen_24"></md-icon>
      </button>
      <button
        *ngIf="answerVideoButtonVisible"
        md-button
        [attr.aria-label]="videoAriaLabel"
        [circle]="true"
        color="green"
        size="44"
        tabindex="0"
        (click)="onAnswerVideo()"
      >
        <md-icon name="camera_24"></md-icon>
      </button>
      <button
        *ngIf="answerVoiceButtonVisible"
        md-button
        [attr.aria-label]="voiceAriaLabel"
        [circle]="true"
        color="green"
        size="44"
        tabindex="0"
        (click)="onAnswerVoice()"
      >
        <md-icon name="handset_24"></md-icon>
      </button>
      <button
        md-button
        [attr.aria-label]="rejectAriaLabel"
        [circle]="true"
        color="red"
        size="44"
        tabindex="0"
        (click)="onReject()"
      >
        <md-icon name="cancel_24"></md-icon>
      </button>
    </div>

    <ng-template #callerTemplate>
      <ng-container [ngSwitch]="caller.type">
        <md-avatar *ngSwitchCase="'number'" title="#" [alt]="caller.title" size="xlarge"></md-avatar>
        <md-avatar *ngSwitchCase="'device'" icon="spark-board_32" [alt]="caller.title" size="xlarge"></md-avatar>
        <md-avatar *ngSwitchDefault [title]="caller.title" [alt]="caller.title" size="xlarge"></md-avatar>
      </ng-container>
    </ng-template>
  `,
  host: {
    'class': 'md-alert md-alert--call',
  }
})
export class AlertCallComponent {
  @Input() private key: string;
  @Input() answerShareButtonVisible: boolean;
  @Input() answerVideoButtonVisible: boolean;
  @Input() answerVoiceButtonVisible: boolean;
  @Input() avatar: TemplateRef<any>;
  @Input() caller: AlertCaller;
  @Input() defaultSelectedDevice: string | number | object | any[];
  @Input() deviceListHeader: string;
  @Input() devices: AlertCallDevice[] = [];
  @Input() rejectAriaLabel: string;
  @Input() shareAriaLabel: string;
  @Input() title: string = '';
  @Input() videoAriaLabel: string;
  @Input() voiceAriaLabel: string;

  @Output() readonly answerShare: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly answerVideo: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly answerVoice: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly reject: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly deviceSelect: EventEmitter<AlertCallDevice> = new EventEmitter<AlertCallDevice>();

  onAnswerShare(): void {
    this.answerShare.emit(this.key);
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

  onDeviceSelect(device: AlertCallDevice): void {
    device.key = this.key;
    this.deviceSelect.emit(device);
  }
}
