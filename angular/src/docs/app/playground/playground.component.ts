import { Component } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div className="row">
      <div className="example-spacing">
        <!-- Insert Example Here -->
        <example-drawer-default></example-drawer-default>
        <example-drawer-openfrom></example-drawer-openfrom>
      </div>
    </div>
  `,
})
export class PlaygroundComponent{}
