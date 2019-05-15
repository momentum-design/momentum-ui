import { Component } from '@angular/core';

@Component({
  selector: 'example-sidebar-default',
  template: `

<md-sidebar [withIcons]="true" theme="dark" [withToggle]="true">
  <md-sidebar-body>
    <md-sidebar-nav>
      <md-sidebar-nav-item
        (navItemClick) = "onClick($event)"
        title="Overview"
        icon="home_24"
      >
      </md-sidebar-nav-item>
      <md-sidebar-nav-item
        (navItemClick) = "onClick($event)"
        title="Users"
        icon="people_24"
      >
      </md-sidebar-nav-item>
      <md-sidebar-nav-item
        (navItemClick) = "onClick($event)"
        title="Places"
        icon="location_24"
      >
      </md-sidebar-nav-item>
      <md-sidebar-nav-item
        (navItemClick) = "onClick($event)"
        title="Services"
        icon="cloud_24"
      >
      </md-sidebar-nav-item>
      <md-sidebar-nav-item
        (navItemClick) = "onClick($event)"
        title="Devices"
        icon="endpoint_24"
      >
      </md-sidebar-nav-item>
      <md-sidebar-nav-item
        (navItemClick) = "onClick($event)"
        title="Analytics"
        icon="analysis_24"
      >
      </md-sidebar-nav-item>
      <md-sidebar-nav-item
        (navItemClick) = "onClick($event)"
        title="Troubleshooting"
        icon="diagnostics_24"
      >
      </md-sidebar-nav-item>
      <md-sidebar-nav-item
        (navItemClick) = "onClick($event)"
        title="Settings"
        icon="settings_24"
      >
      </md-sidebar-nav-item>
      <md-sidebar-nav-item
        (navItemClick) = "onClick($event)"
        title="Development"
        icon="tools_32"
      >
      </md-sidebar-nav-item>

    </md-sidebar-nav>
  </md-sidebar-body>
</md-sidebar>

  `,
  styles: []
})
export class SideBarDefaultComponent {

  constructor() { }

  onClick(e) {
    // e.navItem will bring entire navItem component clicked, e.title
    alert(e.title);
  }
}
