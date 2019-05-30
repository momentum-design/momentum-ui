import {
  DOWN_ARROW,
  END,
  ENTER,
  HOME,
  LEFT_ARROW,
  PAGE_DOWN,
  PAGE_UP,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW,
} from '@angular/cdk/keycodes';
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
      [ngClass]="{
        'active': active,
        'disabled': disabled,
        'md-list-item--read-only': isReadOnly,
        'md-list-item--separator': separator
      }"
      role="listitem"
      tabindex="0"
      (click)="expandItem($event)"
      (keydown)="onKeyDown($event)"
    >
      <!-- Icon conditional here -->
      <div class="md-list-item__left" *ngIf="icon">
        <i class="md-icon icon" [ngClass]="[
          icon ? 'icon-' + this.icon : ''
        ]" style="font-size: 20px;"></i>
      </div>

      <div class="md-list-item__center">{{ title }}</div>

      <!-- Conditional based on children -->

      <div class="md-list-item__right" *ngIf="navItems.length > 1">
        <i class="md-icon icon" [ngClass]="[
          expanded ? 'icon-arrow-up_12' : 'icon-arrow-down_12'
        ]" style="font-size: 12px; color: inherit;"></i>
      </div>
    </div>

    <!-- Expansion conditional -->
    <div
      *ngIf="navItems?.length > 1"
      class="md-sidebar-nav__group"
      [ngClass]="[
        headerLevel ? 'md-sidebar-nav__group--' + headerLevel : '',
        navItems.length > 1 || expanded ? 'md-sidebar-nav__group--expanded' : '',
        navItems.length === 0 || !expanded ? 'md-sidebar-nav__group--collapsed' : ''
      ]"
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

  expandItem(e) {
    if (this.disabled) {
      return;
    }

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

  getNewIndex({ change, currentIndex = this.index, lastIndex = this.children.length - 1 }) {
    const getPossibleIndex = () => {
      if (currentIndex + change < 0) {
        return lastIndex;
      } else if (currentIndex + change > lastIndex) {
        return 0;
      }
      return currentIndex + change;
    };
    const possibleIndex = getPossibleIndex();

    if (this.children[possibleIndex].disabled) {
      return this.getNewIndex({
        change,
        currentIndex: possibleIndex,
        lastIndex,
      });
    }
    return possibleIndex;
  }

  onKeyDown(event: KeyboardEvent) {
    let newIndex;
    const key = event.keyCode || event.code;

    switch (key) {
      case SPACE:
      case ENTER:
      case 'Space':
      case 'Enter':
        this.expandItem(event);

        break;

      case UP_ARROW:
      case LEFT_ARROW:
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = this.getNewIndex({
          change: -1,
        });
        this.sidebarNavService.setFocus(newIndex);

        break;

      case RIGHT_ARROW:
      case DOWN_ARROW:
      case 'ArrowRight':
      case 'ArrowDown':
        newIndex = this.getNewIndex({
          change: 1,
        });
        this.sidebarNavService.setFocus(newIndex);

        break;

      case PAGE_UP:
      case HOME:
      case 'PageUp':
      case 'Home':
        newIndex = this.getNewIndex({
          currentIndex: this.children.length - 1,
          change: 1,
        });
        this.sidebarNavService.setFocus(newIndex);

        break;

      case PAGE_DOWN:
      case END:
      case 'PageDown':
      case 'End':
        newIndex = this.getNewIndex({
          currentIndex: 0,
          change: -1,
        });
        this.sidebarNavService.setFocus(newIndex);

        break;

      default:
        break;
    }
    event.preventDefault();
  }
}
