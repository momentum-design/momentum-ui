import {
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'md-input-helper',
  template: `<ng-content></ng-content>`,
  styles: [],
})

export class InputHelperComponent {
  /** @prop Optional css class name | '' */
  @Input() public className: string;

  @HostBinding('class') get _class(): string {
    return (
      `md-input__help-text` +
      `${this.className ? ` ${this.className}` : ''}`
    );
  }
}
