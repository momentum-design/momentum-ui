import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayConfig,
  OverlayRef,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';

@Directive({
  selector: `[mdMenuTriggerFor]`,
  host: {
    'aria-haspopup': 'true',
    '[attr.aria-expanded]': 'menuOpen || null',
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeydown($event)',
    '(mousedown)': 'onMousedown($event)',
  }
})
export class MenuTriggerDirective implements OnDestroy {
  @Input('mdMenuTriggerFor')
  get menu() { return this._menu; }
  set menu(menu: MenuComponent) {
    if (menu === this._menu) {
      return;
    }

    this._menu = menu;
    this._menuCloseSubscription.unsubscribe();

    if (menu) {
      this._menuCloseSubscription = menu.closed.asObservable().subscribe(reason => {
        this._destroyMenu();

        if (reason === 'click' && this._parentMenu) {
          this._parentMenu.closed.emit(reason);
        }
      });
    }
  }

  @Output() readonly menuOpened: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly menuClosed: EventEmitter<void> = new EventEmitter<void>();

  private _menu: MenuComponent;
  private _menuOpen: boolean = false;
  private _openedBy: 'mouse' | null = null;
  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal;
  private _closingActionsSubscription = Subscription.EMPTY;
  private _menuCloseSubscription = Subscription.EMPTY;

