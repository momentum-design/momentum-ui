import { Component } from '@angular/core';

@Component({
  selector: 'docs-root',
  template: `
    <div class="docs-container">
      <h1>Welcome to the Collab UI Toolkit for Angular</h1>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'momentum-ui-angular-docs';
}
