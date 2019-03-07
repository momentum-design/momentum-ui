import {
  Component,
  HostBinding,
  Input,
} from '@angular/core';

export type CompositeAvatarType = 'small' | 'medium' | 'large' | 28 | 40 | 84 | 135;

@Component({
  selector: 'cui-composite-avatar',
  template: `
    <ng-content></ng-content>
  `
})
export class CompositeAvatarComponent {
  @Input() private className: string = '';
  @Input() private size: CompositeAvatarType = 'medium';

  @HostBinding('class') get _class(): string {
    return 'cui-composite-avatar' +
      `${this.size && ` cui-composite-avatar--${this.size}` || ''}` +
      `${this.className && ` ${this.className}` || ''}`;
  }

  constructor() { }
}
