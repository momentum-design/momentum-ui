import { Component, QueryList, ContentChildren, ViewChild } from '@angular/core';
import { async, fakeAsync, ComponentFixture, TestBed, flush, inject } from '@angular/core/testing';
import { OverlayModule, OverlayContainer } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { ListItemComponent } from 'src/lib/list-item';
import {
  ButtonModule,
  IconModule,
  ListModule,
  ListItemSectionModule,
  CheckboxModule
} from 'src/lib/public_api';
import { SelectComponent } from '../select.component';
import { dispatchKeyboardEvent } from '../../../../test/utils';
import { DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'select',
  template: `
        <md-select
          defaultValue="my default value"
          [ngClass]="'custom-ng-class'"
          [(ngModel)]="mySelectedItems">
            <div md-select-option class="custom-class-prop" label="first option"></div>
            <div md-select-option label="second option"></div>
        </md-select>
`
})
class TestSelectComponent {
  @ViewChild(SelectComponent) select: SelectComponent;
  @ContentChildren(ListItemComponent) selectOptions: QueryList<ListItemComponent>;

  mySelectedItems = '';
}

describe('SelectComponent', () => {
  let testComponent: TestSelectComponent;
  let selectComponent: SelectComponent;
  let fixture: ComponentFixture<TestSelectComponent>;
  let selectNativeElement: HTMLElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestSelectComponent,
        SelectComponent,
        ListItemComponent
      ],
      imports: [
        ButtonModule,
        IconModule,
        ListModule,
        ListItemSectionModule,
        CheckboxModule,
        OverlayModule,
        A11yModule
      ]
    }).compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSelectComponent);
    testComponent = fixture.componentInstance;
    selectComponent = fixture.debugElement.children[0].componentInstance;
  });

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(selectComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with default class name and ngClass', () => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const select = selectNativeElement.querySelector('md-select');
    expect(select).not.toBeNull();
    expect(select.className).toContain('md-input-group');
    expect(select.className).toContain('md-select');
    expect(select.className).toContain('custom-ng-class');
  });

  it('should render with defaultValue prop', () => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const select = selectNativeElement.querySelector('md-select');

    expect(select).not.toBeNull();
    expect(select.textContent.trim()).toEqual('my default value');
  });

  describe('button', () => {
    it('should render with default class name and buttonClass prop', () => {
      selectComponent.buttonClass = 'custom-button-class';
      fixture.detectChanges();

      selectNativeElement = fixture.nativeElement;
      const button = selectNativeElement.querySelector('button');
      expect(button).not.toBeNull();
      expect(button.className).toContain('md-button');
      expect(button.className).toContain('md-button--36');
      expect(button.className).toContain('custom-button-class');
    });

    it('should render with default randomly generated select id', () => {
      selectComponent.buttonClass = 'custom-button-class';
      fixture.detectChanges();

      selectNativeElement = fixture.nativeElement;
      const button = selectNativeElement.querySelector('button');
      expect(button).not.toBeNull();
      expect(button.id).toContain('md-select-');
    });
  });

  it('should open the overlay of options when select button is invoked', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    // open overlay
    button.click();
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(true);
    expect(overlayContainerElement.textContent.trim()).toContain('first option');
    expect(overlayContainerElement.textContent.trim()).toContain('second option');
  }));

  it('should render two select options with default classname and class prop', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    // open overlay
    button.click();
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(true);
    const selectOptions = selectComponent.selectOptions;
    expect(selectOptions).not.toBeNull();
    expect(selectOptions.length).toEqual(2);

    const firstOption = selectOptions.first;
    expect(firstOption.el.nativeElement.className).toContain('md-list-item');
    expect(firstOption.el.nativeElement.className).toContain('custom-class-prop');
    expect(fixture.componentInstance.mySelectedItems).toEqual('');
  }));

  it('should close the overlay of options when select button is invoked', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    // open overlay
    button.click();
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(true);
    expect(overlayContainerElement.textContent.trim()).toContain('first option');
    expect(overlayContainerElement.textContent.trim()).toContain('second option');

    // close overlay
    button.click();
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(false);
    expect(overlayContainerElement.textContent.trim()).toEqual('');
  }));

  it('should close overlay when a click occurs outside the overlay', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    button.click();
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(true);
    expect(overlayContainerElement.textContent.trim()).toContain('first option');
    const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;

    backdrop.click();
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(false);
    expect(overlayContainerElement.textContent.trim()).toEqual('');
  }));

  it('should render correct text when first select option is clicked', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const select = selectNativeElement.querySelector('md-select');
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    button.click();
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(true);
    const selectOptions = selectComponent.selectOptions;
    expect(selectOptions).not.toBeNull();

    const firstOption = selectOptions.first;
    expect(firstOption.selected).toBe(false);

    firstOption.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(false);
    expect(firstOption.selected).toBe(true);
    expect(overlayContainerElement.textContent.trim()).toEqual('');
    expect(select.textContent.trim()).toEqual('first option');
    expect(fixture.componentInstance.mySelectedItems).toEqual('first option');
  }));

  it('should auto close overlay once an option is clicked', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    button.click();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent.trim()).toContain('first option');
    const selectOptions = selectComponent.selectOptions;
    expect(selectOptions).not.toBeNull();

    const firstOption = selectOptions.first;
    expect(firstOption.selected).toBe(false);

    firstOption.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(false);
    expect(firstOption.selected).toBe(true);
    expect(fixture.nativeElement.textContent.trim()).toEqual('first option');
    expect(overlayContainerElement.textContent.trim()).toEqual('');
  }));

  it('should render correctly when option is clicked and unclicked', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    // open overlay
    button.click();
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(true);
    const selectOptions = selectComponent.selectOptions;
    expect(selectOptions).not.toBeNull();

    const firstOption = selectOptions.first;
    expect(firstOption.selected).toBe(false);
    expect(selectOptions.last.selected).toBe(false);
    let keyManager = fixture.componentInstance.select._keyManager;

    // select fist option
    firstOption.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    // overlay is now closed
    expect(selectComponent.overlayOpen).toBe(false);
    expect(firstOption.selected).toBe(true);
    expect(selectOptions.last.selected).toBe(false);
    expect(fixture.nativeElement.textContent.trim()).toEqual('first option');
    expect(overlayContainerElement.textContent.trim()).toEqual('');
    expect(fixture.componentInstance.mySelectedItems).toEqual(selectOptions.first.label);

    // open overlay
    button.click();
    fixture.detectChanges();
    flush();

    // ensure first option is currently selected
    expect(selectOptions.first.selected).toBe(true);
    keyManager = fixture.componentInstance.select._keyManager;
    expect(keyManager.activeItem.id).toEqual(selectOptions.first.id);


    // invoked click event on first option to deselect
    firstOption.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    expect(firstOption.selected).toBe(false);
    expect(selectOptions.last.selected).toBe(false);
    selectNativeElement = fixture.nativeElement;
    expect(selectNativeElement.textContent.trim()).toEqual('my default value');
    expect(fixture.componentInstance.mySelectedItems).toEqual(undefined);
  }));

  describe('accessibility', () => {
    it('keyboard enter should select the focused option', fakeAsync(() => {
      fixture.detectChanges();

      selectNativeElement = fixture.nativeElement;
      const button = selectNativeElement.querySelector('button');
      expect(button).not.toBeNull();

      // open overlay
      button.click();
      fixture.detectChanges();
      expect(selectComponent.overlayOpen).toBe(true);

      let selectOptions = selectComponent.selectOptions;

      selectNativeElement = fixture.nativeElement;
      const select = selectNativeElement.querySelector('md-select');

      dispatchKeyboardEvent(select, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      flush();

      // ensure first option is in focus
      selectOptions = selectComponent.selectOptions;
      expect(selectOptions.first.focus).toBe(true);

      dispatchKeyboardEvent(select, 'keydown', ENTER);
      fixture.detectChanges();
      flush();

      // after selection, overlay should be closed with updated select textContent
      expect(selectComponent.overlayOpen).toBe(false);
      expect(select.textContent.trim()).toEqual(selectOptions.first.label);

      // check ngModel value
      expect(fixture.componentInstance.mySelectedItems).toEqual('first option');

      // reopen overlay and confirm what is selected in the view
      button.click();
      expect(selectComponent.overlayOpen).toBe(true);

      selectOptions = selectComponent.selectOptions;
      const keyManager = fixture.componentInstance.select._keyManager;

      expect(selectOptions.first.selected).toBe(true);
      expect(keyManager.activeItem.id).toEqual(selectOptions.first.id);
    }));

    it('should resume focus from selected item after selecting via click', fakeAsync(() => {
      fixture.detectChanges();

      selectNativeElement = fixture.nativeElement;
      const button = selectNativeElement.querySelector('button');
      expect(button).not.toBeNull();

      // open overlay
      button.click();
      fixture.detectChanges();
      expect(selectComponent.overlayOpen).toBe(true);

      let selectOptions = selectComponent.selectOptions;
      selectNativeElement = fixture.nativeElement;
      const select = selectNativeElement.querySelector('md-select');

      dispatchKeyboardEvent(select, 'keydown', DOWN_ARROW);
      dispatchKeyboardEvent(select, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      flush();

      // ensure second option is in focus
      selectOptions = selectComponent.selectOptions;
      expect(selectOptions.last.focus).toBe(true);

      // select first option with a mouse click
      selectOptions = selectComponent.selectOptions;
      expect(selectOptions).not.toBeNull();
      const firstOption = selectOptions.first;
      expect(firstOption.selected).toBe(false);
      firstOption.handleClick(new Event('click'));

      fixture.detectChanges();
      flush();

      expect(selectComponent.overlayOpen).toBe(false);
      expect(select.textContent.trim()).toEqual(selectOptions.first.label);

      // check ngModel value
      expect(fixture.componentInstance.mySelectedItems).toEqual('first option');

      // reopen overlay and confirm what is selected in the view
      button.click();
      expect(selectComponent.overlayOpen).toBe(true);

      fixture.detectChanges();
      flush();

      selectOptions = selectComponent.selectOptions;
      const keyManager = fixture.componentInstance.select._keyManager;

      expect(selectOptions.first.selected).toBe(true);
      expect(keyManager.activeItem.id).toEqual(selectOptions.first.id);

      dispatchKeyboardEvent(select, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      flush();

      // ensure second option is in focus
      selectOptions = selectComponent.selectOptions;
      expect(selectOptions.last.focus).toBe(true);

      dispatchKeyboardEvent(select, 'keydown', ENTER);
      fixture.detectChanges();
      flush();

      // after selection, overlay should be closed with updated select textContent
      expect(selectComponent.overlayOpen).toBe(false);
      expect(select.textContent.trim()).toEqual(selectOptions.last.label);

      expect(fixture.componentInstance.mySelectedItems).toEqual('second option');
    }));
  });
});
