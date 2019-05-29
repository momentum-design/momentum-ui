import { Component } from '@angular/core';

@Component({
  selector: 'example-sidebar-default',
  template: `

<md-sidebar [withIcons]="true" [withToggle]="true">
  <md-sidebar-header [ngStyle]="{'padding': '1.5rem 1.5rem 0 1rem'}">
    <img [src]="logo"/>
  </md-sidebar-header>
  <md-sidebar-body>
    <md-sidebar-nav>
      <md-sidebar-nav-item
        *ngFor="let navItem of navItems"
        [title]="navItem.title"
        [icon]="navItem.icon"
        (navItemClick) = "onClick($event)"
      >
      </md-sidebar-nav-item>
    </md-sidebar-nav>
  </md-sidebar-body>
  <md-sidebar-footer [ngStyle]="{'margin-top': '5rem'}">
    <md-sidebar-nav>
    <md-sidebar-nav-item title="Footer Item" icon="company_24"></md-sidebar-nav-item>
    </md-sidebar-nav>
  </md-sidebar-footer>
</md-sidebar>

  `,
  styles: []
})
export class SideBarDefaultComponent {

  constructor() {}

  logo = require('@momentum-ui/core/images/momentum/momentum-horiz-color.svg');

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
      icon: 'tools_24',
    },
  ];

  onClick(e) {
    // e.navItem will bring entire navItem component clicked, e.title
    alert(e.title);
  }
}

