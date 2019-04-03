import { Component, OnDestroy } from '@angular/core';
import { AlertMeetingConfig } from './alert-meeting-config';
import find from 'lodash-es/find';
import reject from 'lodash-es/reject';
import uniqueId from 'lodash-es/uniqueId';
import { Subject } from 'rxjs';

// Used internally by the alert meeting service.
@Component({
  selector: 'cui-alert-meeting-container',
  template: `
    <cui-alert-meeting *ngFor="let alert of alertList"
      [key]="alert.key"
      [attendees]="alert.attendees"
      [avatar]="alert.avatar"
      [clickable]="!!alert.onClick"
      [closeAriaLabel]="alert.closeAriaLabel"
      [message]="alert.message"
      [remindAriaLabel]="alert.remindAriaLabel"
      [snoozeButtonVisible]="!!alert.onSnooze"
      [status]="alert.status"
      [title]="alert.title"
      (mouseclick)="onClick($event)"
      (hide)="onHide($event)"
      (snooze)="onSnooze($event)"
    ></cui-alert-meeting>
  `,
  host: {
    'class': 'cui-alert__container cui-alert__container--bottom-right'
  }
})

export class AlertMeetingContainerComponent implements OnDestroy {

  readonly _onDestroy: Subject<any> = new Subject();

  alertList: Array<AlertMeetingConfig> = [];

  addAlert(alert: AlertMeetingConfig): string {
    alert.key = uniqueId('alert_meeting_');
    this.alertList.push(alert);
    return alert.key;
  }

  removeAlert(key: string): void {
    this.alertList = reject(this.alertList, { key });
    if (!this.alertList.length) {
      this.destroy();
    }
  }

  onClick(key: string): void {
    const alert = find(this.alertList, { key });
    if (alert && alert.onClick) {
      alert.onClick();
    }
    this.removeAlert(key);
  }

  onHide(key: string): void {
    const alert = find(this.alertList, { key });
    if (alert && alert.onHide) {
      alert.onHide();
    }
    this.removeAlert(key);
  }

  onSnooze(key: string): void {
    const alert = find(this.alertList, { key });
    if (alert && alert.onSnooze) {
      alert.onSnooze();
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
