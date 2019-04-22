/** @component topbar-brand */

import { Component, Input } from '@angular/core';

@Component({
  selector: '[md-top-bar-brand]',
  exportAs: 'mdTopbarBrand',
  template: `
    <div class="md-brand__logo">
      <img *ngIf="image" src="{{ image }}" alt="{{ alt }}" />
      <i *ngIf="!image" [ngClass]="['icon', icon]"></i>
    </div>
    <div class="md-brand__title">{{ title }}</div>
  `,
  host: {
    class: 'md-brand',
  },
})
export class TopbarBrandComponent {
  /** @option Image alt text | null */
  @Input() public alt: string;
  /** @option Icon class name | 'icon-cisco-logo' */
  @Input() public icon: string = 'icon-cisco-logo';
  /** @option Image source URL | null */
  @Input() public image: string;
  /** @option Topbar title text | '' */
  @Input() public title: string;
}
