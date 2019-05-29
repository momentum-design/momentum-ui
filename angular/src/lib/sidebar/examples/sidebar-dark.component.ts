import { Component } from '@angular/core';

@Component({
  selector: 'example-sidebar-dark',
  template: `
    <md-sidebar [withIcons]="true" theme="dark" [withToggle]="true">

      <md-sidebar-header [ngStyle]="{'padding': '1.5rem 1.5rem 0 1rem'}">
        <img [src]="logo"/>
      </md-sidebar-header>

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

      <md-sidebar-footer [ngStyle]="{'margin-top': '5rem'}">
        <md-sidebar-nav>
          <div class="md-list-item">
            <div class="md-list-item__left">
              <md-avatar
                class="md-sidebar__avatar"
                title="Catherine Sinu"
                src="http://react.collab-ui.com/barbara.png"
              ></md-avatar>
            </div>
            <div class="md-list-item__center">
              <div class="md-list-item__header ">Catherine Sinu</div>
              <div class="md-list-item__subheader ">Partner Admin</div>
            </div>
          </div>
        </md-sidebar-nav>
      </md-sidebar-footer>
    </md-sidebar>
  `,
  styles: [`
    .md-sidebar__avatar {
      position: relative;
      right: .5rem;
    }
  `],
})
export class SideBarDarkComponent {
  constructor() {}

  logo = require('@momentum-ui/core/images/momentum/momentum-horiz-color-white.png');

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
