import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'md-sidebar',
  template: `

  <div class="md-sidebar" [ngClass]="[
    theme ? 'md-sidebar--' + theme : '',
    isFixed ? 'md-sidebar--fixed' : '',
    !isPageLevel ? 'md-sidebar--global' : '',
    withTopbar ? 'md-sidebar--topbar' : '',
    withIcons && !isPageLevel ? 'md-sidebar--indented' : '',
    hasTier ? 'md-sidebar--nested' : '',
    expanded ? 'md-sidebar--expanded' : '',
    !expanded && withIcons ? 'md-sidebar--minimized' : '',
    !expanded && !withIcons ? 'md-sidebar--collapsed' : '',
    wrapperClass
  ]">
    <ng-content></ng-content>
  </div>

  <div *ngIf="withToggle" class="md-sidebar__toggle" [ngClass]="[
    !expanded && withIcons ? 'md-sidebar__toggle--minimized' : '',
    !expanded && !withIcons ? 'md-sidebar__toggle--collapsed' : '',
    buttonClass
  ]">
    <button
      (click)="toggleExpanded()"
      class="md-button md-button--36 md-collapse-button"
      type="button"
      aria-label="Hide panels"
    >
      <span class="md-button__children" style="opacity: 1;">
        <i class="md-icon icon" [ngClass]="[
          this.expanded ? 'icon-panel-control-left_12' : 'icon-panel-control-right_12'
        ]"></i>
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

  hasTier = false;
  private subs = new Subscription();
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
    }
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
}
