import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'docs-top-bar',
  template: `
  <div class="cui-top-bar cui-top-bar--{{color}}" [ngClass]="{'cui-top-bar--fixed': fixed}">
    <div class="cui-top-bar__container row">
      <div class="cui-top-bar__brand">
        <a class="cui-brand" [routerLink]="appLink">
          <div class="cui-brand__logo">
            <i *ngIf="!image" class="icon cui-top-bar__icon {{icon}}"></i>
            <img class="cui-top-bar__image" *ngIf="image" [src]="image" [alt]="title">
          </div>
          <div class="cui-brand__title">{{title}}</div>
        </a>
      </div>
      <i class="icon icon-hamburger-menu hide-for-large-up" (click)="openNav()"></i>
      <div class="cui-top-bar__nav">
        <ng-content select="cui-top-nav"></ng-content>
      </div>
      <div class="cui-top-bar__right">
        <ng-content select="cui-top-bar-right"></ng-content>
      </div>
      <i class="cui-top-bar__mobile-menu-button icon icon-list-menu_20" (click)="openNav()"></i>
    </div>
    <div class="cui-top-bar__mobile cui-tb-mobile" [ngClass]="{'open': navOpen}" (click)="closeNav()">
      <i class="cui-tb-mobile__close icon icon-cancel_20"></i>
      <ng-content select="cui-top-nav"></ng-content>
    </div>
    <div class="cui-tb-mobile__mask" [ngClass]="{'open': navOpen}" (click)="closeNav()"></div>
  </div>
`,
})
export class TopBarComponent {
  @Input() public title: string;
  @Input() public logo: string;
  @Input() public icon: string;
  @Input() public image: string;
  @Input() public appLink? = '/';
  @Input() public color? = 'dark';
  @Input() public fixed?: boolean;

  constructor(private router: Router) {}

  public navOpen: boolean = false;

  public openNav(): void {
    this.navOpen = true;
  }

  public closeNav(): void {
    this.navOpen = false;
  }

  public navigate() {
    this.router.navigate(['/']);
  }
}
