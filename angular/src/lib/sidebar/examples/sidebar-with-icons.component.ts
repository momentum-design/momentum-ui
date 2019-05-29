import { Component } from '@angular/core';

@Component({
  selector: 'example-sidebar-with-icons',
  template: `

<md-sidebar [withToggle]="true">
  <md-sidebar-header [ngStyle]="{'padding': '1rem 3rem 0 0rem'}">
    <img [src]="logo"/>
  </md-sidebar-header>
  <md-sidebar-body>
    <md-sidebar-nav>
      <md-sidebar-nav-item
        (navItemClick) = "onClick($event)"
        title="Level 1"
        icon='record_20'>
      </md-sidebar-nav-item>

      <md-sidebar-nav-item
        title="Level 1 + Sub"
        [expanded]="true"
        headerLevel="secondary"
        icon='record_20'
      >

          <md-sidebar-nav-item title="Level 2"></md-sidebar-nav-item>
          <md-sidebar-nav-item title="Level 2"></md-sidebar-nav-item>

          <md-sidebar-nav-item title="Level 2 + Sub" [expanded]="true" headerLevel="tertiary">

            <md-sidebar-nav-item title="Level 3"></md-sidebar-nav-item>
            <md-sidebar-nav-item title="Level 3"></md-sidebar-nav-item>
            <md-sidebar-nav-item title="Level 3"></md-sidebar-nav-item>

          </md-sidebar-nav-item>
      </md-sidebar-nav-item>
    </md-sidebar-nav>

    <md-sidebar-nav title= "section title">
      <md-sidebar-nav-item title="Level 1" icon='record_20'></md-sidebar-nav-item>
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
export class SideBarWithIconsComponent {

  constructor() {}

  logo = require('@momentum-ui/core/images/momentum/momentum-horiz-color.svg');

  onClick(e) {
    // e.navItem will bring entire navItem component clicked, e.title
    alert(e.title);
  }
}
