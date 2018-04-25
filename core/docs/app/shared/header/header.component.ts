import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'docs-header',
  template: `
  <div
    [ngClass]="{'page-header': !hero,
    'hero hero--fluid': hero,
    'text-center': hero === 'center',
    'page-header--left': textAlign === 'left',
    'hero--dark': textColor === 'light'}" [style.background-image]="'url(' + image + ')'" [style.background-color]="color">
    <div class="page-header__container" [ngClass]="{'page-header--left': textAlign === 'left'}">
      <h1 [ngClass]="{'page-header__title': !hero,'hero__title': hero}">{{title}}</h1>
      <h3 [ngClass]="{'page-header__lead': !hero,'hero__lead': hero}" [innerHTML]="description | keepHtml" *ngIf="description"></h3>
    </div>
  </div>
    `,
  styles: []
})
export class HeaderComponent {
  @Input() public title: string;
  @Input() public description: string;
  @Input() public hero?: any;
  @Input() public textAlign?: string;
  @Input() public image?: string;
  @Input() public color?: string;
  @Input() public textColor?: string;
}
