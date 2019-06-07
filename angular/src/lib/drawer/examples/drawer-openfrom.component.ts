import { Component } from '@angular/core';

@Component({
  selector: 'example-drawer-openfrom',
  template: `
    <button
      md-button
      aria-label="openDrawer"
      (click)="showDrawer()"
    >
      Open top Drawer
    </button>
    <md-drawer
      [(isOpen)]="showMe"
      (drawerChanged)="changeDrawer($event)"
      openFrom="top"
      size="large"
    >
      <p>Put content here</p>
    </md-drawer>
  `,
})
export class DrawerOpenfromComponent {
  public showMe: Boolean = false;

  public showDrawer() {
    this.showMe = true;
  }

  changeDrawer(isOpen: Boolean) {
    this.showMe = isOpen;
  }

}
