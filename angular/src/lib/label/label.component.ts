import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'md-label',
  template: `
    <label
      [attr.for]="htmlFor"
      [ngClass]="[
        'md-label',
        (theme && 'md-label--' + theme) || '',
        (className && className) || ''
      ]"
    >
      <span *ngIf="label">{{label}}</span>
      <ng-content></ng-content>
    </label>
  `,
  styles: []
})

export class LabelComponent {
  /** @prop HTML class name for associated Input | '' */
  @Input() public className: string;
  /** @prop Set Label's color theme | '' */
  @Input() public theme: string;
  /** @prop Optional Label text | null */
  @Input() public label: string;
  /** @prop HTML ID for associated control | null */
  @Input() public htmlFor: string;
}
