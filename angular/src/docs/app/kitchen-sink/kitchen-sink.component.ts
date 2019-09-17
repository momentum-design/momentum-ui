import { Component } from '@angular/core';

@Component({
  selector: 'docs-kitchen-sink',
  template: `
    <div class="docs-container--with-side-nav">
      <md-sidebar [isPageLevel]="true" className="docs-container__side-nav">
        <md-sidebar-body>
          <md-sidebar-nav>
            <md-sidebar-nav-item title="Playground" routerLink="/playground"></md-sidebar-nav-item>
            <md-sidebar-nav-item title="Kitchen Sink" [expanded]="true" headerLevel="secondary">
              <md-sidebar-nav-item title="checkbox" [routerLink]="['/kitchen-sink/checkbox']"></md-sidebar-nav-item>
              <md-sidebar-nav-item title="radio" [routerLink]="['/kitchen-sink/radio']"></md-sidebar-nav-item>
            </md-sidebar-nav-item>
          </md-sidebar-nav>
        </md-sidebar-body>
      </md-sidebar>
      <div class="docs-container__content">
        <h1>Kitchen Sink</h1>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class KitchenSinkComponent {}
