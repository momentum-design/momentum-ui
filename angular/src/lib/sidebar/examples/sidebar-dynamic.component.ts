import { Component } from '@angular/core';

@Component({
  selector: 'example-sidebar-dynamic',
  template: `
    <md-sidebar [withIcons]="true" theme="dark" [withToggle]="true">
      <md-sidebar-body>
        <md-sidebar-nav>
          <md-sidebar-nav-item
            *ngFor="let navItem of navItems"
            [title]="navItem.title"
            [icon]="navItem.icon"
            (navItemClick)="onClick($event)"
          ></md-sidebar-nav-item>
        </md-sidebar-nav>
      </md-sidebar-body>
    </md-sidebar>
  `,
  styles: [],
})
export class SideBarDynamicComponent {
  constructor() {}

  navItems = [
    {
      title: 'Overview',
      icon: 'home_24',
    },
    {
      title: 'Users',
      icon: 'people_24',
    },
    {
      title: 'Places',
      icon: 'location_24',
    },
    {
      title: 'Services',
      icon: 'cloud_24',
    },
    {
      title: 'Devices',
      icon: 'endpoint_24',
    },
    {
      title: 'Analytics',
      icon: 'analysis_24',
    },
    {
      title: 'Troubleshooting',
      icon: 'diagnostics_24',
    },
    {
      title: 'Settings',
      icon: 'settings_24',
    },
    {
      title: 'Development',
      icon: 'tools_32',
    },
  ];

  onClick(e) {
    // e.navItem will bring entire navItem component clicked, e.title
    alert(e.title);
  }
}
