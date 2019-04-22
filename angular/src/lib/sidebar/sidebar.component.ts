import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'md-sidebar',
  template: `

  <div class="md-sidebar" [ngClass]="sidebarClass">
    <ng-content></ng-content>
  </div>

  <div *ngIf="withToggle" class="md-sidebar__toggle" [ngClass]="toggleButtonClass">
    <button
      (click)="toggleNav()"
      class="md-button md-button--36 md-collapse-button"
      type="button"
      aria-label="Hide panels"
    >
      <span class="md-button__children" style="opacity: 1;">
        <i class="md-icon icon" [ngClass]="iconClass"></i>
      </span>
    </button>
  </div>
  `,
  styles: [],
  providers: [SidebarService],
})

export class SideBarComponent implements OnInit {

  /** @prop Sets Sidebar to position fixed | false */
  @Input() isFixed: boolean = false;
  /** @prop Sets Sidebar styling for page level | false */
  @Input() isPageLevel: boolean = false;
  /** @prop Sets padding for Topbar | false */
  @Input() withTopbar: boolean = false;
  /** @prop Changes padding based on Icon nav | true */
  @Input() withIcons: boolean = true;
  /** @prop Set to make the navigation expandable | true */
  @Input() expandable: boolean = true;
  /** @prop Set navigation expanded or collapsed | true */
  @Input() expanded: boolean = true;
  /** @prop Optional CSS class string for sidebar | '' */
  @Input() wrapperClass: string = '';
  /** @prop Optional color theme  | '' */
  @Input() theme: string = '';
  /** @prop optional toggle button to expand/collapse sidebar */
  @Input() withToggle: boolean = false;

  hasTier;
  toggle: boolean = true;
  skinnyNav: boolean = false;

  constructor(private sidebarService: SidebarService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.sidebarService.tier$.subscribe(tier => this.hasTier = tier);
  }

  toggleNav() {
    this.toggle = !this.toggle;
    this.expanded = !this.expanded;

    if (this.withToggle) {
      this.skinnyNav = !this.skinnyNav;
    }
  }

  get iconClass() {
    return {
      'icon-panel-control-left_12': this.toggle,
      'icon-panel-control-right_12': !this.toggle
    };
  }

  get sidebarClass() {
    return {
      ['md-sidebar--' + this.theme] : this.theme,
      'md-sidebar--fixed': this.isFixed,
      'md-sidebar--global': !this.isPageLevel,
      'md-sidebar--topbar': this.withTopbar,
      'md-sidebar--indented': this.withIcons && !this.isPageLevel,
      'md-sidebar--nested': this.hasTier,
      'md-sidebar--expanded': this.expanded,
      'md-sidebar--minimized': this.skinnyNav && this.withIcons,
      'md-sidebar--collapsed': this.skinnyNav && !this.withIcons,
      [this.wrapperClass] : this.wrapperClass
    };
  }

  get toggleButtonClass() {
    return {
      'md-sidebar__toggle--minimized': this.skinnyNav && this.withIcons,
      'md-sidebar__toggle--collapsed': this.skinnyNav && !this.withIcons
    };
  }
}
