import { Component } from '@angular/core';

@Component({
  selector: 'example-tooltip-default',
  template: `
  <button md-button aria-label="myAriaLabel" mdTooltip="Hello World!" (click)="onClick()">
    Test Me
  </button>
  `,
  styles: []
})
export class TooltipDefaultComponent {

  constructor() {
   }

   onClick() {
    alert('Button Clicked!');
  }

}
