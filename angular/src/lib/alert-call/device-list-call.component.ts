import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import find from 'lodash-es/find';
import uniqueId from 'lodash-es/uniqueId';

export type AlertCallDeviceType = '' | 'device';

export class AlertCallDevice {
  id?: string = uniqueId('alert_call_device_');
  key?: string;
  name: string;
  value: string | number | object | any[];
  type?: AlertCallDeviceType;
  title?: string;
}

@Component({
  selector: 'md-device-list-call',
  template: `
    <md-list tabType="vertical" (select)="onSelect($event)">
      <md-list-item-header mdRemoveHost [header]="header"></md-list-item-header>
      <div md-list-item *ngFor="let device of devices; index as i"
        [id]="device.id"
        [value]="device.value"
        [title]="device.title || device.name"
        role="listItem"
      >
        <md-list-item-section position="left">
          <ng-container [ngSwitch]="device.type">
            <md-icon *ngSwitchCase="'device'" name="spark-board_20"></md-icon>
            <md-icon *ngSwitchDefault name="laptop_20"></md-icon>
          </ng-container>
        </md-list-item-section>
        <md-list-item-section position="center">
          <div class="md-list-item__header">
            {{ device.name }}
          </div>
        </md-list-item-section>
        <md-list-item-section position="right">
          <md-icon *ngIf="i === selectedDevice || device.value === selectedDevice" name="check_20" color="blue-50"></md-icon>
        </md-list-item-section>
      </div>
    </md-list>
  `,
})

export class DeviceListCallComponent {
  /** Default Index Value selected | null */
  @Input() selectedDevice: string | number | object | any[];
  /** Required list of devices to show in list */
  @Input() devices: AlertCallDevice[];
  /** ListItem header */
  @Input() header: string;

  @Output() readonly select: EventEmitter<AlertCallDevice> = new EventEmitter<AlertCallDevice>();

  onSelect(listItem: ListItemComponent) {
    const device = find(this.devices, {id: listItem.id});
    this.selectedDevice = device.value;
    this.select.emit(device);
  }
}
