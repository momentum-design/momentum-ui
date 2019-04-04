import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '@collab-ui/angular/list-item';
import uniqueId from 'lodash-es/uniqueId';

export type AlertCallDeviceType = '' | 'device';

export class AlertCallDevice {
  id?: string = uniqueId('cui-device-list-item-');
  name: string;
  value?: string;
  type?: AlertCallDeviceType;
  title?: string;
}

@Component({
  selector: 'cui-device-list-call',
  template: `
    <cui-list (select)="onSelect($event)">
      <cui-list-item-header cuiRemoveHost [header]="header"></cui-list-item-header>
      <div cui-list-item *ngFor="let device of devices; index as i"
        [value]="device.value"
        [title]="device.title || device.name"
      >
        <cui-list-item-section position="left">
          <ng-container [ngSwitch]="device.type">
            <cui-icon *ngSwitchCase="'device'" name="spark-board_20"></cui-icon>
            <cui-icon *ngSwitchDefault name="laptop_20"></cui-icon>
          </ng-container>
        </cui-list-item-section>
        <cui-list-item-section position="center">
          <div class="cui-list-item__header">
            {{ device.name }}
          </div>
        </cui-list-item-section>
        <cui-list-item-section position="right">
          <cui-icon *ngIf="i === selectedIndex || device.id === selectedIndex" name="check_20" color="blue"></cui-icon>
        </cui-list-item-section>
      </div>
    </cui-list>
  `,
})

export class DeviceListCallComponent {
  /** Default Index Value selected | null */
  @Input() defaultSelected: number | string;
  /** Required list of devices to show in list */
  @Input() devices: AlertCallDevice[];
  /** ListItem header */
  @Input() header: string;

  @Output() readonly select: EventEmitter<ListItemComponent> = new EventEmitter<ListItemComponent>();

  selectedIndex: number | string = this.defaultSelected;

  onSelect(listItem: ListItemComponent) {
    console.log(listItem);
    this.selectedIndex = listItem.id;
    this.select.emit(listItem);
  }
}
