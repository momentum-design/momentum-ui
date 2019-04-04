import { Component, OnDestroy } from '@angular/core';
import { AlertCallConfig } from './alert-call-config';
import find from 'lodash-es/find';
import reject from 'lodash-es/reject';
import uniqueId from 'lodash-es/uniqueId';
import { Subject } from 'rxjs';

// Used internally by the alert call service.
@Component({
  selector: 'cui-alert-call-container',
  template: `
    <cui-alert-call *ngFor="let alert of alertList"
      [key]="alert.key"
      [answerVoiceButtonVisible]="!!alert.onAnswerVoice"
      [avatar]="alert.avatar"
      [caller]="alert.caller"
      [defaultSelectedDevice]="alert.defaultSelectedDevice"
      [deviceListHeader]="alert.deviceListHeader"
      [remindAriaLabel]="alert.remindAriaLabel"
      [devices]="alert.devices"
      [rejectAriaLabel]="alert.rejectAriaLabel"
      [title]="alert.title"
      [videoAriaLabel]="alert.videoAriaLabel"
      [voiceAriaLabel]="alert.voiceAriaLabel"
      (answerVideo)="onAnswerVideo($event)"
      (answerVoice)="onAnswerVoice($event)"
      (deviceSelect)="onDeviceSelect($event)"
      (reject)="onReject($event)"
    ></cui-alert-call>
  `,
  host: {
    'class': 'cui-alert__container cui-alert__container--call'
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

  onAnswerVideo(key: string): void {
    const alert = find(this.alertList, {key});
    if (alert && alert.onAnswerVoice) {
      alert.onAnswerVideo();
    }
    this.removeAlert(key);
  }

  onAnswerVoice(key: string): void {
    const alert = find(this.alertList, {key});
    if (alert && alert.onAnswerVoice) {
      alert.onAnswerVoice();
    }
    this.removeAlert(key);
  }

  onDeviceSelect(key: string): void {
    const alert = find(this.alertList, {key});
    if (alert && alert.onDeviceSelect) {
      alert.onDeviceSelect();
    }
  }

  onReject(key: string): void {
    const alert = find(this.alertList, {key});
    if (alert && alert.onReject) {
      alert.onReject();
    }
    this.removeAlert(key);
  }

  destroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnDestroy() {
    this.destroy();
  }
}
