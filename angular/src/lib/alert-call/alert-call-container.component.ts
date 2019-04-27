import { Component, OnDestroy } from '@angular/core';
import { AlertCallConfig } from './alert-call-config';
import { AlertCallDevice } from './device-list-call.component';
import find from 'lodash-es/find';
import reject from 'lodash-es/reject';
import uniqueId from 'lodash-es/uniqueId';
import { Subject } from 'rxjs';

// Used internally by the alert call service.
@Component({
  selector: 'md-alert-call-container',
  template: `
    <md-alert-call *ngFor="let alert of alertList"
      [key]="alert.key"
      [answerShareButtonVisible]="!!alert.onAnswerShare"
      [answerVideoButtonVisible]="!!alert.onAnswerVideo"
      [answerVoiceButtonVisible]="!!alert.onAnswerVoice"
      [avatar]="alert.avatar"
      [caller]="alert.caller"
      [defaultSelectedDevice]="alert.defaultSelectedDevice"
      [deviceListHeader]="alert.deviceListHeader"
      [remindAriaLabel]="alert.remindAriaLabel"
      [devices]="alert.devices"
      [rejectAriaLabel]="alert.rejectAriaLabel"
      [shareAriaLabel]="alert.shareAriaLabel"
      [title]="alert.title"
      [videoAriaLabel]="alert.videoAriaLabel"
      [voiceAriaLabel]="alert.voiceAriaLabel"
      (answerShare)="onAnswerShare($event)"
      (answerVideo)="onAnswerVideo($event)"
      (answerVoice)="onAnswerVoice($event)"
      (deviceSelect)="onDeviceSelect($event)"
      (reject)="onReject($event)"
    ></md-alert-call>
  `,
  host: {
    'class': 'md-alert__container md-alert__container--call'
  }
})

export class AlertCallContainerComponent implements OnDestroy {

  readonly _onDestroy: Subject<any> = new Subject();

  alertList: Array<AlertCallConfig> = [];

  addAlert(alert: AlertCallConfig): string {
    alert.key = uniqueId('alert_call_');
    this.alertList.push(alert);
    return alert.key;
  }

  removeAlert(key: string): void {
    this.alertList = reject(this.alertList, {key});
    if (!this.alertList.length) {
      this.destroy();
    }
  }

  onAnswerShare(key: string): void {
    const alert = find(this.alertList, {key});
    if (alert && alert.onAnswerShare) {
      alert.onAnswerShare(alert);
    }
    this.removeAlert(key);
  }

  onAnswerVideo(key: string): void {
    const alert = find(this.alertList, {key});
    if (alert && alert.onAnswerVideo) {
      alert.onAnswerVideo(alert);
    }
    this.removeAlert(key);
  }

  onAnswerVoice(key: string): void {
    const alert = find(this.alertList, {key});
    if (alert && alert.onAnswerVoice) {
      alert.onAnswerVoice(alert);
    }
    this.removeAlert(key);
  }

  onReject(key: string): void {
    const alert = find(this.alertList, {key});
    if (alert && alert.onReject) {
      alert.onReject(alert);
    }
    this.removeAlert(key);
  }

  onDeviceSelect(device: AlertCallDevice): void {
    const alert = find(this.alertList, {key: device.key});
    if (alert && alert.onDeviceSelect) {
      alert.onDeviceSelect(device);
    }
  }

  destroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnDestroy() {
    this.destroy();
  }
}