  constructor(private _overlay: Overlay,
              private _element: ElementRef<HTMLElement>,
              private _viewContainerRef: ViewContainerRef,
              @Optional() private _parentMenu: MenuComponent,
              @Optional() @Self() private _menuItemInstance: MenuItemComponent,
              private _focusMonitor?: FocusMonitor) {
    if (_menuItemInstance) {
      _menuItemInstance.triggersSubmenu = this.triggersSubmenu();
    }
  }

  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }

    this._cleanUpSubscriptions();
    this._closingActionsSubscription.unsubscribe();
  }

  get menuOpen(): boolean {
    return this._menuOpen;
  }

  triggersSubmenu(): boolean {
    return !!(this._menuItemInstance && this._parentMenu);
  }

  toggleMenu(): void {
    return this._menuOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    if (this._menuOpen) {
      return;
    }

    const overlayRef = this._createOverlay();
    const overlayConfig = overlayRef.getConfig();
    const positionStrategy = overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;

    this._setPosition(positionStrategy);
    overlayConfig.hasBackdrop = this.menu.hasBackdrop == null ? !this.triggersSubmenu() : this.menu.hasBackdrop;
    overlayRef.attach(this._getPortal());

    this._closingActionsSubscription = this._menuClosingActions().subscribe(() => this.closeMenu());
    this._initMenu();
  }

  closeMenu(): void {
    this.menu.closed.emit();
  }

  focus(origin: FocusOrigin = 'program') {
    if (this._focusMonitor) {
      this._focusMonitor.focusVia(this._element, origin);
      if (this._menuItemInstance) {
        this._menuItemInstance.focus();
      }
    } else {
      this._element.nativeElement.focus();
    }
  }

  private _destroyMenu() {
    if (!this._overlayRef || !this.menuOpen) {
      return;
    }

    this._closingActionsSubscription.unsubscribe();
    this._overlayRef.detach();
    this._resetMenu();
  }

  private _initMenu(): void {
    this.menu.parentMenu = this.triggersSubmenu() ? this._parentMenu : undefined;
    this._setIsMenuOpen(true);
    this.menu.focusFirstItem(this._openedBy || 'program');
  }

  private _resetMenu(): void {
    this._setIsMenuOpen(false);
    if (!this._openedBy) {
      this.focus();
    } else if (!this.triggersSubmenu()) {
      this.focus(this._openedBy);
    }
    this._openedBy = null;
  }

  private _setIsMenuOpen(isOpen: boolean): void {
    this._menuOpen = isOpen;
    this._menuOpen ? this.menuOpened.emit() : this.menuClosed.emit();
    if (this.triggersSubmenu()) {
      this._menuItemInstance.active = isOpen;
    }
  }

  private _createOverlay(): OverlayRef {
    if (!this._overlayRef) {
      const config = this._getOverlayConfig();
      this._subscribeToPositions(config.positionStrategy as FlexibleConnectedPositionStrategy);
      this._overlayRef = this._overlay.create(config);
    }

    return this._overlayRef;
  }

  private _getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._overlay.position()
          .flexibleConnectedTo(this._element)
          .withLockedPosition()
          .withTransformOriginOn('.md-event-overlay__children'),
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private _subscribeToPositions(position: FlexibleConnectedPositionStrategy): void {
    position.positionChanges.subscribe(change => {
      const overlayX = change.connectionPair.overlayX;
      const overlayY = change.connectionPair.overlayY;
      this._setArrowPosition(overlayX, overlayY);
    });
  }

  private _setArrowPosition(overlayX: HorizontalConnectionPos, overlayY: VerticalConnectionPos) {
    if (this.menu.showArrow) {
      const side = this.menu.direction.split('-')[0];
      const menuWrapper = this._overlayRef.hostElement.querySelector('.md-menu-overlay') as HTMLElement;
      const arrow = this._overlayRef.hostElement.querySelector('.md-event-overlay__arrow') as HTMLElement;
      const menu = this._overlayRef.hostElement.querySelector('.md-event-overlay__children') as HTMLElement;

      if (['top', 'bottom'].includes(side) && ['top', 'bottom'].includes(overlayY)) {
        const minWidth = Math.min(this._element.nativeElement.offsetWidth, menu.offsetWidth);
        switch (overlayX) {
          case 'start':
            arrow.style['left'] = `${minWidth / 2}px`;
            break;
          case 'end':
            arrow.style['left'] = `${menu.offsetWidth - minWidth / 2}px`;
            break;
          case 'center':
            arrow.style['left'] = `${menu.offsetWidth / 2}px`;
            break;
        }

        if (overlayY === 'top') {
          menu.style['margin-top'] = `${arrow.offsetHeight}px`;
          menu.style['margin-bottom'] = 'auto';
          arrow.style['top'] = '1px';
          arrow.style['bottom'] = 'auto';
        } else {
          menu.style['margin-bottom'] = `${arrow.offsetHeight}px`;
          menu.style['margin-top'] = 'auto';
          arrow.style['bottom'] = '1px';
          arrow.style['top'] = 'auto';
        }
      }

      if (['left', 'right'].includes(side) && ['start', 'end'].includes(overlayX)) {
        const minHeight = Math.min(this._element.nativeElement.offsetHeight, menu.offsetHeight);
        switch (overlayY) {
          case 'top':
            arrow.style['top'] = `${minHeight / 2}px`;
            break;
          case 'bottom':
            arrow.style['top'] = `${menu.offsetHeight - minHeight / 2}px`;
            break;
          case 'center':
            arrow.style['top'] = `${menu.offsetHeight / 2}px`;
            break;
        }

        if (overlayX === 'start') {
          menu.style['margin-left'] = `${arrow.offsetWidth}px`;
          menu.style['margin-right'] = 'auto';
          arrow.style['left'] = '1px';
          arrow.style['right'] = 'auto';
        } else {
          menu.style['margin-right'] = `${arrow.offsetWidth}px`;
          menu.style['margin-left'] = 'auto';
          arrow.style['right'] = '1px';
          arrow.style['left'] = 'auto';
        }
      }

      let newSide: string;
      if (['top', 'bottom'].includes(side)) {
        if (overlayY === 'top') {
          newSide = 'bottom';
        } else {
          newSide = 'top';
        }
      } else {
        if (overlayX === 'start') {
          newSide = 'right';
        } else {
          newSide = 'left';
        }
      }

      menuWrapper.classList.remove('md-event-overlay--top');
      menuWrapper.classList.remove('md-event-overlay--bottom');
      menuWrapper.classList.remove('md-event-overlay--left');
      menuWrapper.classList.remove('md-event-overlay--right');
      menuWrapper.classList.add(`md-event-overlay--${newSide}`);
    }
  }

  private _setPosition(positionStrategy: FlexibleConnectedPositionStrategy) {
    const [side, pos] = this.menu.direction.split('-');
    let [
      originX,
      originFallbackX,
      overlayX,
      overlayFallbackX,
      originFallbackX2,
      overlayFallbackX2,
    ]: HorizontalConnectionPos[] = [];
    let [
      originY,
      originFallbackY,
      overlayY,
      overlayFallbackY,
      originFallbackY2,
      overlayFallbackY2,
    ]: VerticalConnectionPos[] = [];
    const offsetY = 0;

    switch (side) {
      case 'top':
        [originY, originFallbackY] = ['top', 'bottom'];
        [overlayY, overlayFallbackY] = ['bottom', 'top'];
        break;
      case 'bottom':
        [originY, originFallbackY] = ['bottom', 'top'];
        [overlayY, overlayFallbackY] = ['top', 'bottom'];
        break;
      case 'left':
        [originX, originFallbackX] = ['start', 'end'];
        [overlayX, overlayFallbackX] = ['end', 'start'];
        break;
      case 'right':
        [originX, originFallbackX] = ['end', 'start'];
        [overlayX, overlayFallbackX] = ['start', 'end'];
        break;
    }

    switch (pos) {
      case 'left':
        [originX, originFallbackX] = [overlayX, overlayFallbackX] = ['start', 'end'];
        break;
      case 'right':
        [originX, originFallbackX] = [overlayX, overlayFallbackX] = ['end', 'start'];
        break;
      case 'top':
        [originY, originFallbackY] = [overlayY, overlayFallbackY] = ['top', 'bottom'];
        break;
      case 'bottom':
        [originY, originFallbackY] = [overlayY, overlayFallbackY] = ['bottom', 'top'];
        break;
      case 'center':
        if (['bottom', 'top'].includes(side)) {
          originX = overlayX = 'center';
          originFallbackX = overlayFallbackX = 'start';
          originFallbackX2 = overlayFallbackX2 = 'end';
        } else {
          originY = overlayY = 'center';
          originFallbackY = overlayFallbackY = 'top';
          originFallbackY2 = overlayFallbackY2 = 'bottom';
        }
        break;
    }

    if (this.triggersSubmenu()) {
      if (side !== 'left') {
        [originX, originFallbackX] = ['end', 'start'];
        [overlayX, overlayFallbackX] = ['start', 'end'];
      } else {
        [originX, originFallbackX] = ['start', 'end'];
        [overlayX, overlayFallbackX] = ['end', 'start'];
      }
      originY = originFallbackY = overlayY = overlayFallbackY = 'top';
    }

    let positions = [
      {originX, originY, overlayX, overlayY, offsetY},
      {
        originX: originFallbackX,
        originY,
        overlayX: overlayFallbackX,
        overlayY, offsetY
      },
      {
        originX,
        originY: originFallbackY,
        overlayX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY
      },
      {
        originX: originFallbackX,
        originY: originFallbackY,
        overlayX: overlayFallbackX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY
      }
    ];

    if (originFallbackX2 && overlayFallbackX2 && !this.triggersSubmenu()) {
      positions = positions.concat([
        {
          originX: originFallbackX2,
          originY,
          overlayX: overlayFallbackX2,
          overlayY, offsetY
        },
        {
          originX: originFallbackX2,
          originY: originFallbackY,
          overlayX: overlayFallbackX2,
          overlayY: overlayFallbackY,
          offsetY: -offsetY
        }
      ]);
    }

    if (originFallbackY2 && overlayFallbackY2 && !this.triggersSubmenu()) {
      positions = positions.concat([
        {
          originX,
          originY: originFallbackY2,
          overlayX,
          overlayY: overlayFallbackY2,
          offsetY: -offsetY
        },
        {
          originX: originFallbackX,
          originY: originFallbackY2,
          overlayX: overlayFallbackX,
          overlayY: overlayFallbackY2,
          offsetY: -offsetY
        }
      ]);
    }

    positionStrategy.withPositions(positions);
  }

  private _cleanUpSubscriptions(): void {
    this._closingActionsSubscription.unsubscribe();
  }

  private _menuClosingActions() {
    const backdrop = this._overlayRef.backdropClick();
    const detachments = this._overlayRef.detachments();
    if (this._parentMenu) {
      const parentClose = this._parentMenu.closed;
      return merge(backdrop, detachments, parentClose);
    } else {
      return merge(backdrop, detachments);
    }
  }

  onClick(event: MouseEvent): void {
    if (this.triggersSubmenu()) {
      event.stopPropagation();
      this.openMenu();
    } else {
      this.toggleMenu();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.triggersSubmenu() && (
          event.code === 'ArrowRight' ||
          event.code === 'ArrowLeft' ||
          event.code === 'Enter' ||
          event.code === 'Space')) {
      this.openMenu();
    }
  }

  onMousedown(event: MouseEvent): void {
    this._openedBy = event.button === 0 ? 'mouse' : null;
    if (this.triggersSubmenu()) {
      event.preventDefault();
    }
  }

  private _getPortal(): TemplatePortal {
    if (!this._portal || this._portal.templateRef !== this.menu.templateRef) {
      this._portal = new TemplatePortal(this.menu.templateRef, this._viewContainerRef);
    }
    return this._portal;
  }
}
