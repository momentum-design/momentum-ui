import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div className="row">
      <div className="example-spacing">
        <example-tooltip-default></example-tooltip-default>
        <example-tooltip-direction></example-tooltip-direction>
        <example-tooltip-trigger></example-tooltip-trigger>
        <br>
        <example-popover-default></example-popover-default>
        <example-popover-direction></example-popover-direction>
        <example-popover-showarrow></example-popover-showarrow>
      </div>
    </div>
  `,
})
export class PlaygroundComponent implements OnInit {
  ngOnInit() {}

  onSelect (event) {
    console.info('custom onSelect working');
  }
}
