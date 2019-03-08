import { Component, QueryList, ContentChildren } from '@angular/core';
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

@Component({
  selector: 'multi-select',
  template: `
        <cui-select defaultValue="my default value" [ngClass]="'custom-ng-class'">
            <div cui-select-option class="custom-class-prop" label="first option"></div>
            <div cui-select-option label="second option"></div>
        </cui-select>
`
})
class MultiSelectComponent {
  @ContentChildren(ListItemComponent) selectOptions: QueryList<ListItemComponent>;
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
      // schemas: [ NO_ERRORS_SCHEMA ],
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

  it('should render with default class name and ngClass', () => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const select = selectNativeElement.querySelector('cui-select');
    expect(select).not.toBeNull();
    expect(select.className).toContain('cui-input-group');
    expect(select.className).toContain('cui-select');
    expect(select.className).toContain('custom-ng-class');
  });

  it('should render with defaultValue prop', () => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const select = selectNativeElement.querySelector('cui-select');

    expect(select).not.toBeNull();
    expect(select.textContent).toContain('my default value');
  });

  describe('button', () => {
    it('should render with default class name and buttonClass prop', () => {
      selectComponent.buttonClass = 'custom-button-class';
      fixture.detectChanges();

      selectNativeElement = fixture.nativeElement;
      const button = selectNativeElement.querySelector('button');
      expect(button).not.toBeNull();
      expect(button.className).toContain('cui-button');
      expect(button.className).toContain('cui-button--36');
      expect(button.className).toContain('cui-button--input');
      expect(button.className).toContain('custom-button-class');
    });

    it('should render with default randomly generated select id', () => {
      selectComponent.buttonClass = 'custom-button-class';
      fixture.detectChanges();

      selectNativeElement = fixture.nativeElement;
      const button = selectNativeElement.querySelector('button');
      expect(button).not.toBeNull();
      expect(button.id).toContain('cui-select-');
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

    expect(overlayContainerElement.textContent).toContain('first option');
    expect(overlayContainerElement.textContent).toContain('second option');
  }));

  it('should render two select options with default class name and class prop', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    // open overlay
    button.click();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent).toContain('first option');
    expect(overlayContainerElement.textContent).toContain('second option');

    const selectOptions = selectComponent.selectOptions;
    expect(selectOptions).not.toBeNull();
    expect(selectOptions.length).toEqual(2);

    const firstOption = selectOptions.first;
    expect(firstOption.className).toContain('cui-list-item');
    expect(firstOption.className).toContain('custom-class-prop');
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

    expect(overlayContainerElement.textContent).toContain('first option');
    expect(overlayContainerElement.textContent).toContain('second option');

    // close overlay
    button.click();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent).toEqual('');
  }));

  it('should close overlay when a click occurs outside the overlay', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    button.click();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent).toContain('first option');
    const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;

    backdrop.click();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent).toEqual('');
  }));

  it('should render correct text when first select option is clicked', fakeAsync(() => {
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
    expect(firstOption.active).toBe(false);

    firstOption.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    expect(firstOption.active).toBe(true);
    selectNativeElement = fixture.nativeElement;
    expect(selectNativeElement.textContent).toContain('first option');
    expect(selectComponent.state.selected.length).toEqual(1);
  }));

  it('should auto close overlay once an option is clicked', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    button.click();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent).toContain('first option');
    const selectOptions = selectComponent.selectOptions;
    expect(selectOptions).not.toBeNull();

    const firstOption = selectOptions.first;
    expect(firstOption.active).toBe(false);

    firstOption.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    expect(firstOption.active).toBe(true);
    selectNativeElement = fixture.nativeElement;
    expect(selectNativeElement.textContent).toContain('first option');
    expect(selectComponent.state.selected.length).toEqual(1);
    expect(overlayContainerElement.textContent).toContain('');
  }));

  it('should render correctly when option is clicked and unclicked', fakeAsync(() => {
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
    expect(firstOption.active).toBe(false);
    expect(selectOptions.last.active).toBe(false);

    firstOption.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    expect(firstOption.active).toBe(true);
    expect(selectOptions.last.active).toBe(false);
    selectNativeElement = fixture.nativeElement;
    expect(selectNativeElement.textContent).toEqual(' first option ');
    expect(selectComponent.state.selected.length).toEqual(1);

    firstOption.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    expect(firstOption.active).toBe(false);
    expect(selectOptions.last.active).toBe(false);
    selectNativeElement = fixture.nativeElement;
    expect(selectNativeElement.textContent).toEqual(' my default value ');
    expect(selectComponent.state.selected.length).toEqual(0);
  }));
});
