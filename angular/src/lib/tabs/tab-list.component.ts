import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'md-tab-list',
template: `
    <ul
      class="md-tab__list"
      [attr.role]="role"
    >
      <ng-content></ng-content>
    </ul>
  `,
  styles: [],
})
export class TabListComponent {
  /** @prop Tab's anchor role type | 'tablist' */
  @Input() public role: string = 'tablist';
}
