import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'md-label',
  template: `
    <label
      [attr.for]="htmlFor"
      [ngClass]="[
        theme ? 'md-label--' + this.theme : '',
        className
      ]">
      <span>{{ label }}</span>
    </label>
  `,
  styles: [],
})
export class LabelComponent {
  @Input() public className: string;
  @Input() public theme: string;
  @Input() public label: string;
  @Input() public htmlFor: string;

  constructor() {}
}
