import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <example-topbar-light>
      <div className="example-spacing">
          <example-alert-default></example-alert-default>
          <example-alert-success></example-alert-success>
          <example-alert-warning></example-alert-warning>
          <example-alert-error></example-alert-error>
      </div>
    </example-topbar-light>
  `,
})
export class PlaygroundComponent implements OnInit {

  ngOnInit() {}

}
