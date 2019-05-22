import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { SidebarNavService } from '../sidebar-nav/sidebar-nav.service';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'md-sidebar-nav-item',
  template: `
    <!-- default always here -->
    <div
      #navItemRef
      aria-current="false"
      class="md-list-item"
      [ngClass]="listItemClass"
      role="listitem"
      tabindex="0"
      (click)="expandItem($event)"
      (keydown)="onKeyDown($event)"
    >
      <!-- Icon conditional here -->
      <div class="md-list-item__left" *ngIf="icon">
        <i class="md-icon icon" [ngClass]="iconLeftClass" style="font-size: 20px;"></i>
      </div>

      <div class="md-list-item__center">{{ title }}</div>

      <!-- Conditional based on children -->

      <div class="md-list-item__right" *ngIf="navItems.length > 1">
        <i class="md-icon icon" [ngClass]="iconClass" style="font-size: 12px; color: inherit;"></i>
      </div>
    </div>

    <!-- Expansion conditional -->
    <div
      *ngIf="navItems?.length > 1"
      class="md-sidebar-nav__group"
      [ngClass]="sidebarNavGroupClasses"
    >
      <ng-content> </ng-content>
    </div>
  `,
  styles: [],
})
export class SidebarNavItemComponent implements AfterContentInit, OnInit, OnDestroy {
  /** @prop Title for the side item navigation | '' */
  @Input() title: string = '';
  /** @prop establishes the level - primary, secondary, or tertiary | 'primary' */
  @Input() headerLevel: string = 'primary';
  /** @prop Set navigation expanded or collapsed | false */
  @Input() expanded: boolean = false;
  /** @prop set active class on side item */
  @Input() active: boolean = false;
  /** @prop Icon string or node for the title | null */
  @Input() icon: string = '';
  /** @prop disables the sidebar nav item */
  @Input() disabled: boolean = false;
  /** @prop marks the sidebar nav item as read-only */
  @Input() isReadOnly: boolean = false;
  /** @prop creates a separator line below the sidebar nav item */
  @Input() separator: boolean = false;

  @ViewChild('navItemRef') navItemRef: ElementRef;

  @Output() navItemClick: EventEmitter<any> = new EventEmitter();

  @ContentChildren(SidebarNavItemComponent) navItemList: QueryList<SidebarNavItemComponent>;

  public navItems: SidebarNavItemComponent[] = [];

  private children: SidebarNavItemComponent[];
  private index: number;
  private nestedFound: boolean;
  private subs = new Subscription();

  constructor(
    private sidebarNavService: SidebarNavService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    const index$ = this.sidebarNavService.sidebarNavItems$.pipe(
      tap(sidebarNavItems => (this.children = sidebarNavItems)),
      map(sidebarNavItems => sidebarNavItems.findIndex(sidebarNavItem => sidebarNavItem === this)),
      tap(index => (this.index = index))
    );
    this.subs.add(
      this.sidebarNavService.focus$.pipe(withLatestFrom(index$)).subscribe(([focus, index]) => {
        if (focus === index) {
          this.navItemRef.nativeElement.focus();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngAfterContentInit() {
    this.navItems = this.navItemList.toArray();

    this.nestedFound = this.navItems.some(
      item => item.headerLevel === 'secondary' || item.headerLevel === 'tertiary'
    );

    if (this.nestedFound) {
      this.sidebarService.changeTier(true);
    }
  }

  get sidebarNavGroupClasses() {
    return {
      ['md-sidebar-nav__group--' + this.headerLevel]: this.headerLevel,
      ['md-sidebar-nav__group--expanded']: this.navItems.length > 1 || this.expanded,
      ['md-sidebar-nav__group--collapsed']: this.navItems.length === 0 || !this.expanded,
    };
  }

  get listItemClass() {
    return {
      active: this.active,
      disabled: this.disabled,
      ['md-list-item--read-only']: this.isReadOnly,
      ['md-list-item--separator']: this.separator,
    };
  }

  get iconClass() {
    return {
      'icon-arrow-up_12': this.expanded,
      'icon-arrow-down_12': !this.expanded,
    };
  }

  get iconLeftClass() {
    return {
      ['icon-' + this.icon]: this.icon,
    };
  }

  expandItem(e) {
    this.expanded = !this.expanded;

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].active = false;
    }

    this.children[this.index].active = true;

    this.sidebarNavService.setFocus(this.index);

    this.navItemClick.emit({
      navItem: this.children[this.index],
      title: this.children[this.index].title,
    });
  }

  getNewIndex(currentIndex, change, lastIdx) {
    const getPossibleIndex = () => {
      if (currentIndex + change < 0) {
        return lastIdx;
      } else if (currentIndex + change > lastIdx) {
        return 0;
      }
      return currentIndex + change;
    };
    const possibleIndex = getPossibleIndex();

    if (this.children[possibleIndex].disabled) {
      return this.getNewIndex(possibleIndex, change, lastIdx);
    }
    return possibleIndex;
  }

  onKeyDown(event: KeyboardEvent) {
    let newIndex;

    switch (event.code) {
      case 'Space':
      case 'Enter':
        this.expandItem(event);

        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = this.getNewIndex(this.index, -1, this.children.length - 1);
        this.sidebarNavService.setFocus(newIndex);

        break;

      case 'ArrowRight':
      case 'ArrowDown':
        newIndex = this.getNewIndex(this.index, 1, this.children.length - 1);
        this.sidebarNavService.setFocus(newIndex);

        break;

      case 'PageUp':
      case 'Home':
        this.sidebarNavService.setFocus(0);

        break;

      case 'PageDown':
      case 'End':
        this.sidebarNavService.setFocus(this.children.length - 1);

        break;

      default:
        break;
    }
    event.preventDefault();
  }
}
