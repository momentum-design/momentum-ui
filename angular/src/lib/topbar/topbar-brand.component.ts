import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: '[cui-top-bar-brand]',
  exportAs: 'cuiTopbarBrand',
  template: `
    <div class="cui-brand__logo">
      <img *ngIf="image" src="{{ image }}" alt="{{ alt }}">
      <i *ngIf="!image" [ngClass]="['icon', icon]"></i>
    </div>
    <div class="cui-brand__title">{{ title }}</div>
  `,
  host: {
    'class': 'cui-brand'
  },
})
export class TopbarBrandComponent {
  /** @prop Image alt text | null */
  @Input() public alt: string;
  /** @prop Icon class name | 'icon-cisco-logo' */
  @Input() public icon: string = 'icon-cisco-logo';
  /** @prop Image source URL | null */
  @Input() public image: string;
  /** @prop Topbar title text | '' */
  @Input() public title: string;
}
