import {
  Component,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { AlertConfig } from './alert-config';
import find from 'lodash-es/find';
import reject from 'lodash-es/reject';
import uniqueId from 'lodash-es/uniqueId';
import { Subject } from 'rxjs';

/**
 * Used internally by the alert service.
 */
@Component({
  selector: 'cui-alert-container',
  template: `
    <ng-container *ngFor="let alert of alertList">
      <cui-alert
        [key]="alert.key"
        [ariaLabel]="alert.ariaLabel"
        [type]="alert.type"
        [title]="alert.title"
        [message]="alert.message"
        [closable]="alert.closable"
        (dismissed)="removeAlert($event)"
      ></cui-alert>
    </ng-container>
  `,
})

export class AlertContainerComponent implements OnDestroy {
  @HostBinding('attr.role') role: string = 'alert';
  @HostBinding('class') get className(): string {
    return `cui-alert__container cui-alert__container--${this.alertConfig.position}`;
  }

  readonly _onDestroy: Subject<any> = new Subject();

  alertList: Array<AlertConfig> = [];

  constructor(public alertConfig: AlertConfig) {}

  addAlert(alert: AlertConfig): string {
    alert.key = uniqueId('alert_');
    this.alertList = this.alertConfig.orderNewest ? [alert, ...this.alertList] : [...this.alertList, alert];
    return alert.key;
  }

  removeAlert(key: string): void {
    const alert = find(this.alertList, {key: key});
    if (alert && alert.onHide) {
      alert.onHide();
    }
    this.alertList = reject(this.alertList, {key: key});

    if (!this.alertList.length) {
      this.destroy();
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
