import { FocusableOption, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
} from '@angular/core';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'md-menu-item',
  template: `
    <div
      md-list-item
      [active]="active"
      [isReadOnly]="isHeader"
      [ngClass]="{'md-menu-item__header': isHeader}"
      role="menuitem"
      tabindex="-1"
    >
      <ng-container *ngIf="!triggersSubmenu; else submenuTemplate">
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </ng-container>
    </div>

    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>

    <ng-template #submenuTemplate>
      <div class="md-menu-item__content">
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </div>
      <div
        *ngIf="selectedValue"
        class="md-menu-item__selected-value"
        [attr.title]="selectedValue"
        >{{ selectedValue }}</div>
      <div class="md-menu-item__arrow">
        <md-icon name="icon-arrow-right_16"></md-icon>
      </div>
    </ng-template>
  `,
  host: {
    'class': 'md-menu-item',
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeydown($event)',
  }
})
export class MenuItemComponent implements FocusableOption, OnDestroy {
  /** @prop Active prop to determine styles | false */
  @Input() active = false;
  /** @prop Determines if MenuItem is the header | false */
  @Input() isHeader: boolean = false;
  /** @prop Initial selected value within SubMenu | '' */
  @Input() selectedValue: string = '';

  /** Whether the menu item acts as a trigger for a sub-menu. */
  triggersSubmenu: boolean = false;

  get listItemElement(): HTMLElement {
    return this._elementRef.nativeElement.querySelector('.md-list-item');
  }

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _focusMonitor?: FocusMonitor,
    @Optional() private _parentMenu?: MenuComponent) {
    if (_focusMonitor) {
      _focusMonitor.monitor(this._elementRef, false);
    }

    if (_parentMenu && _parentMenu.addItem) {
      _parentMenu.addItem(this);
    }
  }

  ngOnDestroy() {
    if (this._focusMonitor) {
      this._focusMonitor.stopMonitoring(this._elementRef);
    }
    if (this._parentMenu && this._parentMenu.removeItem) {
      this._parentMenu.removeItem(this);
    }
  }

  focus(origin: FocusOrigin = 'program'): void {
    if (this._focusMonitor) {
      this._focusMonitor.focusVia(this.listItemElement, origin);
    } else {
      this.listItemElement.focus();
    }
  }

  getLabel(): string {
    return this.listItemElement.textContent.trim();
  }

  onClick(_: MouseEvent): void {
    if (this._parentMenu && !this.triggersSubmenu && !this.isHeader) {
      this._parentMenu.select.emit(this);
      this._parentMenu.closed.emit('click');
    }
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Enter':
      case 'Space':
        if (this._parentMenu && !this.triggersSubmenu && !this.isHeader) {
          this._parentMenu.select.emit(this);
          this._parentMenu.closed.emit('click');
        }
      break;
    }
  }

}
