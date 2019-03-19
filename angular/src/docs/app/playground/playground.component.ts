import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div className="row">
      <div className="example-spacing">
          <example-date-picker-default></example-date-picker-default>
      </div>
    </div>
  `,
})
export class PlaygroundComponent implements OnInit {

  ngOnInit() {}

}
