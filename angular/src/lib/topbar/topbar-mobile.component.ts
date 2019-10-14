/** @component topbar-mobile */

import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'md-top-bar-mobile',
  template: `
    <md-icon
      *ngIf="!isMobileOpen"
      name="list-menu_20"
      buttonClassName="md-top-bar__mobile-menu-button"
      [attr.aria-pressed]="isMobileOpen"
      [ariaLabel]="openMenuAriaLabel"
      (click)="handleOpen()"
    ></md-icon>
    <div
      [ngClass]="[
        'md-top-bar__mobile',
        'md-tb-mobile',
        (isMobileOpen && 'open') || ''
      ]"
      (click)="shouldCloseOnClick ? handleClose() : null"
      (keydown)="handleKeydown($event)"
      role="menu"
      tabIndex="0"
    >
      <md-icon
        name="cancel_20"
        buttonClassName="md-tb-mobile__close"
        [attr.aria-pressed]="isMobileOpen"
        [ariaLabel]="closeMenuAriaLabel"
        (click)="handleClose()"
      ></md-icon>
      <span (click)="handleClose()" (keydown)="handleKeydown($event)">
        <div class="md-top-bar__brand">
          <ng-content select="brand"></ng-content>
        </div>
      </span>
      <md-list-separator backgroundColor="transparent"></md-list-separator>
      <nav
        class="md-tb-mobile__nav"
        (click)="!shouldCloseOnClick ? handleClose() : null"
      >
        <ng-content></ng-content>
      </nav>
    </div>
    <div
      [ngClass]="['md-tb-mobile__mask', (isMobileOpen && 'open') || '']"
      (click)="handleClose()"
      role="none"
    ></div>
  `,
})
export class TopbarMobileComponent {
  /** @option Aria Label for close Button | 'Close Menu' */
  @Input() public closeMenuAriaLabel: string = 'Close Menu';
  /** @option Aria Label for open Button | 'Open Menu */
  @Input() public openMenuAriaLabel: string = 'Open Menu';
  /** @option Set mobile menu to close on any click | true */
  @Input() public shouldCloseOnClick: boolean = true;

  public isMobileOpen: boolean = false;

  @HostListener('document:keydown', ['$event']) handleKeydown(
    e: KeyboardEvent
  ) {
    if (e.code === 'Enter') {
      this.handleClose();
      e.preventDefault();
    }
  }

  handleClose(): void {
    this.isMobileOpen = false;
  }

  handleOpen(): void {
    this.isMobileOpen = true;
  }
}
