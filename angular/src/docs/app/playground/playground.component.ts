import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div className="row">
      <div className="example-spacing">
      <example-popover-default></example-popover-default>
      <example-popover-direction></example-popover-direction>
      <example-popover-trigger></example-popover-trigger>
      <example-popover-showarrow></example-popover-showarrow>
      </div>
    </div>
  `,
})
export class PlaygroundComponent implements OnInit {
  ngOnInit() {}
}
