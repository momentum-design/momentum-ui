import { Component } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div className="row">
      <div className="example-spacing">
        <!-- Insert Example Here -->
        <example-modal-default></example-modal-default>
        <example-modal-full></example-modal-full>
        <example-modal-large></example-modal-large>
        <example-modal-small></example-modal-small>
      </div>
    </div>
  `,
})
export class PlaygroundComponent{}
