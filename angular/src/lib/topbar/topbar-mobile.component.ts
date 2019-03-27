import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'cui-top-bar-mobile',
  template: `
    <cui-icon
      *ngIf="!isMobileOpen"
      name="list-menu_20"
      buttonClassName="cui-top-bar__mobile-menu-button"
      [attr.aria-pressed]="isMobileOpen"
      [ariaLabel]="openMenuAriaLabel"
      (click)="handleOpen()"
    ></cui-icon>
    <div
      [ngClass]="[
        'cui-top-bar__mobile',
        'cui-tb-mobile',
        (isMobileOpen && 'open') || ''
      ]"
      (click)="shouldCloseOnClick ? handleClose() : null"
      (keydown)="handleKeydown($event)"
      role="menu"
      tabIndex="0"
    >
      <cui-icon
        name="cancel_20"
        buttonClassName="cui-tb-mobile__close"
        [attr.aria-pressed]="isMobileOpen"
        [ariaLabel]="closeMenuAriaLabel"
        (click)="handleClose()"
      ></cui-icon>
      <span (click)="handleClose()" (keydown)="handleKeydown($event)">
        <div class="cui-top-bar__brand">
          <ng-content select="brand"></ng-content>
        </div>
      </span>
      <cui-list-separator backgroundColor="transparent"></cui-list-separator>
      <nav
        class="cui-tb-mobile__nav"
        (click)="!shouldCloseOnClick ? handleClose() : null"
      >
        <ng-content></ng-content>
      </nav>
    </div>
    <div
      [ngClass]="['cui-tb-mobile__mask', (isMobileOpen && 'open') || '']"
      (click)="handleClose()"
      role="none"
    ></div>
  `,
})
export class TopbarMobileComponent {
  /** @prop Aria Label for close Button | 'Close Menu' */
  @Input() public closeMenuAriaLabel: string = 'Close Menu';
  /** @prop Aria Label for open Button | 'Open Menu */
  @Input() public openMenuAriaLabel: string = 'Open Menu';
  /** @prop Set mobile menu to close on any click | true */
  @Input() public shouldCloseOnClick: boolean = true;

  public isMobileOpen: boolean = false;

  @HostListener('document:keydown', ['$event']) handleKeydown(
    e: KeyboardEvent
  ) {
    if (e.code === 'Space' || e.code === 'Enter') {
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
