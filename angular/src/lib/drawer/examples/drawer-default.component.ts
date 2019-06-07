import { Component } from '@angular/core';

@Component({
  selector: 'example-drawer-default',
  template: `
    <button
      md-button
      aria-label="openDrawer"
      (click)="showDrawer()">
        Open Drawer
    </button>
    <md-drawer
      [(isOpen)]="showMe"
      (drawerChanged)="changeDrawer($event)"
    >
      <p>Put content here</p>
    </md-drawer>
  `,
  styles: []
})
export class DrawerDefaultComponent {
  public showMe: Boolean = false;

  public showDrawer() {
    this.showMe = true;
  }

  changeDrawer(isOpen: Boolean) {
    this.showMe = isOpen;
  }

}
