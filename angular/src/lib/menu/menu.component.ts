import { FocusKeyManager, FocusOrigin } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MenuItemComponent } from './menu-item.component';
import { Subject } from 'rxjs';

export type MenuDirection =
  'top-center' |
  'left-center' |
  'right-center' |
  'bottom-center' |
  'top-left' |
  'top-right' |
  'bottom-left' |
  'bottom-right' |
  'left-top' |
  'left-bottom' |
  'right-top' |
  'right-bottom';

@Component({
  selector: 'md-menu',
  template: `
    <ng-template>
      <div
        [ngClass]="classList"
        class="md-menu-overlay"
        (keydown)="onKeydown($event)"
        >
        <div *ngIf="showArrow" class="md-event-overlay__arrow"></div>
        <div class="md-event-overlay__children">
          <div class="md-menu md-menu-item-container" [attr.aria-label]="ariaLabel" role="menubar">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .md-menu-overlay {
      position: relative;
    }
    .md-event-overlay__arrow {
      position: absolute;
    }
    .md-event-overlay__children {
      position: relative;
    }
  `]
})

export class MenuComponent implements OnInit, AfterContentInit, OnDestroy {
  /** @prop Text to display for accessibility features | ''  */
  @Input() ariaLabel: string = '';
  /** @prop Sets the direction in which the EventOverlay extends | 'bottom-left' */
  @Input()
  get direction(): MenuDirection { return this._direction; }
  set direction(value: MenuDirection) {
    this._direction = value;
    this._setPositionClasses();
  }
  /** @prop Whether the menu has a backdrop. */
  @Input() hasBackdrop: boolean;
  /** @prop Determines if the Menu should show the arrow | false */
  @Input() showArrow: boolean = false;

  /** Event emitted when the menu is closed. */
  @Output() readonly closed: EventEmitter<void | 'click' | 'keydown'> = new EventEmitter<void | 'click' | 'keydown'>();
  @Output() readonly select: EventEmitter<MenuItemComponent> = new EventEmitter<MenuItemComponent>();

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  private _direction: MenuDirection = 'bottom-left';
  private _items: MenuItemComponent[] = [];
  private _itemChanges = new Subject<MenuItemComponent[]>();
  private _keyManager: FocusKeyManager<MenuItemComponent>;

  classList: {[key: string]: boolean} = {};
  parentMenu: MenuComponent | undefined;

  ngOnInit() {
    this._setPositionClasses();
  }

  ngAfterContentInit() {
    this._keyManager = new FocusKeyManager<MenuItemComponent>(this._items).withWrap().withTypeAhead();
  }

  ngOnDestroy() {
    this.closed.complete();
  }

  addItem(item: MenuItemComponent) {
    if (this._items.indexOf(item) === -1) {
      this._items.push(item);
      this._itemChanges.next(this._items);
    }
  }

  removeItem(item: MenuItemComponent) {
    const index = this._items.indexOf(item);

    if (this._items.indexOf(item) > -1) {
      this._items.splice(index, 1);
      this._itemChanges.next(this._items);
    }
  }

  private _setPositionClasses() {
    const side = this.direction.split('-')[0];
    this.classList['md-event-overlay--arrow'] = this.showArrow;
    this.classList['md-event-overlay--top'] = side === 'top';
    this.classList['md-event-overlay--bottom'] = side === 'bottom';
    this.classList['md-event-overlay--left'] = side === 'left';
    this.classList['md-event-overlay--right'] = side === 'right';
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Escape':
        this.closed.emit('keydown');
      break;
      case 'ArrowLeft':
        if (this.parentMenu) {
          this.closed.emit('keydown');
        }
      break;
      case 'ArrowRight':
        if (this.parentMenu) {
          this.closed.emit('keydown');
        }
      break;
      default:
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
          this._keyManager.setFocusOrigin('keyboard');
        }

        this._keyManager.onKeydown(event);
    }
  }

  focusFirstItem(origin: FocusOrigin = 'program'): void {
    this._keyManager.setFocusOrigin(origin).setFirstItemActive();
  }
}
