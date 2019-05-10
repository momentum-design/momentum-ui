import { Component } from '@angular/core';
import { MenuItemComponent } from '../menu-item.component';

@Component({
  selector: 'example-menu-default',
  template: `
    <button md-button aria-label="Show Menu" [mdMenuTriggerFor]="testMenu">Show Menu</button>

    <md-menu #testMenu [showArrow]="true" (select)="onSelect($event)">
      <md-menu-content>
        <md-editable-textfield [(ngModel)]="editValue"></md-editable-textfield>
      </md-menu-content>
      <md-menu-item (click)="onClick($event)">Language</md-menu-item>
      <md-menu-item (click)="onClick($event)">Profile</md-menu-item>
      <md-menu-item (click)="onClick($event)">Settings</md-menu-item>
    </md-menu>
  `,
})
export class ExampleMenuDefaultComponent {
  editValue = 'Content Area';

  onSelect(event: MenuItemComponent) {}
  onClick(event: MouseEvent) {}
}
