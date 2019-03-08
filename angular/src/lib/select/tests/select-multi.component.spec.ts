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
        <cui-select defaultValue="my default value" [isMulti]="true" [ngClass]="'custom-ng-class'">
            <div cui-select-option id="first-option" label="first option"></div>
            <div cui-select-option id="first-option" label="second option"></div>
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

  it('should render correct text when first option is clicked', fakeAsync(() => {
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
    expect(selectNativeElement.textContent).toEqual(' 1 Item Selected ');
    expect(selectComponent.state.selected.length).toEqual(1);
  }));

  it('should not auto close overlay once an option is clicked', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    button.click();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent).toContain('first option');

    selectComponent.selectOptions.first.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    expect(fixture.nativeElement.textContent).toEqual(' 1 Item Selected ');
    expect(selectComponent.state.selected.length).toEqual(1);
    expect(overlayContainerElement.textContent).toContain('first option');
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

    expect(selectOptions.first.active).toBe(false);
    expect(selectOptions.last.active).toBe(false);

    selectOptions.first.handleClick(new Event('click'));
    selectOptions.last.handleClick(new Event('click'));
    fixture.detectChanges();
    flush();

    selectNativeElement = fixture.nativeElement;
    expect(selectNativeElement.textContent).toEqual(' 2 Items Selected ');
    expect(selectComponent.state.selected.length).toEqual(2);

    expect(selectOptions.first.active).toBe(true);
    expect(selectOptions.last.active).toBe(true);
  }));
});
