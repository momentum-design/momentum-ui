/** @component badge */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cui-badge',
  template: `
    <span [className]="classes">
      <ng-content></ng-content>
    </span>
  `,
  styles: []
})
export class BadgeComponent implements OnInit {
  @Input() public rounded: boolean;
  @Input() public color: string;
  @Input() public className: string;

  public classes: string;

  constructor() { }

  ngOnInit() {
    this.classes =
      'cui-badge' +
      `${(this.rounded && ` cui-badge--round`) || ''}` +
      `${(this.color && ` cui-badge--${this.color}`) || ''}` +
      `${(this.className && ` ${this.className}`) || ''}` +
      ``;
  }
}
