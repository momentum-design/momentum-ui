import { Component } from '@angular/core';

@Component({
  selector: 'docs-root',
  template: `
    <div style="display: flex; flex-direction: column; min-height: 100vh;">
      <header md-top-bar color="light">
        <a
          routerLink="/"
          md-top-bar-brand
          [image]="logo"
          ngProjectAs="brand"
        ></a>
        <md-top-bar-nav>
          <a md-list-item routerLink="/kitchen-sink" [active]="true">Kitchen Sink</a>
          <a md-list-item routerLink="/playground">Playground</a>
        </md-top-bar-nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {
  logo = require('@momentum-ui/core/images/momentum/momentum-horiz-color.svg');
}
