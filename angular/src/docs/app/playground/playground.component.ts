import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div className="row">
      <div className="example-spacing">
        <example-alert-call-default></example-alert-call-default>
      </div>
    </div>
  `,
})
export class PlaygroundComponent implements OnInit {
  ngOnInit() {}
}
