import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'md-sidebar',
  template: `

  <div class="md-sidebar" [ngClass]="sidebarClass">
    <ng-content></ng-content>
  </div>

  <div *ngIf="withToggle" class="md-sidebar__toggle" [ngClass]="toggleButtonClass">
    <button
      (click)="toggleExpanded()"
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
  host: {
    class: 'md-sidebar__wrapper',
  },
})

export class SideBarComponent implements OnInit, OnDestroy {

  /** @prop Sets Sidebar to position fixed | false */
  @Input() isFixed = false;
  /** @prop Sets Sidebar styling for page level | false */
  @Input() isPageLevel = false;
  /** @prop Sets padding for Topbar | false */
  @Input() withTopbar = false;
  /** @prop Changes padding based on Icon nav | true */
  @Input() withIcons = true;
  /** @prop Set to make the navigation expandable | true */
  @Input() expandable = true;
  /** @prop Set navigation expanded or collapsed | true */
  @Input() expanded = true;
  /** @prop Optional CSS class string for sidebar | '' */
  @Input() wrapperClass = '';
  /** @prop Optional color theme | '' */
  @Input() theme = '';
  /** @prop optional toggle button to expand/collapse sidebar | false */
  @Input() withToggle = false;
  /** @prop optional toggle behavior to automatically expand/collapse sidebar | false */
  @Input() autoToggle = false;
  /** @prop optional auto toggle width to automatically trigger toggle behavior | 960 */
  @Input() autoToggleWidth = 960;
  /** @prop optional CSS class for the toggle button */
  @Input() buttonClass = '';

  @Output() toggle = new EventEmitter<{ expanded: boolean; }>();

  private subs = new Subscription();
  private hasTier = false;
  private isAutoToggled = true;

  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit() {
    this.subs.add(
      this.sidebarService.tier$.subscribe(tier => this.hasTier = tier)
    );

    if (this.autoToggle) {
      this.subs.add(
        fromEvent(window, 'resize').pipe(
          debounceTime(250),
          map(() => this.isSmallScreen()),
        ).subscribe(isSmallScreen => this.autoToggleExpanded(isSmallScreen))
      );
    };
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  toggleExpanded({ expanded = !this.expanded, isAutoToggled = false } = {}): void {
    this.expanded = expanded;
    this.isAutoToggled = isAutoToggled;
    this.toggle.emit({
      expanded,
    });
  }

  private autoToggleExpanded(isSmallScreen: boolean): void {
    if (!this.isAutoToggled) {
      return;
    }
    if (isSmallScreen && this.expanded) {
      this.toggleExpanded({
        expanded: false,
        isAutoToggled: true,
      });
    } else if (!isSmallScreen && !this.expanded) {
      this.toggleExpanded({
        expanded: true,
        isAutoToggled: true,
      });
    }
  }

  private isSmallScreen(): boolean {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    return width < this.autoToggleWidth;
  }

  get iconClass() {
    return {
      'icon-panel-control-left_12': this.expanded,
      'icon-panel-control-right_12': !this.expanded
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
      'md-sidebar--minimized': !this.expanded && this.withIcons,
      'md-sidebar--collapsed': !this.expanded && !this.withIcons,
      [this.wrapperClass] : this.wrapperClass
    };
  }

  get toggleButtonClass() {
    return {
      'md-sidebar__toggle--minimized': !this.expanded && this.withIcons,
      'md-sidebar__toggle--collapsed': !this.expanded && !this.withIcons,
      [this.buttonClass] : this.buttonClass
    };
  }
}
