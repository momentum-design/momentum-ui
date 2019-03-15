import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div className="row">
      <div className="example-spacing">
          <example-alert-default></example-alert-default>
          <example-alert-success></example-alert-success>
          <example-alert-warning></example-alert-warning>
          <example-alert-error></example-alert-error>
      </div>
    </div>
  `,
})
export class PlaygroundComponent implements OnInit {

  ngOnInit() {}

}
