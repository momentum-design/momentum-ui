import { Component, Input } from '@angular/core';

let nextUniqueId = 0;

@Component({
  selector: 'md-input-message',
  template: `<ng-content></ng-content>`,
  styles: [],
  host: {
    'class': 'md-input__message',
    'role': 'alert',
    '[attr.id]': 'id'
  }
})

export class InputMessageComponent {
  /** @prop Unique HTML ID used for automated testing | null */
  @Input() id: string = `md-error-${nextUniqueId++}`;
}
