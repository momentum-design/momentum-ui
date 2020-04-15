import { Component } from '@angular/core';

@Component({
  selector: 'example-tooltip-default',
  template: `
  <button md-button aria-label="myAriaLabel" mdTooltip="Hello World!" (click)="onClick()">
    Using Text
  </button>
  <button md-button aria-label="myAriaLabel" mdTooltip="" tooltipHTML="<b>Inner HTML template</b><br><i>Italic</i><br>Normal" (click)="onClick()">
    Using tooltipHTML
  </button>
  <button md-button aria-label="myAriaLabel" mdTooltip="Hello World!" tooltipHTML="<b>Inner HTML template</b><br><i>Italic</i><br>Normal" (click)="onClick()">
    Both
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
