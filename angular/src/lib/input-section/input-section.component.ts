import {
  Component,
  HostBinding,
  Input,
} from '@angular/core';

export type InputSectionType = 'before' | 'after';

@Component({
  selector: 'md-input-section',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})

export class InputSectionComponent {
  /** @prop Determine the InputSection's position | 'before' */
  @Input() public position: InputSectionType = 'before';
  /** @prop Optional css class name | '' */
  @Input() public className: string;

  @HostBinding('class') get _class(): string {
    return (
      `md-input__${this.position || 'before'}` +
      `${this.className ? ` ${this.className}` : ''}`
    );
  }
}
