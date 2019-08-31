import { Component } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
    <div className="row">
      <div className="example-spacing">
        <avatar-element
          [title]="title"
          [backgroundColor]="backgroundColor"
          (click)="handleClick($event)"
        >
        </avatar-element>
      </div>
    </div>
  `,
})
export class PlaygroundComponent {
  private title: String;
  private backgroundColor: String;

  constructor() {
    this.title = 'Webex Teams';
    this.backgroundColor = 'blue';
  }

  handleClick(e) {
    console.log(`Clicked ${e}`);
  }
}
