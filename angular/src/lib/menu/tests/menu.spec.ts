import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  Type,
  Provider,
} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {FocusMonitor} from '@angular/cdk/a11y';
import {
  IconModule,
  MenuModule,
  ListItemSectionModule,
} from 'src/lib/public_api';
import { MenuTriggerDirective, MenuComponent, MenuItemComponent } from '../index';
import { MenuDirection } from '../menu.component';


@Component({
  template: `
    <button #triggerEl aria-label="Show Menu" [mdMenuTriggerFor]="testMenu">Show Menu</button>

    <md-menu #testMenu [showArrow]="showArrow" [direction]="direction" (select)="onSelect($event)">
      <md-menu-item [isHeader]="true">Username</md-menu-item>
      <md-menu-item class="profile">Profile</md-menu-item>
      <md-menu-item>Settings</md-menu-item>
      <md-menu-item
        class="submenuTrigger"
        [mdMenuTriggerFor]="testSubMenu"
        [selectedValue]="selectedValue"
      >Language</md-menu-item>
    </md-menu>

    <md-menu #testSubMenu>
      <md-menu-item>Chinese</md-menu-item>
      <md-menu-item>English</md-menu-item>
      <md-menu-item>Spanish</md-menu-item>
    </md-menu>
  `
})
class TestMenuComponent {
  @ViewChild(MenuTriggerDirective) trigger: MenuTriggerDirective;
  @ViewChild('triggerEl') triggerEl: ElementRef<HTMLElement>;
  @ViewChild(MenuComponent) menu: MenuComponent;
  @ViewChildren(MenuItemComponent) items: QueryList<MenuItemComponent>;
  extraItems: string[] = [];
  closeCallback = jasmine.createSpy('menu closed callback');
  backdropClass: string;
  panelClass: string;
  direction: MenuDirection = 'bottom-left';
  showArrow: boolean = true;
  selectedValue: string = 'English';
  count: number = 0;
  onSelect(_: MenuItemComponent) {
    this.count++;
  }
}


describe('MenuComponent', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let focusMonitor: FocusMonitor;

  function createComponent<T>(component: Type<T>,
                              providers: Provider[] = [],
                              declarations: any[] = []): ComponentFixture<T> {
    TestBed.configureTestingModule({
      imports: [
        IconModule,
        MenuModule,
        ListItemSectionModule,
      ],
      declarations: [component, ...declarations],
      providers
    }).compileComponents();

    inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
      focusMonitor = fm;
    })();

    return TestBed.createComponent<T>(component);
  }

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  it('should open a Menu', () => {
    const fixture = createComponent(TestMenuComponent);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    expect(() => {
      fixture.componentInstance.trigger.openMenu();
      fixture.componentInstance.trigger.openMenu();
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain('Language');
    }).not.toThrowError();
  });

  it('should close the Menu when clicking outside the menu', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();

    const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
    backdrop.click();
    fixture.detectChanges();
    tick(500);

    expect(overlayContainerElement.textContent).toBe('');
  }));

  it('should restore focus to the trigger', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.detectChanges();
    const triggerEl = fixture.componentInstance.triggerEl.nativeElement;
    triggerEl.click();
    fixture.detectChanges();

    expect(overlayContainerElement.querySelector('.md-menu')).toBeTruthy();

    fixture.componentInstance.trigger.closeMenu();
    fixture.detectChanges();
    tick(500);

    expect(document.activeElement).toBe(triggerEl);
  }));

  it('should close the menu when pressing ESCAPE', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();

    overlayContainerElement.querySelector('.md-menu-overlay').dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'Escape',
      })
    );
    fixture.detectChanges();
    tick(500);

    expect(overlayContainerElement.textContent).toBe('');
  }));

  it('should render an arrow', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();
    tick(500);
    expect(overlayContainerElement.querySelector('.md-event-overlay--arrow')).toBeTruthy();
  }));

  it('should not render an arrow when showArrow is false', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.componentInstance.showArrow = false;
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();
    tick(500);
    expect(overlayContainerElement.querySelector('.md-event-overlay--arrow')).toBeFalsy();
  }));

  it('should render with correct class "md-event-overlay--bottom"', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();
    tick(500);
    expect(overlayContainerElement.querySelector('.md-event-overlay--bottom')).toBeTruthy();
  }));

  it('should render with correct class "md-event-overlay--top"', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.componentInstance.direction = 'top-right';
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();
    tick(500);
    expect(overlayContainerElement.querySelector('.md-event-overlay--top')).toBeTruthy();
  }));

  it('should render with correct class "md-event-overlay--left"', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.componentInstance.direction = 'left-center';
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();
    tick(500);
    expect(overlayContainerElement.querySelector('.md-event-overlay--left')).toBeTruthy();
  }));

  it('should render with correct class "md-event-overlay--right"', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.componentInstance.direction = 'right-center';
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();
    tick(500);
    expect(overlayContainerElement.querySelector('.md-event-overlay--right')).toBeTruthy();
  }));

  it('should open a submenu', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();
    tick(500);
    expect(overlayContainerElement.querySelectorAll('.md-menu').length).toBe(1);

    const submenuTriggerEl: HTMLElement = overlayContainerElement.querySelector('.submenuTrigger');
    submenuTriggerEl.click();
    fixture.detectChanges();
    tick(500);

    expect(overlayContainerElement.querySelectorAll('.md-menu').length).toBe(2);
  }));

  it('should handle select event', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();
    tick(500);

    const menuItem: HTMLElement = overlayContainerElement.querySelector('.profile');
    menuItem.click();
    fixture.detectChanges();
    tick(500);

    expect(fixture.componentInstance.count).toEqual(1);
  }));

  it('should handle selectedValue prop', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.componentInstance.selectedValue = 'Chinese';
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();
    tick(500);
    expect(overlayContainerElement.querySelector('.md-menu-item__selected-value').textContent).toEqual('Chinese');
  }));

  it('should handle isHeader prop', fakeAsync(() => {
    const fixture = createComponent(TestMenuComponent);
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();
    tick(500);
    expect(overlayContainerElement.querySelector('.md-menu-item__header')).toBeTruthy();
  }));

});
