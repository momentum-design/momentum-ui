import { Component } from '@angular/core';

@Component({
  selector: 'example-menu-submenu',
  template: `
    <button md-button aria-label="Show Menu" [mdMenuTriggerFor]="testMenu">Show Submenu</button>

    <md-menu #testMenu direction="right-center" [showArrow]="true">
      <md-menu-item [mdMenuTriggerFor]="testSubMenu" selectedValue="English">Language</md-menu-item>
    </md-menu>

    <md-menu #testSubMenu>
      <md-menu-item>English</md-menu-item>
      <md-menu-item>Spanish</md-menu-item>
    </md-menu>
  `,
})
export class ExampleMenuSubmenuComponent {
  onClick(event: MouseEvent) {}
}
