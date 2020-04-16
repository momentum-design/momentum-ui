import { Component } from '@angular/core';

@Component({
  selector: 'example-tooltip-default',
  template: `
  <button md-button aria-label="myAriaLabel" mdTooltip="Hello World!" (click)="onClick()">
    Text
  </button>
  <button md-button aria-label="myAriaLabel" [mdTooltip]="tooltipTemplate" [closeOnClick]="true" (click)="onClick()">
    Template
  </button>
  <ng-template #tooltipTemplate>
    <span style="color:white">Enter Text&nbsp;</span>
    <input>
  </ng-template>
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
