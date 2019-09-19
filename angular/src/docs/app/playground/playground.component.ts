import { Component } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div data-docs-overview="docs-overview">
      <article class="row copy-spacing">
        <h1>Playground</h1>
        <div class="docs-container">
          <!-- Insert Example Here -->
        <example-data-table-multi-select></example-data-table-multi-select>

        <example-select-multi></example-select-multi>
        </div>
      </article>
    </div>
  `,
})
export class PlaygroundComponent { }
