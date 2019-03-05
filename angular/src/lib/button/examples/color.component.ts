import { Component } from '@angular/core';

@Component({
  selector: 'example-button-color',
  template: `
    <button
      cui-button
      aria-label="myAriaLabel"
      color="blue"
      (click)="onClick()"
    >Color Property String</button>

    <button
      cui-button
      aria-label="myAriaLabel"
      [color]="myColorVariable"
      (click)="onClick()"
    >Color Property Variable</button>
  `,
})
export class ExampleButtonColorComponent {
  myColorVariable = 'green';

  onClick() {
    alert('Button Clicked!');
  }
}
