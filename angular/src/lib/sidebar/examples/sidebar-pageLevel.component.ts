import { Component } from '@angular/core';

@Component({
  selector: 'example-sidebar-page-level',
  template: `

<md-sidebar [isPageLevel]="true">

  <md-sidebar-body>

    <md-sidebar-nav>

      <md-sidebar-nav-item
        (navItemClick) = "onClick($event)"
        title="Level 1"
      >
      </md-sidebar-nav-item>

      <md-sidebar-nav-item
        title="Level 1 + Sub"
        [expanded]="true"
        headerLevel="secondary"
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

      <md-sidebar-nav-item title="Level 1"></md-sidebar-nav-item>

    </md-sidebar-nav>


  </md-sidebar-body>

</md-sidebar>
  `,
  styles: []
})
export class SideBarPageLevelComponent {

  constructor() { }

  onClick(e) {
    // e.navItem will bring entire navItem component clicked, e.title
    alert(e.title);
  }
}
