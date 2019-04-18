import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div className="row">
      <div className="example-spacing">
        <!-- Insert example here -->
      </div>
    </div>
  `,
})
export class PlaygroundComponent implements OnInit {
  ngOnInit() {}
}
