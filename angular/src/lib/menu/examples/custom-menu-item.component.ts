import { Component } from '@angular/core';

@Component({
  selector: 'example-menu-custom-menu-item',
  template: `
    <button md-button aria-label="Show Menu" [mdMenuTriggerFor]="testMenu">Show Customized MenuItems</button>

    <md-menu #testMenu>
      <md-menu-content>Content</md-menu-content>
      <md-menu-item>
        <md-list-item-section position="left">
          <md-icon name="icon-edit_20"></md-icon>
        </md-list-item-section>
        <md-list-item-section position="center">
          Edit space settings
        </md-list-item-section>
      </md-menu-item>
      <md-menu-item>
        <md-list-item-section position="left">
          <md-icon name="icon-favorite_20"></md-icon>
        </md-list-item-section>
        <md-list-item-section position="center">
          Add to favorites
        </md-list-item-section>
      </md-menu-item>
      <md-menu-item>
        <md-list-item-section position="left">
          <md-icon name="icon-alert_20"></md-icon>
        </md-list-item-section>
        <md-list-item-section position="center">
          Notifications
        </md-list-item-section>
      </md-menu-item>
      <md-menu-item>
        <md-list-item-section position="left">
          <md-icon name="icon-accessories_20"></md-icon>
        </md-list-item-section>
        <md-list-item-section position="center">
          Add Integrations & Bots
        </md-list-item-section>
      </md-menu-item>
      <md-menu-item>
        <md-list-item-section position="left">
          <md-icon name="icon-info_20"></md-icon>
        </md-list-item-section>
        <md-list-item-section position="center">
          View space policy
        </md-list-item-section>
      </md-menu-item>
      <md-menu-item>
        <md-list-item-section position="left">
          <md-icon name="icon-archive_20"></md-icon>
        </md-list-item-section>
        <md-list-item-section position="center">
          Archive space
        </md-list-item-section>
      </md-menu-item>
      <md-menu-item>
        <md-list-item-section position="left">
          <md-icon name="icon-cancel_20"></md-icon>
        </md-list-item-section>
        <md-list-item-section position="center">
          Remove space from team
        </md-list-item-section>
      </md-menu-item>
      <md-menu-item>
        <md-list-item-section position="left">
          <md-icon name="icon-exit-room_20"></md-icon>
        </md-list-item-section>
        <md-list-item-section position="center">
          Leave space
        </md-list-item-section>
      </md-menu-item>
    </md-menu>
  `,
})
export class ExampleMenuCustomMenuItemComponent {}
