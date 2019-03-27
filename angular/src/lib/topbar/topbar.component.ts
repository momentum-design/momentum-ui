import { Component, Input } from '@angular/core';

export type TopbarColor = 'dark' | 'light' | 'blue';

@Component({
  selector: 'header[cui-top-bar]',
  template: `
    <div class="cui-top-bar__container">
      <div class="cui-top-bar__brand">
        <ng-content select="brand"></ng-content>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  host: {
    'attr.role': 'navigation',
    class: 'cui-top-bar',
    '[class.cui-top-bar--fixed]': 'fixed',
    '[class.cui-top-bar--blue]': 'color === "blue"',
    '[class.cui-top-bar--dark]': 'color === "dark"',
    '[class.cui-top-bar--light]': 'color === "light"',
  },
})
export class TopbarComponent {
  /** @prop Topbar header color | '' */
  @Input() public color: TopbarColor;
  /** @prop Determines if Topbar is fixed to top | false */
  @Input() public fixed: boolean;
}
