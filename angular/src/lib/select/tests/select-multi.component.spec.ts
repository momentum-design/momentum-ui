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
  selector: 'multi-select',
  template: `
        <md-select
          defaultValue="my default value"
          [isMulti]="true"
          [ngClass]="'custom-ng-class'"
          [(ngModel)]="mySelectedItems">
            <div md-select-option id="first-option" label="first option"></div>
            <div md-select-option id="first-option" label="second option"></div>
        </md-select>
`
})
class MultiSelectComponent {
  @ViewChild(SelectComponent) select: SelectComponent;
  @ContentChildren(ListItemComponent) selectOptions: QueryList<ListItemComponent>;

  mySelectedItems = '';
}

describe('SelectComponent', () => {
  let testComponent: MultiSelectComponent;
  let selectComponent: SelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;
  let selectNativeElement: HTMLElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultiSelectComponent,
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
    fixture = TestBed.createComponent(MultiSelectComponent);
    testComponent = fixture.componentInstance;
    selectComponent = fixture.debugElement.children[0].componentInstance;
  });

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(selectComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render select options with isMulti props', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    button.click();
    fixture.detectChanges();
    flush();

    const selectOptions = selectComponent.selectOptions;
    expect(selectOptions).not.toBeNull();

    selectOptions.forEach((option) => {
        expect(option.isMulti).toBe(true);
    });
  }));

  it('should render correct text and checked checkbox when first option is clicked', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    button.click();
    fixture.detectChanges();
    flush();

    const selectOptions = selectComponent.selectOptions;
    expect(selectOptions).not.toBeNull();

    const firstOption = selectOptions.first;
    expect(firstOption.selected).toBe(false);

    firstOption.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    expect(firstOption.selected).toBe(true);
    expect(firstOption.checkStatus).toBe(true);
    selectNativeElement = fixture.nativeElement;
    expect(selectNativeElement.textContent.trim()).toEqual('1 Item Selected');
  }));

  it('should not auto close overlay once an option is clicked', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    button.click();
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(true);
    expect(overlayContainerElement.textContent.trim()).toContain('first option');

    selectComponent.selectOptions.first.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    expect(fixture.nativeElement.textContent.trim()).toEqual('1 Item Selected');
    expect(selectComponent.overlayOpen).toBe(true);
    expect(overlayContainerElement.textContent.trim()).toContain('first option');
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

    expect(overlayContainerElement.textContent.trim()).toEqual('');
  }));

  it('should render correct text when both options are clicked', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    button.click();
    fixture.detectChanges();
    flush();

    const selectOptions = selectComponent.selectOptions;
    expect(selectOptions).not.toBeNull();

    expect(selectOptions.first.selected).toBe(false);
    expect(selectOptions.last.selected).toBe(false);

    selectOptions.first.handleClick(new Event('click'));
    selectOptions.last.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    selectNativeElement = fixture.nativeElement;
    expect(selectNativeElement.textContent.trim()).toEqual('2 Items Selected');

    expect(selectOptions.first.selected).toBe(true);
    expect(selectOptions.last.selected).toBe(true);

    expect(selectComponent.overlayOpen).toBe(true);
    expect(fixture.componentInstance.mySelectedItems).toContain('first option');
    expect(fixture.componentInstance.mySelectedItems).toContain('second option');
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

      // after selection, overlay should remain open
      expect(selectComponent.overlayOpen).toBe(true);
      expect(select.textContent.trim()).toEqual('1 Item Selected');

      // check ngModel value
      expect(fixture.componentInstance.mySelectedItems).toEqual(['first option']);

      selectOptions = selectComponent.selectOptions;
      const keyManager = fixture.componentInstance.select._keyManager;

      expect(selectOptions.first.selected).toBe(true);
      expect(keyManager.activeItem.id).toEqual(selectOptions.first.id);
    }));

    it('should resume focus from selected item after selecting second option via click', fakeAsync(() => {
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

      expect(selectComponent.overlayOpen).toBe(true);
      expect(select.textContent.trim()).toEqual('1 Item Selected');

      // check ngModel value
      expect(fixture.componentInstance.mySelectedItems).toEqual(['first option']);

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
      expect(selectComponent.overlayOpen).toBe(true);
      expect(select.textContent.trim()).toEqual('2 Items Selected');

      expect(fixture.componentInstance.mySelectedItems).toEqual(['first option', 'second option']);
    }));
  });
});
